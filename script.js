// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio initialization started...');
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    try {
        createParticles();
        setupSidebar();
        setupNavigation();
        setupProfileImage();
        console.log('✅ Portfolio initialized successfully!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

// Animated background particles
function createParticles() {
    try {
        const bg = document.getElementById('bgAnimation');
        if (!bg) {
            console.warn('⚠️ Background animation element not found');
            return;
        }
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (20 + Math.random() * 10) + 's';
            bg.appendChild(particle);
        }
        console.log('✨ Particles created successfully');
    } catch (error) {
        console.error('❌ Error creating particles:', error);
    }
}

// Setup sidebar functionality
function setupSidebar() {
    try {
        const contactToggle = document.getElementById('contactToggle');
        const contactInfo = document.getElementById('contactInfo');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarClose = document.getElementById('sidebarClose');
        
        // Contact toggle
        if (contactToggle && contactInfo) {
            contactToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                contactInfo.classList.toggle('show');
            });
        }
        
        // Mobile menu toggle
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
        }
        
        // Sidebar close button
        if (sidebarClose && sidebar) {
            sidebarClose.addEventListener('click', function() {
                sidebar.classList.remove('active');
            });
        }
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                if (sidebar && 
                    sidebar.classList.contains('active') && 
                    !sidebar.contains(event.target) && 
                    !mobileMenuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
        
        console.log('📱 Sidebar setup complete');
    } catch (error) {
        console.error('❌ Error setting up sidebar:', error);
    }
}

// Setup navigation
function setupNavigation() {
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        
        // Handle navigation on same page
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only prevent default for same-page navigation (hash links)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const pageId = href.substring(1);
                    switchPage(pageId);
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close mobile sidebar if open
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar && window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                    }
                }
                // For skills.html link, let it navigate normally
            });
        });
        
        // Check URL hash on load and switch to that page
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchPage(hash);
            
            // Update active nav link
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${hash}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        console.log('🧭 Navigation setup complete');
    } catch (error) {
        console.error('❌ Error setting up navigation:', error);
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
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#${pageId}`);
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Profile image error handler
function setupProfileImage() {
    try {
        const profileImg = document.getElementById('profileImg');
        if (profileImg) {
            profileImg.onerror = function() {
                console.log('⚠️ Profile image failed to load, using fallback');
                this.style.display = 'none';
                
                const fallback = document.createElement('div');
                fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, var(--accent-primary), #8b5cf6);
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
    } catch (error) {
        console.error('❌ Error setting up profile image:', error);
    }
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        switchPage(hash);
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${hash}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});

// Add page load logging
window.addEventListener('load', function() {
    console.log('📊 Page fully loaded');
    
    // Animate skill bars on skills page if present
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        // Small delay to ensure CSS is loaded
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
    
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Page load time: ${pageLoadTime}ms`);
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('🔴 Global error caught:', e.error);
});

// Smooth scroll for any remaining anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.classList.contains('nav-link')) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
});
