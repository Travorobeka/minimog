if (!customElements.get("m-announcement-slideshow")) {
  class MAnnouncementSlideshow extends HTMLElement {
    constructor() {
      super();
      this.currentSlide = 0;
      this.autoplayTimer = null;
      this.autoplay = this.dataset.autoplay === 'true';
      this.autoplaySpeed = parseInt(this.dataset.autoplaySpeed) * 1000 || 5000;
      this.transition = this.dataset.transition || 'fade';
      this.transitionDuration = parseInt(this.dataset.transitionDuration) || 500;
    }

    connectedCallback() {
      this.slides = this.querySelectorAll('.m-announcement-slideshow__slide');
      this.totalSlides = this.slides.length;
      
      if (this.totalSlides <= 1) return;
      
      this.init();
      this.setupControls();
      this.setupCloseButton();
      
      if (this.autoplay) {
        this.startAutoplay();
      }
    }

    init() {
      // Apply transition classes based on effect
      this.slides.forEach(slide => {
        slide.classList.add(this.transition === 'slideUp' ? 'slide-up' : this.transition);
      });
      
      // Set first slide as active
      this.slides[0].classList.add('active');
    }

    setupControls() {
      const prevBtn = this.querySelector('.m-announcement-slideshow__arrow--prev');
      const nextBtn = this.querySelector('.m-announcement-slideshow__arrow--next');
      const dots = this.querySelectorAll('.m-announcement-slideshow__dot');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => this.previousSlide());
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextSlide());
      }

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });

      // Pause autoplay on hover
      this.addEventListener('mouseenter', () => this.stopAutoplay());
      this.addEventListener('mouseleave', () => {
        if (this.autoplay) this.startAutoplay();
      });
    }

    nextSlide() {
      const nextIndex = (this.currentSlide + 1) % this.totalSlides;
      this.goToSlide(nextIndex);
    }

    previousSlide() {
      const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.goToSlide(prevIndex);
    }

    goToSlide(index) {
      if (index === this.currentSlide) return;

      // Remove active class from current slide
      this.slides[this.currentSlide].classList.remove('active');
      
      // Update current slide index
      this.currentSlide = index;
      
      // Add active class to new slide
      this.slides[this.currentSlide].classList.add('active');
      
      // Update dots
      this.updateDots();
    }

    updateDots() {
      const dots = this.querySelectorAll('.m-announcement-slideshow__dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
    }

    startAutoplay() {
      this.stopAutoplay();
      this.autoplayTimer = setInterval(() => {
        this.nextSlide();
      }, this.autoplaySpeed);
    }

    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    }

    setupCloseButton() {
      const closeBtn = this.querySelector('.m-announcement-slideshow__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.stopAutoplay();
          this.closest('section').remove();
          // Update announcement height CSS variable if it exists
          if (document.documentElement.style.getPropertyValue('--m-announcement-height')) {
            document.documentElement.style.setProperty('--m-announcement-height', '0px');
          }
        });
      }
    }

    disconnectedCallback() {
      this.stopAutoplay();
    }
  }

  customElements.define("m-announcement-slideshow", MAnnouncementSlideshow);
}