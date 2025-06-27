/* 
    ███████████████████████████████████████████████████████████████████████████
    ███                     PORTFOLIO INTERACTION ENGINE                    ███
    ███████████████████████████████████████████████████████████████████████████
    
    PROJECT: Shyam Sundar Paul - Professional Portfolio Website
    AUTHOR:  Shyam Sundar Paul
    PURPOSE: Complete interactive functionality and behavior management
    
    FUNCTIONALITY OVERVIEW:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    This JavaScript engine powers all dynamic behaviors including:
    • Responsive navigation with smooth hamburger menu transitions
    • Dynamic text animations with organic timing
    • Intersection Observer-based scroll reveal system
    • Intelligent theme switching with persistent storage
    • Premium loading experience with smooth transitions
    • Advanced modal systems with liquid glass effects
    • Cross-platform touch and click event handling
    
    PERFORMANCE OPTIMIZATIONS:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    • Debounced event handlers to prevent excessive firing
    • RequestAnimationFrame for smooth animations
    • Passive event listeners where appropriate
    • Efficient DOM queries with caching
    • Hardware-accelerated transforms and transitions
    
    ACCESSIBILITY FEATURES:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    • Keyboard navigation support (ESC to close modals)
    • Focus management for interactive elements
    • Screen reader compatible structure
    • Touch-friendly interaction targets
    • Reduced motion considerations
    
    ███████████████████████████████████████████████████████████████████████████
*/


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 1: RESPONSIVE NAVIGATION SYSTEM
    ═══════════════════════════════════════════════════════════════════════════
    
    Handles mobile hamburger menu functionality with smooth animations,
    outside-click detection, and cross-platform touch support. Ensures
    consistent navigation experience across all device types.
*/

/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  HAMBURGER MENU TOGGLE FUNCTION                                     │
 * │  Core function for showing/hiding mobile navigation menu            │
 * └─────────────────────────────────────────────────────────────────────┘
 */
function toggleMenu() {
  // Retrieve navigation elements for state manipulation
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Toggle open/closed state using CSS classes
  // The 'open' class triggers all visual transformations defined in CSS
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  OUTSIDE CLICK DETECTION SYSTEM                                     │
 * │  Enhances UX by allowing menu closure via outside taps/clicks       │
 * └─────────────────────────────────────────────────────────────────────┘
 */
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener('click', (event) => {
    const menu = document.querySelector(".menu-links");
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const isMenuOpen = menu && menu.classList.contains('open');
    
    // Close menu if user clicks outside the hamburger menu area
    if (isMenuOpen && hamburgerMenu && !hamburgerMenu.contains(event.target)) {
      const icon = document.querySelector(".hamburger-icon");
      menu.classList.remove("open");
      if (icon) {
        icon.classList.remove("open");
      }
    }
  });
});


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 2: DYNAMIC TEXT ANIMATION ENGINE
    ═══════════════════════════════════════════════════════════════════════════
    
    Creates engaging role text animations using CSS clip-path transitions.
    Features smooth text wiping effects that cycle through professional
    titles with organic timing and seamless transitions.
*/

