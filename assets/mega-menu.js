// Accordion styles for mobile menu
const accordionStyles = `
  .m-menu-mobile__item {
    display: block !important;
    width: 100% !important;
  }
  
  .m-menu-item-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .m-menu-item-header .m-menu-mobile__link {
    flex: 1 !important;
    display: flex !important;
    align-items: center !important;
    padding: 12px 16px !important;
    margin: 0 !important;
  }
  
  /* Ensure consistent alignment for all menu items */
  .m-menu-mobile__item > .m-menu-mobile__link,
  .m-menu-mobile__item .m-menu-item-header .m-menu-mobile__link {
    padding: 12px 16px !important;
  }
  
  .m-accordion-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: none;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .m-accordion-toggle svg {
    width: 18px;
    height: 18px;
    transition: all 0.3s ease;
    stroke-width: 1.5;
  }
  
  /* Smooth transition for icon change */
  .m-accordion-toggle .plus-icon,
  .m-accordion-toggle .minus-icon {
    transition: opacity 0.3s ease;
  }
  
  /* Default state: show plus, hide minus */
  .m-accordion-toggle .plus-icon {
    opacity: 1;
  }
  .m-accordion-toggle .minus-icon {
    opacity: 0;
    position: absolute;
  }
  
  /* Open state: hide plus, show minus */
  .m-menu-mobile__item.is-open .m-accordion-toggle .plus-icon {
    opacity: 0;
  }
  .m-menu-mobile__item.is-open .m-accordion-toggle .minus-icon {
    opacity: 1;
  }
  
  .m-submenu-mobile {
    display: none !important;
    width: 100% !important;
    position: static !important;
    transform: none !important;
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden;
    list-style: none !important;
  }
  
  .m-menu-mobile__item.is-open > .m-submenu-mobile {
    display: block !important;
    animation: slideDown 0.3s ease-out;
  }
  
  .m-submenu-mobile .m-menu-mobile__item .m-menu-mobile__link,
  .m-submenu-mobile .m-menu-mobile__item .m-menu-item-header .m-menu-mobile__link {
    padding: 8px 16px 8px 32px !important;
    font-size: 14px;
    opacity: 0.8;
    margin: 0 !important;
  }
  
  .m-submenu-mobile .m-menu-mobile__item {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .m-megamenu-block {
    padding: 8px 16px 8px 32px;
    border: none !important;
    margin: 0 !important;
  }
  
  /* Mobile Collection Images Styling */
  .m-mobile-collection-images {
    display: flex;
    gap: 12px;
    padding: 16px;
    justify-content: center;
  }
  
  .m-mobile-collection-item {
    flex: 1;
    max-width: 160px;
  }
  
  .m-mobile-collection-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  
  .m-mobile-collection-image {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 12px;
    background-color: #f5f5f5;
  }
  
  .m-mobile-collection-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .m-mobile-collection-link:hover .m-mobile-collection-image img {
    transform: scale(1.05);
  }
  
  .m-mobile-collection-title {
    text-align: center;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }
  
  /* Standalone Mobile Menu Collections (Footer Area) */
  .m-mobile-menu-collections {
    display: flex;
    gap: 16px;
    padding: 24px 16px;
    justify-content: center;
    border-top: 1px solid #e5e5e5;
    margin-top: auto;
  }
  
  /* Image Size Variations */
  .m-mobile-menu-collections[data-size="small"] .m-mobile-menu-collection-item {
    max-width: 120px;
  }
  
  .m-mobile-menu-collections[data-size="medium"] .m-mobile-menu-collection-item {
    max-width: 160px;
  }
  
  .m-mobile-menu-collections[data-size="large"] .m-mobile-menu-collection-item {
    max-width: 200px;
  }
  
  .m-mobile-menu-collection-item {
    flex: 1;
  }
  
  .m-mobile-menu-collection-link {
    display: block;
    text-decoration: none;
    color: var(--mb-text-color, inherit);
    font-size: var(--mb-text-size, inherit);
    font-weight: inherit;
    font-family: inherit;
  }
  
  .m-mobile-menu-collection-image {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f5f5f5;
  }
  
  /* Conditional margin for below text positioning */
  .m-mobile-menu-collections[data-text-position="below"] .m-mobile-menu-collection-image {
    margin-bottom: 12px;
  }
  
  .m-mobile-menu-collection-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .m-mobile-menu-collection-link:hover .m-mobile-menu-collection-image img {
    transform: scale(1.05);
  }
  
  /* Text Below Image */
  .m-mobile-menu-collection-title {
    text-align: center;
    font-size: var(--mb-text-size, inherit);
    font-weight: inherit;
    letter-spacing: inherit;
    color: var(--mb-text-color, inherit);
    line-height: inherit;
    font-family: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }
  
  /* Text Overlay Styles */
  .m-mobile-menu-collection-title.m-overlay-title {
    position: absolute;
    left: 0;
    right: 0;
    color: var(--mb-text-color-overlay, #ffffff);
    font-size: var(--mb-text-size, 14px);
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    z-index: 2;
    padding: 0 8px;
    text-decoration: none;
  }
  
  /* Overlay Positioning */
  .m-mobile-menu-collections[data-text-position="overlay_top"] .m-overlay-title {
    top: 12px;
  }
  
  .m-mobile-menu-collections[data-text-position="overlay_center"] .m-overlay-title {
    top: 50%;
    transform: translateY(-50%);
  }
  
  .m-mobile-menu-collections[data-text-position="overlay_bottom"] .m-overlay-title {
    bottom: 12px;
  }
  
  /* Add overlay gradient for better text readability */
  .m-mobile-menu-collections[data-text-position*="overlay"] .m-mobile-menu-collection-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
    pointer-events: none;
    z-index: 1;
  }
  
  /* Ensure drawer content uses flex layout */
  .m-menu-drawer__content {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
  }
  
  .m-menu-drawer__navigation {
    flex: 1 !important;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }
`;

