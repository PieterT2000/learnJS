const slides = Array.from(document.querySelectorAll(".slide"));
const buttonRight = document.querySelector(".right");
const buttonLeft = document.querySelector(".left");

buttonRight.addEventListener("click", () => {
  slides[1].style.left = "0";
});
// slides.forEach(slide => {
//   slide.addEventListener("");
// });
