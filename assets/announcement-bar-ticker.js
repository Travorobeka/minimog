if (!customElements.get("m-announcement-ticker")) {
  class MAnnouncementTicker extends HTMLElement {
    constructor() {
      super();
      this.isScrolling = true;
      this.speed = parseFloat(this.dataset.speed) || 30;
      this.direction = this.dataset.direction || 'left';
      this.separatorType = this.dataset.separatorType || 'dot';
      this.separatorCustom = this.dataset.separatorCustom || '•';
    }

    connectedCallback() {
      this.init();
      this.setupCloseButton();
    }

    init() {
      const content = this.querySelector('[data-ticker-content]');
      if (!content) return;

      this.createInfiniteContent(content);
      this.applySeparatorStyles();
      
      // Set animation direction
      if (this.direction === 'right') {
        this.classList.add('m-announcement-ticker--right');
      }

      // Calculate optimal speed based on content length
      this.calculateOptimalSpeed(content);

      // Pause on hover
      this.addEventListener('mouseenter', () => this.pause());
      this.addEventListener('mouseleave', () => this.resume());
    }

    createInfiniteContent(content) {
      const items = Array.from(content.querySelectorAll('[data-ticker-item]'));
      if (items.length === 0) return;
      
      // Create the seamless infinite content
      const infiniteTrack = document.createElement('div');
      infiniteTrack.className = 'm-announcement-ticker__track';
      
      // Calculate how many repetitions we need for true infinite scroll
      const viewportWidth = window.innerWidth;
      const estimatedItemWidth = 200; // Rough estimate per item
      const totalEstimatedWidth = items.length * estimatedItemWidth;
      const repetitionsNeeded = Math.max(3, Math.ceil((viewportWidth * 4) / totalEstimatedWidth));
      
      // Build the complete infinite sequence with proper separator logic
      for (let rep = 0; rep < repetitionsNeeded; rep++) {
        // Add all items with separators between them
        items.forEach((item, index) => {
          // Add separator before each item (except the very first one globally)
          if (rep > 0 || index > 0) {
            const separator = this.createSeparator();
            infiniteTrack.appendChild(separator);
          }
          
          const clonedItem = item.cloneNode(true);
          infiniteTrack.appendChild(clonedItem);
        });
      }
      
      // Add one final separator to connect back to the beginning seamlessly
      const finalSeparator = this.createSeparator();
      infiniteTrack.appendChild(finalSeparator);
      
      // Replace content
      content.innerHTML = '';
      content.appendChild(infiniteTrack);
      
      // Ensure we have enough content width for seamless animation
      this.ensureSeamlessWidth(content, infiniteTrack);
    }

    ensureSeamlessWidth(content, track) {
      // Measure actual content width after creation
      setTimeout(() => {
        const contentWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // If content isn't wide enough, add more repetitions
        if (contentWidth < viewportWidth * 3) {
          const originalItems = Array.from(this.querySelectorAll('[data-ticker-item]'));
          const additionalReps = 3;
          
          for (let rep = 0; rep < additionalReps; rep++) {
            originalItems.forEach((item, index) => {
              // Add separator before each item (but not before the very first one of this set)
              if (index > 0) {
                const separator = this.createSeparator();
                track.appendChild(separator);
              } else {
                // Add separator before the first item to separate from previous content
                const separator = this.createSeparator();
                track.appendChild(separator);
              }
              
              const clone = item.cloneNode(true);
              track.appendChild(clone);
            });
          }
          
          // Add final separator
          const finalSep = this.createSeparator();
          track.appendChild(finalSep);
        }
      }, 100);
    }

    createSeparator() {
      const separator = document.createElement('span');
      separator.className = `m-announcement-ticker__separator m-announcement-ticker__separator--${this.separatorType}`;
      
      // Set the separator content based on type
      const separatorMap = {
        'dot': '•',
        'plus': '+',
        'arrow': '→',
        'diamond': '◆',
        'star': '★',
        'pipe': '|',
        'slash': '/',
        'heart': '♥',
        'fire': '🔥',
        'lightning': '⚡',
        'custom': this.separatorCustom
      };
      
      separator.textContent = separatorMap[this.separatorType] || '•';
      return separator;
    }

    applySeparatorStyles() {
      const separators = this.querySelectorAll('.m-announcement-ticker__separator');
      const separatorMap = {
        'dot': '•',
        'plus': '+',
        'arrow': '→',
        'diamond': '◆',
        'star': '★',
        'pipe': '|',
        'slash': '/',
        'heart': '♥',
        'fire': '🔥',
        'lightning': '⚡',
        'custom': this.separatorCustom
      };
      
      separators.forEach(separator => {
        separator.className = `m-announcement-ticker__separator m-announcement-ticker__separator--${this.separatorType}`;
        separator.textContent = separatorMap[this.separatorType] || '•';
      });
    }

    calculateOptimalSpeed(content) {
      // Calculate speed for seamless animation
      setTimeout(() => {
        const track = content.querySelector('.m-announcement-ticker__track');
        if (!track) return;
        
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // Calculate speed based on content width for consistent pixel-per-second movement
        const baseSpeed = this.speed;
        const pixelsPerSecond = Math.max(50, trackWidth / baseSpeed); // Minimum 50px/s
        const calculatedSpeed = (trackWidth / 2) / pixelsPerSecond; // Animate half the width for seamless loop
        
        this.style.setProperty('--ticker-speed', `${Math.max(10, calculatedSpeed)}s`);
      }, 150);
    }

    pause() {
      const content = this.querySelector('[data-ticker-content]');
      if (content) {
        content.style.animationPlayState = 'paused';
      }
    }

    resume() {
      const content = this.querySelector('[data-ticker-content]');
      if (content) {
        content.style.animationPlayState = 'running';
      }
    }

    setupCloseButton() {
      const closeBtn = this.querySelector('.m-announcement-ticker__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.closest('section').remove();
          // Update announcement height CSS variable if it exists
          if (document.documentElement.style.getPropertyValue('--m-announcement-height')) {
            document.documentElement.style.setProperty('--m-announcement-height', '0px');
          }
        });
      }
    }

    // Method to update separator dynamically
    updateSeparator(type, custom = '') {
      this.separatorType = type;
      this.separatorCustom = custom;
      this.applySeparatorStyles();
    }

    // Recalculate on resize
    handleResize() {
      const content = this.querySelector('[data-ticker-content]');
      if (content) {
        this.calculateOptimalSpeed(content);
      }
    }
  }

  customElements.define("m-announcement-ticker", MAnnouncementTicker);

  // Handle resize events for all tickers
  window.addEventListener('resize', () => {
    document.querySelectorAll('m-announcement-ticker').forEach(ticker => {
      ticker.handleResize();
    });
  });
}