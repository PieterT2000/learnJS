const slides = Array.from(document.querySelectorAll(".slide"));
const buttonRight = document.querySelector(".right");
const buttonLeft = document.querySelector(".left");

let leftTransform = 0;

buttonRight.addEventListener("click", () => {
  leftTransform += -100;
  slides.forEach(slide => {
    // transform each slide to the left
    slide.style.transform = `translateX(${leftTransform}%)`;
  });
});

buttonLeft.addEventListener("click", () => {
  let rightTransform = leftTransform + 100;
  slides.forEach(slide => {
    slide.style.transform = `translateX(${rightTransform}%)`;
  });
  leftTransform = rightTransform;
});
