"use strict";

//REVEAL ELEMENTS ON SCROLL
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

//CAROUSEL
const slides = document.querySelectorAll(".testimonial-block");
const carousel = document.querySelector(".carousel");
const btnLeft = document.querySelector(".carousel--btn-left");
const btnRight = document.querySelector(".carousel--btn-right");

let currentSlide = 0;
const maxSlide = slides.length;

//change slide function
const goToSlide = function (slide = 0) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - currentSlide) * 500}%)`;
  });
};

goToSlide();
//go to next slide event - ARROWS

//go to next slide event - DOTS
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots-dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots-dot")
    .forEach((dot) => dot.classList.remove("dot-active"));

  document
    .querySelector(`.dots-dot[data-slide="${slide}"]`)
    .classList.add("dot-active");
};

//initial dot activation
activeDot(0);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots-dot")) {
    currentSlide = Number(e.target.dataset.slide);
    goToSlide(currentSlide);
    activeDot(currentSlide);
  }
});

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activeDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activeDot(currentSlide);
};

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

//RESPONSIVE MENU NAV

const menuBar = document.querySelector(".icon");
const navBtns = document.querySelectorAll(".nav-btn");
const navList = document.querySelector(".nav");
let isMenuOpen = false;

const dropDownMenu = function () {
  if (!isMenuOpen) {
    navList.classList.add("responsive");
    isMenuOpen = true;
  } else {
    navList.classList.remove("responsive");
    isMenuOpen = false;
  }
};

menuBar.addEventListener("click", dropDownMenu);
navList.addEventListener("click", function (e) {
  if (isMenuOpen && e.target.className === "nav-link") {
    navList.classList.remove("responsive");
    isMenuOpen = false;
  }
});

const viewportWidth = window.innerWidth;
console.log(viewportWidth);

//CHANGE NAVBAR COLOUR ON SCROLL 
const heroSection = document.getElementById('hero')
const stickyNav = document.querySelector('.sticky')
const navText = document.querySelectorAll('.nav-link')

const changeNavColour = function(entry) {
  if (!entry[0].isIntersecting) {
    stickyNav.classList.add('nav-scrolled')
    navText.forEach(txt => txt.classList.add("nav-scrolled"))
  } else {
    stickyNav.classList.remove('nav-scrolled')
    navText.forEach(txt => txt.classList.remove("nav-scrolled"))
  }
}

const options = {
    root: null,
    threshold: 0.1,
  };

const observer = new IntersectionObserver(changeNavColour, options);
observer.observe(heroSection)

////AUTOMATIC CHANGING COPYRIGHT DATE/////
const dateElement = document.querySelector('.date')
const currentYear = new Date().getFullYear()

dateElement.textContent = currentYear;