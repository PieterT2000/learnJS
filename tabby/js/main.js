const tabsContainer = document.querySelector(".tabs");
const tabContents = document.querySelector(".tabContents");

// Add event delegation to tabsContainer
tabsContainer.addEventListener("click", e => {
  if (e.target.closest(".tabs")) {
    const tab = e.target;
    const target = tab.dataset.target;
    // Get matching content tab using data attribute from tab
    const contentTab = tabContents.querySelector(`#${target}`);
    // Remove seleccted class from current active tab + content
    tabContents.querySelector(".isSelected").classList.remove("isSelected");
    tabContainer.querySelector(".isSelected").classList.remove("isSelected");
    // Add active class to clicked tab + content
    tab.classList.add("isSelected");
    contentTab.classList.add("isSelected");
  }
});
