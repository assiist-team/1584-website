// Shared Navigation JavaScript
// This file contains all navigation-related functionality to avoid code duplication

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (!navMenu.contains(event.target) && !toggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links (accounting for fixed navigation)
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Handle cross-page anchor links (e.g., "index.html#reviews")
        if (href && href.includes('#') && !href.startsWith('#')) {
            e.preventDefault();

            // Extract the page and anchor parts
            const [pagePath, anchorPart] = href.split('#');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            // If the target page is different from current page, navigate there first
            if (pagePath && pagePath !== currentPage && pagePath !== window.location.pathname) {
                // Navigate to the target page with the anchor
                window.location.href = href;
                return;
            }

            // If we're already on the target page, just scroll to the anchor
            const target = document.querySelector(`#${anchorPart}`);
            if (target) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // Handle same-page anchor links (existing functionality)
        else if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Parallax scrolling for hero background - Enhanced for all screen sizes
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return; // Exit if hero doesn't exist on this page

    let ticking = false;

    function getParallaxSettings() {
        const width = window.innerWidth;

        // Progressive parallax settings based on screen size
        if (width <= 320) {
            // Very small mobile - maximum parallax for visibility
            return {
                multiplier: 3.0,
                baseHorizontal: 15,
                baseVertical: 25,
                scrollDivider: 40 // Less sensitive movement
            };
        } else if (width <= 480) {
            // Small mobile - strong parallax
            return {
                multiplier: 2.5,
                baseHorizontal: 15,
                baseVertical: 22,
                scrollDivider: 44
            };
        } else if (width <= 768) {
            // Mobile/tablet - moderate parallax
            return {
                multiplier: 2.0,
                baseHorizontal: 15,
                baseVertical: 20,
                scrollDivider: 50
            };
        } else if (width <= 1024) {
            // Tablet - reduced parallax
            return {
                multiplier: 1.25,
                baseHorizontal: 18,
                baseVertical: 25,
                scrollDivider: 60
            };
        } else if (width <= 1440) {
            // Desktop - standard parallax
            return {
                multiplier: 1.0,
                baseHorizontal: 20,
                baseVertical: 29,
                scrollDivider: 70
            };
        } else {
            // Large desktop - subtle parallax
            return {
                multiplier: 0.75,
                baseHorizontal: 20,
                baseVertical: 29,
                scrollDivider: 80
            };
        }
    }

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const settings = getParallaxSettings();

        // Calculate parallax movement with progressive sensitivity
        const parallaxMove = scrolled / settings.scrollDivider;

        // Apply enhanced parallax calculation
        const verticalPosition = settings.baseVertical + (parallaxMove * settings.multiplier);

        // Ensure position stays within reasonable bounds (0-100%)
        const clampedVertical = Math.max(0, Math.min(100, verticalPosition));

        // Apply fixed horizontal and dynamic vertical position
        hero.style.backgroundPosition = `${settings.baseHorizontal}% ${clampedVertical}%`;

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Add scroll event listener with passive option for better mobile performance
    window.addEventListener('scroll', requestTick, { passive: true });

    // Reset to initial position on window resize with proper settings
    window.addEventListener('resize', requestTick);

    // Initialize with correct starting position
    requestTick();
}

// Navigation highlighting based on scroll position
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navLinks.length === 0) return; // Exit if no navigation menu exists

    function updateActiveNavigation() {
        const navHeight = document.querySelector('.navigation').offsetHeight;
        const scrollPosition = window.pageYOffset + navHeight; // Offset for navigation height
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // For pages other than index.html (which has scrollable sections),
        // don't override the active state set by generateNavigation()
        if (currentPage !== 'index.html') {
            return;
        }

        // Remove active class from all nav links first
        navLinks.forEach(link => link.classList.remove('active'));

        // Check if we're at the top
        if (scrollPosition < navHeight + 100) {
            // Find the first navigation link that should be active at the top
            const firstNavLink = navLinks[0];
            if (firstNavLink && !firstNavLink.href.includes('#')) {
                // If it's a page link (not an anchor), make it active
                firstNavLink.classList.add('active');
            }
            return;
        }

        // Check each navigation link to see if it points to a section on this page
        for (let link of navLinks) {
            const href = link.getAttribute('href');

            // If it's an anchor link to a section on this page
            if (href && href.startsWith('#') && href.length > 1) {
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);

                if (section) {
                    const sectionTop = section.offsetTop - navHeight - 100; // Offset to trigger highlighting earlier
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        link.classList.add('active');
                        return;
                    }
                }
            }
        }

        // If no section matches, keep the current active state or default to first link
        if (!document.querySelector('.nav-menu a.active')) {
            const firstNavLink = navLinks[0];
            if (firstNavLink) firstNavLink.classList.add('active');
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function requestNavUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavigation);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }

    // Add scroll event listener for navigation highlighting
    window.addEventListener('scroll', requestNavUpdate);

    // Initialize navigation highlighting on page load
    updateActiveNavigation();
}

