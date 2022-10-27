let header = document.querySelector("header");
let body = document.querySelector("section");
let footer = document.querySelector("footer");
let splash = document.querySelector(".splash");
let yes = document.querySelector(".boolen .yes");
let no = document.querySelector(".boolen .no");
let back = document.querySelector(".back");

let data = window.performance.getEntriesByType("navigation")[0].type;

window.onclick = () => {
  sessionStorage.setItem("yes", "yes");
};

if (localStorage.getItem("agree")) {
  back.style.opacity = "0";
  back.style.display = "none";
}

no.onclick = () => {
  window.close();
};
yes.onclick = () => {
  back.style.display = "none";
  localStorage.setItem("agree", "yes");
};

if (
  history.length > "1" ||
  data === "reload" ||
  sessionStorage.getItem("yes")
) {
  splash.style.display = "none";
  header.style.opacity = "1";
  body.style.opacity = "1";
  footer.style.opacity = "1";
} else {
  header.style.opacity = "1";
  body.style.opacity = "1";
  footer.style.opacity = "1";
}
window.onload = setTimeout(() => {
  splash.style.display = "none";
}, 990);
