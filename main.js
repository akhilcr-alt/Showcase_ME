/**
 * Main JavaScript for the portfolio site.
 * Handles interactive elements like mobile navigation, modals, and project showcases.
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });
    
    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('copyright-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Hide header on scroll down, show on scroll up ---
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.top = `-${header.offsetHeight}px`;
        } else {
            header.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // --- Journey Timeline Expandable Projects ---
    const journeySection = document.getElementById('journey');
    if (journeySection) {
        journeySection.addEventListener('click', function(e) {
            const expandButton = e.target.closest('.expand-button');
            if (!expandButton) return;

            const icon = expandButton.querySelector('.expand-icon');
            const content = expandButton.parentElement.nextElementSibling;

            icon.classList.toggle('rotated');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    // --- Project Showcase Tab Logic ---
    const showcase = document.getElementById('project-showcase');
    if (showcase) {
        const tabs = showcase.querySelectorAll('.project-tab');
        const panels = showcase.querySelectorAll('.project-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.add('hidden'));

                // Activate clicked tab
                tab.classList.add('active');
                
                // Activate corresponding panel
                const tabTarget = tab.dataset.tab;
                const targetPanel = showcase.querySelector(`.project-panel[data-content="${tabTarget}"]`);
                if(targetPanel) {
                    targetPanel.classList.remove('hidden');
                }
            });
        });
    }


    // --- Modal Logic (for future blog posts and "About Me") ---
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const readMoreAbout = document.getElementById('read-more-about');

    function openModal() {
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    if (modal && modalClose) {
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // TODO: Implement markdown loading for "About Me"
    if (readMoreAbout) {
        readMoreAbout.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder content for now
            const modalBody = document.getElementById('modal-body');
            modalBody.innerHTML = `<h1>About My Journey</h1><p>This is where the detailed story from your 'about.md' file will be loaded. It will cover your background, challenges, and unique perspective as an immigrant building a career across continents.</p>`;
            openModal();
        });
    }

    // TODO: Implement dynamic loading for "Insights" section
    // This will fetch and parse markdown files from a /posts/ directory.
});
