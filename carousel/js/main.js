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
nextButton.addEventListener("click", () => {
  const currentSlide = contents.querySelector(".isSelected");
  const nextSlide = currentSlide.nextElementSibling;
  //get distance of destination slide from css file
  const destination = getComputedStyle(nextSlide).left;
  contents.style.transform = `translateX(-${destination})`;

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
    contents.style.transform = `translateX(0px)`;
  } else {
    contents.style.transform = `translateX(-${destination})`;
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
