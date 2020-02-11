/**
 * Finds the correct height of the accordion content
 * @param {HTMLElement} accordion The accordion
 * @returns {Number} Accordion content's height in px value
 */
const getContentHeight = accordion => {
  const accordionInner = accordion.querySelector(".inner");
  return accordionInner.getBoundingClientRect().height;
};

/**
 * Closes current accordion when a new one is opened
 */
const closePreviousAccordion = () => {
  const openAccordion = accordionContainer.querySelector(".isOpen");
  openAccordion.querySelector(".accordionContent").style.height = "0px";
  openAccordion.classList.remove("isOpen");
};

/**
 * Opens the accordion
 * @param {HTMLElement} accordion The clicked accordion
 * @param {Number} height The content height of the accordion
 */
const openAccordion = (accordion, height) => {
  const accordionContent = accordion.querySelector(".accordionContent");
  accordion.classList.add("isOpen");
  accordionContent.style.height = `${height}px`;
};

const accordionContainer = document.querySelector(".accordionContainer");
accordionContainer.addEventListener("click", e => {
  const accordionHeader = e.target.closest(".accordionHeader");
  if (!accordionHeader) return;
  const accordion = accordionHeader.parentElement;
  const height = getContentHeight(accordion);
  closePreviousAccordion();
  openAccordion(accordion, height);
});

/**
 * Opens the first accordion by default
 */
const openFirstAccordion = () => {
  const accordion = accordionContainer.children[0];
  const height = getContentHeight(accordion);
  openAccordion(accordion, height);
};
openFirstAccordion();
