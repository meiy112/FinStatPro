import Calculation from "./Calculation.js";

const deleteRecentButtonList = document.querySelectorAll(".trash-icon"),
      addButton = document.querySelector(".add-button"),
      recentCalculations = document.querySelector(".recent-calculations"),
      activeCalculations = document.querySelector(".active-calculations"),
      cancelButton = document.querySelector(".cancel-button"),
      optionButtonList = document.querySelectorAll(".option-icon");

const idGenerator = {
    id: 0,
    getNewId: function() {
        return this.id++;
    } 
}


//List of all active calculations in recents
const activeCalculationList = new Map();
//List of all calculations in recents
const recentCalculationList = new Map();

// ===== ADD EVENT LISTENERS =====
for (var i = 0; i < deleteRecentButtonList.length; i++) {
    let deleteRecentButton = deleteRecentButtonList[i];
    deleteRecentButton.addEventListener("click", e => {
        onRecentDeleteButtonClick(e);
    })
}

for (var i = 0; i < optionButtonList.length; i++) {
    let optionButton = optionButtonList[i];
    optionButton.addEventListener("click", e => {
        onOptionButtonClick(e);
    })

    optionButton.querySelector(".close-button").addEventListener("click", e => {
        onCloseButtonClick(e);
    })
}

addButton.addEventListener("click", () => {
    onAddButtonClick();
});

cancelButton.addEventListener("click", () => {
    onCancelButtonClick();
})


// ===== BUTTON FUNCTIONALITY =====
function onAddButtonClick() {
    let date = new Date();
    let yyyy = date.getFullYear();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');

    let id = idGenerator.getNewId();

    date = yyyy + '-' + mm + '-' + dd;
    let calculation = new Calculation("Untitled", date, id);

    addCalculation(calculation);
}

function onCancelButtonClick() {
    const modal = document.querySelector(".delete-modal");
    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

function onRecentDeleteButtonClick(e) {
    const modal = document.querySelector(".delete-modal");
    const overlay = document.getElementById("overlay");
    modal.classList.add("active");
    overlay.classList.add("active");

    let oldDeleteButton = document.querySelector(".delete-button");
    let newDeleteButton = oldDeleteButton.cloneNode(true);
    oldDeleteButton.parentNode.replaceChild(newDeleteButton, oldDeleteButton);
    newDeleteButton.addEventListener("click", () => {
        deleteCalculation(e);
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
}

function onOptionButtonClick(e) {
    const optionDropdown = e.target.querySelector(".option-dropdown");
    optionDropdown.classList.toggle("active");
}

function onCloseButtonClick(e) {
    let activeElement = e.target.closest(".a-calculation");
    let activeValue = activeCalculationList.get(activeElement);
    let recentElement = getByValue(recentCalculationList, activeValue);

    
}


// ===== RETURN HTML =====
function getCalculationHtml() {
    return `
    <li class="r-calculation">
        <div class="r-title">Untitled</div>
        <div class="r-date">2023-06-22</div>
        <i class='bx bx-trash trash-icon' ></i>
        <i class='bx bx-bookmark-alt save-icon' ></i>
    </li>
    `;
}

function getActiveCalculationHtml() {
    return `
    <li class="a-calculation">
                    <div class="indicator">
                        <div class="ball"></div>
                        <div class="line"></div>
                    </div>

                    <div class="title-date">
                        <span class="a-title">Untitled</span>
                        <span class="edit-icon-container">
                            <i class='bx bx-edit-alt edit-icon' ></i>
                        </span>
                        <div class="a-date">2023-06-22</div>
                    </div>
                    <i class='bx bx-dots-horizontal-rounded option-icon'>
                        <div class="option-dropdown">
                            <div class="save-button">Save</div>
                            <div class="close-button">Close</div>
                        </div>
                    </i>

                    <div class="table">
                        
                    </div>
                </li>
                `
}


// ===== ADD AND DELETE CALCULATIONS =====
function addCalculation(calculation) {
    recentCalculations.insertAdjacentHTML("beforeend", getCalculationHtml());

    const row = document.querySelector(".recent-calculations li:last-of-type");

    row.querySelector(".trash-icon").addEventListener("click", e => {
        onRecentDeleteButtonClick(e);
    });

    row.querySelector(".r-date").innerHTML = calculation.getCalculationDate();
    row.querySelector(".r-title").innerHTML = calculation.getTitle();

    if (calculation.getIsActive()) {
        row.classList.add("selected");
        addActiveCalculation(calculation);
    }

    recentCalculationList.set(row, calculation);
    console.log(recentCalculationList);
}

function deleteCalculation(button) {
    let recentElement = button.target.closest("li");
    let recentValue = recentCalculationList.get(recentElement);
    let activeElement = getByValue(activeCalculationList, recentValue);

    recentCalculationList.delete(recentElement);
    activeCalculationList.delete(activeElement);

    console.log(recentCalculationList);
    console.log(activeCalculationList);

    activeElement.remove()
    recentElement.remove();
}

function addActiveCalculation(calculation) {
    activeCalculations.insertAdjacentHTML("beforeend", getActiveCalculationHtml());

    const row = document.querySelector(".active-calculations li:last-of-type");

    row.querySelector(".a-date").innerHTML = calculation.getCalculationDate();
    row.querySelector(".a-title").innerHTML = calculation.getTitle();

    row.querySelector(".option-icon").addEventListener("click", e => {
        onOptionButtonClick(e);
    });

    activeCalculationList.set(row, calculation);
    console.log(activeCalculationList);
}


// ===== MISC =====

//EFFECT: returns index of element in list
function getNodeIndex(el) {
    let i = 0;
    while (el.previousElementSibling) {
        el = el.previousElementSibling;
        i++;
    }
    return i;
}

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }