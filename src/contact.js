const contactForm = document.querySelector("#contact-form");
const submitButton = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector(".message");
const phoneInput = document.querySelector("#phone");

//Get needed data from email JS
const publicKey = "PfGCyxHTRgnESZzLX";
const serviceID = "service_9jce9fi";
const templateID = "template_43xsw8u";

//Initialize email JS with public key
emailjs.init(publicKey);

contactForm.addEventListener("submit", e => {
    e.preventDefault();

    submitButton.innerText = "Just a Moment...";

    const inputFields = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }

    emailjs.send(serviceID, templateID, inputFields)
    .then(() => {
        submitButton.innerText = "Message Sent Successfully";

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }, (error) => {
        console.log(error);

        submitButton.innerText = "Something went wrong";
    })
})

nameInput.addEventListener("focus", () => {
    nameInput.closest(".container").classList.add("selected");
})

nameInput.addEventListener("focusout", () => {
    nameInput.closest(".container").classList.remove("selected");
})


emailInput.addEventListener("focus", () => {
    emailInput.closest(".container").classList.add("selected");
})

emailInput.addEventListener("focusout", () => {
    emailInput.closest(".container").classList.remove("selected");
})


phoneInput.addEventListener("focus", () => {
    phoneInput.closest(".container").classList.add("selected");
})

phoneInput.addEventListener("focusout", () => {
    phoneInput.closest(".container").classList.remove("selected");
})


messageInput.addEventListener("focus", () => {
    messageInput.classList.add("selected");
})

messageInput.addEventListener("focusout", () => {
    messageInput.classList.remove("selected");
})