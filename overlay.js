async function fetchData() {
  const response = await fetch('data.json');
  const data = await response.json();

  document.getElementById('title').textContent = data.title;
  document.getElementById('progress').textContent = data.progress;
  document.getElementById('timer').textContent = data.timer;

  const list = document.getElementById('task-list');
  list.innerHTML = '';

  data.tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.add(task.status); // 'done', 'partial', 'todo'
    list.appendChild(li);
  });
}

setInterval(fetchData, 5000);
fetchData();