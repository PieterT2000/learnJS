const accordionContainer = document.querySelector(".accordionContainer");

//Open first accordion by default
function openFirstAccordion() {
  const defaultAccordion = accordionContainer.children[0];
  const height = defaultAccordion
    .querySelector(".inner")
    .getBoundingClientRect().height;
  defaultAccordion.querySelector(
    ".accordionContent"
  ).style.height = `${height}px`;
  defaultAccordion.classList.add("isOpen");
}

openFirstAccordion();

//Enable event delegation
accordionContainer.addEventListener("click", e => {
  const accordionHeader = e.target.closest(".accordionHeader");
  // check if click is on accordion header or on elements inside header
  if (accordionHeader) {
    //Get height of content box accordion
    const accordionContent = e.target.closest(".accordionHeader")
      .nextElementSibling;
    const innerHeight = accordionContent
      .querySelector(".inner")
      .getBoundingClientRect().height;
    // Get currently open accordion and close it
    const openAccordion = accordionContainer.querySelector(".isOpen");
    openAccordion.querySelector(".accordionContent").style.height = "0px";
    openAccordion.classList.remove("isOpen");
    // Open clicked accordion
    accordionContent.style.height = `${innerHeight}px`;
    e.target.closest(".accordion").classList.add("isOpen");
  }
});
