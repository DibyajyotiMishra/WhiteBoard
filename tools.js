let optionsContainer = document.querySelector(".options-container");
let toolsContainer = document.querySelector(".tools-container");
let drawToolContainer = document.querySelector(".draw-tool-container");
let drawTool = document.querySelector(".draw");
let eraseToolContainer = document.querySelector(".erase-tool-container");
let eraseTool = document.querySelector(".erase");
let optionsContainerVisible = true,
  drawToolContainerVisible = false,
  eraseToolContainerVisible = false;
optionsContainer.addEventListener("click", e => {
  optionsContainerVisible = !optionsContainerVisible;

  if (optionsContainerVisible) {
    showTools();
  } else {
    hideTools();
  }
});

function showTools() {
  let iconElement = optionsContainer.children[0];
  iconElement.classList.remove("fa-bars");
  iconElement.classList.add("fa-xmark");
  iconElement.removeAttribute("title");
  iconElement.setAttribute("title", "Hide Tools");
  toolsContainer.style.display = "flex";
}

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

drawTool.addEventListener("click", e => {
  drawToolContainerVisible = !drawToolContainerVisible;
  if (drawToolContainerVisible) {
    if (eraseToolContainerVisible) eraseTool.click();
    drawToolContainer.style.display = "block";
  } else {
    drawToolContainer.style.display = "none";
  }
});

eraseTool.addEventListener("click", e => {
  eraseToolContainerVisible = !eraseToolContainerVisible;
  if (eraseToolContainerVisible) {
    if (drawToolContainerVisible) drawTool.click();
    eraseToolContainer.style.display = "flex";
  } else {
    eraseToolContainer.style.display = "none";
  }
});
