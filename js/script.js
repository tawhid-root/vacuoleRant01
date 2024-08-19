let counter = 0;

let imageSliderElements = {
  // Access the Images
  slideImages: document.querySelectorAll(".slide-container .slides img"),

  // Access the next and prev buttons
  next: document.querySelector(".next"),
  prev: document.querySelector(".prev"),

  // Access the indicators
  dots: document.querySelectorAll(".dot"),
};

let imageSliderFunction = {
  // Code for next button
  slideNext: function () {
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
    if (counter >= slideImages.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
    indicators();
  },

  // Code for prev button
  slidePrev: function () {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
    if (counter == 0) {
      counter = slideImages.length - 1;
    } else {
      counter--;
    }
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
    indicators();
  },

  // Auto slideing
  autoSliding: function () {
    deletInterval = setInterval(timer, 3000);
    function timer() {
      slideNext();
      indicators();
    }
  },

  // Add and remove, active class from the indicators
  indicators: function () {
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[counter].className += " active";
  },

  // Add click event to the indicator
  switchImage: function (currentImage) {
    currentImage.classList.add("active");
    var imageId = currentImage.getAttribute("attr");
    if (imageId > counter) {
      slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
      counter = imageId;
      slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
    } else if (imageId == counter) {
      return;
    } else {
      slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
      counter = imageId;
      slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
    }
    indicators();
  },
};

//---------calling all function--------
next.addEventListener("click", slideNext);

prev.addEventListener("click", slidePrev);

autoSliding();

//--------------some small function-------------
// Stop auto sliding when mouse is over
const container = document.querySelector(".slide-container");
container.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

// Resume sliding when mouse is out
container.addEventListener("mouseout", autoSliding);
