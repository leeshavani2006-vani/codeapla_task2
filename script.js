
// SELECT ELEMENTS
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


// DARK AND LIGHT MODE
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});


// MOBILE NAVIGATION
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    menuBtn.innerHTML = navLinks.classList.contains("show")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});


// ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "home";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
});


// TYPING ANIMATION
const typingText = document.getElementById("typingText");

const roles = [
    "Web Developer",
    "Creative Designer",
    "Frontend Developer"
];

let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        letterIndex--;
    } else {
        letterIndex++;
    }

    typingText.textContent = currentRole.substring(0, letterIndex);

    let speed = deleting ? 55 : 100;

    if (!deleting && letterIndex === currentRole.length) {
        deleting = true;
        speed = 1300;
    } else if (deleting && letterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// PROFILE PHOTO UPLOAD
const photoUpload = document.getElementById("photoUpload");
const homePhoto = document.getElementById("homePhoto");
const aboutPhoto = document.getElementById("aboutPhoto");

let photoObjectURL = null;

// Restore saved photo from this browser
const savedPhoto = localStorage.getItem("portfolio-photo");

if (savedPhoto) {
    homePhoto.src = savedPhoto;
    aboutPhoto.src = savedPhoto;
}

photoUpload.addEventListener("change", () => {
    const file = photoUpload.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please choose a valid image.");
        photoUpload.value = "";
        return;
    }

    // Keep uploaded image at a manageable size
    if (file.size > 3 * 1024 * 1024) {
        alert("Please choose an image smaller than 3 MB.");
        photoUpload.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        const imageData = reader.result;

        homePhoto.src = imageData;
        aboutPhoto.src = imageData;

        try {
            localStorage.setItem("portfolio-photo", imageData);
        } catch (error) {
            alert("Image could not be saved in this browser. Try a smaller image.");
        }
    };

    reader.readAsDataURL(file);
});


// ABOUT SECTION TABS
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContent = document.getElementById("tabContent");

const tabData = {
    education: `
        <h4><i class="fas fa-graduation-cap"></i> My Education</h4>
        <p>Add your course, college and education details here.</p>
    `,
    interest: `
        <h4><i class="fas fa-heart"></i> My Interests</h4>
        <p>Web development, creative design, technology and learning new skills.</p>
    `,
    goal: `
        <h4><i class="fas fa-bullseye"></i> My Goals</h4>
        <p>To become a skilled developer and build meaningful digital products.</p>
    `
};

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        tabContent.innerHTML = tabData[button.dataset.tab];
    });
});


// SCROLL REVEAL ANIMATION
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealItems.forEach(item => revealObserver.observe(item));


// ANIMATED SKILL BARS
const skillSection = document.getElementById("skills");

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll(".skill-fill").forEach(bar => {
                bar.style.width = bar.dataset.width;
            });

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

skillObserver.observe(skillSection);


// CONTACT FORM
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const recipient = "you@example.com";

    const subject = encodeURIComponent("Portfolio Contact Message");
    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;
});


// CURRENT YEAR
document.getElementById("year").textContent = new Date().getFullYear();
