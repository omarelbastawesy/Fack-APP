// tag
let buttonA = document.querySelector(".tag .tagsA button");
let buttonB = document.querySelector(".tag .tagsB button");
let textAreaA = document.querySelector(".tag .tagsA textarea");
let textAreaB = document.querySelector(".tag .tagsB textarea");

Copy(buttonA, textAreaA);
Copy(buttonB, textAreaB);

function Copy(copy, text) {
  copy.addEventListener("click", () => {
    text.select();
    document.execCommand("copy");
  });
}
