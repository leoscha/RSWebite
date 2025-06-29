// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference or use system preference
    const darkMode = localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Apply initial theme
    if (darkMode) {
        document.documentElement.classList.add('dark');
    }

    // Create and insert dark mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.className = 'fixed bottom-4 right-4 p-3 rounded-full bg-primary-600 dark:bg-primary-400 text-white shadow-lg z-50 transition-all duration-300 hover:scale-110';
    toggleButton.innerHTML = `
        <i class="fas fa-sun dark:hidden"></i>
        <i class="fas fa-moon hidden dark:block"></i>
    `;
    document.body.appendChild(toggleButton);

    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
    });
}); 