// Inject styles
if (!document.querySelector('#accordion-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'accordion-styles';
  styleSheet.textContent = accordionStyles;
  document.head.appendChild(styleSheet);
}

class Megamenu {
  constructor(container) {
    this.selectors = {
      announcementBar: ".m-announcement-bar",
      hamburgerButtons: ".m-hamburger-box",
      desktopMenuItems: [".m-menu__item"],
      desktopSubMenus: ".m-mega-menu",
      headerMobile: ".m-header__mobile",
      menuDrawer: "#m-menu-drawer",
      menuDrawerContent: ".m-menu-drawer__content",
      menu: ".m-menu-mobile",
      menuItems: [".m-menu-mobile__item"],
      megaMenuMobile: [".m-megamenu-mobile"],
      backDrop: ".m-menu-drawer__backdrop",
    };
    this.menuSelectors = {
      subMenu: ".m-mega-menu",
    };
    this.activeDesktopMenuItem = null;

    this.sliders = {};
    this.open = false;
    this.container = container;
    this.transitionDuration = 0;
    this.domNodes = queryDomNodes(this.selectors);
    this.menuData = [...this.domNodes.desktopMenuItems].map((item) => {
      const header = item.closest("header");
      const menuNodes = queryDomNodes(this.menuSelectors, item);
      return { header, item, ...menuNodes, active: false };
    });
    this.init();

    MinimogTheme = MinimogTheme || {};
    MinimogTheme.headerSliders = this.sliders;
  }

  init() {
    this.domNodes.hamburgerButtons.addEventListener("click", (e) => {
      if (this.domNodes.hamburgerButtons.classList.contains("active")) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
      this.domNodes.hamburgerButtons.classList.toggle("active");
    });
    this.domNodes.backDrop.addEventListener("click", (e) => {
      this.closeMenu();
    });
    this.initMobileMegaMenu();
    this.initDesktopMegaMenu();

    MinimogEvents.subscribe(MinimogTheme.pubSubEvents.openCartDrawer, () => {
      this.open && this.closeMenu();
    });
    MinimogEvents.subscribe(MinimogTheme.pubSubEvents.openSearchPopup, () => {
      this.open && this.closeMenu();
    });
  }
  initDesktopMegaMenu() {
    [...this.menuData].forEach((menuItem) => {
      const { item, subMenu } = menuItem;
      if (subMenu) {
        const productsBanner = subMenu.querySelector(".m-mega-product-list");
        if (productsBanner) {
          if (window && window.__sfWindowLoaded) {
            menuItem.productsBannerSlider = this.initProductsBanner(productsBanner);
          } else {
            window.addEventListener("load", () => {
              menuItem.productsBannerSlider = this.initProductsBanner(productsBanner);
            });
          }
        }
      }
    });
  }
  closeDesktopSubmenu = (menuItemIndex) => {
    const menuItem = this.menuData[menuItemIndex];
    const { header } = menuItem;
    header && header.classList.remove("show-menu");
  };
  initProductsBanner(banner) {
    const header = banner.closest("header");
    const menuItem = banner.closest(".m-menu__item");
    const screenClass = (header && `.${header.dataset.screen}`) || "";

    const id = banner.dataset.id;
    const sliderContainer = document.querySelector(`.m-product-list-${id}`);
    const columns = sliderContainer.dataset.column;

    let slider;
    slider = new MinimogLibs.Swiper(`${screenClass} .m-product-list-${id}`, {
      slidesPerView: 1,
      loop: false,
      autoplay: false,
      breakpoints: {
        1200: { slidesPerView: columns },
        992: { slidesPerView: columns >= 2 ? 2 : columns },
      },
    });
    this.sliders[menuItem.dataset.index] = slider;

    if (slider) {
      const prevBtn = document.querySelector(`#m-slider-controls-${id} .m-slider-controls__button-prev`);
      const nextBtn = document.querySelector(`#m-slider-controls-${id} .m-slider-controls__button-next`);
      prevBtn && prevBtn.addEventListener("click", () => slider.slidePrev());
      nextBtn && nextBtn.addEventListener("click", () => slider.slideNext());
    }
  }

  initMobileMegaMenu() {
    [...this.domNodes.menuItems].forEach((item) => {
      const accordionToggle = item.querySelector("[data-accordion-toggle]");
      
      if (accordionToggle) {
        accordionToggle.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleAccordion(item);
        });
      }
    });

    document.addEventListener("matchMobile", () => this.setMenuHeight());
    document.addEventListener("unmatchMobile", () => this.setMenuHeight());
  }

  //////////////// MOBILE MENU EVENTS
  openMenu() {
    this.setMenuHeight();
    document.documentElement.classList.add("prevent-scroll");
    this.domNodes.menuDrawer.classList.add("open");
    this.domNodes.headerMobile.classList.add("header-drawer-open");
    this.open = true;
  }

  closeMenu() {
    const { menuDrawer, hamburgerButtons } = this.domNodes;

    setTimeout(() => {
      // Close all accordion items
      [...this.domNodes.menuItems].forEach((item) => {
        item.classList.remove("is-open");
      });
      
      menuDrawer.classList.remove("open");
      document.documentElement.classList.remove("prevent-scroll");
      this.domNodes.headerMobile.classList.remove("header-drawer-open");
      hamburgerButtons.classList.remove("active");
    }, this.transitionDuration);
    this.open = false;
  }

  toggleAccordion(item) {
    const isOpen = item.classList.contains("is-open");
    
    // Close all other open accordions
    [...this.domNodes.menuItems].forEach((menuItem) => {
      if (menuItem !== item) {
        menuItem.classList.remove("is-open");
      }
    });
    
    // Toggle current accordion
    if (isOpen) {
      item.classList.remove("is-open");
    } else {
      item.classList.add("is-open");
    }
  }

  setMenuHeight() {
    const { menuDrawer, headerMobile } = this.domNodes;
    const offsetBottom = headerMobile.getBoundingClientRect().bottom;
    const panelHeight = window.innerHeight - offsetBottom;

    menuDrawer.style.setProperty("--menu-drawer-height", `${panelHeight}px`);
  }
}
class SiteNav {
  constructor(container) {
    this.selectors = {
      menuItems: [".m-menu .m-menu__item"],
      dropdowns: [".m-mega-menu"],
      subMenu: ".m-mega-menu",
      overlay: ".m-header__overlay",
      swiper: ".swiper-container",
    };

    this.classes = {
      slideFromRight: "slide-from-right",
      slideReveal: "slide-reveal",
      active: "m-mega-active",
    };

    this.headerSticky = false;

    if (!container) return;
    this.container = container;
    this.domNodes = queryDomNodes(this.selectors, this.container);
    this.activeIndex = -1;
    this.lastActiveIndex = -1;
    this.visited = false;
    this.timeoutEnter = null;
    this.timeoutLeave = null;
    this.attachEvents();
  }

