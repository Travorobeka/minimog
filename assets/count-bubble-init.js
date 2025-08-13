/**
 * Count Bubble Dynamic Styling System
 * Applies data attributes to count bubbles based on header theme settings
 */

class CountBubbleStyling {
  constructor() {
    this.bubbleSelectors = [
      '.m-cart-count-bubble',
      '.m-cart-count', 
      '.m-wishlist-count',
      '.m-compare-count'
    ];
    
    this.init();
  }
  
  init() {
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.applyStyles());
    } else {
      this.applyStyles();
    }
    
    // Reapply when cart updates
    document.addEventListener('cart:refresh', () => this.applyStyles());
    document.addEventListener('cart:updated', () => this.applyStyles());
    
    // Watch for new bubbles
    this.observeForNewBubbles();
  }
  
  applyStyles() {
    const bubbles = document.querySelectorAll(this.bubbleSelectors.join(', '));
    
    bubbles.forEach(bubble => {
      this.setBubbleAttributes(bubble);
    });
  }
  
  setBubbleAttributes(bubble) {
    // Get CSS variable values
    const style = this.getCSSVariable('--count-bubble-style') || 'circle';
    const size = this.getCSSVariable('--count-bubble-size') || 'medium';
    const position = this.getCSSVariable('--count-bubble-position') || 'top-right';
    const shadow = this.getCSSVariable('--count-bubble-shadow') || 'soft';
    const animation = this.getCSSVariable('--count-bubble-animation') || 'true';
    
    // Get offset values for positioning
    const offsetX = this.getCSSVariable('--count-bubble-offset-x') || '0px';
    const offsetY = this.getCSSVariable('--count-bubble-offset-y') || '0px';
    
    // Get custom size values
    const customWidth = this.getCSSVariable('--count-bubble-custom-width') || '18px';
    const customHeight = this.getCSSVariable('--count-bubble-custom-height') || '18px';
    
    // Set data attributes for CSS styling
    bubble.setAttribute('data-style', style);
    bubble.setAttribute('data-size', size);
    bubble.setAttribute('data-position', position);
    bubble.setAttribute('data-shadow', shadow);
    bubble.setAttribute('data-animation', animation);
    
    // Set offset data attributes for reference
    bubble.setAttribute('data-offset-x', offsetX);
    bubble.setAttribute('data-offset-y', offsetY);
    
    // Set custom size attributes
    bubble.setAttribute('data-custom-width', customWidth);
    bubble.setAttribute('data-custom-height', customHeight);
    
    // Add a class to indicate styling has been applied
    bubble.classList.add('count-bubble-styled');
    
    // Force refresh of CSS variables if needed
    this.forceStyleRefresh(bubble);
  }
  
  forceStyleRefresh(bubble) {
    // Force the browser to recalculate styles
    bubble.style.display = 'none';
    bubble.offsetHeight; // Trigger reflow
    bubble.style.display = 'flex';
  }
  
  getCSSVariable(variableName) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    
    // Remove quotes if present
    return value.replace(/^["'](.*)["']$/, '$1');
  }
  
  observeForNewBubbles() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node is a bubble or contains bubbles
              const bubbles = [];
              
              if (node.matches && node.matches(this.bubbleSelectors.join(', '))) {
                bubbles.push(node);
              }
              
              const childBubbles = node.querySelectorAll ? 
                node.querySelectorAll(this.bubbleSelectors.join(', ')) : [];
              bubbles.push(...childBubbles);
              
              // Apply styling to new bubbles
              bubbles.forEach(bubble => {
                if (!bubble.classList.contains('count-bubble-styled')) {
                  this.setBubbleAttributes(bubble);
                }
              });
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Method to manually refresh all bubble styles
  refresh() {
    this.applyStyles();
  }
}

// Initialize the count bubble styling system
const countBubbleStyling = new CountBubbleStyling();

// Expose to global scope for manual control if needed
window.countBubbleStyling = countBubbleStyling;

// Support for Shopify theme customizer live preview
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    setTimeout(() => {
      countBubbleStyling.refresh();
    }, 100);
  });
  
  document.addEventListener('shopify:section:reorder', () => {
    setTimeout(() => {
      countBubbleStyling.refresh();  
    }, 100);
  });
  
  document.addEventListener('shopify:section:select', () => {
    setTimeout(() => {
      countBubbleStyling.refresh();
    }, 100);
  });
}

// Also refresh on window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    countBubbleStyling.refresh();
  }, 250);
});