document.addEventListener("DOMContentLoaded", () => {
  
  /* 
      ┌─────────────────────────────────────────────────────────────────────┐
      │  ANIMATION CONFIGURATION                                            │
      │  Customizable settings for role text cycling behavior               │
      └─────────────────────────────────────────────────────────────────────┘
  */
  const roles = ["Business Analyst", "Data Analyst"];  // Professional titles to display
  const pauseBetweenRoles = 2000;                      // Pause duration between transitions (ms)
  let currentRoleIndex = 0;                            // Current position in roles array

  /* 
      ┌─────────────────────────────────────────────────────────────────────┐
      │  DOM ELEMENT ACQUISITION                                            │
      │  Secure element retrieval with error handling                       │
      └─────────────────────────────────────────────────────────────────────┘
  */
  const roleTextContainer = document.getElementById("role-text-container");
  const roleText = document.getElementById("role-text");

  // Graceful degradation if elements are missing
  if (!roleTextContainer || !roleText) {
    console.error("Role text animation elements not found!");
    return;
  }

  /**
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  ROLE CYCLING ORCHESTRATOR                                          │
   * │  Manages the complete animation sequence for role text transitions  │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  function cycleRoles() {
    // PHASE 1: Initiate text hiding animation
    roleTextContainer.classList.add("hiding");

    // PHASE 2: Wait for hide animation completion
    roleTextContainer.addEventListener('animationend', function onWipeOutEnd(event) {
      // Verify we're handling the correct animation event
      if (event.animationName !== 'wipe-out') return;

      // Clean up event listener to prevent memory leaks
      this.removeEventListener('animationend', onWipeOutEnd);

      // PHASE 3: Update to next role in sequence
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      roleText.textContent = roles[currentRoleIndex];

      // PHASE 4: Initiate text revealing animation
      roleTextContainer.classList.remove("hiding");
      roleTextContainer.classList.add("revealing");

      // PHASE 5: Wait for reveal animation completion
      this.addEventListener('animationend', function onWipeInEnd(event) {
        if (event.animationName !== 'wipe-in') return;
        
        // Clean up and prepare for next cycle
        this.removeEventListener('animationend', onWipeInEnd);
        roleTextContainer.classList.remove("revealing");

        // PHASE 6: Schedule next animation cycle
        setTimeout(cycleRoles, pauseBetweenRoles);
      });
    });
  }

  // Initialize animation sequence with brief startup delay
  setTimeout(cycleRoles, 1000);
});


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 3: INTERSECTION OBSERVER SCROLL REVEAL SYSTEM
    ═══════════════════════════════════════════════════════════════════════════
    
    Modern, performant scroll-triggered animations using the Intersection
    Observer API. Provides smooth fade-in effects as content enters the
    viewport, with automatic cleanup and re-triggering capabilities.
*/

/* 
    ┌─────────────────────────────────────────────────────────────────────┐
    │  OBSERVER CONFIGURATION                                             │
    │  Fine-tuned settings for optimal animation timing                   │
    └─────────────────────────────────────────────────────────────────────┘
*/
const scrollRevealOptions = {
  threshold: 0.2,  // Trigger when 20% of element is visible for natural feel
};

/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  INTERSECTION CALLBACK HANDLER                                      │
 * │  Processes visibility changes and manages animation states          │
 * └─────────────────────────────────────────────────────────────────────┘
 */
const scrollRevealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is entering viewport - trigger reveal animation
      entry.target.classList.add("visible");
    } else {
      // Element is leaving viewport - reset for potential re-animation
      entry.target.classList.remove("visible");
    }
  });
};

/* 
    ┌─────────────────────────────────────────────────────────────────────┐
    │  OBSERVER INITIALIZATION AND BINDING                                │
    │  Sets up monitoring for all scroll-reveal elements                  │
    └─────────────────────────────────────────────────────────────────────┘
*/
const observer = new IntersectionObserver(scrollRevealCallback, scrollRevealOptions);
const elementsToReveal = document.querySelectorAll(".scroll-reveal");

// Bind observer to all elements requiring scroll reveal
elementsToReveal.forEach((element) => {
  observer.observe(element);
});


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 4: INTELLIGENT THEME MANAGEMENT SYSTEM
    ═══════════════════════════════════════════════════════════════════════════
    
    Comprehensive dark/light theme switching with persistent storage,
    icon management, and smooth transitions. Handles both desktop and
    mobile theme controls with consistent behavior across all elements.
*/

