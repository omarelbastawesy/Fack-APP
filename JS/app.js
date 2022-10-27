const section = document.querySelector("section");
const charactersList = document.querySelector("section .main");
const searchBar = document.querySelector(".search .contain input");
const but = document.querySelector(".search .contain .img");
let hpCharacters = [];

but.addEventListener("click", () => {
  charactersList.innerHTML = "";

  const searchString = searchBar.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://api.npoint.io/e7fd96d5414fc3a8cfa2");
    hpCharacters = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      let image = document.createElement("div");
      image.className = "image";
      let img = document.createElement("img");
      img.src = character.img;

      image.appendChild(img);
      charactersList.appendChild(image);

      image.onclick = () => {
        details(
          character.img,
          character.name,
          character.info,
          character.ins,
          character.twit
        );
      };
    })
    .join("");
};

loadCharacters();

let head = document.querySelector(" header .head");
function details(photo, nam, data, insat, twitter) {
  section.innerHTML = "";
  head.innerText = "Details";

  let details = document.createElement("div");
  details.className = "details";
  let imageSel = document.createElement("div");
  imageSel.className = "imageSelected";
  let img = document.createElement("img");
  img.src = photo;
  let name = document.createElement("h2");
  name.innerText = nam;
  let social = document.createElement("div");
  social.className = "social";
  let info = document.createElement("p");
  info.innerText = data;
  let action = document.createElement("div");
  action.className = "action";

  section.appendChild(details);
  details.appendChild(imageSel);
  imageSel.appendChild(img);
  details.appendChild(name);
  details.appendChild(social);
  details.appendChild(info);
  details.appendChild(action);

  for (let i = 0; i < 2; i++) {
    let srcImg = ["../images/insta.png", "../images/twitter.png"];
    let srcP = [insat, twitter];
    let imgSocial = document.createElement("div");
    let image = document.createElement("div");
    image.className = "img";
    let img = document.createElement("img");
    img.src = srcImg[i];
    let p = document.createElement("p");
    p.innerText = srcP[i];

    social.appendChild(imgSocial);
    imgSocial.appendChild(image);
    imgSocial.appendChild(p);
    image.appendChild(img);
  }

  let loveImge = ["../images/love.png", "../images/lovedes.png"];
  let divlove = document.createElement("div");
  let divsend = document.createElement("div");
  let imglove = document.createElement("img");
  let imgsend = document.createElement("img");
  imglove.src = "../images/love.png";
  imgsend.src = "../images/telegram.png";

  divlove.onclick = () => {
    if (imglove.src.match(loveImge[1])) {
      imglove.src = loveImge[0];
    } else {
      imglove.src = loveImge[1];
    }
  };

  imgsend.addEventListener("click", () => {
    // Check for Web Share api support
    if (navigator.share) {
      // Browser supports native share api
      navigator
        .share({
          text: "Please read this great article: ",
          url: "https://www.google.com/",
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => console.error(err));
    } else {
      // Fallback
      alert(
        "The current browser does not support the share function. Please, manually share the link"
      );
    }
  });

  action.appendChild(divlove);
  action.appendChild(divsend);
  divlove.appendChild(imglove);
  divsend.appendChild(imgsend);
}
