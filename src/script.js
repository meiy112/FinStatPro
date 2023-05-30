const sidebar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});
