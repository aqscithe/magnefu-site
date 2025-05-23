/**
 * Theme toggle functionality
 */

// Check for saved theme preference or use preferred color scheme
export function initTheme(): void {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-mode');
  } else {
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}

// Toggle between dark and light mode
export function toggleTheme(): void {
  if (document.documentElement.classList.contains('dark-mode')) {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
} 