  attachEvents = () => {
    this.domNodes.menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("mouseenter", (evt) => this.onMenuItemEnter(evt, index));
      menuItem.addEventListener("mouseleave", (evt) => this.onMenuItemLeave(evt, index));
    });
  };

  initDropdownSize = () => {
    this.container && this.container.style.setProperty("--sf-dropdown-width", this.windowWidth());
    this.container && this.container.style.setProperty("--sf-dropdown-height", this.windowHeight());
  };

  onMenuItemEnter = (evt, index) => {
    const { target } = evt;

    if (!target.classList.contains("m-menu__item--mega")) return;

    clearTimeout(this.timeoutLeave);
    this.activeIndex = target.dataset && Number(target.dataset.index);
    this.headerSticky = this.container && this.container.dataset.sticky === "true";
    this.reInitSlider(target);

    this.container && this.visited
      ? this.container.classList.remove(this.classes.slideReveal)
      : this.container.classList.add(this.classes.slideReveal);

    this.visited = true;
    this.lastActiveIndex >= 0 &&
      this.activeIndex >= 0 &&
      (this.container && this.lastActiveIndex < this.activeIndex
        ? this.container.classList.add(this.classes.slideFromRight)
        : this.lastActiveIndex > this.activeIndex && this.container.classList.remove(this.classes.slideFromRight));

    this.getElementBoundingRect(target).then((rect) => {
      if (rect) {
        this.container && this.container.style.setProperty("--sf-dropdown-width", rect.width);
        this.container && this.container.style.setProperty("--sf-dropdown-height", rect.height);
      }

      this.timeoutEnter = setTimeout(() => {
        if (this.activeIndex !== Number(target.dataset.index)) return;
        this.container && this.container.classList.add(this.classes.active);
        target.closest(".m-menu__item").classList.add("m-menu__item--active");
        // document.documentElement.classList.add("prevent-scroll");
      }, 120);
    });
  };

  onMenuItemLeave = (evt, index) => {
    this.activeIndex = -1;
    this.lastActiveIndex = index;
    evt.target.closest(".m-menu__item").classList.remove("m-menu__item--active");
    // document.documentElement.classList.remove("prevent-scroll");

    this.timeoutLeave = setTimeout(() => {
      if (this.activeIndex === -1 || this.activeIndex < 0) {
        this.visited = false;
      }
      this.resetMegaMenu(evt.target);
    }, 80);
  };

  reInitSlider = (menuItem) => {
    const swiper = menuItem.querySelector(this.selectors.swiper);
    if (!swiper) return;
    const itemIndex = menuItem.dataset.index;
    const slider = MinimogTheme && MinimogTheme.headerSliders[itemIndex];
    slider && slider.update();
  };

  getElementBoundingRect = async (element) => {
    const subMenu = element.querySelector(this.selectors.subMenu);
    if (subMenu) {
      const rect = subMenu.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    }
  };

  resetMegaMenu = () => {
    this.activeIndex = -1;

    clearTimeout(this.timeoutEnter);
    this.container &&
      this.container.classList.remove(
        this.classes.active,
        this.classes.slideFromRight,
        this.classes.slideReveal,
        "sf-header--bg-black",
        "sf-header--bg-white"
      );
  };

  windowWidth = () => {
    return window.innerWidth;
  };
  windowHeight = () => {
    return window.innerHeight;
  };

  destroy = () => {
    this.domNodes.menuItems.forEach((menuItem, index) => {
      menuItem.removeEventListener("mouseenter", (evt) => this.onMenuItemEnter(evt, index));
      menuItem.removeEventListener("mouseleave", (evt) => this.onMenuItemLeave(evt, index));
    });
  };
}
