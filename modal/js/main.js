//select buttons + body
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".closeModal");
const modalOverlay = document.querySelector(".modalOverlay");
const body = document.body;

//add class to body that makes modal visible on button click
openModal.addEventListener("click", _ => {
  body.classList.add("modalIsOpen");
  //run waving hand animation
  waveAndZoom();
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

//Waving Hand animation on modal using GSAP
const wavingHand = modalOverlay.querySelector(".wavingHand");

const waveAndZoom = () => {
  const tl = new TimelineMax({ repeat: -1 });
  // Sets transform origin
  tl.set(wavingHand, { transformOrigin: "bottom center" });
  //first zoom out
  tl.from(wavingHand, 0.5, {
    scale: 0.25,
    opacity: 0,
    ease: Back.easeOut.config(1.5)
  })
    //then wave hand -> total duration 1s
    .to(wavingHand, 0.2, { rotation: 15 })
    .to(wavingHand, 0.2, { rotation: -15 })
    .to(wavingHand, 0.2, { rotation: 15 })
    .to(wavingHand, 0.2, { rotation: -15 })
    .to(wavingHand, 0.2, { rotation: 0 });
};
