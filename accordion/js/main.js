// select accordions + toggle button in header
const accordions = document.querySelectorAll(".accordion");
const toggleIcon = document.querySelector(".toggleIcon");

accordions.forEach(accordion => {
  //select first child from accordion which is always the header and add click event
  accordion.firstElementChild.addEventListener("click", () => {
    accordion.classList.toggle("isOpen");
  });
});
