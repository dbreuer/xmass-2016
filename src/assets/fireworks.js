// fireworks.js - Colorful Fireworks Effect
/**
 * Created for Xmass 2025
 * Colorful fireworks effect
 */

var FireworksEffect = (function () {
  var canvas,
    ctx,
    particles = [],
    rockets = [],
    fireworks = [],
    running = false,
    animationId;
  var hue = 120;
  var timerTotal = 60,
    timerTick = 0;

  function init() {
    if (running) return;

    canvas = document.getElementById("xmas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    var parent = canvas.parentNode;
    var retina = window.devicePixelRatio > 1 ? 2 : 1;

    canvas.width = parent.offsetWidth * retina;
    canvas.height = parent.offsetHeight * retina;

    particles = [];
    rockets = [];
    fireworks = [];
    running = true;
    animate();
  }

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
    };
    this.alpha = 1;
    this.friction = 0.99;
    this.gravity = 0.3;
  }

  Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };

  Particle.prototype.update = function () {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.015;
  };

  function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = { x: 0, y: Math.random() * -3 - 2 };
    this.particles = [];
    this.lifespan = 120;
    this.hasExploded = false;
  }

  Firework.prototype.draw = function () {
    if (!this.hasExploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };

  Firework.prototype.explode = function () {
    var particleCount = Math.floor(Math.random() * 50) + 80;
    for (var i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  };

  Firework.prototype.update = function () {
    this.lifespan--;

    if (this.lifespan <= 0 && !this.hasExploded) {
      this.explode();
      this.velocity = { x: 0, y: 0 };
      this.hasExploded = true;
    } else if (this.lifespan > 0) {
      this.y += this.velocity.y;
      this.x += this.velocity.x;
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      this.particles[i].draw();

      if (this.particles[i].alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  };

  Firework.prototype.isDone = function () {
    return this.hasExploded && this.particles.length === 0;
  };

  function animate() {
    if (!running) return;

    animationId = requestAnimationFrame(animate);

    hue += 0.5;

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].draw();

      if (fireworks[i].isDone()) {
        fireworks.splice(i, 1);
      }
    }

    timerTick++;
    if (timerTick >= timerTotal) {
      var x = Math.random() * canvas.width;
      var color = "hsl(" + Math.random() * 360 + ", 100%, 60%)";
      fireworks.push(new Firework(x, canvas.height, color));
      timerTick = 0;
    }
  }

  function stop() {
    running = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    particles = [];
    rockets = [];
    fireworks = [];
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return {
    start: init,
    stop: stop,
  };
})();

// Export for use in Angular component
if (typeof window !== "undefined") {
  window.FireworksEffect = FireworksEffect;
}
