/*
=================================================================
  My Portfolio - Main JavaScript File
  Description: This file handles all the interactive functionality
               for the portfolio website.

  TABLE OF CONTENTS
  ---------------------------------------------------
  I.    MOBILE NAVIGATION (HAMBURGER MENU)
  II.   DYNAMIC ROLE TEXT ANIMATION
  III.  SCROLL REVEAL ANIMATION
  IV.   DARK MODE / THEME TOGGLER
  V.    PRELOADER LOGIC
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
  // or remove it if it is. The 'open' class in our CSS contains all the
  // styles to show the menu and animate the icon into an 'X'.
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
// We wrap this in a 'DOMContentLoaded' event listener to ensure the HTML is fully
// loaded before we try to find and manipulate its elements.
document.addEventListener("DOMContentLoaded", () => {
  
  // --- Configuration ---
  const roles = ["Business Analyst", "Data Analyst"]; // The list of roles to display.
  const pauseBetweenRoles = 2000; // The wait time between roles in milliseconds (2 seconds).
  let currentRoleIndex = 0; // We start with the first role in the array.

  // --- Get HTML Elements ---
  const roleTextContainer = document.getElementById("role-text-container");
  const roleText = document.getElementById("role-text");

  // If for some reason these elements don't exist, log an error and stop the script.
  if (!roleTextContainer || !roleText) {
    console.error("Role text animation elements not found!");
    return;
  }

  /**
   * This is the main function that controls the animation loop.
   */
  function cycleRoles() {
    // 1. HIDE: Start hiding the current text by adding the 'hiding' class.
    //    This triggers the 'wipe-out' CSS animation.
    roleTextContainer.classList.add("hiding");

    // 2. WAIT: We need to wait for the 'wipe-out' animation to finish before changing the text.
    //    We use an event listener that fires exactly once for this animation.
    roleTextContainer.addEventListener('animationend', function onWipeOutEnd(event) {
      // Ensure we're reacting to the correct animation.
      if (event.animationName !== 'wipe-out') return;

      // This listener has done its job, so we remove it to prevent it from firing multiple times.
      this.removeEventListener('animationend', onWipeOutEnd);

      // 3. UPDATE: Now that the text is hidden, update it to the next role.
      //    The '%' (modulo) operator ensures the index loops back to 0 after the last role.
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      roleText.textContent = roles[currentRoleIndex];

      // 4. REVEAL: Reveal the new text by swapping the 'hiding' class for 'revealing'.
      //    This triggers the 'wipe-in' CSS animation.
      roleTextContainer.classList.remove("hiding");
      roleTextContainer.classList.add("revealing");

      // 5. WAIT AGAIN: Wait for the 'wipe-in' animation to finish.
      this.addEventListener('animationend', function onWipeInEnd(event) {
        if (event.animationName !== 'wipe-in') return;
        
        // Clean up the listener and the revealing class.
        this.removeEventListener('animationend', onWipeInEnd);
        roleTextContainer.classList.remove("revealing");

        // 6. REPEAT: Pause for a moment, then start the whole cycle over again by calling this function recursively.
        setTimeout(cycleRoles, pauseBetweenRoles);
      });
    });
  }

  // Start the very first animation cycle after a short initial delay.
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

// --- Observer Configuration ---
const scrollRevealOptions = {
  // The animation will trigger when 20% of the element is visible in the viewport.
  threshold: 0.2, 
};

/**
 * This is the "callback" function that the Intersection Observer runs whenever
 * an observed element's visibility changes.
 * @param {IntersectionObserverEntry[]} entries - A list of elements being observed.
 * @param {IntersectionObserver} observer - The observer instance itself.
 */
const scrollRevealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // If the element is intersecting (i.e., visible in) the viewport...
    if (entry.isIntersecting) {
      // ...add the 'visible' class to trigger the fade-in animation.
      entry.target.classList.add("visible");
    } 
    // Otherwise (if it's not visible)...
    else {
      // ...remove the class so the animation can trigger again if the user scrolls back up.
      entry.target.classList.remove("visible");
    }
  });
};

// --- Observer Initialization ---
// Create the observer instance with our callback function and options.
const observer = new IntersectionObserver(scrollRevealCallback, scrollRevealOptions);

// Find all elements on the page that have the 'scroll-reveal' class.
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
 * user's preference in their browser for future visits.
 * ===================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  // Get the toggle buttons (for changing the src) and all icons that need to change.
  const themeToggleDesktopIcon = document.getElementById("theme-toggle-desktop");
  const themeToggleMobileIcon = document.getElementById("theme-toggle-mobile");
  const allThemeIcons = [themeToggleDesktopIcon, themeToggleMobileIcon];
  const allIcons = document.querySelectorAll('img[data-light-src]');
  
  // Get the clickable wrappers for the event listener
  const themeToggleWrappers = document.querySelectorAll(".theme-toggle-wrapper");

  /**
   * Applies the selected theme to the page.
   * @param {string} theme - The theme to apply ('dark' or 'light').
   */
  const applyTheme = (theme) => {
    // 1. Set the 'data-theme' attribute on the body. CSS uses this to switch variables.
    document.body.setAttribute('data-theme', theme);

    // 2. Update the main theme toggle icon source.
    const toggleIconSrc = theme === 'dark' ? './assets/theme_dark.png' : './assets/theme_light.png';
    allThemeIcons.forEach(icon => {
        if (icon) icon.src = toggleIconSrc;
    });

    // 3. Update all other icons on the page based on their data attributes.
    allIcons.forEach(icon => {
        // We check to make sure the icon is not one of the main theme toggle icons
        // to avoid setting its src twice.
        const isThemeToggleIcon = icon.id === 'theme-toggle-desktop' || icon.id === 'theme-toggle-mobile';
        if (!isThemeToggleIcon) {
            const newSrc = theme === 'dark' ? icon.getAttribute('data-dark-src') : icon.getAttribute('data-light-src');
            if (newSrc) icon.src = newSrc;
        }
    });
    
    // 4. Save the user's preference in their browser's local storage.
    localStorage.setItem('theme', theme);
  };

  /**
   * Handles the click event on the theme toggle buttons.
   */
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // CORRECTED: Add click event listeners to the WRAPPER elements, not the icons themselves.
  themeToggleWrappers.forEach(wrapper => {
    wrapper.addEventListener("click", toggleTheme);
  });

  // On page load, check for a saved theme in local storage. Default to 'light' if none is found.
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});


/**
 * ===================================================================
 * V. PRELOADER LOGIC
 *
 * Purpose: Hides the preloader and reveals the main content once
 * all page assets (images, scripts, etc.) have finished loading.
 * ===================================================================
 */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');

  if (preloader) {
    // Add the 'hidden' class to trigger the preloader's fade-out animation.
    preloader.classList.add('hidden');
  }

  if (mainContent) {
    // Add the 'visible' class to trigger the main content's fade-in animation.
    mainContent.classList.add('visible');
  }
});
