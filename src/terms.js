const terms = document.querySelectorAll('.term'),
    searchInput = document.querySelector('.search-input'),
    searchbar = document.querySelector('.searchbar'),
    searchButton = document.querySelector('.search-button'),
    labelStars = document.querySelectorAll('.label-star'),
    selectBox = document.querySelector('#select-box');


//===== ADD EVENT LISTENERS =====
// to expand labels
for (var i = 0; i < terms.length; i++) {
    let term = terms[i];
    term.addEventListener("click", (e) => {
        onTermClick(term, e);
    })
};

for (var i = 0; i < labelStars.length; i++) {
    let star = labelStars[i];
    star.addEventListener("click", () => {
        onLabelStarClick(star);
    })
};


//let searchbar filter terms
searchInput.addEventListener('input', filterList);

selectBox.addEventListener('change', function () {
    if (this.value == "all") {
        terms.forEach((item) => {
            item.style.display = '';
        });
    }

    if (this.value == "starred") {
        terms.forEach((item) => {
            if (item.classList.contains("starred")) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
});

//change colour of searchbar background when text input is focused
searchInput.addEventListener('focus', () => {
    searchbar.classList.add('focused-searchbar');
})
searchInput.addEventListener('focusout', () => {
    searchbar.classList.remove('focused-searchbar');
})


//button press unfocuses search input
searchButton.addEventListener('click', () => {
    searchInput.blur();
})
//enter key also triggers button press
searchInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault;
        searchButton.click();
    }
})


// ===== FUNCTIONS ====
//filter terms based on searchbar input
function filterList() {
    const filter = searchInput.value.toLowerCase();

    terms.forEach((item) => {
        let text = item.querySelector('.label-title').textContent;

        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function onTermClick(term, e) {
    let wasStarClicked = false;
    for (var i = 0; i < labelStars.length; i++) {
        if (e.target == labelStars[i]) {
            wasStarClicked = true;
        }
    }

    if (!wasStarClicked) {
        term.classList.toggle('clicked');
    }
}

function onLabelStarClick(star) {
    let term = star.closest("li");

    if (term.classList.contains("starred") && !star.classList.contains("bx-star")) {
        term.classList.remove("starred");
        star.classList.remove("bxs-star");
        star.classList.add("bx-star");
    } else {
        term.classList.add("starred");
        star.classList.remove("bx-star");
        star.classList.add("bxs-star");
    }
}