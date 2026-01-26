// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

function initPortfolio() {
    createParticles();
    setupSidebar();
    setupNavigation();
    setupProfileImage();
}

// Create animated particles
function createParticles() {
    const bg = document.getElementById('bgAnimation');
    if (!bg) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        bg.appendChild(particle);
    }
}

// Setup sidebar functionality
function setupSidebar() {
    const contactBtn = document.getElementById('contactBtn');
    const contactList = document.getElementById('contactList');
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    
    // Contact toggle
    if (contactBtn && contactList) {
        contactBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            contactList.classList.toggle('show');
        });
    }
    
    // Mobile menu
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // Close on outside click (mobile only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar) {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle same-page navigation (hash links)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const pageId = href.substring(1);
                switchPage(pageId);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile sidebar
                const sidebar = document.getElementById('sidebar');
                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Handle initial hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchPage(hash);
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Switch between pages
function switchPage(pageId) {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    // Update URL
    history.pushState(null, null, `#${pageId}`);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Profile image fallback
function setupProfileImage() {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.onerror = function() {
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-weight: 800;
                color: white;
                border-radius: 16px;
            `;
            fallback.textContent = 'C';
            this.parentElement.appendChild(fallback);
            this.remove();
        };
    }
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        switchPage(hash);
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});

// Animate skill bars on load
window.addEventListener('load', function() {
    const skillBars = document.querySelectorAll('.skill-fill');
    if (skillBars.length > 0) {
        setTimeout(() => {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }, 200);
    }
});
