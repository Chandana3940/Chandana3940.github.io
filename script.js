document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

function initPortfolio() {
    createParticles();
    setupSidebar();
    setupNavigation();
    setupProfileImage();
}

function createParticles() {
    var bg = document.getElementById('bgAnimation');
    if (!bg) return;
    
    for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        bg.appendChild(particle);
    }
}

function setupSidebar() {
    var mobileToggle = document.getElementById('mobileToggle');
    var sidebar = document.getElementById('sidebar');
    var sidebarClose = document.getElementById('sidebarClose');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar) {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                mobileToggle && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

function setupNavigation() {
    var navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                var pageId = href.substring(1);
                switchPage(pageId);
                
                navLinks.forEach(function(l) { l.classList.remove('active'); });
                this.classList.add('active');
                
                var sidebar = document.getElementById('sidebar');
                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    var hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchPage(hash);
        navLinks.forEach(function(link) {
            if (link.getAttribute('href') === '#' + hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

function switchPage(pageId) {
    var pages = document.querySelectorAll('.page');
    
    pages.forEach(function(page) {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    history.pushState(null, null, '#' + pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupProfileImage() {
    var profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.onerror = function() {
            var fallback = document.createElement('div');
            fallback.style.cssText = 'width: 100%; height: 100%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 800; color: white; border-radius: 50%;';
            fallback.textContent = 'C';
            this.parentElement.appendChild(fallback);
            this.remove();
        };
    }
}

window.addEventListener('popstate', function() {
    var hash = window.location.hash.substring(1);
    if (hash) {
        switchPage(hash);
        var navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            if (link.getAttribute('href') === '#' + hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
