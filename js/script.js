// Replace Text in the Header
const checkReplace = document.querySelector(".replace-me");

if (checkReplace !== null) {
  const replace = new ReplaceMe(checkReplace, {
    animation: "animated fadeIn",
    speed: 2000,
    separator: ",",
    loopCount: "infinite",
    autoRun: true,
  });
}

// Adding a dark background to the navigation bar when scrolling

// function userScroll() {
//   const navbar = document.querySelector(".navbar");

//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 50) {
//       navbar.classList.add("bg-dark");
//       navbar.classList.add("border-bottom");
//       navbar.classList.add("border-secondary");
//       navbar.classList.add("navbar-sticky");
//     } else {
//       navbar.classList.remove("bg-dark");
//       navbar.classList.remove("border-bottom");
//       navbar.classList.remove("border-secondary");
//       navbar.classList.remove("navbar-sticky");
//     }
//   });
// }

// document.addEventListener("scroll", userScroll);

// Video Modal

const videoBtn = document.querySelector(".video-btn");
const videoModal = document.querySelector("#videoModal");
const video = document.querySelector("#video");
let videoSrc;

if (videoBtn !== null) {
  videoBtn.addEventListener("click", () => {
    videoSrc = videoBtn.getAttribute("data-bs-src");
  });
}

if (videoModal !== null) {
  videoModal.addEventListener("shown.bs.modal", () => {
    video.setAttribute(
      "src",
      videoSrc + "?autoplay=1;modestbranding=1;showInfo=0"
    );
  });

  videoModal.addEventListener("hide.bs.modal", () => {
    video.setAttribute("src", videoSrc);
  });
}

// IO for the navigation

const navigation = document.querySelector(".navbar");
const navigationHeight = navigation.getBoundingClientRect().height;
const header = document.querySelector(".header");

const stickyNavigation = function (entries) {
  const [myEntry] = entries;
  if (!myEntry.isIntersecting) {
    navigation.classList.add(
      "sticky-top",
      "navbar-sticky",
      "bg-dark",
      "border-bottom"
    );
  } else {
    navigation.classList.remove(
      "sticky-top",
      "navbar-sticky",
      "bg-dark",
      "border-bottom"
    );
  }
};

const HeaderOptions = {
  root: null,
  rootMargin: `-${navigationHeight}px`,
  threshold: 0,
};

const headerObserver = new IntersectionObserver(
  stickyNavigation,
  HeaderOptions
);

headerObserver.observe(header);

// IO for all sections

const allSections = document.querySelectorAll(".mySection");

const displaySection = function (entries, observer) {
  const [myEntry] = entries;
  if (!myEntry.isIntersecting) return;
  myEntry.target.classList.remove("section-hidden");
  observer.unobserve(myEntry.target);
};

const SectionOptions = {
  root: null,
  threshold: 0.05,
};

const sectionObserver = new IntersectionObserver(
  displaySection,
  SectionOptions
);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // hide all the sections in the beginning
  section.classList.add("section-hidden");
});

// IO for lazy loading images

const allImages = document.querySelectorAll("img[data-src]");

const displayImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
      });
    }
  });
};

const iOptions = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};

const imageObs = new IntersectionObserver(displayImg, iOptions);

allImages.forEach((img) => imageObs.observe(img));
