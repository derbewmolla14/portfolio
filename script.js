const header = document.getElementById("header");
const navLinks = Array.from(document.querySelectorAll('.top-nav a[href^="#"]'));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setHeaderState() {
    if (!header) {
        return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 14);
}

function setActiveLink() {
    if (!navLinks.length) {
        return;
    }

    const offset = (header ? header.offsetHeight : 0) + 18;
    let currentId = "";

    navLinks.forEach((link) => {
        const section = document.querySelector(link.getAttribute("href"));
        if (!section) {
            return;
        }
        const top = section.offsetTop - offset;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
            currentId = link.getAttribute("href");
        }
    });

    navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === currentId;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") {
            return;
        }
        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start"
        });
        window.history.replaceState(null, "", targetId);
    });
});

setHeaderState();
setActiveLink();
window.addEventListener("scroll", () => {
    setHeaderState();
    setActiveLink();
});
window.addEventListener("resize", setActiveLink);

const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");

if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactFeedback.textContent = "Please complete all fields correctly.";
            return;
        }

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();

        const fullBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailToHref = `mailto:hello@molla.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
        window.location.href = mailToHref;

        contactFeedback.textContent = "Your email draft has been opened. Send it to submit your message.";
        contactForm.reset();
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const topNav = document.querySelector('.top-nav');

if (mobileMenuToggle && topNav) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        topNav.classList.toggle('is-open');
    });

    // Close menu when a link is clicked
    topNav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            topNav.classList.remove('is-open');
        }
    });
}