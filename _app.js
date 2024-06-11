const mainContainer = document.querySelector(".body-container ul");
const footerContainer = document.querySelector(".footer-container");
const deleteCompleted = document.querySelector("#deleteCompleted");
const inputItem = document.querySelector("#add");
const addItem = document.querySelector("#addItem");
const deleteAll = document.querySelector("#deleteAll");

let checkboxId = 0;
let editing = false;
let localStoargeArr = [];

//при перезагрузке срендерить элементы обратно
if (localStorage.getItem("item") !== null) {
  localStoargeArr = JSON.parse(localStorage.getItem("item"));
  localStoargeArr.forEach((element) => {
    setValue(element.id, element.inputValue);
  });
  checkMainContainer();
}

function setValue(id, value) {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="input-container">
      <input type="checkbox" id="${id}" />
      <label for="${id}">${value}</label>
    </div>
    <button id="deleteItem">
     <i class="fa-solid fa-xmark"></i>
    </button>
    `;
  mainContainer.appendChild(li);
}

function updateValue(el) {
  let id = el.querySelector("input").id;
  
  localStoargeArr = localStoargeArr.filter((obj) => obj.id.toString() !== id);
  localStorage.setItem("item", JSON.stringify(localStoargeArr));
}

addItem.addEventListener("submit", addNewItem);

deleteAll.addEventListener("click", () => {
  mainContainer.innerHTML = "";
  checkboxId = 0;
  checkMainContainer();
  localStorage.clear();
  localStoargeArr = [];
});

deleteCompleted.addEventListener("click", () => {
  mainContainer.querySelectorAll("li").forEach((el) => {
    if (el.querySelector("input").checked === true) {
      updateValue(el);
      el.remove();
    }
  });
  checkMainContainer();
});



mainContainer.addEventListener("click", (event) => {
  const currentItem = event.target;

  if (event.target.parentNode.id === "deleteItem") {
    let currentLi = currentItem.closest("li");

    updateValue(currentLi); 
    currentLi.remove();
    checkMainContainer();
  }
});

function addNewItem(event) {
  event.preventDefault();
  if (inputItem.value === "") {
    return;
  }
  checkboxId++;
  let inputValue = inputItem.value;
  let inputId = "checkbox-" + checkboxId;
  setValue(inputId, inputValue);
  inputItem.value = "";
  checkMainContainer();
  let item = { inputValue: inputValue, isDone: false, id: checkboxId };
  localStoargeArr.push(item);
  localStorage.setItem("item", JSON.stringify(localStoargeArr));
}

function checkMainContainer() {
  if (mainContainer.querySelectorAll("li").length > 0) {
    mainContainer.style.display = "block";
    footerContainer.style.display = "flex";
    footerContainer.style.opacity = "1";
  } else {
    mainContainer.style.display = "none";
    footerContainer.style.display = "none";
    footerContainer.style.opacity = "0";
  }
}

/**То, что отображается на странице должно полностью соответствовать данным в ЛС
Добавить данные не только на страницу, но и в ЛС +
Получать данные с ЛС при перезагрузке (консоль) +
Отображать данные с ЛС на сайте при перезгрузке +
Удалить не только со страницы, но и с ЛС (удалить все)+
Удалить не только со страницы, но и с ЛС (удалить один таск) +

Менять данные в ЛС при нажатии на чекбокс таска.  - ?
Удалить не только со страницы, но и с ЛС (удалить выполненные таски) + */
