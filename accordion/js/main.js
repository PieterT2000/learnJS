// select accordions + toggle button in header
const accordionContainer = document.querySelector(".accordionContainer");
const accordions = document.querySelectorAll(".accordion");
const toggleIcon = document.querySelector(".toggleIcon");

//Enable event delegation
accordionContainer.addEventListener("click", e => {
  // check if click is on accordion header or on elements inside header
  if (
    e.target.closest(".accordionHeader") ||
    e.target.classList.contains("accordionHeader")
  ) {
    // Close currently open accordion
    const openAccordion = accordionContainer.querySelector(".isOpen");
    openAccordion.classList.remove("isOpen");
    // Open accordion that is being clicked on
    e.target.closest(".accordion").classList.add("isOpen");
  }
});
