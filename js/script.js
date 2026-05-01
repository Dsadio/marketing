// =======================================
// DIGISEN AGENCY - JAVASCRIPT
// Fonctionnalités interactives du site
// =======================================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION STICKY ==========
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    // ========== FORMULAIRE DE CONTACT ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêcher l'envoi réel du formulaire
            
            // Récupérer les valeurs
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const telephone = document.getElementById('telephone').value;
            const service = document.getElementById('service').value;
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (nom && email && sujet && message) {
                
                // Afficher le message de confirmation
                const confirmationMessage = document.getElementById('confirmationMessage');
                confirmationMessage.classList.remove('d-none');
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Faire défiler vers le message de confirmation
                confirmationMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Masquer le message après 5 secondes
                setTimeout(function() {
                    confirmationMessage.classList.add('d-none');
                }, 5000);
                
                // Console log (pour debug)
                console.log('Formulaire soumis:', {
                    nom, email, telephone, service, sujet, message
                });
                
                // ICI : Tu pourrais envoyer les données à un serveur
                // fetch('/api/contact', {
                //     method: 'POST',
                //     body: JSON.stringify({nom, email, message}),
                //     headers: {'Content-Type': 'application/json'}
                // });
                
            } else {
                alert('Veuillez remplir tous les champs obligatoires');
            }
        });
    }

    // ========== FILTRES BLOG PAR CATÉGORIE ==========
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie
            const category = this.getAttribute('data-category');
            
            // Filtrer les articles
            const articles = document.querySelectorAll('[data-category]');
            
            articles.forEach(article => {
                if (category === 'tous' || article.getAttribute('data-category') === category) {
                    article.style.display = 'block';
                    // Animation d'apparition
                    article.style.opacity = '0';
                    setTimeout(() => {
                        article.style.opacity = '1';
                        article.style.transition = 'opacity 0.5s ease';
                    }, 100);
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // ========== ANIMATION AU SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // ========== COMPTEUR ANIMÉ (Statistiques) ==========
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    // Démarrer l'animation des compteurs quand ils sont visibles
    const statItems = document.querySelectorAll('.stat-item h2');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    // ========== SMOOTH SCROLL POUR LES ANCRES ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ========== BOUTON RETOUR EN HAUT ==========
    // Créer le bouton
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(scrollTopBtn);
    
    // Styles du bouton (inline pour simplifier)
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #0d6efd;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
    `;
    
    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Action au clic
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Effet hover
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.backgroundColor = '#0a58ca';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.backgroundColor = '#0d6efd';
    });

    // ========== LOADER DE PAGE ==========
    window.addEventListener('load', function() {
        // Masquer le loader si présent
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 300);
        }
    });

    // ========== VALIDATION AVANCÉE DES FORMULAIRES ==========
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // ========== COPIER EMAIL AU CLIC ==========
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            // Copier dans le presse-papier
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visuel
                const originalText = this.textContent;
                this.textContent = '✓ Copié !';
                this.style.color = '#198754';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    });

    // ========== DARK MODE TOGGLE (Bonus) ==========
    // Décommenter si tu veux ajouter un mode sombre
    /*
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Sauvegarder la préférence
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });
        
        // Charger la préférence sauvegardée
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
    */

    // ========== CONSOLE LOG DE BIENVENUE ==========
    console.log('%c🚀 DigiSen Agency', 'color: #0d6efd; font-size: 24px; font-weight: bold;');
    console.log('%cSite développé avec ❤️ à Dakar, Sénégal', 'color: #666; font-size: 14px;');
    
});

// ========== FONCTION UTILITAIRE : DEBOUNCE ==========
// Limite le nombre d'exécutions d'une fonction
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== FONCTION : DÉTECTER LE NAVIGATEUR ==========
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    
    if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
    else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
    else if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) browser = "IE";
    
    return browser;
}

// ========== PERFORMANCE : LAZY LOADING DES IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observer toutes les images avec data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

