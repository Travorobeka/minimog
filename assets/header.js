class MHeader extends HTMLElement {
  constructor() {
    super();
    this.selectors = {
      headers: ["header"],
      logos: [".m-logo"],
      topbar: ".m-topbar",
      headerWrapper: ".m-header__wrapper",
      topbarClose: ".m-topbar__close",
    };
    this.domNodes = queryDomNodes(this.selectors, this);
    this.innerWidth = window.innerWidth;
    this.headerOffsetTop = this.domNodes.headerWrapper.offsetTop;
    this.headerHeight = this.domNodes.headerWrapper.offsetHeight;
    this.stickyHeader = this.dataset.sticky;

    this.classes = {
      scrollUp: "scroll-up",
      scrollDown: "scroll-down",
      stuck: "stuck",
      always: "header-sticky-always",
      headerScrollUp: "header-scroll-up",
      headerScrollDown: "header-scroll-down",
    };
    this.init();
  }

  init() {
    this.transparentHeader =
      this.domNodes && this.domNodes.headers[0] && this.domNodes.headers[0].dataset.transparent === "true";
    this.initAddon();
    this.handleSticky();
    document.addEventListener("matchMobile", () => this.handleSticky());
    document.addEventListener("unmatchMobile", () => this.handleSticky());
    this.siteNav = new SiteNav(this);
    window.__sfHeader = this;
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
  }

  initAddon() {
    this.megamenu = new Megamenu(this);
    this.accordion = new MobileAccordion();
    if (Shopify.designMode) {
      MinimogTheme = MinimogTheme || {};
      MinimogTheme && MinimogTheme.Wishlist && MinimogTheme.Wishlist.updateWishlistCount();
    }
  }
  handleSticky() {
    let extraSpace = 20;
    const sectionGroups = document.querySelectorAll(".shopify-section-group-header-group");
    sectionGroups.forEach((section) => {
      if (!section.classList.contains("m-section-header") && !section.classList.contains("m-section-scaling-logo")) {
        extraSpace += section.offsetHeight;
      }
    });
    const topBar = document.querySelector(".m-topbar");
    if (topBar) extraSpace += topBar.offsetHeight;

    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= extraSpace) {
        this.classList.remove(this.classes.scrollUp, this.classes.stuck, this.classes.always);
        document.body.classList.remove(this.classes.headerScrollUp, this.classes.headerScrollDown);
        return;
      }

      if (this.stickyHeader === "on_scroll_up") {
        this.classList.add(this.classes.stuck);
      } else if (this.stickyHeader === "always") {
        this.classList.add(this.classes.always);
      }

      if (
        currentScroll > this.headerHeight + extraSpace &&
        currentScroll > lastScroll &&
        !this.classList.contains(this.classes.scrollDown)
      ) {
        this.classList.remove(this.classes.scrollUp);
        document.body.classList.remove(this.classes.headerScrollUp);
        this.classList.add(this.classes.scrollDown);
        document.body.classList.add(this.classes.headerScrollDown);
      } else if (currentScroll < lastScroll && this.classList.contains(this.classes.scrollDown)) {
        this.classList.remove(this.classes.scrollDown);
        document.body.classList.remove(this.classes.headerScrollDown);
        this.classList.add(this.classes.scrollUp);
        document.body.classList.add(this.classes.headerScrollUp);
      }
      lastScroll = currentScroll;
    });
  }
}
customElements.define("m-header", MHeader);

class MobileAccordion {
  constructor() {
    this.selectors = {
      drawer: '#m-menu-drawer',
      accordionHeaders: '[data-accordion-toggle]',
      accordionContents: '.m-accordion-content',
      accordionIcons: '.m-accordion-icon'
    };
    
    this.classes = {
      active: 'active',
      open: 'open'
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('click', (e) => {
      const accordionHeader = e.target.closest(this.selectors.accordionHeaders);
      if (accordionHeader) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleAccordion(accordionHeader);
      }
    });
    
    // Close all accordions when drawer is closed
    document.addEventListener('click', (e) => {
      const drawer = document.querySelector(this.selectors.drawer);
      if (drawer && !drawer.classList.contains(this.classes.open)) {
        this.closeAllAccordions();
      }
    });
  }
  
  toggleAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector(this.selectors.accordionIcons);
    const isActive = header.classList.contains(this.classes.active);
    
    // Close other accordions at the same level
    const parentItem = header.closest('.m-accordion-item, .m-accordion-child-item');
    const siblings = parentItem.parentElement.querySelectorAll('.m-accordion-header');
    
    siblings.forEach(sibling => {
      if (sibling !== header) {
        this.closeAccordion(sibling);
      }
    });
    
    // Toggle current accordion
    if (isActive) {
      this.closeAccordion(header);
    } else {
      this.openAccordion(header);
    }
  }
  
  openAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector(this.selectors.accordionIcons);
    
    header.classList.add(this.classes.active);
    content.classList.add(this.classes.active);
    
    // Set max-height to scrollHeight for smooth animation
    const scrollHeight = content.scrollHeight;
    content.style.maxHeight = scrollHeight + 'px';
    
    // Reset max-height after animation to allow dynamic content
    setTimeout(() => {
      if (content.classList.contains(this.classes.active)) {
        content.style.maxHeight = '2000px';
      }
    }, 400);
  }
  
  closeAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector(this.selectors.accordionIcons);
    
    header.classList.remove(this.classes.active);
    content.classList.remove(this.classes.active);
    
    // Set max-height to current scrollHeight, then to 0 for smooth animation
    const scrollHeight = content.scrollHeight;
    content.style.maxHeight = scrollHeight + 'px';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate to 0
    content.style.maxHeight = '0px';
    
    // Also close any nested accordions
    const nestedHeaders = content.querySelectorAll(this.selectors.accordionHeaders);
    nestedHeaders.forEach(nestedHeader => {
      this.closeAccordion(nestedHeader);
    });
  }
  
  closeAllAccordions() {
    const allHeaders = document.querySelectorAll(this.selectors.accordionHeaders);
    allHeaders.forEach(header => {
      this.closeAccordion(header);
    });
  }
}
