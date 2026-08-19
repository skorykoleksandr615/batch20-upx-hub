(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add("is-solid");
    else header.classList.remove("is-solid");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var field = document.querySelector(".lift-field");
  if (field && !reduce) {
    for (var i = 0; i < 18; i++) {
      var d = document.createElement("span");
      d.className = "lift-dot";
      d.style.left = Math.random() * 100 + "%";
      d.style.animationDelay = (Math.random() * 7).toFixed(2) + "s";
      d.style.opacity = String(0.25 + Math.random() * 0.5);
      field.appendChild(d);
    }
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal,.game-card,.odds-row,.bonus-box,.promo-fx").forEach(function (el) {
      io.observe(el);
    });
  }
})();
