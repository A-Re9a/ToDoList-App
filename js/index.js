
var tasksContainer = [];
if (localStorage.getItem("tasks") != null && localStorage.getItem("tasks") != undefined && localStorage.getItem("tasks") != "") {
    tasksContainer = JSON.parse(localStorage.getItem("tasks"));
    disPlaytasks();
}
var taskName = document.getElementById("taskNameInput");
var myIndex = 0;
var inAddMode = true;
// ************focus on input ********************
window.onload = () => {
    taskName.focus();
}
// ************focus on input ********************
// ************update local storage ********************
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksContainer));
}
// ************update local storage ********************
// ************add task ********************
function addtask() {
    if (valid(taskNameInput, 'nameAlert')) {
        var task = {
            name: taskName.value,
            done: false,
        }
        if (inAddMode) {
            tasksContainer.push(task);
        } else {
            tasksContainer.splice(myIndex, 1, task);
            inAddMode = true;
        }
        updateLocalStorage();
        disPlaytasks();
        clear();
    } else {
        alert('Please add tasks in your todo list')
    }
}
// ************add task ********************
// ************disPlay tasks ********************
function disPlaytasks() {
    var cartoona = "";
    for (var i = 0; i < tasksContainer.length; i++) {
        cartoona += `
                    <div class="todo_list">
                    <ul>
                        <li>
                            <div class="d-flex align-items-center justify-content-between">
                            <label>
                                <div class="todo_element">
                                <span class="element_title" onclick="checktask(${i})" style="text-decoration:${tasksContainer[i].done ? "line-through" : "none"}">${tasksContainer[i].name}</span>
                                </div>
                            </label>
                            <button class="btn-delete" onclick="deletetask(${i})"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </li>
                    </ul>
                    </div>
    `
    }
    document.getElementById("todo").innerHTML = cartoona;
}
// ************disPlay tasks ********************
// ************clear inputs ********************
function clear() {
    taskName.value = "";
    taskName.classList.remove('is-valid')
}
// ************clear inputs ********************
// ************delete task ********************
function deletetask(index) {
    tasksContainer.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksContainer));
    disPlaytasks();
    updateLocalStorage();
}
// ************delete task ********************

//******************** * validation************
function valid(element, alertId) {
    var msg = document.getElementById(alertId);
    var regEx = {
        taskNameInput: /[A-Za-z\s.'-,!?]{3,}$/,
    };
    if (regEx[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove('d-none');
        return false;
    }
}
//******************** * validation************
// ************check task ********************
function checktask(index) {
    if (tasksContainer[index].done == false) {
        tasksContainer[index].done = true;
    } else {
        tasksContainer[index].done = false;
    }
    updateLocalStorage();
    disPlaytasks();
}
// ************check task ********************
// ************delete all tasks ********************
function deleteAllTasks() {
    tasksContainer = [];
    updateLocalStorage();
    disPlaytasks();
}
// ************delete all tasks ********************

