import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");

const createGalleryElement = (element) => {
  return `<div class="gallery__item">
<a class="gallery__link" href=${element.original}>
  <img
    loading="lazy"
    class="gallery__image lazyload"
    data-src=${element.preview}
    data-source=${element.original}
    alt=${element.description}
  />
</a>
</div>`;
};

const createGalleryList = (elements) => {
  let galleryElementsString = "";
  elements.map(
    (element) => (galleryElementsString += createGalleryElement(element))
  );
  return galleryElementsString;
};
galleryContainer.insertAdjacentHTML(
  "afterbegin",
  createGalleryList(galleryItems)
);

galleryContainer.addEventListener("click", OnGalleryContainerClick);
let globalContent = "";

function OnGalleryContainerClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const { source } = event.target.dataset;
  const content = basicLightbox.create(
    `<img src="${source}" width="100%" height="100%">`
  );
  content.show();
  globalContent = content;
  window.addEventListener("keydown", pressEsc);
}

function pressEsc(event) {
  if (event.code === "Escape") {
    globalContent.close();
    window.removeEventListener("keydown", pressEsc);
  }
}
// Підключення скрипта для "ледачого" завантаження
if ("loading" in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll("img[loading]");
  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
} 
else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerpolicy = "no-referrer";
  document.body.appendChild(script);
}
