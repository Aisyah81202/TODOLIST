const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    filterTasks(currentFilter);
}

let currentFilter = 'all';

function filterTasks(filter) {
    currentFilter = filter;
    const allTasks = document.querySelectorAll('#list-container li');
    allTasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'completed':
                if (task.classList.contains('checked')) {
                    task.style.display = '';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (task.classList.contains('checked')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = '';
                }
                break;
        }
    });
}

showTask();