// Generate dynamic navigation based on current page
function generateNavigation() {
    const pathName = window.location.pathname;
    const currentPage = pathName.endsWith('/') ? 'index.html' :
                      (pathName.split('/').pop() || 'index.html');
    const navMenu = document.querySelector('.nav-menu');

    if (!navMenu) return;

    // Define navigation structure for each page
    const navStructures = {
        'index.html': [
            { text: 'PORTFOLIO', href: 'portfolio.html' },
            { text: 'REVIEWS', href: '#reviews' },
            { text: 'PROCESS', href: '#process' },
            { text: 'ABOUT', href: 'about.html' },
            { text: 'CONTACT', href: '#contact' }
        ],
        'about.html': [
            { text: 'PORTFOLIO', href: 'portfolio.html' },
            { text: 'REVIEWS', href: 'index.html#reviews' },
            { text: 'PROCESS', href: 'index.html#process' },
            { text: 'ABOUT', href: 'about.html', current: true },
            { text: 'CONTACT', href: 'index.html#contact' }
        ],
        'portfolio.html': [
            { text: 'PORTFOLIO', href: 'portfolio.html', current: true },
            { text: 'REVIEWS', href: 'index.html#reviews' },
            { text: 'PROCESS', href: 'index.html#process' },
            { text: 'ABOUT', href: 'about.html' },
            { text: 'CONTACT', href: 'index.html#contact' }
        ]
    };

    // Get navigation structure for current page
    const navItems = navStructures[currentPage] || navStructures['index.html'];

    // Clear existing navigation
    navMenu.innerHTML = '';

    // Generate new navigation items
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.textContent = item.text;
        a.href = item.href;

        if (item.current) {
            a.classList.add('active');
        }

        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

// Initialize navigation features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateNavigation();
    initParallax();
    initActiveNavigation();

    // Handle anchor scrolling for direct navigation to index.html#section
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        const target = document.querySelector(hash);
        if (target) {
            // Small delay to ensure page is fully loaded and navigation height is calculated correctly
            setTimeout(() => {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// CTA Button functionality (for pages that have it)
function initCTAButton() {
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Simulate toolkit signup action
            console.log('Sourcebook signup initiated:', {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Here you would typically open a signup modal or redirect to signup page
            alert('Signup form would open here. In a real implementation, this would open a modal or redirect to a signup page.');
        });
    }
}

// Initialize CTA button if it exists
document.addEventListener('DOMContentLoaded', initCTAButton);

// Survey Popup Functions
function openSurveyPopup() {
    const popup = document.getElementById('surveyPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Focus management for accessibility
        const popupContainer = popup.querySelector('.popup-container');
        if (popupContainer) {
            popupContainer.focus();
        }

        // Store reference to the button that opened the popup for focus return
        const activeElement = document.activeElement;
        popup.setAttribute('data-focus-return', activeElement ? activeElement.id || 'survey-trigger' : 'survey-trigger');

        // Track popup open event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'popup_opened', {
                'event_category': 'engagement',
                'event_label': 'consultation_popup'
            });
        }
    }
}

function closeSurveyPopup() {
    const popup = document.getElementById('surveyPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling

        // Return focus to the button that opened the popup
        const focusReturnId = popup.getAttribute('data-focus-return') || 'survey-trigger';
        const triggerButton = document.querySelector(`#${focusReturnId}`) ||
                             document.querySelector('[data-popup-trigger="survey"]') ||
                             document.querySelector('a[href="#contact"]');

        if (triggerButton) {
            triggerButton.focus();
        }

        // Clean up the focus return attribute
        popup.removeAttribute('data-focus-return');
    }
}

// Close popup when clicking on overlay
document.addEventListener('click', function(event) {
    const popup = document.getElementById('surveyPopup');
    if (popup && popup.classList.contains('active')) {
        const popupContainer = popup.querySelector('.popup-container');
        const isClickInsidePopup = popupContainer && popupContainer.contains(event.target);

        if (!isClickInsidePopup && event.target === popup) {
            closeSurveyPopup();
        }
    }
});

// Close popup on Escape key and handle tab navigation
document.addEventListener('keydown', function(event) {
    const popup = document.getElementById('surveyPopup');

    if (popup && popup.classList.contains('active')) {
        if (event.key === 'Escape') {
            closeSurveyPopup();
        } else if (event.key === 'Tab') {
            // Handle tab navigation within the popup
            const focusableElements = popup.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), iframe'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
});

// Initialize popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find all buttons that should trigger the survey popup
    const triggerButtons = document.querySelectorAll('[data-popup-trigger="survey"], a[href="#contact"]');

    triggerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openSurveyPopup();
        });

        // Add data attribute to track which buttons trigger the popup
        if (!button.hasAttribute('data-popup-trigger')) {
            button.setAttribute('data-popup-trigger', 'survey');
        }
    });
});
