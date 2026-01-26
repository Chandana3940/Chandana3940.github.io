// Animated background particles
function createParticles() {
    const bg = document.getElementById('bgAnimation');
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
}

// Create Skill Web
function createSkillWeb() {
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
        
        // Add hover effect to sync label and point
        circle.addEventListener('mouseenter', () => {
            label.style.color = 'var(--accent-primary)';
            label.style.borderColor = 'var(--accent-primary)';
            label.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        circle.addEventListener('mouseleave', () => {
            label.style.color = 'var(--text-primary)';
            label.style.borderColor = 'var(--border-color)';
            label.style.transform = 'translate(-50%, -50%)';
        });
        
        label.addEventListener('mouseenter', () => {
            circle.setAttribute('r', 8);
            circle.style.fill = 'var(--accent-secondary)';
        });
        
        label.addEventListener('mouseleave', () => {
            circle.setAttribute('r', 6);
            circle.style.fill = 'var(--accent-primary)';
        });
    });

    // Set polygon points for skill area
    skillArea.setAttribute('points', polygonPoints.trim());
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// Scroll animations
const sections = document.querySelectorAll('section');
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

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize on load
window.addEventListener('load', function() {
    createParticles();
    createSkillWeb();
});

// Profile image placeholder handler
const profileImg = document.getElementById('profileImg');
profileImg.onerror = function() {
    this.style.display = 'none';
    this.parentElement.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: 800; color: white;">C</div>';
};
