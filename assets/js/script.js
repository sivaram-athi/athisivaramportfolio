// Enhanced Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Enhanced Smooth Scrolling
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
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Enhanced Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('appear');
                    }, index * 100); // Stagger animations
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Enhanced Skill Progress Animation
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.classList.add('animate');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(el => {
            skillObserver.observe(el.closest('.card-glass'));
        });

        // Typing Effect for Hero Section
        const typingText = document.getElementById('typing-text');
        const roles = [
            'Full Stack Developer',
            'Web Developer',
            'Mobile App Developer',
            'Backend Specialist',
            'API Integration Expert',
            'Database Designer'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        function typeEffect() {
            if (!typingText) return;

            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => { isDeleting = true; }, pauseTime);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            const speed = isDeleting ? deleteSpeed : typeSpeed;
            setTimeout(typeEffect, speed);
        }

        // Code Animation in Hero
        function animateCode() {
            const codeLines = document.querySelectorAll('.code-line');
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.animationDelay = `${index * 0.2}s`;
                    line.classList.add('animate');
                }, index * 300);
            });
        }

        // Enhanced Active Navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Enhanced Scroll Effects
        let ticking = false;
        function updateOnScroll() {
            updateActiveNav();

            // Parallax effect
            const scrolled = window.pageYOffset;
            const heroSection = document.getElementById('home');
            if (heroSection) {
                const rate = scrolled * -0.3;
                heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
            }

            // Scroll to top button
            const scrollTopBtn = document.getElementById('scroll-top');
            if (scrolled > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Enhanced Form Handling
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submit-text');
            const submitIcon = document.getElementById('submit-icon');
            const originalText = submitText.textContent;

            // Loading state
            submitText.textContent = 'Sending...';
            submitIcon.className = 'fas fa-spinner fa-spin ml-2';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75');

            // Simulate form submission
            try {
                // Here you would normally send the form data to your backend
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Success state
                submitText.textContent = 'Message Sent!';
                submitIcon.className = 'fas fa-check ml-2';
                submitBtn.classList.remove('opacity-75');
                submitBtn.classList.add('bg-green-500');

                // Reset form
                contactForm.reset();

                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

            } catch (error) {
                // Error state
                submitText.textContent = 'Try Again';
                submitIcon.className = 'fas fa-exclamation-triangle ml-2';
                submitBtn.classList.remove('opacity-75');
                submitBtn.classList.add('bg-red-500');

                showNotification('Something went wrong. Please try again.', 'error');
            }

            // Reset button after delay
            setTimeout(() => {
                submitText.textContent = originalText;
                submitIcon.className = 'fas fa-paper-plane ml-2';
                submitBtn.disabled = false;
                submitBtn.className = submitBtn.className.replace(/bg-(green|red)-500/g, '');
            }, 3000);
        });

        // Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-2xl transform translate-x-full transition-transform duration-300 ${type === 'success' ? 'bg-green-500' :
                    type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                } text-white`;
            notification.innerHTML = `
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
                    <span>${message}</span>
                    <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);

            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }

        // Project Card Interactions
        document.querySelectorAll('.project-card button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = e.target.closest('.project-card').querySelector('h3').textContent;
                showNotification(`Opening details for: ${projectTitle}`, 'info');
            });
        });

        // Enhanced Scroll to Top
        document.getElementById('scroll-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Intersection Observer for Stats Animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        function animateNumber(element) {
            const target = element.textContent;
            const number = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d]/g, '');
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 50);
        }

        document.querySelectorAll('.stats-number').forEach(el => {
            statsObserver.observe(el);
        });

        // Tech Icons Hover Effects
        document.querySelectorAll('.tech-orbit').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.animationPlayState = 'paused';
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.animationPlayState = 'running';
            });
        });

        // Page Load Animations
        window.addEventListener('load', () => {
            // Trigger hero animations
            setTimeout(() => {
                const heroFadeIn = document.querySelector('#home .fade-in');
                const heroSlideIn = document.querySelector('#home .slide-in-right');
                if (heroFadeIn) heroFadeIn.classList.add('appear');
                if (heroSlideIn) heroSlideIn.classList.add('appear');

                // Start typing effect and code animation
                setTimeout(typeEffect, 1000);
                setTimeout(animateCode, 1500);
            }, 300);
        });

        // Enhanced Performance: Debounced Resize Handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Handle resize-specific logic here
                updateActiveNav();
            }, 250);
        });

        // Preload critical images
        const preloadImages = [
            'https://public.youware.com/users-website-assets/prod/d2ea81c6-05f8-4e4a-9557-73a1d5964792/08386a1e42c9488691fe8c5dc9dcfa0a.jpg',
            'https://public.youware.com/users-website-assets/prod/d2ea81c6-05f8-4e4a-9557-73a1d5964792/b5aa03de3505470a9bd4308264fb7393.jpg',
            'https://public.youware.com/users-website-assets/prod/d2ea81c6-05f8-4e4a-9557-73a1d5964792/2f5e25c18aaf459ca6c33548d805cb82.jpeg'
        ];

        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Easter Egg: Konami Code
        let konamiCode = [];
        const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konami.length) {
                konamiCode.shift();
            }
            if (JSON.stringify(konamiCode) === JSON.stringify(konami)) {
                showNotification('🎉 Easter egg activated! You found the secret developer mode!', 'success');
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 3000);
                konamiCode = [];
            }
        });