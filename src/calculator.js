import Calculation from "./Calculation.js";

const deleteRecentButtonList = document.querySelectorAll(".trash-icon"),
    addButton = document.querySelector(".add-button"),
    recentCalculations = document.querySelector(".recent-calculations"),
    activeCalculations = document.querySelector(".active-calculations"),
    cancelButton = document.querySelector(".cancel-button"),
    optionButtonList = document.querySelectorAll(".option-icon"),
    addModalButton = document.querySelector(".add-modal-button"),
    cancelModalButton = document.querySelector(".add-modal-cancel"),
    addModal = document.querySelector(".add-modal"),
    overlay = document.getElementById("overlay"),
    deleteModal = document.querySelector(".delete-modal");

const idGenerator = {
    id: 0,
    getNewId: function () {
        return this.id++;
    }
}


//activeCalculationList(element, Calculation); all active elements
const activeCalculationList = new Map();
//recentCalculationList(element, Calculation); all elements
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

addModalButton.addEventListener("click", () => {
    onAddModalButtonClick();
})

cancelModalButton.addEventListener("click", () => {
    onCancelModalButtonClick();
})


// ===== BUTTON FUNCTIONALITY =====
function onAddButtonClick() {
    addModal.classList.add("active");
    overlay.classList.add("active");
}

function onAddModalButtonClick() {
    const titleInput = document.querySelector(".title-input");
    let title = titleInput.value;

    let date = new Date();
    let yyyy = date.getFullYear();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');

    let id = idGenerator.getNewId();

    date = yyyy + '-' + mm + '-' + dd;
    let calculation = new Calculation(title, date, id);

    addCalculation(calculation);
    onCancelModalButtonClick();
}

function onCancelModalButtonClick() {
    addModal.classList.remove("active");
    overlay.classList.remove("active");
    const titleInput = document.querySelector(".title-input");
    titleInput.value = "";
}

function onCancelButtonClick() {
    const modal = document.querySelector(".delete-modal");
    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

function onRecentDeleteButtonClick(e) {
    deleteModal.classList.add("active");
    overlay.classList.add("active");

    let oldDeleteButton = document.querySelector(".delete-button");
    let newDeleteButton = oldDeleteButton.cloneNode(true);
    oldDeleteButton.parentNode.replaceChild(newDeleteButton, oldDeleteButton);
    newDeleteButton.addEventListener("click", () => {
        deleteCalculation(e);
        deleteModal.classList.remove("active");
        overlay.classList.remove("active");
    });
}

function onOptionButtonClick(e) {
    try {
    const optionDropdown = e.target.querySelector(".option-dropdown");
    optionDropdown.classList.toggle("active");
    } catch (e) {
        //dunno why its throwing an error but whatever lol
    }
}

function onCloseButtonClick(e) {
    let activeElement = e.target.closest("li");
    let activeValue = activeCalculationList.get(activeElement);
    let recentElement = getByValue(recentCalculationList, activeValue);

    activeCalculationList.delete(activeElement);

    recentCalculationList.get(recentElement).setIsActiveFalse();
    console.log(recentCalculationList);

    activeElement.remove();
    recentElement.classList.remove("selected");
}

function onRecentElementClick(recentElement) {
    let recentValue = recentCalculationList.get(recentElement);

    recentElement.classList.add("selected");

    recentValue.setIsActiveTrue();

    addActiveCalculation(recentValue);
}


// ===== RETURN HTML =====
function getCalculationHtml() {
    return `
    <li class="r-calculation">
        <p class="r-title">Untitled</p>
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

    const el = document.querySelector(".recent-calculations li:last-of-type");

    el.querySelector(".trash-icon").addEventListener("click", e => {
        onRecentDeleteButtonClick(e);
    });

    el.querySelector(".r-date").innerHTML = calculation.getCalculationDate();
    el.querySelector(".r-title").innerHTML = calculation.getTitle();

    if (calculation.getIsActive()) {
        el.classList.add("selected");
        addActiveCalculation(calculation);
    }

    el.querySelector(".r-title").addEventListener("click", () => {
        onRecentElementClick(el);
    })

    recentCalculationList.set(el, calculation);
    console.log(recentCalculationList);
}

function deleteCalculation(button) {
    let recentElement = button.target.closest("li");
    let recentValue = recentCalculationList.get(recentElement);

    console.log(recentCalculationList);
    console.log(activeCalculationList);

    if (recentValue.getIsActive()) {
        let activeElement = getByValue(activeCalculationList, recentValue);
        activeElement.remove()
        activeCalculationList.delete(activeElement);
    }

    recentCalculationList.delete(recentElement);
    recentElement.remove();
}

function addActiveCalculation(calculation) {
    activeCalculations.insertAdjacentHTML("beforeend", getActiveCalculationHtml());

    const el = document.querySelector(".active-calculations li:last-of-type");

    el.querySelector(".a-date").innerHTML = calculation.getCalculationDate();
    el.querySelector(".a-title").innerHTML = calculation.getTitle();

    el.querySelector(".option-icon").addEventListener("click", e => {
        onOptionButtonClick(e);
    });

    el.querySelector(".close-button").addEventListener("click", e => {
        onCloseButtonClick(e);
    })

    activeCalculationList.set(el, calculation);
    console.log(activeCalculationList);
}


// ===== MISC =====

//returns index of element in list
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