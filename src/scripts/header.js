const btn = document.querySelector(".menu__btn");
const ul = document.querySelector(
  "body > header > div > div.header__wrapper > nav > div.header__menu > ul"
);

btn.addEventListener("click", function () {
  if (!ul.classList.contains("active")) {
    ul.classList.add("active");
  } else {
    ul.classList.remove("active");
  }
});
