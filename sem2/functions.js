// functions.js

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".video");
  const welcome = document.querySelector(".welcome");

  welcome.addEventListener("click", function () {
    welcome.classList.remove("visible");
    video.muted = false;
    video.play().catch(err => {
      console.error("Playback error:", err);
  });
});

  const appliedTimes = {};

  video.addEventListener("timeupdate", function () {
    const changesAtCurrentTime = classChanges.filter(
      change => video.currentTime >= change.time && !appliedTimes[change.time]
    );

    changesAtCurrentTime.forEach(change => {
      const elements = document.querySelectorAll(change.target);

      if (change.remove) {
        const removeClasses = Array.isArray(change.remove) ? change.remove : [change.remove];
        elements.forEach(el => removeClasses.forEach(cls => el.classList.remove(cls)));
      }

      if (change.add) {
        const addClasses = Array.isArray(change.add) ? change.add : [change.add];
        elements.forEach(el => addClasses.forEach(cls => el.classList.add(cls)));
      }

      appliedTimes[change.time] = true;
    });
  });
});


// Image Slideshow 

$(document).ready(function () {
  const duration = 6000; 
  const transition = 500;

  // Hide all except the first image
  $("#slideshow > div").hide().eq(0).show();

  let current = 0;
  const slides = $("#slideshow > div");
  const total = slides.length;

  setInterval(function () {
    slides.eq(current).fadeOut(transition);

    current = (current + 1) % total;

    slides.eq(current).fadeIn(transition);
  }, duration);
});

// Page Numbers 

window.addEventListener('scroll', function () {
  const scrollThreshold = 5000

  const pageNumber = document.querySelector('.page-number');

  if (window.scrollY > scrollThreshold) {
    pageNumber.classList.add('show-page-numbers');
  } else {
    pageNumber.classList.remove('show-page-numbers');
  }
});

// Page Number Roman Swap
window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  const pageNumber = document.querySelector('.page-number');
  if (!pageNumber) return;

  let newNumber = '';

  if (scrollY < 13700) {
    newNumber = 'I';
  } else if (scrollY >= 13700 && scrollY < 27500) {
    newNumber = 'II';
  } else if (scrollY >= 27500 && scrollY < 38900) {
    newNumber = 'III';
  } else if (scrollY >= 38900 && scrollY < 43500) {
    newNumber = 'IV';
  } else if (scrollY >= 43500) {
    newNumber = '';
  } 

  // Only trigger fade if text actually changes
  if (pageNumber.textContent !== newNumber) {
    fadeText(pageNumber, newNumber);
  }
});


// Sticky Title Left

window.addEventListener('scroll', function () {
  const fadeInThreshold = 5000
  const pageNumber = document.querySelector('.left-label');
  const scrollY = window.scrollY;

  // Fade in the label at 3800px
  if (scrollY > fadeInThreshold) {
    pageNumber.classList.add('show-left-label');
  } else {
    pageNumber.classList.remove('show-left-label');
  }

  // Determine which word should be shown
  let newText = '';

  if (scrollY < 13700) {
    newText = '396Hz';
  } else if (scrollY >= 13700 && scrollY < 27500) {
    newText = '417Hz';
  } else if (scrollY >= 27500 && scrollY < 38900) {
    newText = '528Hz';
  } else if (scrollY >= 38900 && scrollY < 43500) {
    newText = '◊Hz';
  } else if (scrollY >= 43500) {
    newText = 'Credits';
  } 
  
  

  // Only trigger fade if the text actually changes
  if (pageNumber.textContent !== newText) {
    fadeText(pageNumber, newText);
  }
});

// helper function for fading text
function fadeText(element, newText) {
  element.classList.add('fade-out');
  setTimeout(() => {
    element.textContent = newText;
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
    setTimeout(() => element.classList.remove('fade-in'), 400); // clean up
  }, 300); // duration matches fade-out timing
}


// Sticky Title Right

  window.addEventListener('scroll', function() {
    const label = document.querySelector('.right-label');
    if (!label) return;

    if (window.scrollY >= 5000) {
      label.classList.add('visible');
    } else {
      label.classList.remove('visible');
    }
  });

  // Right Label Dot Progress
window.addEventListener('scroll', function () {
  const label = document.querySelector('.right-label');
  const dot = document.querySelector('.indicator-dot');
  if (!label || !dot) return;

  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Show label after 5000px
  if (scrollY >= 5000) {
    label.classList.add('visible');
  } else {
    label.classList.remove('visible');
  }

  // Move the dot across the label as the user scrolls
  let progress = scrollY / docHeight;
  progress = Math.min(Math.max(progress, 0), 1); // clamp between 0–1

  const labelWidth = label.offsetWidth;
  const dotWidth = dot.offsetWidth;
  const maxMove = labelWidth - dotWidth;
  const moveX = maxMove * progress;

  dot.style.transform = `translateX(${moveX}px)`;
});




// Falling Paper Animation
document.addEventListener("DOMContentLoaded", function () {
  const paper = document.querySelector('.paper');
  if (!paper) return; // exit if no paper div on this page

  function resetPaper() {
    const container = document.querySelector('.container.height100.h1flex.bg-lightblue');
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const startX = Math.random() * containerWidth;
    paper.style.left = `${startX}px`;
    paper.style.top = `-120px`;

    const rotateSpeed = 2 + Math.random() * 4;
    const direction = Math.random() > 0.5 ? 1 : -1;

    let y = -100;
    let x = startX;
    let angle = 0;
    let drift = (Math.random() - 0.5) * 1;

    function fall() {
      y += 1 + Math.random() * 1.5;
      x += Math.sin(y / 40) * 0.8 + drift;
      angle += rotateSpeed * direction;

      paper.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

      if (y < containerHeight + 100) {
        requestAnimationFrame(fall);
      } else {
        resetPaper();
      }
    }

    fall();
  }

  resetPaper();
});
