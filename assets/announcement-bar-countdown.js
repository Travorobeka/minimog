if (!customElements.get("m-announcement-countdown")) {
  class MAnnouncementCountdown extends HTMLElement {
    constructor() {
      super();
      this.timer = null;
      this.endDate = this.dataset.endDate;
      this.endTime = this.dataset.endTime || '23:59';
      this.timezone = this.dataset.timezone || 'UTC';
      this.expiredAction = this.dataset.expiredAction || 'hide';
      this.targetTime = null;
    }

    connectedCallback() {
      this.init();
      this.setupCloseButton();
    }

    init() {
      if (!this.endDate) return;

      // Parse target date and time
      const dateTimeString = `${this.endDate}T${this.endTime}:00`;
      this.targetTime = new Date(dateTimeString).getTime();

      // Start countdown
      this.startCountdown();
    }

    startCountdown() {
      this.updateCountdown();
      this.timer = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }

    updateCountdown() {
      const now = new Date().getTime();
      const timeLeft = this.targetTime - now;

      if (timeLeft <= 0) {
        this.handleExpired();
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.updateDisplay(days, hours, minutes, seconds);
      this.updateUrgencyState(timeLeft);
    }

    updateDisplay(days, hours, minutes, seconds) {
      const daysEl = this.querySelector('[data-days]');
      const hoursEl = this.querySelector('[data-hours]');
      const minutesEl = this.querySelector('[data-minutes]');
      const secondsEl = this.querySelector('[data-seconds]');

      if (daysEl) this.updateNumber(daysEl, days.toString().padStart(2, '0'));
      if (hoursEl) this.updateNumber(hoursEl, hours.toString().padStart(2, '0'));
      if (minutesEl) this.updateNumber(minutesEl, minutes.toString().padStart(2, '0'));
      if (secondsEl) this.updateNumber(secondsEl, seconds.toString().padStart(2, '0'));
    }

    updateNumber(element, newValue) {
      if (element.textContent !== newValue) {
        element.classList.add('updating');
        element.textContent = newValue;
        setTimeout(() => {
          element.classList.remove('updating');
        }, 300);
      }
    }

    updateUrgencyState(timeLeft) {
      const oneHour = 1000 * 60 * 60;
      const tenMinutes = 1000 * 60 * 10;

      // Remove existing urgency classes
      this.classList.remove('m-announcement-countdown--urgent', 'm-announcement-countdown--critical');

      if (timeLeft <= tenMinutes) {
        this.classList.add('m-announcement-countdown--critical');
      } else if (timeLeft <= oneHour) {
        this.classList.add('m-announcement-countdown--urgent');
      }
    }

    handleExpired() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      const contentEl = this.querySelector('.m-announcement-countdown__content');
      const expiredEl = this.querySelector('[data-expired-message]');

      if (this.expiredAction === 'hide') {
        this.closest('section').remove();
        if (document.documentElement.style.getPropertyValue('--m-announcement-height')) {
          document.documentElement.style.setProperty('--m-announcement-height', '0px');
        }
      } else if (this.expiredAction === 'show_message' && expiredEl) {
        if (contentEl) contentEl.style.display = 'none';
        expiredEl.style.display = 'flex';
      }
    }

    setupCloseButton() {
      const closeBtn = this.querySelector('.m-announcement-countdown__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
          this.closest('section').remove();
          if (document.documentElement.style.getPropertyValue('--m-announcement-height')) {
            document.documentElement.style.setProperty('--m-announcement-height', '0px');
          }
        });
      }
    }

    disconnectedCallback() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  customElements.define("m-announcement-countdown", MAnnouncementCountdown);
}