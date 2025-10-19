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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
    });
});

// Parallax scrolling for hero background
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return; // Exit if hero doesn't exist on this page

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Apply parallax on both desktop and mobile for better visual experience
        // Vertical-only parallax. Keep horizontal fixed at 20% to avoid horizontal shifts.
        // Each 100px scrolled moves the background vertical position by 4% on mobile for more noticeable effect
        const parallaxMove = scrolled / 25; // Increased base movement

        // Adjust parallax intensity for mobile (more intense for better visibility)
        const isMobile = window.innerWidth <= 768;
        const parallaxMultiplier = isMobile ? 4.0 : 2; // Increased mobile multiplier significantly

        // Use different base positions for mobile vs desktop
        const baseHorizontal = isMobile ? 15 : 20;
        const baseVertical = isMobile ? 20 : 29; // Lower base position to allow more upward movement

        const verticalPosition = baseVertical + (parallaxMove * parallaxMultiplier);

        // Apply fixed horizontal and dynamic vertical position
        hero.style.backgroundPosition = `${baseHorizontal}% ${verticalPosition}%`;

        ticking = false;
    }

    // Throttle parallax updates for better mobile performance
    let lastScrollTime = 0;
    const throttleDelay = 16; // ~60fps

    function requestTick() {
        if (!ticking) {
            const now = Date.now();
            if (now - lastScrollTime >= throttleDelay) {
                requestAnimationFrame(updateParallax);
                lastScrollTime = now;
                ticking = true;
            }
        }
    }

    // Add scroll event listener with passive option for better mobile performance
    window.addEventListener('scroll', requestTick, { passive: true });

    // Reset to initial position on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            hero.style.backgroundPosition = '15% 20%'; // Updated to match new mobile base position
        } else {
            hero.style.backgroundPosition = '20% 29%';
        }
    });
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
