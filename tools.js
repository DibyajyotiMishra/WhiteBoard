// tools.js

// UI elements
let optionsContainer = document.querySelector(".options-container");
let toolsContainer = document.querySelector(".tools-container");
let drawToolContainer = document.querySelector(".draw-tool-container");
let drawTool = document.querySelector(".draw");
let eraseToolContainer = document.querySelector(".erase-tool-container");
let eraseTool = document.querySelector(".erase");
let stickynoteTool = document.querySelector(".stickynote");
let uploadTool = document.querySelector(".upload");

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

/** Uploads an image into the canvas when the icon is clicked. */
uploadTool.addEventListener("click", e => {
  // Open file explorer on upload button click
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.addEventListener("change", e => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    // Add image to canvas
    let imageHtml = `
    <div class="container-header">
      <div class="close">
        <i class="fa-solid fa-xmark note-close-icon" title="Close"></i>
      </div>
      <div class="minimize">
        <i
          class="fa-solid fa-window-minimize note-minimize-icon"
          title="Minimize"
        ></i>
      </div>
    </div>
    <div class="note-container">
      <img src="${url}" alt="image" />
    </div>
    `;
    addInnerHtmlToStickyNote(imageHtml);
  });
});

/** Creates a new stickynote when the icon is clicked. */
stickynoteTool.addEventListener("click", e => {
  let noteHtml = `
    <div class="container-header">
      <div class="close">
        <i class="fa-solid fa-xmark note-close-icon" title="Close"></i>
      </div>
      <div class="minimize">
        <i
          class="fa-solid fa-window-minimize note-minimize-icon"
          title="Minimize"
        ></i>
      </div>
    </div>
    <div class="note-container">
      <textarea spellcheck="false"></textarea>
    </div>
  `;
  addInnerHtmlToStickyNote(noteHtml);
});

/**
 * Adds the given HTML content to a sticky note container and appends it to the body.
 *
 * @param {string} html - The HTML content to be added to the sticky note container.
 * @return {void}
 */
function addInnerHtmlToStickyNote(html) {
  // create the stickynote container
  let stickynoteContainer = document.createElement("div");

  stickynoteContainer.setAttribute("class", "stickynote-container");

  // set the header and content of the stickynote container
  stickynoteContainer.innerHTML = html;

  // append the stickynote container to the body
  document.body.appendChild(stickynoteContainer);

  // get minimize and close containers to add event listeners
  let closeElement = stickynoteContainer.querySelector(".close");
  let minimizeElement = stickynoteContainer.querySelector(".minimize");

  // implement minimize and close functionality
  stikcyNoteActions(closeElement, minimizeElement, stickynoteContainer);

  // implement drag and drop functionality
  stickynoteContainer.onmousedown = e => implementDnd(stickynoteContainer, e);
  stickynoteContainer.ondragstart = () => false;
}

/**
 * Implement the minimize and close functionality for sticky notes.
 *
 * @param {Element} closeElement - the element to close the sticky note
 * @param {Element} minimizeElement - the element to minimize the sticky note
 * @param {Element} stickynoteContainer - the container for the sticky note
 */
function stikcyNoteActions(closeElement, minimizeElement, stickynoteContainer) {
  closeElement.addEventListener("click", e => {
    stickynoteContainer.remove();
  });

  minimizeElement.addEventListener("click", e => {
    let noteContainer = stickynoteContainer.querySelector(".note-container");
    let displayValue =
      getComputedStyle(noteContainer).getPropertyValue("display");
    if (displayValue === "none") {
      noteContainer.style.display = "block";
    } else {
      noteContainer.style.display = "none";
    }
  });
}

/**
 * Implements drag and drop functionality for an element.
 *
 * @param {HTMLElement} element - The element to implement drag and drop on.
 * @param {MouseEvent} event - The mouse event that triggered the drag and drop.
 */
function implementDnd(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
