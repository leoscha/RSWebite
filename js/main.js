/**
 * Main JavaScript file for RouteSurvey website
 * Contains general functionality used across the site
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('RouteSurvey website loaded successfully');
  
  // Initialize mobile navigation menu
  initMobileNav();
  
  // Add smooth scrolling to all anchor links
  initSmoothScroll();
  
  // Initialize any interactive components
  initInteractiveComponents();
});

/**
 * Initialize mobile navigation menu
 */
function initMobileNav() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      // Toggle the 'hidden' class to show/hide the mobile menu
      mobileMenu.classList.toggle('hidden');
      // Toggle aria-expanded for accessibility
      const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
      mobileMenuButton.setAttribute('aria-expanded', !expanded);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Add smooth scrolling to all anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize interactive components
 */
function initInteractiveComponents() {
  // Feature tabs on features page (if present)
  const featureTabs = document.querySelectorAll('[data-tab]');
  
  if (featureTabs.length > 0) {
    featureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        featureTabs.forEach(t => t.classList.remove('bg-indigo-600', 'text-white'));
        // Add active class to clicked tab
        tab.classList.add('bg-indigo-600', 'text-white');
        
        // Hide all tab content
        document.querySelectorAll('[data-tab-content]').forEach(content => {
          content.classList.add('hidden');
        });
        
        // Show clicked tab content
        const tabContent = document.querySelector(`[data-tab-content="${tab.dataset.tab}"]`);
        if (tabContent) {
          tabContent.classList.remove('hidden');
        }
      });
    });
  }
} 