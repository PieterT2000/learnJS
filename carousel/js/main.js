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

// give each dot an index to enable slide mapping
dots.forEach((dot, index) => {
  dot.dataset.index = index;
});

//get initial slidewidth
const slideWidth = slides[0].getBoundingClientRect().width; //width is dynamic since being set by CSS using vw
//set width of each slider to keep things responsive
slides.forEach((slide, index) => {
  slide.style.left = `${index * slideWidth}px`;
});

/* ------------------------------------
EVENT HANDLING
--------------------------------------- */
nextButton.addEventListener("click", () => {
  shiftSlide("next");
});

previousButton.addEventListener("click", () => {
  shiftSlide("prev");
});

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
