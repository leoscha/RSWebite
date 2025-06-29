/**
 * Navigation bar functionality for RouteSurvey website
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeMobileMenu();
  highlightActiveNavItem();
});

/**
 * Initialize the mobile menu toggle functionality
 */
function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuButton || !mobileMenu) return;
  
  // Set initial aria states
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  
  // Toggle mobile menu
  mobileMenuButton.addEventListener('click', () => {
    const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !expanded);
    mobileMenu.setAttribute('aria-hidden', expanded);
    
    // Toggle classes for animation
    mobileMenu.classList.toggle('hidden');
    
    // If opening the menu, focus the first menu item
    if (!expanded) {
      setTimeout(() => {
        const firstMenuItem = mobileMenu.querySelector('a');
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
    }
  });
  
  // Close menu when pressing escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuButton.getAttribute('aria-expanded') === 'true') {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.add('hidden');
      mobileMenuButton.focus();
    }
  });
  
  // Handle clicks outside the menu
  document.addEventListener('click', (e) => {
    if (
      mobileMenuButton.getAttribute('aria-expanded') === 'true' &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuButton.contains(e.target)
    ) {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.add('hidden');
    }
  });
}

/**
 * Highlight the active navigation item based on current URL
 */
function highlightActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    // Get the path from the href attribute
    const linkPath = new URL(link.href, window.location.origin).pathname;
    
    // Check if this link matches the current page
    if (
      (currentPath === '/' && linkPath === '/index.html') ||
      (currentPath === linkPath) ||
      (currentPath !== '/' && linkPath !== '/index.html' && currentPath.includes(linkPath))
    ) {
      // Desktop menu
      link.classList.add('text-indigo-600', 'font-bold');
      link.setAttribute('aria-current', 'page');
      
      // Mobile menu - find the corresponding mobile link
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        const mobileLinkText = link.textContent.trim();
        const mobileLinks = mobileMenu.querySelectorAll('a');
        
        mobileLinks.forEach(mobileLink => {
          if (mobileLink.textContent.trim() === mobileLinkText) {
            mobileLink.classList.add('bg-indigo-50', 'text-indigo-600');
            mobileLink.setAttribute('aria-current', 'page');
          }
        });
      }
    }
  });
} 