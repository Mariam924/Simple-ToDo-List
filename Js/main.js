
var taskInput= document.getElementById('taskInput');

var currentIndex;


if(localStorage.getItem(`12-10tasks`)!=null){
    taskContainer= JSON.parse(localStorage.getItem(`12-10tasks`));
    displayData(taskContainer);
    console.log(window.localStorage.toggled)
   /*  document.querySelectorAll("#task").classList.toggle(window.localStorage.toggled); */
}
else{
    taskContainer= [];
}


/* ---------------------------------------- addTask ------------------------------------ */

function addTask(){

        var task= taskInput.value;
        taskContainer.push(task);
        console.log(taskContainer);

        clearForm();
        displayData(taskContainer);
        localStorage.setItem(`12-10tasks`, JSON.stringify(taskContainer))
}


/* ------------------------------------------- clear ----------------------------------------- */

function clearForm(){

    taskInput.value = "";

}
/* ---------------------------------------- update ------------------------------------ */

function update(index){

    currentIndex=index;
    document.getElementById('update').classList.replace('d-none','d-inline-block');
    document.getElementById('add').classList.replace('d-inline-block','d-none');
    taskInput.value = taskContainer[index];

    
}
/* ---------------------------------------- updateTask ------------------------------------ */

function updateTask(){

    var task= taskInput.value;
    taskContainer[currentIndex]=task;
    displayData(taskContainer);
    
    localStorage.setItem('12-10tasks', JSON.stringify(taskContainer))

    document.getElementById('add').classList.replace('d-none','d-inline-block');
    document.getElementById('update').classList.replace('d-inline-block', 'd-none');
    clearForm();
    
}
/* ---------------------------------------- displayData ------------------------------------ */

function displayData(list){
    var temp=``;
    for(var i=0; i<list.length; i++){
        temp+=`<tr id='task' >
        <td>${i+1}</td>
        <td >${list[i]}</td>
        <td><div class="btn check-btn btn-sm"><i class="fa-solid fa-check"></i></div></td>
        <td><div onclick="update(${i})" class="btn pen-btn btn-sm"><i class="fa-solid fa-pen"></i></div></td>
        <td><div onclick="deleteElement(${i})" class="btn btn-sm trash-btn"><i class="fa fa-trash" aria-hidden="true" class="text-white"></i></div></td>
        </tr>`; 
    }
    document.getElementById(`myTable`).innerHTML=temp;
}

/* ---------------------------------------- deleteElement ------------------------------------ */

function deleteElement(index){
    taskContainer.splice(index, 1);
    localStorage.setItem('12-10tasks', JSON.stringify(taskContainer));

    displayData(taskContainer);
}


/* -------------------------------------------- Check ------------------------------------------ */

var tasks = document.querySelectorAll("#task");
for(var i=0; i<tasks.length; i++){
    tasks[i].onclick = function(){
       /*  this.classList.toggle('completed'); */
       /*  window.localStorage.toggled = "completed"; */

        if (window.localStorage.toggled != "completed" ) {
            this.classList.toggle('completed');
            window.localStorage.toggled = "completed";
            console.log ("if task checked")

         } else {
            console.log ("else task checked")
            this.classList.toggle('completed');
            window.localStorage.toggled = "non-completed";
         }
    }
}

/* function checked(index){
    taskContainer[index].classList.toggle('completed'); 
    
} */

/* --------------------------------------- Change Language ------------------------------------ */

const translations = {
    en:{
        newTask: "Simple To-Do List Interface",
        taskNameLabel: "Task Name",
        addTask: "Add Task",
        updateTask: "Update Task",
        reset: "Reset",
        index: "Index",
        taskName: "Task Name",
        updatetsk: "Update",
        deletetsk: "Delete",
        checktsk: "Completed?",
    },
    ar:{
        newTask: "قائمة المهام",
        taskNameLabel: "اسم المهمة",
        addTask: "اضف المهمة",
        updateTask: "تعديل المهمة",
        reset: "اعادة",
        index: "رقم",
        taskName: "اسم المهمة",
        updatetsk: "عدل المهمة",
        deletetsk: "احذف المهمة",
        checktsk: "تمت المهمة؟",
    },
};

const languageSelector = document.querySelector("select");
languageSelector.addEventListener("change", (event) => {
    setLanguage(event.target.value);
    localStorage.setItem("lang", event.target.value);
});

document.addEventListener("DOMContentLoaded", () =>{
    setLanguage(localStorage.getItem("lang"));
});

const setLanguage = (language) => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
        const translationKey = element.getAttribute('data-i18n');
        element.textContent = translations[language][translationKey];
    });
    document.dir = language === 'ar' ? "rtl" : "ltr"
};

