let optionsContainer = document.querySelector(".options-container");
let toolsContainer = document.querySelector(".tools-container");
let drawToolContainer = document.querySelector(".draw-tool-container");
let drawTool = document.querySelector(".draw");
let eraseToolContainer = document.querySelector(".erase-tool-container");
let eraseTool = document.querySelector(".erase");
let optionsContainerVisible = true,
  drawToolContainerVisible = false,
  eraseToolContainerVisible = false;

/** Hides and shows the tools container when the icon is clicked. */
optionsContainer.addEventListener("click", e => {
  optionsContainerVisible = !optionsContainerVisible;

  if (optionsContainerVisible) {
    showTools();
  } else {
    hideTools();
  }
});

/**
 * Function to show the tools by updating the icon
 * and displaying the tools container.
 */
function showTools() {
  let iconElement = optionsContainer.children[0];
  iconElement.classList.remove("fa-bars");
  iconElement.classList.add("fa-xmark");
  iconElement.removeAttribute("title");
  iconElement.setAttribute("title", "Hide Tools");
  toolsContainer.style.display = "flex";
}

/**
 * Hides the tools by updating the icon
 * and hiding the tool containers.
 */
function hideTools() {
  let iconElement = optionsContainer.children[0];
  iconElement.classList.remove("fa-xmark");
  iconElement.classList.add("fa-bars");
  iconElement.removeAttribute("title");
  iconElement.setAttribute("title", "Show Tools");
  toolsContainer.style.display = "none";
  drawToolContainer.style.display = "none";
  eraseToolContainer.style.display = "none";
}

/** Hides and shows the Draw tool container when the icon is clicked. */
drawTool.addEventListener("click", e => {
  drawToolContainerVisible = !drawToolContainerVisible;
  if (drawToolContainerVisible) {
    if (eraseToolContainerVisible) eraseTool.click();
    drawToolContainer.style.display = "block";
  } else {
    drawToolContainer.style.display = "none";
  }
});

/** Hides and shows the Erase tool container when the icon is clicked. */
eraseTool.addEventListener("click", e => {
  eraseToolContainerVisible = !eraseToolContainerVisible;
  if (eraseToolContainerVisible) {
    if (drawToolContainerVisible) drawTool.click();
    eraseToolContainer.style.display = "flex";
  } else {
    eraseToolContainer.style.display = "none";
  }
});
