let currentPage = 0;
let totalPages = 1;
let countdownSeconds = 5400; // 1:30:00
let gameData = [];

async function fetchData() {
  try {
    const res = await fetch("data.json?_=" + new Date().getTime());
    const data = await res.json();
    gameData = data.pages || [];
    countdownSeconds = data.countdown || 5400;
    totalPages = gameData.length;
    updatePage();
    updateIndicators();
  } catch (e) {
    console.error("Fehler beim Laden der Daten:", e);
  }
}

function updatePage() {
  const page = gameData[currentPage] || [];
  const gameList = document.getElementById("gameList");
  gameList.innerHTML = "";
  page.forEach(item => {
    const div = document.createElement("div");
    div.className = "game " + item.status;
    div.textContent = item.name;
    gameList.appendChild(div);
  });
  document.getElementById("pageIndicator").textContent = (currentPage + 1) + "/" + totalPages;
  updateIndicators();
}

function updateIndicators() {
  const container = document.getElementById("pageToggles");
  container.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const div = document.createElement("div");
    div.className = "page-indicator" + (i === currentPage ? " active" : "");
    container.appendChild(div);
  }
}

function startAutoSwitch() {
  setInterval(() => {
    currentPage = (currentPage + 1) % totalPages;
    updatePage();
  }, 5000);
}

function startCountdown() {
  const el = document.getElementById("countdown");
  setInterval(() => {
    if (countdownSeconds > 0) countdownSeconds--;
    const h = Math.floor(countdownSeconds / 3600);
    const m = Math.floor((countdownSeconds % 3600) / 60);
    const s = countdownSeconds % 60;
    el.textContent = \`\${h.toString().padStart(2, "0")}:\${m.toString().padStart(2, "0")}:\${s.toString().padStart(2, "0")}\`;
  }, 1000);
}

fetchData();
startAutoSwitch();
startCountdown();