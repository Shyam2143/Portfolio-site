/*
=================================================================
  My Portfolio - Main JavaScript File
  Description: This file handles all the interactive functionality
               for the portfolio website, including the mobile
               navigation, animated text, and scroll animations.
=================================================================
*/


/**
 * ===================================================================
 * I. MOBILE NAVIGATION (HAMBURGER MENU)
 *
 * Purpose: To show and hide the navigation menu on mobile devices
 * when the user clicks the hamburger icon.
 * ===================================================================
 */
function toggleMenu() {
  // Find the two elements we need to change: the menu itself and the icon.
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // The .toggle() method is a shortcut to add a class if it's not there,
  // or remove it if it is. The 'open' class triggers the CSS animations.
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


/**
 * ===================================================================
 * II. DYNAMIC ROLE TEXT ANIMATION
 *
 * Purpose: To create an eye-catching "wipe" animation that cycles
 * through different job titles in the profile section.
 * ===================================================================
 */
// We wrap this in an event listener to make sure the HTML is fully loaded
// before we try to find and manipulate its elements.
document.addEventListener("DOMContentLoaded", () => {
  
  // --- Configuration ---
  const roles = ["Business Analyst", "Data Analyst"]; // The list of roles to display.
  const pauseBetweenRoles = 2000; // The wait time in milliseconds (2 seconds).
  let currentRoleIndex = 0; // We start with the first role in the array.

  // --- Get HTML Elements ---
  const roleTextContainer = document.getElementById("role-text-container");
  const roleText = document.getElementById("role-text");

  // If for some reason these elements don't exist, stop the script to prevent errors.
  if (!roleTextContainer || !roleText) {
    console.error("Role text animation elements not found!");
    return;
  }

  /**
   * This is the main function that controls the animation loop.
   */
  function cycleRoles() {
    // 1. Start hiding the current text by adding the 'hiding' class.
    //    This triggers the 'wipe-out' CSS animation.
    roleTextContainer.classList.add("hiding");

    // 2. We need to wait for the 'wipe-out' animation to finish before changing the text.
    //    We use an event listener that fires exactly once for this.
    roleTextContainer.addEventListener('animationend', function onWipeOutEnd(event) {
      // Make sure we're reacting to the correct animation.
      if (event.animationName !== 'wipe-out') return;

      // This listener has done its job, so we remove it to avoid it firing again.
      this.removeEventListener('animationend', onWipeOutEnd);

      // 3. Now that the text is hidden, update it to the next role.
      //    The '%' (modulo) operator ensures we loop back to the start of the array.
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      roleText.textContent = roles[currentRoleIndex];

      // 4. Reveal the new text by swapping the 'hiding' class for 'revealing'.
      //    This triggers the 'wipe-in' CSS animation.
      roleTextContainer.classList.remove("hiding");
      roleTextContainer.classList.add("revealing");

      // 5. Wait for the 'wipe-in' animation to finish.
      this.addEventListener('animationend', function onWipeInEnd(event) {
        if (event.animationName !== 'wipe-in') return;
        
        // Clean up the listener and the class.
        this.removeEventListener('animationend', onWipeInEnd);
        roleTextContainer.classList.remove("revealing");

        // 6. Pause for a moment, then start the whole cycle over again.
        setTimeout(cycleRoles, pauseBetweenRoles);
      });
    });
  }

  // Start the first animation cycle after a short initial delay.
  setTimeout(cycleRoles, 1000);
});


/**
 * ===================================================================
 * III. SCROLL REVEAL ANIMATION
 *
 * Purpose: To fade in content sections as the user scrolls down the
 * page, using the efficient Intersection Observer API.
 * ===================================================================
 */

// --- Configuration ---
const scrollRevealOptions = {
  // The animation will trigger when 20% of the element is visible in the viewport.
  threshold: 0.2, 
};

/**
 * This is the "callback" function that runs whenever an observed
 * element's visibility changes.
 * @param {IntersectionObserverEntry[]} entries - A list of elements being observed.
 * @param {IntersectionObserver} observer - The observer instance itself.
 */
const scrollRevealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // If the element is intersecting the viewport, make it visible.
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } 
    // Otherwise, hide it again so the animation can trigger on the next scroll.
    else {
      entry.target.classList.remove("visible");
    }
  });
};

// --- Initialization ---
// Create the observer instance with our callback function and options.
const observer = new IntersectionObserver(scrollRevealCallback, scrollRevealOptions);

// Find all elements on the page that we want to animate.
const elementsToReveal = document.querySelectorAll(".scroll-reveal");

// Tell the observer to start watching each of these elements.
elementsToReveal.forEach((element) => {
  observer.observe(element);
});


/**
 * ===================================================================
 * IV. DARK MODE / THEME TOGGLER
 *
 * Purpose: To switch between a light and dark theme and save the
 * user's preference in their browser's local storage.
 * ===================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleDesktop = document.getElementById("theme-toggle-desktop");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const themeIcons = [themeToggleDesktop, themeToggleMobile];
  const allIcons = document.querySelectorAll('img[data-light-src]');

  // Function to apply the correct theme (dark/light)
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);

    // Update the toggle icon
    const toggleIconSrc = theme === 'dark' ? './assets/theme-dark.png' : './assets/theme_light.png';
    themeIcons.forEach(icon => {
        if (icon) icon.src = toggleIconSrc;
    });

    // Update all other icons on the page
    allIcons.forEach(icon => {
        const newSrc = theme === 'dark' ? icon.getAttribute('data-dark-src') : icon.getAttribute('data-light-src');
        if (newSrc) icon.src = newSrc;
    });
    
    // Save the user's preference
    localStorage.setItem('theme', theme);
  };

  // The function to handle the click event
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Add click listeners to both toggle buttons
  if (themeToggleDesktop) themeToggleDesktop.addEventListener("click", toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

  // Check for saved theme in local storage on page load
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
  applyTheme(savedTheme);
});