document.addEventListener("DOMContentLoaded", () => {
  /* 
      ┌─────────────────────────────────────────────────────────────────────┐
      │  THEME CONTROL ELEMENT ACQUISITION                                  │
      │  Gathering all theme-related UI elements for management             │
      └─────────────────────────────────────────────────────────────────────┘
  */
  const themeToggleDesktopIcon = document.getElementById("theme-toggle-desktop");
  const themeToggleMobileIcon = document.getElementById("theme-toggle-mobile");
  const allThemeIcons = [themeToggleDesktopIcon, themeToggleMobileIcon];
  const allIcons = document.querySelectorAll('img[data-light-src]');
  const themeToggleWrappers = document.querySelectorAll(".theme-toggle-wrapper");

  /**
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  THEME APPLICATION ENGINE                                           │
   * │  Applies selected theme across all interface elements               │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const applyTheme = (theme) => {
    // Update body data attribute for CSS theme switching
    document.body.setAttribute('data-theme', theme);

    // Update main theme toggle icons
    const toggleIconSrc = theme === 'dark' ? './assets/theme_dark.png' : './assets/theme_light.png';
    allThemeIcons.forEach(icon => {
        if (icon) icon.src = toggleIconSrc;
    });

    // Update all content icons based on theme
    allIcons.forEach(icon => {
        const isThemeToggleIcon = icon.id === 'theme-toggle-desktop' || icon.id === 'theme-toggle-mobile';
        if (!isThemeToggleIcon) {
            const newSrc = theme === 'dark' ? icon.getAttribute('data-dark-src') : icon.getAttribute('data-light-src');
            if (newSrc) icon.src = newSrc;
        }
    });
    
    // Persist user preference in browser storage
    localStorage.setItem('theme', theme);
  };

  /**
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  THEME TOGGLE HANDLER                                               │
   * │  Manages theme switching logic and state transitions                │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Bind theme toggle functionality to wrapper elements
  themeToggleWrappers.forEach(wrapper => {
    wrapper.addEventListener("click", toggleTheme);
  });

  // Initialize theme from storage or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 5: PRELOADER TRANSITION SYSTEM
    ═══════════════════════════════════════════════════════════════════════════
    
    Manages smooth transition from loading state to main content visibility.
    Ensures all assets are loaded before revealing content, providing a
    polished first impression and preventing layout shift issues.
*/

/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  LOAD COMPLETION HANDLER                                            │
 * │  Orchestrates smooth transition from preloader to main content      │
 * └─────────────────────────────────────────────────────────────────────┘
 */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');

  // Initiate preloader fade-out sequence
  if (preloader) {
    preloader.classList.add('hidden');
  }

  // Reveal main content with smooth transition
  if (mainContent) {
    mainContent.classList.add('visible');
  }
});


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 6: ENHANCED NAVIGATION SMOOTHING
    ═══════════════════════════════════════════════════════════════════════════
    
    Provides buttery-smooth scrolling for anchor link navigation with
    header offset compensation and automatic mobile menu closure.
    Enhances user experience with organic motion design.
*/

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calculate optimal scroll position with header compensation
        const headerOffset = 80;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        // Execute smooth scroll with enhanced easing
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Auto-close mobile menu if currently open
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
          icon.classList.remove('open');
        }
      }
    });
  });
});


/* 
    ═══════════════════════════════════════════════════════════════════════════
    MODULE 7: ENHANCED PAGE ENTRANCE ANIMATIONS
    ═══════════════════════════════════════════════════════════════════════════
    
    Orchestrates sophisticated entrance animations for key interface elements
    after page load completion. Creates engaging first impressions with
    staggered animations and organic timing.
*/

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
  
  // Initialize preloader transition
  if (preloader) {
    preloader.classList.add('hidden');
  }
  
  if (mainContent) {
    mainContent.classList.add('visible');
    
    // Orchestrate staggered entrance animations
    setTimeout(() => {
      const logo = document.querySelector('.logo');
      const navLinks = document.querySelectorAll('.nav-links a');
      const profileElements = document.querySelectorAll('#profile .section__text > *');
      
      // Animate brand logo with smooth entrance
      if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        logo.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
          logo.style.opacity = '1';
          logo.style.transform = 'translateY(0)';
        }, 100);
      }
      
      // Animate navigation links with sequential timing
      navLinks.forEach((link, index) => {
        if (link.closest('.theme-toggle-wrapper')) return; // Skip theme toggle
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        link.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
      });
      
      // Animate profile content with elegant slide-in
      profileElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
        }, 400 + (index * 150));
      });
      
    }, 300);
  }
});


/**
 * ===================================================================
 * VIII. EDUCATION POPUP MODAL
 *
 * Purpose: Show detailed education information in a smooth popup modal
 * when the user clicks on the education container.
 * ===================================================================
 */

