const menuButton = document.getElementById("menuButton");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");

function openMenu() {
  mobileMenu.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  mobileMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");

    if (targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

const revealElements = document.querySelectorAll(
  ".profile-image-wrap, .profile-info, .about-grid, .explore-item, .social-box, .cta-section"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

const style = document.createElement("style");

style.textContent = `
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.65, 0.25, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
`;

document.head.appendChild(style);

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
