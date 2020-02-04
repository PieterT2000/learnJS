/* ------------------------------------
INITIAL CONFIG
--------------------------------------- */
const carousel = document.querySelector(".carousel");
const contents = carousel.querySelector(".contents");
const slides = Array.from(carousel.querySelectorAll(".slide"));
const nextButton = carousel.querySelector(".right");
const previousButton = carousel.querySelector(".left");
const dotsContainer = carousel.querySelector(".carouselDots");
const dots = Array.from(carousel.querySelectorAll(".carouselDot"));

//get initial slidewidth
const slideWidth = slides[0].getBoundingClientRect().width; //width is dynamic since being set by CSS using vw
//set width of each slider to keep things responsive
slides.forEach((slide, index) => {
  slide.style.left = `${index * slideWidth}px`;
});

/* ------------------------------------
ARROW BUTTONS + DOTS CONFIGURATION
--------------------------------------- */
nextButton.addEventListener("click", () => {
  const currentSlide = contents.querySelector(".isSelected");
  const nextSlide = currentSlide.nextElementSibling;
  //get distance of destination slide from css file
  const destination = getComputedStyle(nextSlide).left;
  contents.style.left = "-" + destination;

  currentSlide.classList.remove("isSelected");
  nextSlide.classList.add("isSelected");
  // Shows previous button on second slide
  previousButton.classList.remove("hidden");
  //Hide next button on last slide
  if (!nextSlide.nextElementSibling) {
    nextButton.classList.add("hidden");
  }
  //Update dot state
  const currentDot = dotsContainer.querySelector(".isSelected");
  currentDot.classList.remove("isSelected");
  currentDot.nextElementSibling.classList.add("isSelected");
});

previousButton.addEventListener("click", () => {
  const currentSlide = contents.querySelector(".isSelected");
  const previousSlide = currentSlide.previousElementSibling;
  const destination = getComputedStyle(previousSlide).left;
  if (destination === "auto") {
    contents.style.left = "0px";
  } else {
    contents.style.left = "-" + destination;
  }

  currentSlide.classList.remove("isSelected");
  previousSlide.classList.add("isSelected");
  //Show next button from slide that is last but one
  nextButton.classList.remove("hidden");
  //hide previous button on first slide
  if (!previousSlide.previousElementSibling) {
    previousButton.classList.add("hidden");
  }
  // Update dot state
  const currentDot = dotsContainer.querySelector(".isSelected");
  currentDot.classList.remove("isSelected");
  currentDot.previousElementSibling.classList.add("isSelected");
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", e => {
    //get slide with the dot's index
    const slide = slides[index];
    //get distance to destination
    const destination = getComputedStyle(slide).left;
    if (destination === "auto") {
      contents.style.left = "0px";
    } else {
      contents.style.left = "-" + destination;
    }
    //Toggle isSelected class for both clicked dot and destination slide
    select(e.target, slide);

    // SHOWING/HIDING BUTTONS

    //on 1st slide hide previous btn
    if (index === 0) {
      previousButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    }
    //on last slide hide next btn
    else if (index === slides.length - 1) {
      nextButton.classList.add("hidden");
      previousButton.classList.remove("hidden");
    }
    //on all other occassions show both buttons
    else {
      previousButton.classList.remove("hidden");
      nextButton.classList.remove("hidden");
    }
  });
});

function select(clickedDot, destinationSlide) {
  // remove selected class from current dot
  dotsContainer.querySelector(".isSelected").classList.remove("isSelected");
  // select clicked dot
  clickedDot.classList.add("isSelected");
  // remove selected class from currentSlide
  contents.querySelector(".isSelected").classList.remove("isSelected");
  // select destination slide
  destinationSlide.classList.add("isSelected");
}

/*
TODO:
- Enable swipe for slider
*/

/*
DONE:
- Make navigation button hide once there are no more slides to view
- Make slider responsive
*/
