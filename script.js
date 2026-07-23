document.addEventListener('DOMContentLoaded', () => {
    const flowers = document.querySelectorAll('.flower-interactive');
    const noteCard = document.getElementById('noteCard');
    const noteText = document.getElementById('noteText');
    const flowerBadge = document.getElementById('flowerBadge');
    const stageHint = document.getElementById('stageHint');
    const particlesContainer = document.getElementById('particles');

    // Create floating sparkle particles in background
    function createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 6 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            particlesContainer.appendChild(particle);
        }
    }

    const petalsContainer = document.getElementById('petalsContainer');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Background Rose Petal Rain Generator
    function createRosePetals() {
        if (!petalsContainer) return;
        const petalCount = 18;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('rose-petal');
            
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${Math.random() * 6 + 6}s`;
            petal.style.animationDelay = `${Math.random() * 5}s`;
            petal.style.width = `${Math.random() * 8 + 14}px`;
            petal.style.height = `${Math.random() * 10 + 20}px`;

            petalsContainer.appendChild(petal);
        }
    }

    createRosePetals();

    // Toggle Background Music
    function toggleMusic() {
        if (!bgMusic) return;
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🔇 Sound Off';
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicToggle.textContent = '🎵 Sound On';
                isPlaying = true;
            }).catch(err => console.log("Audio autoplay prevented:", err));
        }
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const envelopeCard = document.getElementById('envelopeCard');
    const envelopeSeal = document.getElementById('envelopeSeal');
    const openBtn = document.getElementById('openBtn');

    function openEnvelope() {
        envelopeCard.classList.add('open');
        // Start background music automatically on user interaction
        if (bgMusic && !isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (musicToggle) musicToggle.textContent = '🎵 Sound On';
            }).catch(err => console.log("Audio autoplay restricted:", err));
        }
        setTimeout(() => {
            envelopeOverlay.classList.add('hide-envelope');
        }, 900);
    }

    if (openBtn) openBtn.addEventListener('click', openEnvelope);
    if (envelopeSeal) envelopeSeal.addEventListener('click', openEnvelope);

    createParticles();

    // Handle Flower Clicks
    flowers.forEach((flower) => {
        flower.addEventListener('click', (e) => {
            const name = flower.getAttribute('data-name');
            const note = flower.getAttribute('data-note');

            // Remove active class from all flowers
            flowers.forEach(f => f.classList.remove('active-flower'));
            
            // Add active class to clicked flower
            flower.classList.add('active-flower');

            // Update Note Card content with smooth animation
            noteCard.classList.remove('pulse');
            void noteCard.offsetWidth; // Trigger reflow
            noteCard.classList.add('pulse');

            flowerBadge.textContent = `🌸 ${name}`;
            noteText.textContent = `"${note}"`;
            stageHint.textContent = `✨ Note from ${name} revealed ✨`;

            // Burst miniature sparkle effect on click
            createBurstEffect(e.clientX || (flower.getBoundingClientRect().left + 40), 
                              e.clientY || (flower.getBoundingClientRect().top + 40));
        });
    });

    // Particle burst effect on clicking a flower
    function createBurstEffect(x, y) {
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.width = '8px';
            spark.style.height = '8px';
            spark.style.borderRadius = '50%';
            spark.style.backgroundColor = ['#ff758c', '#ffb703', '#ff4d6d', '#a575db'][Math.floor(Math.random() * 4)];
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '9999';
            spark.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

            document.body.appendChild(spark);

            const angle = (i / 12) * Math.PI * 2;
            const velocity = Math.random() * 60 + 30;
            const targetX = x + Math.cos(angle) * velocity;
            const targetY = y + Math.sin(angle) * velocity;

            requestAnimationFrame(() => {
                spark.style.left = `${targetX}px`;
                spark.style.top = `${targetY}px`;
                spark.style.opacity = '0';
                spark.style.transform = 'scale(0.2)';
            });

            setTimeout(() => {
                spark.remove();
            }, 600);
        }
    }
});