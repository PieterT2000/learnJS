//select buttons + body
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".closeModal");
const body = document.body;

//add class to body that makes modal visible on button click
openModal.addEventListener("click", _ => {
  body.classList.add("modalIsOpen");
});

//remove class from body making the modal disappear
closeModal.addEventListener("click", _ => {
  body.classList.remove("modalIsOpen");
});
