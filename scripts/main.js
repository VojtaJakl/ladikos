window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;
  loader.style.pointerEvents = "none";
  setTimeout(() => loader.style.display = "none", 500);
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); 
});
const burger = document.getElementById('burger');
const navbar = document.getElementById('navbar');

burger.addEventListener('click', () => {
  navbar.classList.toggle('active');
});