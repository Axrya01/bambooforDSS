document.addEventListener('DOMContentLoaded', function() {
    // Get all sections and navigation links
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scrolling for navigation links
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

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        const homeSection = document.getElementById('home');
        const navbarOffset = 130;
        if (scrollPos < (homeSection.offsetTop + homeSection.offsetHeight - navbarOffset)) {
            current = 'home';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarOffset;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Get all video modals
    const videoModals = document.querySelectorAll('.modal');
    
    // For each modal
    videoModals.forEach(modal => {
        // When modal is shown
        modal.addEventListener('show.bs.modal', function() {
            // Get the iframe
            const iframe = this.querySelector('iframe');
            // Get the video URL from data-src
            const videoUrl = iframe.getAttribute('data-src');
            // Set the iframe src to the video URL
            iframe.setAttribute('src', videoUrl);
        });
        
        // When modal is hidden
        modal.addEventListener('hidden.bs.modal', function() {
            // Get the iframe
            const iframe = this.querySelector('iframe');
            // Set the iframe src back to blank
            iframe.setAttribute('src', 'about:blank');
        });
    });
});

// Function to update section indicator
function updateSectionIndicator(currentSection) {
    const indicator = document.querySelector('.section-indicator');
    const sections = document.querySelectorAll('.section');
    const totalSections = sections.length;
    const progress = Array.from(sections).findIndex(section => section.id === currentSection) / (totalSections - 1);
    
    indicator.style.transform = `scaleX(${progress})`;
}
