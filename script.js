// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio initialization started...');
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    try {
        createParticles();
        createSkillWeb();
        setupNavigation();
        setupScrollEffects();
        setupScrollToTop();
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
        
        const particleCount = 50;
        
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

// Create Skill Web
function createSkillWeb() {
    try {
        const skills = [
            { name: 'GenAI & LLMs', value: 95, angle: 0 },
            { name: 'ML & Deep Learning', value: 90, angle: 60 },
            { name: 'Cloud & MLOps', value: 88, angle: 120 },
            { name: 'Data Engineering', value: 85, angle: 180 },
            { name: 'Analytics', value: 87, angle: 240 },
            { name: 'Programming', value: 93, angle: 300 }
        ];

        const center = 300;
        const maxRadius = 240;
        const webLines = document.getElementById('webLines');
        const skillPoints = document.getElementById('skillPoints');
        const skillLabels = document.getElementById('skillLabels');
        const skillArea = document.getElementById('skillArea');

        // Check if all required elements exist
        if (!webLines || !skillPoints || !skillLabels || !skillArea) {
            console.error('❌ Required skill web elements not found');
            console.log('Missing elements:', {
                webLines: !!webLines,
                skillPoints: !!skillPoints,
                skillLabels: !!skillLabels,
                skillArea: !!skillArea
            });
            return;
        }

        let polygonPoints = '';

        // Draw web lines and create skill points
        skills.forEach((skill, index) => {
            const angleRad = (skill.angle - 90) * (Math.PI / 180);
            
            // Calculate end point for web line
            const lineX = center + maxRadius * Math.cos(angleRad);
            const lineY = center + maxRadius * Math.sin(angleRad);
            
            // Create web line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', center);
            line.setAttribute('y1', center);
            line.setAttribute('x2', lineX);
            line.setAttribute('y2', lineY);
            line.setAttribute('class', 'web-line');
            webLines.appendChild(line);
            
            // Calculate skill point position
            const skillRadius = (skill.value / 100) * maxRadius;
            const pointX = center + skillRadius * Math.cos(angleRad);
            const pointY = center + skillRadius * Math.sin(angleRad);
            
            // Add to polygon points
            polygonPoints += `${pointX},${pointY} `;
            
            // Create skill point
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pointX);
            circle.setAttribute('cy', pointY);
            circle.setAttribute('r', 6);
            circle.setAttribute('class', 'skill-point');
            skillPoints.appendChild(circle);
            
            // Create skill label
            const labelRadius = maxRadius + 60;
            const labelX = center + labelRadius * Math.cos(angleRad);
            const labelY = center + labelRadius * Math.sin(angleRad);
            
            const label = document.createElement('div');
            label.className = 'skill-label';
            label.innerHTML = `${skill.name}<span class="skill-label-value">${skill.value}%</span>`;
            label.style.left = `${labelX}px`;
            label.style.top = `${labelY}px`;
            label.style.transform = 'translate(-50%, -50%)';
            skillLabels.appendChild(label);
            
            // Add interactive hover effects
            circle.addEventListener('mouseenter', () => {
                label.classList.add('active');
                circle.style.r = '8';
            });
            
            circle.addEventListener('mouseleave', () => {
                label.classList.remove('active');
                circle.style.r = '6';
            });
            
            label.addEventListener('mouseenter', () => {
                circle.setAttribute('r', 8);
            });
            
            label.addEventListener('mouseleave', () => {
                circle.setAttribute('r', 6);
            });
        });

        // Set polygon points for skill area
        skillArea.setAttribute('points', polygonPoints.trim());
        console.log('🕸️ Skill web created successfully');
    } catch (error) {
        console.error('❌ Error creating skill web:', error);
    }
}

// Setup navigation
function setupNavigation() {
    try {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        // Calculate offset for fixed nav
                        const navHeight = document.querySelector('nav').offsetHeight;
                        const targetPosition = target.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navLinks = document.getElementById('navLinks');
                        if (navLinks) {
                            navLinks.classList.remove('active');
                        }
                    }
                }
            });
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                
                // Animate hamburger
                this.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = navLinks.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
        
        console.log('🧭 Navigation setup complete');
    } catch (error) {
        console.error('❌ Error setting up navigation:', error);
    }
}

// Setup scroll effects
function setupScrollEffects() {
    try {
        const sections = document.querySelectorAll('section');
        
        if (sections.length === 0) {
            console.warn('⚠️ No sections found for scroll animation');
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Add active nav link highlighting
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        const navObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5
        });
        
        sections.forEach(section => {
            if (section.id) {
                navObserver.observe(section);
            }
        });
        
        console.log('👁️ Scroll effects setup complete');
    } catch (error) {
        console.error('❌ Error setting up scroll effects:', error);
    }
}

// Setup scroll to top button
function setupScrollToTop() {
    try {
        const scrollTopBtn = document.getElementById('scrollTop');
        
        if (!scrollTopBtn) {
            console.warn('⚠️ Scroll to top button not found');
            return;
        }
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('⬆️ Scroll to top setup complete');
    } catch (error) {
        console.error('❌ Error setting up scroll to top:', error);
    }
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
                    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 4rem;
                    font-weight: 800;
                    color: white;
                    border-radius: inherit;
                `;
                fallback.textContent = 'C';
                
                // Remove the error handler and image element
                this.parentElement.appendChild(fallback);
                this.remove();
            };
        }
    } catch (error) {
        console.error('❌ Error setting up profile image:', error);
    }
}

// Add performance monitoring
window.addEventListener('load', function() {
    console.log('📊 Page fully loaded');
    
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Page load time: ${pageLoadTime}ms`);
    }
});

// Add error tracking
window.addEventListener('error', function(e) {
    console.error('🔴 Global error caught:', e.error);
});

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👋 Page hidden');
    } else {
        console.log('👀 Page visible');
    }
});
