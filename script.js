/*========= custom cursor =========*/
const cursorDot  = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move dot instantly with the mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top  = mouseY + "px";
});

// Ring follows with a smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top  = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
const hoverTargets = "a, button, input, textarea, .btn, .skill-toggle, .work-card, .wheel-node, .services-box, label";

document.addEventListener("mouseover", (e) => {
  if (e.target.closest(hoverTargets)) {
    cursorDot.classList.add("hovering");
    cursorRing.classList.add("hovering");
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest(hoverTargets)) {
    cursorDot.classList.remove("hovering");
    cursorRing.classList.remove("hovering");
  }
});

// Click effect
document.addEventListener("mousedown", () => {
  cursorDot.classList.add("clicking");
  cursorRing.classList.add("clicking");
});

document.addEventListener("mouseup", () => {
  cursorDot.classList.remove("clicking");
  cursorRing.classList.remove("clicking");
});

// Hide when cursor leaves the window
document.addEventListener("mouseleave", () => {
  cursorDot.style.opacity  = "0";
  cursorRing.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursorDot.style.opacity  = "1";
  cursorRing.style.opacity = "0.6";
});

/*========= back to top button =========*/
document.querySelector('.footer-iconTop a').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*========= typing animation =========*/
var typed = new Typed(".multiple-text", {
  strings: ["Argie Paran", "a Web developer", "Web Designer"],
  startDelay: 500,
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

/*========= menu icon navbar =========*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*========= scroll section active link =========*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*========= sticky navbar =========*/
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 50);

  /*========= scroll progress bar =========*/
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";

  /*========= remove icon navbar when click navbar link (scroll) =========*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*========= lightbox =========*/
const lightbox     = document.getElementById("lightbox");
const lightboxImg  = document.getElementById("lightboxImg");
const lightboxCap  = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

// open on any work-card image click
document.addEventListener("click", (e) => {
  const img = e.target.closest(".work-img-placeholder img");
  if (!img) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCap.textContent = img.alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
});

// close on X button
lightboxClose.addEventListener("click", closeLightbox);

// close on backdrop click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

/*========= skill toggle (View My Work) =========*/
document.querySelectorAll(".skill-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const panel = document.getElementById(targetId);

    const isOpen = panel.classList.contains("open");

    // Close all panels first
    document.querySelectorAll(".skill-works").forEach((p) => p.classList.remove("open"));
    document.querySelectorAll(".skill-toggle").forEach((b) => b.classList.remove("open"));

    // Toggle the clicked one
    if (!isOpen) {
      panel.classList.add("open");
      btn.classList.add("open");
      btn.querySelector("span") && (btn.querySelector("span").textContent = "Hide Works");
    }
  });
});

/*========= read more read less =========*/
const readMoreBtns = document.querySelectorAll(".read-more");

readMoreBtns.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const readMoreId = this.getAttribute("data-readmore-id");
    const moreText = document.querySelector(
      `.more-text[data-readmore-id="${readMoreId}"]`
    );
    moreText.classList.toggle("hidden");

    if (moreText.classList.contains("hidden")) {
      this.textContent = "Read More";
    } else {
      this.textContent = "Read Less";
    }
  });
});

/*========= swiper =========*/
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*========= dark light mode =========*/
let darkModeIcon = document.querySelector("#darkMode-icon");

// load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkModeIcon.classList.add("bx-sun");
}

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");

  // save theme
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

/*========= scroll reveal =========*/
ScrollReveal({
  //reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading, .portfolio h3", { origin: "top" });
ScrollReveal().reveal(
  ".home-img img .services-container, .portfolio-box, .testimonial-wrapper, contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", {
  origin: "right",
});

/*========= brightness control =========*/
const brightnessToggleBtn = document.getElementById("brightnessToggleBtn");
const brightnessPopup     = document.getElementById("brightnessPopup");
const brightnessSlider    = document.getElementById("brightnessSlider");
const brightnessValueEl   = document.getElementById("brightnessValue");
const brightnessOverlay   = document.getElementById("brightness-overlay");

// Apply brightness via a dark overlay (opacity = inverse of brightness)
function applyBrightness(value) {
  const opacity = (100 - value) / 100; // 100% bright = 0 overlay, 20% bright = 0.8 overlay
  brightnessOverlay.style.background = `rgba(0, 0, 0, ${opacity})`;
  brightnessValueEl.textContent = value + "%";
}

// Load saved brightness
const savedBrightness = localStorage.getItem("brightness");
if (savedBrightness) {
  brightnessSlider.value = savedBrightness;
  applyBrightness(Number(savedBrightness));
}

// Toggle popup open/close
brightnessToggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  brightnessPopup.classList.toggle("open");
});

// Close popup when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".brightness-panel")) {
    brightnessPopup.classList.remove("open");
  }
});

// Slider input
brightnessSlider.addEventListener("input", () => {
  const val = Number(brightnessSlider.value);
  applyBrightness(val);
  localStorage.setItem("brightness", val);
});