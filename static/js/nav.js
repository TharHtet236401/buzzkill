// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    // Mobile menu
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = mobileMenuButton?.querySelector('.block');
    const menuCloseIcon = mobileMenuButton?.querySelector('.hidden');

    console.log('Mobile Menu Button:', mobileMenuButton);
    console.log('Mobile Menu:', mobileMenu);

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            console.log('Mobile menu clicked');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle mobile menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons
            menuOpenIcon.classList.toggle('block');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('block');
            menuCloseIcon.classList.toggle('hidden');
        });
    }

    // Profile dropdown
    const userMenuButton = document.querySelector('#user-menu-button');
    console.log('User menu button found:', userMenuButton);
    
    if (!userMenuButton) {
        console.error('Could not find user menu button with ID "user-menu-button"');
        return;
    }

    // Find the dropdown menu
    const userMenu = document.querySelector('[aria-labelledby="user-menu-button"]');
    console.log('User menu found:', userMenu);
    
    if (!userMenu) {
        console.error('Could not find dropdown menu');
        // Log all elements with role="menu" for debugging
        console.log('All menu elements:', document.querySelectorAll('[role="menu"]'));
        return;
    }

    let isTransitioning = false;

    function showMenu() {
        console.log('Showing menu');
        userMenu.classList.remove('hidden');
        // Trigger a reflow to ensure the transition works
        userMenu.offsetHeight;
        requestAnimationFrame(() => {
            userMenu.classList.remove('opacity-0', 'scale-95');
            userMenu.classList.add('opacity-100', 'scale-100');
        });
    }

    function hideMenu() {
        console.log('Hiding menu');
        userMenu.classList.add('opacity-0', 'scale-95');
        userMenu.classList.remove('opacity-100', 'scale-100');
        // Wait for transition to finish before hiding
        setTimeout(() => {
            userMenu.classList.add('hidden');
        }, 100);
    }

    userMenuButton.addEventListener('click', function(e) {
        console.log('Profile button clicked');
        e.stopPropagation();
        const isExpanded = userMenuButton.getAttribute('aria-expanded') === 'true';
        
        if (isTransitioning) return;
        isTransitioning = true;
        
        userMenuButton.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            showMenu();
        } else {
            hideMenu();
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 100);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenuButton.setAttribute('aria-expanded', 'false');
            hideMenu();
        }
    });

    // Navigation active state management
    document.body.addEventListener('htmx:beforeRequest', function(event) {
        const clickedLink = event.detail.elt;
        if (clickedLink.classList.contains('nav-link')) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('bg-gray-900', 'text-white');
                link.classList.add('text-gray-300');
            });

            // Add active class to clicked link
            clickedLink.classList.remove('text-gray-300');
            clickedLink.classList.add('bg-gray-900', 'text-white');

            // Store active section in localStorage
            const section = clickedLink.getAttribute('data-nav-section');
            if (section) {
                localStorage.setItem('activeNavSection', section);
            }
        }
    });

    // Set initial active state from localStorage
    const activeSection = localStorage.getItem('activeNavSection');
    if (activeSection) {
        const activeLink = document.querySelector(`[data-nav-section="${activeSection}"]`);
        if (activeLink) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('bg-gray-900', 'text-white');
                link.classList.add('text-gray-300');
            });
            activeLink.classList.remove('text-gray-300');
            activeLink.classList.add('bg-gray-900', 'text-white');
        }
    }
}); 