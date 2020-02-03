const tabs = Array.from(document.querySelectorAll(".tab"));
const tabContents = Array.from(document.querySelectorAll(".tabContent"));

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // 1. on click unselect all tabs
    tabs.forEach(t => {
      t.classList.remove("isSelected");
    });
    //2. select the tab that was clicked
    tab.classList.add("isSelected");
    tabContents.forEach(c => {
      c.classList.remove("isSelected");
    });
    tabContents[index].classList.add("isSelected");
  });
});
