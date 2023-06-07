const sidebar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle"),
      body = document.querySelector("body"),
      modeToggle = document.querySelector(".mode-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    //keep toggle status when refreshed
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
});

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    //keep dark mode when refreshed
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});