const terms = document.querySelectorAll('.term');
const searchInput = document.querySelector('.search-input');
const searchbar = document.querySelector('.searchbar');
const searchButton = document.querySelector('.search-button');


// Add event listener to expand labels
for (var i = 0; i < terms.length; i++) {
    let term = terms[i];
    terms[i].addEventListener("click", () => {
        term.classList.toggle('clicked');
    })
}


//let searchbar filter terms
searchInput.addEventListener('input', filterList);

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
searchInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault;
        searchButton.click();
    }
})


//function to filter terms based on searchbar input
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