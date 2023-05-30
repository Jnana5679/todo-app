let addButtonEl = document.getElementById("addButton");
let todoListContainer = document.getElementById("todoListContainer");
let saveButton = document.getElementById("saveButton");
let action = document.getElementById("action");
let alertPopUp = document.getElementById("alertPopUp");
let editAddedTodoContainer = document.getElementById("editAddedTodoContainer");
let userInputEl = document.getElementById("userInput");

let deleteConfirmation = (todoId) => {
    let deleteConfirmation = document.getElementById("deleteConfirmation");
    let deleteNoButton = document.getElementById("deleteNoButton");
    let deleteYesButton = document.getElementById("deleteYesButton");

    deleteConfirmation.style.zIndex = "0";

    deleteNoButton.onclick = () => {
        deleteConfirmation.style.zIndex = "-1";
    };

    deleteYesButton.onclick = () => {
        deleteConfirmation.style.zIndex = "-1";
        onDeleteIcon(todoId);
    };
}

let getTodoListFromLocalStorage = () => {
    let dataFromStorage = localStorage.getItem("todoList");
    let parsedData = JSON.parse(dataFromStorage);

    if (parsedData === null) {
        return [];
    } else {
        return parsedData;
    }
};

let todoList = getTodoListFromLocalStorage();

let editlabelPopUp = (todoListObject, labelId, todoId, checkboxId) => {

    let editAddedTodo = document.getElementById("editAddedTodo");
    let DoneButton = document.getElementById("DoneButton");
    let closeButton = document.getElementById("closeButton");
    let labelEl = document.getElementById(labelId);

    let checkedIndex = todoList.findIndex((eachTodo) => {
        let eachTodoId = "label" + eachTodo.uniqueNo;
        if (eachTodoId === labelId) {
            return true;
        } else {
            return false;
        }
    });

    if (todoListObject.isChecked === false) {

        editAddedTodoContainer.style.left = "50%";
        editAddedTodoContainer.style.transform = "translate(-50%,-150%)";
        editAddedTodo.value = todoListObject.text;

        DoneButton.onclick = () => {
            labelEl.textContent = editAddedTodo.value;

            todoListObject.text = editAddedTodo.value;

            editAddedTodo.value = "";
            editAddedTodoContainer.style.left = "0";
            editAddedTodoContainer.style.transform = "translate(50%,0)";

            autoSaveFunction();
        };

        closeButton.onclick = () => {
            editAddedTodo.value = "";
            editAddedTodoContainer.style.left = "0";
            editAddedTodoContainer.style.transform = "translate(50%,0)";
        };
    } else {
        alert("task already completed");
    }
};

let editTodoLabel = (labelId, todoId, checkboxId) => {
    let findObjectIndex = todoList.findIndex((eachTodo) => {
        let eachTodoId = "label" + eachTodo.uniqueNo;
        if (eachTodoId === labelId) {
            return true;
        } else {
            return false;
        }
    });

    let todoListObject = todoList[findObjectIndex];
    editlabelPopUp(todoListObject, labelId, todoId, checkboxId);
};

let autoSaveFunction = (number) => {
    localStorage.setItem("todoList", JSON.stringify(todoList));

    let seconds = 0;
    let popUptimer = setTimeout(() => {

        seconds += 1;
        if (seconds === 1) {
            clearInterval(popUptimer);
            alertPopUp.style.transform = "translate(-50%)";
            alertPopUp.style.zIndex = "-1";
        }
    }, 1000);
}

let onAddTodo = () => {

    let userInputText = userInputEl.value;

    if (userInputText === "") {
        alert("add someting todo");
        return;
    } else {
        let todoCount = todoList.length;
        todoCount += 1;

        let newTodo = {
            text: userInputText,
            uniqueNo: todoCount,
            isChecked: false
        };

        todoList.push(newTodo);

        createAndAppendTodo(newTodo);
        userInputEl.value = "";

        alertPopUp.style.zIndex = "0";
        alertPopUp.style.transform = "translate(-50%, 150%)";
        action.textContent = "Task Added";

        let seconds = 0;
        let popUptimer = setTimeout(() => {

            seconds += 1;
            if (seconds === 1) {
                clearInterval(popUptimer);
                alertPopUp.style.transform = "translate(-50%)";
                alertPopUp.style.zIndex = "-1";
            }
        }, 1000);
    }



};

addButtonEl.onclick = () => {
    onAddTodo(todoList);
    autoSaveFunction();
};

userInputEl.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        if (userInputEl.value === "") {
            alert("add something todo");
            return;
        } else {
            onAddTodo(todoList);
            autoSaveFunction();
        }
    }
});

let onClickStatusChange = (checkboxId, labelId, todoId) => {
    let checkbox = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);

    labelEl.classList.toggle("checked");

    let checkedIndex = todoList.findIndex((eachTodo) => {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[checkedIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

    let number = 3;
    autoSaveFunction(number);
};

let onDeleteIcon = (todoId) => {
    let listContainer = document.getElementById(todoId);

    todoListContainer.removeChild(listContainer);
    let deleteIndex = todoList.findIndex((eachTodo) => {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);

    autoSaveFunction();

    alertPopUp.style.zIndex = "0";
    alertPopUp.style.backgroundColor = "#ad3434";
    alertPopUp.style.borderBottom = "5px solid #690303";
    alertPopUp.style.transform = "translate(-50%, 150%)";
    action.textContent = "Task Deleted";

    let seconds = 0;
    let popUptimer = setTimeout(() => {

        seconds += 1;
        if (seconds === 1) {
            clearInterval(popUptimer);
            alertPopUp.style.transform = "translate(-50%)";
            alertPopUp.style.zIndex = "-1";
        }
    }, 1000);

};

let createAndAppendTodo = (todo) => {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    //creating list element
    let listContainer = document.createElement("li");
    listContainer.classList.add("each-list");
    listContainer.id = todoId;
    todoListContainer.appendChild(listContainer);

    //creating div 
    let labelContainer = document.createElement("div");
    listContainer.appendChild(labelContainer);

    //adding checkbox to list Element
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("id", checkboxId);
    checkbox.checked = todo.isChecked;
    checkbox.onclick = () => {
        onClickStatusChange(checkboxId, labelId, todoId);
    };
    labelContainer.appendChild(checkbox);


    //adding label Element to checkbox with
    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId;
    labelEl.classList.add("label-text");
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelEl.textContent = todo.text;
    labelContainer.appendChild(labelEl);

    //creating edit and delete container 
    let iconContainer = document.createElement("div");
    listContainer.appendChild(iconContainer);

    //creating edit icon 
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editIcon.classList.add("edit-icon");
    editIcon.onclick = () => {
        editTodoLabel(labelId);
    }
    iconContainer.appendChild(editIcon);

    //adding delete icon to list Element
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "icon-position");
    iconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = () => {
        deleteConfirmation(todoId);
    };
}

for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}
