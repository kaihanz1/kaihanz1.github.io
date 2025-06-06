// script.js
document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".video");
  const welcome = document.querySelector(".welcome");
  const movingImage = document.querySelector(".moving-element")

  welcome.addEventListener("click", function () {
    welcome.classList.remove("visible");
    movingImage.classList.add("visible")
    video.play();
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

// document.addEventListener('DOMContentLoaded', function () {
//   const element = document.querySelector('.moving-element');
//   let hasMoved = false;

//   window.addEventListener('scroll', function () {
//     const scrollY = window.scrollY || window.pageYOffset;
//     const triggerHeight = window.innerHeight;

//     if (!hasMoved && scrollY >= triggerHeight) {
//       element.style.transform = 'translateX(100vw)';
//       hasMoved = true;
//     }
//   });
// });

// Run every 3 seconds
// document.addEventListener('DOMContentLoaded', () => {
//   setInterval(swapImages, 3000); // Swap every 3 seconds
// });