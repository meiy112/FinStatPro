import Calculation from "./Calculation.js";

const deleteRecentButtonList = document.querySelectorAll(".trash-icon"),
      addButton = document.querySelector(".add-button"),
      recentCalculations = document.querySelector(".recent-calculations"),
      activeCalculations = document.querySelector(".active-calculations"),
      cancelButton = document.querySelector(".cancel-button");


//List of all calculations in recents
let calculationList = [];


// ===== ADD EVENT LISTENERS =====
for (var i = 0; i < deleteRecentButtonList.length; i++) {
    let deleteRecentButton = deleteRecentButtonList[i];
    deleteRecentButton.addEventListener("click", e => {
        onRecentDeleteButtonClick(e);
    })
}

addButton.addEventListener("click", () => {
    let date = new Date();
    let yyyy = date.getFullYear();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');

    date = yyyy + '-' + mm + '-' + dd;
    let calculation = new Calculation("Untitled", date)

    calculationList.push(calculation);
    addCalculation(calculation);
});

cancelButton.addEventListener("click", () => {
    const modal = document.querySelector(".delete-modal");
    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
})


// ===== BUTTON FUNCTIONALITY =====
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
                    <i class='bx bx-dots-horizontal-rounded option-icon'></i>

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
    })

    row.querySelector(".r-date").innerHTML = calculation.getCalculationDate();
    row.querySelector(".r-title").innerHTML = calculation.getTitle();

    if (calculation.getIsActive()) {
        row.classList.add("selected");
        addActiveCalculation(calculation);
    }
}

function deleteCalculation(button) {
    let index = getNodeIndex(button);
    calculationList.splice(index, 1);

    console.log(calculationList);

    button.target.closest("li").remove();

    let activeList = document.querySelectorAll(".a-calculation");
    activeList[index].remove();
}

function addActiveCalculation(calculation) {
    activeCalculations.insertAdjacentHTML("beforeend", getActiveCalculationHtml());

    const row = document.querySelector(".active-calculations li:last-of-type");

    row.querySelector(".a-date").innerHTML = calculation.getCalculationDate();
    row.querySelector(".a-title").innerHTML = calculation.getTitle();
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


// ===== SAVE AND LOAD =====

//EFFECT: load all calculations in recent calculations list
function loadCalculations(list) {
    for (var i = 0; i < list.length; i++) {
        let calculation = list[i];
        addCalculation(calculation);
    }
}