// Initialize education popup functionality when the page loads
document.addEventListener("DOMContentLoaded", function() {
  const educationContainer = document.getElementById('education-container');
  const educationModal = document.getElementById('educationModal');
  const closeBtn = document.querySelector('.education-close');
  let isModalOpen = false;
  let isAnimating = false; // Prevent rapid successive animations
  let lastInteractionTime = 0; // Debounce mechanism

  // Add click event to education container with improved mobile support
  if (educationContainer) {
    let touchStartTime = 0;
    let touchMoved = false;
    
    // Touch events for mobile
    educationContainer.addEventListener('touchstart', function(event) {
      touchStartTime = Date.now();
      touchMoved = false;
    });
    
    educationContainer.addEventListener('touchmove', function(event) {
      touchMoved = true;
    });
    
    educationContainer.addEventListener('touchend', function(event) {
      const touchDuration = Date.now() - touchStartTime;
      
      // Only trigger if it's a quick tap (not a long press) and no movement
      if (!touchMoved && touchDuration < 500 && !isModalOpen && !isAnimating) {
        event.preventDefault();
        event.stopPropagation();
        showEducationModal();
      }
    });
    
    // Click event for desktop
    educationContainer.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (!isModalOpen && !isAnimating) {
        showEducationModal();
      }
    });
  }

  // Add multiple event listeners to close button for better reliability
  if (closeBtn) {
    let closeBtnTouchStartTime = 0;
    let closeBtnTouchMoved = false;
    
    // Touch events for mobile with better handling
    closeBtn.addEventListener('touchstart', function(event) {
      closeBtnTouchStartTime = Date.now();
      closeBtnTouchMoved = false;
      event.stopPropagation();
    }, { passive: false });
    
    closeBtn.addEventListener('touchmove', function(event) {
      closeBtnTouchMoved = true;
    }, { passive: true });
    
    closeBtn.addEventListener('touchend', function(event) {
      const touchDuration = Date.now() - closeBtnTouchStartTime;
      
      // Only trigger if it's a quick tap and no movement
      if (!closeBtnTouchMoved && touchDuration < 500 && isModalOpen && !isAnimating) {
        event.preventDefault();
        event.stopPropagation();
        hideEducationModal();
      }
    }, { passive: false });
    
    // Click event for desktop
    closeBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (isModalOpen && !isAnimating) {
        hideEducationModal();
      }
    });

    // Mouse down event as backup
    closeBtn.addEventListener('mousedown', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
  }

  // Close modal when clicking outside the modal content with mobile support
  if (educationModal) {
    let modalTouchStartTime = 0;
    let modalTouchMoved = false;
    
    // Touch events for modal background
    educationModal.addEventListener('touchstart', function(event) {
      if (event.target === educationModal) {
        modalTouchStartTime = Date.now();
        modalTouchMoved = false;
      }
    });
    
    educationModal.addEventListener('touchmove', function(event) {
      modalTouchMoved = true;
    });
    
    educationModal.addEventListener('touchend', function(event) {
      const touchDuration = Date.now() - modalTouchStartTime;
      
      if (event.target === educationModal && !modalTouchMoved && 
          touchDuration < 500 && isModalOpen) {
        hideEducationModal();
      }
    });
    
    // Click event for desktop
    educationModal.addEventListener('click', function(event) {
      if (event.target === educationModal && isModalOpen) {
        hideEducationModal();
      }
    });

    // Prevent modal content clicks from closing modal
    const modalContent = educationModal.querySelector('.education-modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
      });
      
      modalContent.addEventListener('touchend', function(event) {
        event.stopPropagation();
      });
    }
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isModalOpen) {
      hideEducationModal();
    }
  });

  /**
   * Show the education modal with smooth animation from education container
   */
  function showEducationModal() {
    const currentTime = Date.now();
    
    // Debounce mechanism - prevent rapid successive calls
    if (currentTime - lastInteractionTime < 300) return;
    if (!educationModal || !educationContainer || isModalOpen || isAnimating) return;
    
    lastInteractionTime = currentTime;
    isModalOpen = true;
    isAnimating = true;
    
    const modalContent = educationModal.querySelector('.education-modal-content');
    if (!modalContent) return;
    
    // Reset any previous styles and ensure clean state
    modalContent.style.transition = '';
    modalContent.style.filter = 'none';
    
    // Set initial state - start from education container position
    modalContent.style.position = 'fixed';
    modalContent.style.left = '50%';
    modalContent.style.top = '50%';
    modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0.05, 0.05, 1)';
    modalContent.style.transformOrigin = 'center center';
    modalContent.style.opacity = '0';
    modalContent.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Show modal overlay and let CSS handle all background transitions
    educationModal.classList.add('show');
    
    // Prevent body scrolling without layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
    
    // Trigger smooth animation after a brief moment
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)';
        modalContent.style.opacity = '1';
        
        // Mark animation as complete after transition
        setTimeout(() => {
          isAnimating = false;
          
          // Focus the close button for accessibility after animation
          if (closeBtn) {
            closeBtn.focus();
          }
        }, 400); // Match the transition duration
      });
    });
  }

  /**
   * Hide the education modal with optimized blur and bouncy close animation
   */
  function hideEducationModal() {
    const currentTime = Date.now();
    
    // Debounce mechanism - prevent rapid successive calls
    if (currentTime - lastInteractionTime < 300) return;
    if (!educationModal || !educationContainer || !isModalOpen || isAnimating) return;
    
    lastInteractionTime = currentTime;
    isAnimating = true;
    
    const modalContent = educationModal.querySelector('.education-modal-content');
    if (!modalContent) return;
    
    // Immediately set modal as closed to prevent double-trigger
    isModalOpen = false;
    
    // Ultra-smooth single transition approach
    modalContent.style.transition = 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    modalContent.style.filter = 'blur(8px)';
    modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1)';
    modalContent.style.opacity = '0.3';
    
    // Start extremely slow, seamless background blur reduction
    educationModal.style.transition = 'backdrop-filter 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), background-color 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    educationModal.style.backdropFilter = 'blur(0px)';
    educationModal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
    // Modal bounce animation
    setTimeout(() => {
      modalContent.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.2s ease-out';
      modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0, 0, 1)';
      modalContent.style.opacity = '0';
      
      // Final cleanup after smooth background transition completes
      setTimeout(() => {
        educationModal.classList.remove('show');
        
        // Re-enable body scrolling and remove padding compensation
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '';
        
        // Reset modal state for next opening - faster reset for mobile
        setTimeout(() => {
          modalContent.style.transition = '';
          modalContent.style.filter = 'none';
          modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0.05, 0.05, 1)';
          modalContent.style.opacity = '0';
          
          // Reset overlay transition for next opening
          educationModal.style.transition = '';
          educationModal.style.backdropFilter = '';
          educationModal.style.backgroundColor = '';
          
          // Force state reset for mobile compatibility
          isModalOpen = false;
          isAnimating = false; // Mark animation as complete
        }, 50); // Reduced from 100ms for faster mobile response
      }, 1620); // Wait for 1.5-second ultra-smooth transition
    }, 150);
  }
});


