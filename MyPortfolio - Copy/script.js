
// =================================
// VINCE PORTFOLIO - JAVASCRIPT
// =================================


// =================================
// MOBILE NAVIGATION
// =================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }

    });

    // CLOSE MOBILE MENU WHEN CLICKING A LINK

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}


// =================================
// DARK AND LIGHT MODE
// =================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle
    ? themeToggle.querySelector("i")
    : null;

const savedTheme = localStorage.getItem("vince-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-theme");

    if (themeIcon) {
        themeIcon.className = "fas fa-sun";
    }

}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        if (themeIcon) {
            themeIcon.className = isDark
                ? "fas fa-sun"
                : "fas fa-moon";
        }

        localStorage.setItem(
            "vince-theme",
            isDark ? "dark" : "light"
        );

    });

}


// =================================
// TYPING ANIMATION
// =================================

const typingText = document.getElementById("typingText");

const words = [
    "Future Game Developer",
    "IT Student",
    "Programmer",
    "Technology Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

    }

    setTimeout(typeEffect, deleting ? 45 : 85);

}

typeEffect();


// =================================
// SCROLL REVEAL ANIMATION
// =================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


// =================================
// ACHIEVEMENT IMAGE PREVIEW
// =================================

const achievementCards =
    document.querySelectorAll(".achievement-card");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalCaption =
    document.getElementById("modalCaption");

const modalClose =
    document.getElementById("modalClose");


function closeImageModal() {

    if (!imageModal) return;

    imageModal.classList.remove("show");

    imageModal.setAttribute("aria-hidden", "true");

    if (modalImage) {
        modalImage.src = "";
    }

}


achievementCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!imageModal || !modalImage || !modalCaption) return;

        modalImage.src = card.dataset.image || "";

        modalCaption.textContent = card.dataset.title || "";

        imageModal.classList.add("show");

        imageModal.setAttribute("aria-hidden", "false");

    });

});


if (modalClose) {

    modalClose.addEventListener("click", closeImageModal);

}


if (imageModal) {

    imageModal.addEventListener("click", event => {

        if (event.target === imageModal) {
            closeImageModal();
        }

    });

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeImageModal();
    }

});


// =================================
// BACK TO TOP BUTTON
// =================================

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        backToTop.classList.toggle(
            "show",
            window.scrollY > 400
        );

    }, {
        passive: true
    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =================================
// ACTIVE NAVIGATION LINK
// =================================

const pageSections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    pageSections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 150) {

            currentSection = section.getAttribute("id");

        }

    });

    navigationLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );

    });

}, {
    passive: true
});


// =================================
// AUTOMATIC COPYRIGHT YEAR
// =================================

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// =========================================
// ANIMATED PARTICLE NETWORK BACKGROUND
// =========================================

(() => {

    const canvas =
        document.getElementById("particleCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const pointer = {
        x: null,
        y: null
    };

    let particles = [];

    let width = 0;
    let height = 0;

    let animationFrame = null;

    let isVisible = true;


    // PARTICLE SETTINGS

    const isSmallScreen = () => window.innerWidth < 700;

    const particleCount = () => {

        const areaBased = Math.floor(
            (window.innerWidth * window.innerHeight) / 15000
        );

        return Math.max(
            24,
            Math.min(isSmallScreen() ? 42 : 85, areaBased)
        );

    };


    // RESIZE CANVAS

    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            1.5
        );

        width = window.innerWidth;

        height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);

        canvas.height = Math.floor(height * dpr);

        canvas.style.width = width + "px";

        canvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createParticles();

        drawFrame();

    }


    // CREATE PARTICLES

    function createParticles() {

        const count = particleCount();

        particles = Array.from(
            { length: count },
            () => ({

                x: Math.random() * width,

                y: Math.random() * height,

                vx: (Math.random() - 0.5) * 0.38,

                vy: (Math.random() - 0.5) * 0.38,

                radius: Math.random() * 1.5 + 0.7

            })
        );

    }


    // DRAW PARTICLES AND CONNECTIONS

    function drawFrame() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        const dark =
            document.body.classList.contains("dark-theme");

        const particleColor = dark
            ? "150, 185, 255"
            : "57, 120, 255";

        const lineColor = dark
            ? "85, 145, 255"
            : "57, 120, 255";

        const maxDistance = isSmallScreen()
            ? 105
            : 135;


        // CONNECT PARTICLES

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx =
                    particles[i].x - particles[j].x;

                const dy =
                    particles[i].y - particles[j].y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {

                    const opacity =
                        (1 - distance / maxDistance) *
                        (dark ? 0.24 : 0.16);

                    ctx.beginPath();

                    ctx.strokeStyle =
                        `rgba(${lineColor}, ${opacity})`;

                    ctx.lineWidth = 0.8;

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.stroke();

                }

            }

        }


        // DRAW GLOWING BLUE PARTICLES

        particles.forEach(particle => {

            ctx.beginPath();

            ctx.fillStyle =
                `rgba(${particleColor}, ${dark ? 0.72 : 0.48})`;

            ctx.shadowBlur = 9;

            ctx.shadowColor =
                `rgba(57, 120, 255, ${dark ? 0.55 : 0.3})`;

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

        ctx.shadowBlur = 0;

    }


    // MOVE PARTICLES

    function updateParticles() {

        particles.forEach(particle => {

            particle.x += particle.vx;

            particle.y += particle.vy;


            // BOUNCE AT SCREEN EDGES

            if (
                particle.x < -10 ||
                particle.x > width + 10
            ) {

                particle.vx *= -1;

            }

            if (
                particle.y < -10 ||
                particle.y > height + 10
            ) {

                particle.vy *= -1;

            }


            // MOUSE INTERACTION

            if (pointer.x !== null && !isSmallScreen()) {

                const dx = particle.x - pointer.x;

                const dy = particle.y - pointer.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 115 && distance > 0) {

                    const force =
                        (115 - distance) / 1150;

                    particle.x +=
                        (dx / distance) * force;

                    particle.y +=
                        (dy / distance) * force;

                }

            }

        });

    }


    // ANIMATION LOOP

    function animate() {

        if (!isVisible || reduceMotion.matches) {

            drawFrame();

            animationFrame = null;

            return;

        }

        updateParticles();

        drawFrame();

        animationFrame =
            requestAnimationFrame(animate);

    }


    // START ANIMATION

    function startAnimation() {

        if (
            animationFrame === null &&
            isVisible &&
            !reduceMotion.matches
        ) {

            animationFrame =
                requestAnimationFrame(animate);

        } else if (reduceMotion.matches) {

            drawFrame();

        }

    }


    // WINDOW RESIZE

    window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
    );


    // MOUSE MOVEMENT

    window.addEventListener(
        "pointermove",
        event => {

            pointer.x = event.clientX;

            pointer.y = event.clientY;

        },
        { passive: true }
    );


    window.addEventListener("pointerleave", () => {

        pointer.x = null;

        pointer.y = null;

    });


    // PAUSE WHEN TAB IS HIDDEN

    document.addEventListener(
        "visibilitychange",
        () => {

            isVisible = !document.hidden;

            if (
                !isVisible &&
                animationFrame !== null
            ) {

                cancelAnimationFrame(animationFrame);

                animationFrame = null;

            } else {

                startAnimation();

            }

        }
    );


    // HANDLE REDUCED MOTION SETTING

    reduceMotion.addEventListener?.("change", () => {

        if (
            reduceMotion.matches &&
            animationFrame !== null
        ) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

            drawFrame();

        } else {

            startAnimation();

        }

    });


    // INITIALIZE

    resizeCanvas();

    startAnimation();

})();
