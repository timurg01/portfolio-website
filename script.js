"use strict";

//TESTIMONIAL CAROUSEL
const testimonialParentEl = document.querySelector(".carousel");
const testimonialBlock = document.querySelectorAll(".testimonial-block");

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

//STICKY NAVIGATION
const header = document.querySelector("#hero");
const nav = document.querySelector(".nav");

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

headerObserver.observe(header);

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
    s.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
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
