let countdownTime = 0;
let countdownActive = false;

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function startCountdown() {
  if (!countdownActive || countdownTime <= 0) return;
  countdownTime--;
  document.getElementById("timer").textContent = formatTime(countdownTime);
  if (countdownTime <= 0) countdownActive = false;
}

async function fetchData() {
  const response = await fetch('data.json?_=' + new Date().getTime());
  const data = await response.json();

  document.getElementById('title').textContent = data.title;
  document.getElementById('progress').textContent = data.progress;

  const list = document.getElementById('task-list');
  list.innerHTML = '';

  data.tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.add(task.status);
    list.appendChild(li);
  });

  if (data.countdown) {
    const [h, m, s] = data.countdown.split(':').map(Number);
    countdownTime = h * 3600 + m * 60 + s;
    countdownActive = true;
  }
}

setInterval(fetchData, 15000);
setInterval(startCountdown, 1000);
fetchData();