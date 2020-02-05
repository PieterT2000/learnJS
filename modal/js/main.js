//select buttons + body
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".closeModal");
const modalOverlay = document.querySelector(".modalOverlay");
const body = document.body;

//add class to body that makes modal visible on button click
openModal.addEventListener("click", _ => {
  body.classList.add("modalIsOpen");
});

// close modal on click on overlay or close button
modalOverlay.addEventListener("click", e => {
  //Note: this way nothing happens with clicks on modal itself or inside the modal
  if (
    e.target.classList.contains("modalOverlay") ||
    e.target.classList.contains("closeModal")
  ) {
    body.classList.remove("modalIsOpen");
  }
});
