// script.js

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
  const scrollThreshold = 2400

  const leftNumber = document.querySelector('.page-number-left');
  const rightNumber = document.querySelector('.page-number-right');

  if (window.scrollY > scrollThreshold) {
    leftNumber.classList.add('show-page-numbers');
    rightNumber.classList.add('show-page-numbers');
  } else {
    leftNumber.classList.remove('show-page-numbers');
    rightNumber.classList.remove('show-page-numbers');
  }
});


// Red Scan Line 

document.addEventListener('DOMContentLoaded', function () {
  const scanline = document.querySelector('.scanline');
  let animationRunning = false;
  let shouldAnimate = false;

  function animateScanline() {
    if (!scanline || animationRunning || !shouldAnimate) return;

    animationRunning = true;

    // Move scanline to center
    scanline.style.transition = 'transform 2s linear';
    scanline.style.transform = 'translateX(calc(51.7vw - 22px))';

    function onMoveToCenter(event) {
      if (event.propertyName !== 'transform') return;

      scanline.removeEventListener('transitionend', onMoveToCenter);

      // Pause 0.5s, then move back off-screen right
      setTimeout(() => {
        scanline.style.transition = 'transform 2s linear';
        scanline.style.transform = 'translateX(105vw)';

        scanline.addEventListener('transitionend', onMoveBack);
      }, 100);
    }

    function onMoveBack(event) {
      if (event.propertyName !== 'transform') return;

      scanline.removeEventListener('transitionend', onMoveBack);

      // Restart if still within scroll range
      animationRunning = false;
      if (shouldAnimate) {
        setTimeout(animateScanline, 50); // slight delay avoids overlap
      }
    }

    scanline.addEventListener('transitionend', onMoveToCenter);
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;


    const vh = window.innerHeight;
    if (scrollY >= 1.8 * vh && scrollY < 2.2 * vh) {
      shouldAnimate = true;
      scanline.style.opacity = '1';

      if (!animationRunning) {
        scanline.style.transition = 'none';
        scanline.style.transform = 'translateX(100vw)';
        scanline.offsetHeight; // force reflow
        animateScanline();
      }
    } else {
      shouldAnimate = false;
      animationRunning = false;
      scanline.style.transition = 'none';
      scanline.style.transform = 'translateX(100vw)';
      scanline.style.opacity = '0';
    }
  });

  // Initialize state
  if (scanline) {
    scanline.style.opacity = '0';
    scanline.style.transform = 'translateX(100vw)';
  }
});
