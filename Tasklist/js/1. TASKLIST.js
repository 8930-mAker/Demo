// UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const celarBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// run all events
loadEvent();

// run all events
function loadEvent() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', e => {
    let task;
    if (localStorage.getItem('task') === null) {
      task = [];
    } else {
      task = JSON.parse(localStorage.getItem('task'));
    }

    task.forEach(function (item) {
      const li = document.createElement('li');
      // add classname
      li.className = 'collection-item';
      // create textnode
      li.appendChild(document.createTextNode(item));
      // create delete btn
      const link = document.createElement('a');
      // add class
      link.className = 'delete-item secondary-content'
      // add icon html
      link.innerHTML = '<i class = "fa fa-remove"></i>';
      // append link to li
      li.appendChild(link);

      // append li to tasklist
      taskList.appendChild(li);
    });

  })

  // ADD task event
  form.addEventListener('submit', e => {
    // check input
    if (taskInput.value === '') {
      alert('Add a task');
    } else {

      // create li
      const li = document.createElement('li');
      // add classname
      li.className = 'collection-item';
      // create textnode
      li.appendChild(document.createTextNode(taskInput.value));
      // create delete btn
      const link = document.createElement('a');
      // add class
      link.className = 'delete-item secondary-content'
      // add icon html
      link.innerHTML = '<i class = "fa fa-remove"></i>';
      // append link to li
      li.appendChild(link);

      // append li to tasklist
      taskList.appendChild(li);

      // store in LS
      const storetask = (e) => {
        let task;
        if (localStorage.getItem('task') === null) {
          task = [];
        } else {
          task = JSON.parse(localStorage.getItem('task'));
        }

        task.push(e);
        localStorage.setItem('task', JSON.stringify(task));
      }

      storetask(taskInput.value);

      // clear input
      taskInput.value = '';
    }

    e.preventDefault();
  })

  // REMOVE task event
  taskList.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();

        // remove from LS
        const removeLs = (e) => {
          let task;
          if (localStorage.getItem('task') === null) {
            task = [];
          } else {
            task = JSON.parse(localStorage.getItem('task'));
          }

          task.forEach(function (item, index) {
            if (e.textContent === item) {
              // remove from the arrey in LS
              task.splice(index, 1);
              // remove temporaly
              // localStorage.removeItem(JSON.stringify(item));
              // localStorage.removeItem(e.textContent);
            }
          });

          localStorage.setItem('task', JSON.stringify(task));
        }

        removeLs(e.target.parentElement.parentElement)
      }
    }
  })

  // CLEAR task
  celarBtn.addEventListener('click', e => {
    // taskList.innerHTML = '';

    // FASTER
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    const clearLs = (e) => {
      localStorage.clear();
    }

    clearLs(e);
  })


  // FILTER task
  filter.addEventListener('keyup', e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (item) {

      const task = item.firstChild.textContent.toLowerCase();
      if (task.indexOf(text) != -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

  })

}
