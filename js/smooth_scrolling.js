const buttons = document.getElementsByClassName("btn-smooth");
const navButtons = document.getElementsByClassName("btn-nav");
const htmlElement = document.getElementsByTagName("html");

[...buttons].map((button) => {
  button.addEventListener("click", () => {
    htmlElement[0].classList.add("scroll-btn");
    console.log('html element ', htmlElement);
  })
});

[...navButtons].map((button) => {
  button.addEventListener("click", () => {
    htmlElement[0].classList.remove("scroll-btn");
    console.log('html sin smooth', htmlElement);
  })
});


