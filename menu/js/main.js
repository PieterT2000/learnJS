//select menu button and body
const menuButton = document.querySelector(".menuButton");
const body = document.body;

// on click toggle class for body -> shifts body + offCanvasMenu to the right
menuButton.addEventListener("click", e => {
  body.classList.toggle("menuIsOpen");
  //change button text depending on if menu is open/closed
  if (body.classList.contains("menuIsOpen")) {
    e.currentTarget.textContent = "Close";
  } else {
    e.currentTarget.textContent = "Menu";
  }
});
