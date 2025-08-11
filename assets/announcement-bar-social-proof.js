if (!customElements.get("m-announcement-social-proof")) {
  class MAnnouncementSocialProof extends HTMLElement {
    constructor() {
      super();
      this.currentNotification = 0;
      this.rotationTimer = null;
      this.autoRotate = this.dataset.autoRotate === 'true';
      this.rotationSpeed = parseInt(this.dataset.rotationSpeed) * 1000 || 6000;
      this.animation = this.dataset.animation || 'fade';
    }

    connectedCallback() {
      this.notifications = this.querySelectorAll('.m-announcement-social-proof__notification');
      this.totalNotifications = this.notifications.length;
      
      if (this.totalNotifications <= 1) return;
      
      this.init();
      this.setupCloseButton();
      
      if (this.autoRotate) {
        this.startRotation();
      }
    }

    init() {
      // Apply animation classes
      this.notifications.forEach((notification, index) => {
        if (this.animation !== 'fade') {
          notification.classList.add(this.animation);
        }
        
        // Set up click handlers for notifications with links
        const link = notification.querySelector('.m-announcement-social-proof__link');
        if (link) {
          notification.addEventListener('click', (e) => {
            if (e.target === notification || notification.contains(e.target)) {
              window.location.href = link.href;
            }
          });
        }
      });
      
      // Set first notification as active
      this.notifications[0].classList.add('active');
      
      // Pause rotation on hover
      this.addEventListener('mouseenter', () => this.pauseRotation());
      this.addEventListener('mouseleave', () => {
        if (this.autoRotate) this.startRotation();
      });
    }

    showNextNotification() {
      // Remove active class from current notification
      this.notifications[this.currentNotification].classList.remove('active');
      
      // Move to next notification
      this.currentNotification = (this.currentNotification + 1) % this.totalNotifications;
      
      // Add entering animation
      const nextNotification = this.notifications[this.currentNotification];
      nextNotification.classList.add('entering');
      
      // Add active class with slight delay for animation
      setTimeout(() => {
        nextNotification.classList.add('active');
      }, 50);
      
      // Remove entering class after animation
      setTimeout(() => {
        nextNotification.classList.remove('entering');
      }, 600);
    }

    startRotation() {
      this.pauseRotation();
      this.rotationTimer = setInterval(() => {
        this.showNextNotification();
      }, this.rotationSpeed);
    }

    pauseRotation() {
      if (this.rotationTimer) {
        clearInterval(this.rotationTimer);
        this.rotationTimer = null;
      }
    }

    // Method to add new notification dynamically (useful for real-time updates)
    addNotification(notificationData) {
      const notificationEl = document.createElement('div');
      notificationEl.className = 'm-announcement-social-proof__notification';
      
      let content = `
        <div class="m-announcement-social-proof__notification-content">
      `;
      
      if (notificationData.avatar) {
        content += `
          <div class="m-announcement-social-proof__avatar">
            <img src="${notificationData.avatar}" alt="${notificationData.name || 'Customer'}" width="20" height="20" loading="lazy">
          </div>
        `;
      }
      
      content += `
          <div class="m-announcement-social-proof__notification-text">
            <span class="m-announcement-social-proof__message">
              <strong>${notificationData.name || 'Someone'}</strong> ${notificationData.message}
            </span>
      `;
      
      if (notificationData.timeAgo) {
        content += `<span class="m-announcement-social-proof__time">${notificationData.timeAgo}</span>`;
      }
      
      content += `
          </div>
      `;
      
      if (notificationData.link) {
        content += `<a href="${notificationData.link}" class="m-announcement-social-proof__link" aria-label="View details"></a>`;
      }
      
      content += `
        </div>
      `;
      
      notificationEl.innerHTML = content;
      
      const container = this.querySelector('[data-notifications]');
      if (container) {
        container.appendChild(notificationEl);
        this.notifications = this.querySelectorAll('.m-announcement-social-proof__notification');
        this.totalNotifications = this.notifications.length;
      }
    }

    // Method to update visitor count dynamically
    updateVisitorCount(count) {
      const visitorNotification = this.querySelector('[data-notification] .m-announcement-social-proof__message');
      if (visitorNotification && visitorNotification.textContent.includes('people are viewing')) {
        visitorNotification.innerHTML = `<strong>${count}</strong> people are viewing this page right now`;
      }
    }

    setupCloseButton() {
      const closeBtn = this.querySelector('.m-announcement-social-proof__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.pauseRotation();
          this.closest('section').remove();
          // Update announcement height CSS variable if it exists
          if (document.documentElement.style.getPropertyValue('--m-announcement-height')) {
            document.documentElement.style.setProperty('--m-announcement-height', '0px');
          }
        });
      }
    }

    disconnectedCallback() {
      this.pauseRotation();
    }
  }

  customElements.define("m-announcement-social-proof", MAnnouncementSocialProof);
}

// Utility function to simulate real-time social proof (optional)
function initRealTimeSocialProof() {
  const socialProofBars = document.querySelectorAll('m-announcement-social-proof');
  
  socialProofBars.forEach(bar => {
    // Simulate visitor count updates
    setInterval(() => {
      const randomCount = Math.floor(Math.random() * 20) + 15; // Random between 15-35
      bar.updateVisitorCount(randomCount);
    }, 30000); // Update every 30 seconds
  });
}

// Initialize real-time features when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRealTimeSocialProof);
} else {
  initRealTimeSocialProof();
}