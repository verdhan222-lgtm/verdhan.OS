// ===== Boot Animation =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
    const bootScreen = document.getElementById("bootScreen");
    if (bootScreen) bootScreen.style.display = "none";
  }, 2000);
});

// ===== Mobile Detection =====
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// ===== Window Open/Close =====
function openWindow(id) {
  const el = document.getElementById(id);
  if (!el.classList.contains("active")) {
    el.style.display = "block";
    el.classList.add("active");

    // Desktop initial position & size
    if (!isMobile) {
      if (id === "artWindow" || id === "projectsWindow" || id === "experimentationWindow") {
        el.style.width = "773px";
        el.style.height = "556px";
      } else {
        el.style.width = "480px";
        el.style.height = "350px";
      }

      const width = parseInt(el.style.width);
      const height = parseInt(el.style.height);

      el.style.left = (window.innerWidth / 2 - width / 2) + "px";
      el.style.top = (window.innerHeight / 2 - height / 2) + "px";
    }

    bringToFront(el);
    makeDraggable(el);
  }
}

function closeWindow(id) {
  const el = document.getElementById(id);
  el.style.display = "none";
  el.classList.remove("active");
}

// ===== Bring window to front =====
function bringToFront(el) {
  document.querySelectorAll(".window").forEach(win => win.style.zIndex = 0);
  el.style.zIndex = 1000;
}

// ===== Draggable Windows =====
function makeDraggable(el) {
  const header = el.querySelector(".window-header");
  let isDown = false;
  let offsetX, offsetY;

  // Disable dragging on mobile
  if (isMobile) return;

  header.style.cursor = "move";

  header.onmousedown = (e) => {
    e.preventDefault();
    isDown = true;
    bringToFront(el);

    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  function drag(e) {
    if (!isDown) return;

    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    // Keep inside viewport
    left = Math.max(0, Math.min(left, window.innerWidth - el.offsetWidth));
    top = Math.max(0, Math.min(top, window.innerHeight - el.offsetHeight));

    window.requestAnimationFrame(() => {
      el.style.left = left + "px";
      el.style.top = top + "px";
    });
  }

  function stopDrag() {
    isDown = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  }
}

// ===== Taskbar Clock =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,"0");
  const m = String(now.getMinutes()).padStart(2,"0");
  document.getElementById("taskbarClock").textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== Start Menu Toggle =====
function toggleStartMenu() {
  document.getElementById("startMenu").classList.toggle("show");
}

// ===== Open Project Link =====
function openProject(link) {
  window.open(link, "_blank");
}

// ===== Disable resizing on mobile =====
if (isMobile) {
  document.querySelectorAll(".window").forEach(win => {
    win.style.resize = "none";
  });
}
