/* jshint esversion: 6 */
/* ------------------------------------
INITIAL CONFIG
--------------------------------------- */
const carousel = document.querySelector(".carousel");
const contents = carousel.querySelector(".contents");
const slides = [...carousel.querySelectorAll(".slide")];
const nextButton = carousel.querySelector(".right");
const previousButton = carousel.querySelector(".left");
const dotsContainer = carousel.querySelector(".carouselDots");
const dots = [...carousel.querySelectorAll(".carouselDot")];

/**
 * Loops over all dots and sets an index attribute foreach one
 * @param {Array} dots
 */
const indexDots = dots => {
  dots.forEach((dot, index) => (dot.dataset.index = index));
};
indexDots(dots);

/**
 * Sets inital position for all slides
 * @param {Array} slides The slides
 */
const setSlidePositions = slides => {
  //width is dynamic since it's being set by CSS using vw
  const slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(
    (slide, index) => (slide.style.left = `${index * slideWidth}px`)
  );
};
setSlidePositions(slides);

/* ------------------------------------
EVENT HANDLING
--------------------------------------- */
nextButton.addEventListener("click", () => {
  // Get destination slide
  // const currentSlide = contents.querySelector('isSelected')
  // const currentDot =
  shiftSlide("next");
});
previousButton.addEventListener("click", () => shiftSlide("prev"));

dotsContainer.addEventListener("click", e => {
  const dot = e.target.closest("button");
  if (dot) {
    const currentSlide = contents.querySelector(".isSelected"),
      currentDot = dotsContainer.querySelector(".isSelected");
    // 1. Shift slideContainer based on dot index
    const dotIndex = parseInt(dot.dataset.index);
    const destinationSlide = slides[dotIndex];
    const distance = getComputedStyle(destinationSlide).left;
    contents.style.transform = `translateX(-${distance})`;
    // 2. Add selected classes to dot and slide
    handleClasses({
      currentSlide,
      currentDot,
      destinationSlide,
      destinationDot: dot
    });
  }
});

function shiftSlide(direction) {
  // 1. Select current slide and dot
  const currentSlide = contents.querySelector(".isSelected"),
    currentDot = dotsContainer.querySelector(".isSelected");
  // 2. Select destination slide/dot depending on direction param
  let destinationSlide, destinationDot;
  if (direction === "next") {
    destinationSlide = currentSlide.nextElementSibling;
    destinationDot = currentDot.nextElementSibling;
  } else {
    destinationSlide = currentSlide.previousElementSibling;
    destinationDot = currentDot.previousElementSibling;
  }
  // 3. Get destination slide distance and shift container
  const distance = getComputedStyle(destinationSlide).left;
  contents.style.transform = `translateX(-${distance})`;
  //4. Handle classes
  handleClasses({ currentSlide, currentDot, destinationSlide, destinationDot });
}

function handleClasses(data) {
  const { currentSlide, currentDot, destinationSlide, destinationDot } = data;
  // Shorthand functions for handling CSS classes
  const del = (el, className) => el.classList.remove(className);
  const add = (el, className) => el.classList.add(className);
  //Handle classes for slides and dots
  del(currentSlide, "isSelected");
  del(currentDot, "isSelected");
  add(destinationSlide, "isSelected");
  add(destinationDot, "isSelected");

  // Handle display logic for prev/next buttons based on dotindex
  const dotIndex = parseInt(destinationDot.dataset.index);
  if (dotIndex === 0) {
    // Hide prev button + show next button
    add(previousButton, "hidden");
    del(nextButton, "hidden");
    return;
  }
  if (dotIndex === dots.length - 1) {
    // Show prev button + hide next button
    del(previousButton, "hidden");
    add(nextButton, "hidden");
    return;
  }
  //On all other occassions show both buttons
  del(previousButton, "hidden");
  del(nextButton, "hidden");
}

function switchSlide(target) {
  // Switch slides solely based on dotindex
  const currentDot = dotsContainer.querySelector("isSelected");
  const index = parseInt(currentDot.dataset.index);
  const currentSlide = slides[index];

  // Get destination slide
  const destinationIndex = getDirection(target, index) || target;
  const getDirection = (target, index) => {
    target === "next" ? index++ : index--;
  };
}

/*
TODO:
- Enable swipe for slider
*/

/*
DONE:
- Make navigation button hide once there are no more slides to view
- Make slider responsive
- Refactor code (add event delegation) + DRY code
- Add smooth slider transition
*/