/**
 * ===================================================================
 * IX. EXPERIENCE POPUP MODAL
 *
 * Purpose: Show detailed experience information in a smooth popup modal
 * when the user clicks on the experience container.
 * ===================================================================
 */

// ===================================================================
// ! EXPERIENCE MODAL FUNCTIONALITY
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const experienceContainer = document.getElementById('experience-container');
  const experienceModal = document.getElementById('experienceModal');
  const closeBtn = experienceModal?.querySelector('.experience-close');
  
  // Modal state management
  let isModalOpen = false;
  let isAnimating = false;
  let lastInteractionTime = 0;
  
  // Touch state for mobile support
  let modalTouchStartTime = 0;
  let modalTouchMoved = false;
  
  // Check if elements exist before proceeding
  if (!experienceContainer || !experienceModal || !closeBtn) {
    console.warn('Experience modal elements not found');
    return;
  }

  // ===============================================
  // EXPERIENCE CONTAINER INTERACTION HANDLING
  // ===============================================

  // Handle education container click (desktop)
  experienceContainer.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Prevent action if modal is open or animating
    if (isModalOpen || isAnimating) return;
    
    showExperienceModal();
  });

  // Handle touch events for mobile
  experienceContainer.addEventListener('touchstart', function(event) {
    modalTouchStartTime = Date.now();
    modalTouchMoved = false;
  });

  experienceContainer.addEventListener('touchmove', function(event) {
    modalTouchMoved = true;
  });

  experienceContainer.addEventListener('touchend', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const touchDuration = Date.now() - modalTouchStartTime;
    
    // Prevent action if modal is open or animating, or if it was a long touch/drag
    if (isModalOpen || isAnimating || modalTouchMoved || touchDuration > 500) return;
    
    showExperienceModal();
  });

  // ===============================================
  // MODAL CLOSE INTERACTION HANDLING
  // ===============================================

  // Close button click
  closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    hideExperienceModal();
  });

  // Optimized modal overlay interaction handling
  if (experienceModal) {
    // Touch events for mobile modal closing
    experienceModal.addEventListener('touchstart', function(event) {
      modalTouchStartTime = Date.now();
      modalTouchMoved = false;
    });
    
    experienceModal.addEventListener('touchmove', function(event) {
      modalTouchMoved = true;
    });
    
    experienceModal.addEventListener('touchend', function(event) {
      event.preventDefault();
      
      const touchDuration = Date.now() - modalTouchStartTime;
      
      if (event.target === experienceModal && !modalTouchMoved && 
          touchDuration < 500 && isModalOpen) {
        hideExperienceModal();
      }
    });
    
    // Click event for desktop
    experienceModal.addEventListener('click', function(event) {
      if (event.target === experienceModal && isModalOpen) {
        hideExperienceModal();
      }
    });

    // Prevent modal content clicks from closing modal
    const modalContent = experienceModal.querySelector('.experience-modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
      });
      
      modalContent.addEventListener('touchend', function(event) {
        event.stopPropagation();
      });
    }
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isModalOpen) {
      hideExperienceModal();
    }
  });

  /**
   * Show the experience modal with smooth animation from experience container
   */
  function showExperienceModal() {
    const currentTime = Date.now();
    
    // Debounce mechanism - prevent rapid successive calls
    if (currentTime - lastInteractionTime < 300) return;
    if (!experienceModal || !experienceContainer || isModalOpen || isAnimating) return;
    
    lastInteractionTime = currentTime;
    isModalOpen = true;
    isAnimating = true;
    
    const modalContent = experienceModal.querySelector('.experience-modal-content');
    if (!modalContent) return;
    
    // Reset any previous styles and ensure clean state
    modalContent.style.transition = '';
    modalContent.style.filter = 'none';
    
    // Set initial state - start from experience container position
    modalContent.style.position = 'fixed';
    modalContent.style.left = '50%';
    modalContent.style.top = '50%';
    modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0.05, 0.05, 1)';
    modalContent.style.transformOrigin = 'center center';
    modalContent.style.opacity = '0';
    modalContent.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Show modal overlay and let CSS handle all background transitions
    experienceModal.classList.add('show');
    
    // Prevent body scrolling without layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
    
    // Trigger smooth animation after a brief moment
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)';
        modalContent.style.opacity = '1';
        
        // Mark animation as complete after transition
        setTimeout(() => {
          isAnimating = false;
          
          // Focus the close button for accessibility after animation
          if (closeBtn) {
            closeBtn.focus();
          }
        }, 400); // Match the transition duration
      });
    });
  }

  /**
   * Hide the experience modal with optimized blur and bouncy close animation
   */
  function hideExperienceModal() {
    const currentTime = Date.now();
    
    // Debounce mechanism - prevent rapid successive calls
    if (currentTime - lastInteractionTime < 300) return;
    if (!experienceModal || !experienceContainer || !isModalOpen || isAnimating) return;
    
    lastInteractionTime = currentTime;
    isAnimating = true;
    
    const modalContent = experienceModal.querySelector('.experience-modal-content');
    if (!modalContent) return;
    
    // Immediately set modal as closed to prevent double-trigger
    isModalOpen = false;
    
    // Ultra-smooth single transition approach
    modalContent.style.transition = 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    modalContent.style.filter = 'blur(8px)';
    modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1)';
    modalContent.style.opacity = '0.3';
    
    // Start extremely slow, seamless background blur reduction
    experienceModal.style.transition = 'backdrop-filter 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), background-color 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    experienceModal.style.backdropFilter = 'blur(0px)';
    experienceModal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
    // Modal bounce animation
    setTimeout(() => {
      modalContent.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.2s ease-out';
      modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0, 0, 1)';
      modalContent.style.opacity = '0';
      
      // Final cleanup after smooth background transition completes
      setTimeout(() => {
        experienceModal.classList.remove('show');
        
        // Re-enable body scrolling and remove padding compensation
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '';
        
        // Reset modal state for next opening - faster reset for mobile
        setTimeout(() => {
          modalContent.style.transition = '';
          modalContent.style.filter = 'none';
          modalContent.style.transform = 'translate3d(-50%, -50%, 0) scale3d(0.05, 0.05, 1)';
          modalContent.style.opacity = '0';
          
          // Reset overlay transition for next opening
          experienceModal.style.transition = '';
          experienceModal.style.backdropFilter = '';
          experienceModal.style.backgroundColor = '';
          
          // Force state reset for mobile compatibility
          isModalOpen = false;
          isAnimating = false; // Mark animation as complete
        }, 50); // Reduced from 100ms for faster mobile response
      }, 1620); // Wait for 1.5-second ultra-smooth transition
    }, 150);
  }
});
