// select accordions + toggle button in header
const accordions = document.querySelectorAll(".accordion");
const toggleIcon = document.querySelector(".toggleIcon");

accordions.forEach(accordion => {
  //select first child from accordion which is always the header and add click event
  accordion.firstElementChild.addEventListener("click", () => {
    // before opening the clicked accordion, first close all other already open accordions
    accordions.forEach(accordion => {
      if (accordion.classList.contains("isOpen")) {
        accordion.classList.remove("isOpen");
      }
    });
    accordion.classList.toggle("isOpen");
  });
});
