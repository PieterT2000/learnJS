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
ARROW BUTTONS + DOTS CONFIGURATION
--------------------------------------- */
const obj = {
  nextSlide(currentSlide) {
    // Shows previous button on second slide
    previousButton.classList.remove("hidden");
    return {
      destination: currentSlide.nextElementSibling,
      current: currentSlide
    };
  },
  previousSlide(currentSlide) {
    //Show next button from slide that is last but one
    nextButton.classList.remove("hidden");
    return {
      destination: currentSlide.previousElementSibling,
      current: currentSlide
    };
  },
  destination(obj) {
    const { destination, current } = obj;
    const distance = getComputedStyle(destination).left;
    contents.style.transform = `translateX(-${distance})`;
    current.classList.remove("isSelected");
    destination.classList.add("isSelected");
    //Hide next button on last slide
    if (!destination.nextElementSibling) {
      nextButton.classList.add("hidden");
    }
    //hide previous button on first slide
    if (!destination.previousElementSibling) {
      previousButton.classList.add("hidden");
    }
  },
  shiftSlide(direction, current) {
    direction === "next"
      ? this.destination(this.nextSlide(current))
      : this.destination(this.previousSlide(current));
  },
  updateDotState(direction, currentDot) {
    currentDot.classList.remove("isSelected");
    direction === "next"
      ? currentDot.nextElementSibling.classList.add("isSelected")
      : currentDot.previousElementSibling.classList.add("isSelected");
  }
};

nextButton.addEventListener("click", () => {
  //Move slide
  const currentSlide = contents.querySelector(".isSelected");
  obj.shiftSlide("next", currentSlide);
  //Update dot state
  const currentDot = dotsContainer.querySelector(".isSelected");
  obj.updateDotState("next", currentDot);
});

previousButton.addEventListener("click", () => {
  //Move slide
  const currentSlide = contents.querySelector(".isSelected");
  obj.shiftSlide("prev", currentSlide);
  // Update dot state
  const currentDot = dotsContainer.querySelector(".isSelected");
  obj.updateDotState("prev", currentDot);
});

// Add event delegation to dots container
dotsContainer.addEventListener("click", e => {
  // Check explicitly if click is on dot instead of on div
  const dot = e.target.closest("button");
  if (dot) {
    // figure out what the index of the clicked dot is
    const dotIndex = parseInt(dot.dataset.index);
    // find matching slide based on index
    const slide = slides[dotIndex];
    // move carousel to found slide
    const destination = getComputedStyle(slide).left;
    contents.style.transform = `translateX(-${destination})`;
    //Add selected classes to dot and slide
    select(dot, slide);

    // SHOWING/HIDING ARROW BUTTONS LOGIC

    //on 1st slide hide previous btn
    if (dotIndex === 0) {
      previousButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
      return;
    }
    //on last slide hide next btn
    if (dotIndex === slides.length - 1) {
      nextButton.classList.add("hidden");
      previousButton.classList.remove("hidden");
      return;
    }
    //on all other occassions show both buttons
    previousButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
});

function select(clickedDot, destinationSlide) {
  // remove selected class from current dot
  dotsContainer.querySelector(".isSelected").classList.remove("isSelected");
  // remove selected class from currentSlide
  contents.querySelector(".isSelected").classList.remove("isSelected");
  // select clicked dot
  clickedDot.classList.add("isSelected");
  // select destination slide
  destinationSlide.classList.add("isSelected");
}

/*
TODO:
- Enable swipe for slider
- Add smooth slider transition
*/

/*
DONE:
- Make navigation button hide once there are no more slides to view
- Make slider responsive
- Refactor code (add event delegation)
*/
