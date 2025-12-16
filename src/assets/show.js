//show.js
/**
 * Created by David Breuer on 20/12/2016.
 *
 * @file show.js
 * @description Snow effect with start/stop control
 *
 */

var SnowEffect = (function () {
  var flakes = [],
    canvas,
    ctx,
    parent,
    retina,
    flakeCount = 450,
    animationId,
    running = false;

  function init() {
    if (running) return;

    canvas = document.getElementById("xmas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    parent = canvas.parentNode;
    retina = window.devicePixelRatio > 1 ? 2 : 1;

    if (parent.offsetWidth < 767) {
      flakeCount = 125;
    }

    canvas.width = parent.offsetWidth * retina;
    canvas.height = parent.offsetHeight * retina;

    flakes = [];
    for (var i = 0; i < flakeCount; i++) {
      var x = Math.floor(Math.random() * canvas.width),
        y = Math.floor(Math.random() * canvas.height),
        size = (Math.random() * 3 + getRandomInt(2, 4)) * retina,
        speed = (Math.random() * 1 + 0.2) * retina,
        opacity = Math.random() * 0.5 + 0.4;

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: Math.random() / 30,
        step: 0,
        opacity: opacity,
      });
    }

    running = true;
    snowFrame();
  }

  function snowFrame() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
      var flake = flakes[i],
        x = flake.x,
        y = flake.y;

      flake.velX *= 0.98;
      if (flake.velY <= flake.speed) {
        flake.velY = flake.speed;
      }
      flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;

      ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }

      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }
    animationId = requestAnimationFrame(snowFrame);
  }

  function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3 + getRandomInt(2, 4)) * retina;
    flake.speed = (Math.random() * 1 + 0.2) * retina;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = Math.random() * 0.5 + 0.4;
  }

  function stop() {
    running = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    flakes = [];
  }

  function handleResize() {
    if (running && canvas && parent) {
      canvas.width = parent.offsetWidth * retina;
      canvas.height = parent.offsetHeight * retina;
    }
  }

  // Auto-start on DOM load
  document.addEventListener("DOMContentLoaded", function (event) {
    init();
    window.addEventListener("resize", handleResize);
  });

  return {
    start: init,
    stop: stop,
  };
})();

// Export for global access
if (typeof window !== "undefined") {
  window.SnowEffect = SnowEffect;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
