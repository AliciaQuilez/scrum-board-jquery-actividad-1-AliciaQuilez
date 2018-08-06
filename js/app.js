$(document).ready(function() {

  $(window).on("load", function() {
    if ('saved' in localStorage) {
      $('.lists').html((JSON.parse(localStorage.getItem('saved'))));
    }
    M.AutoInit();
    jscolor.installByClassName("jscolor");
  });


  // cogemos el input del header
  let addListInput = $('.addListWrapper input');
  let addListButton = $('.addListWrapper a');

  const saveStorage = () => {
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('saved', JSON.stringify($('.lists').html()));
    }
  }

  // genera un id para cada lista
  const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
  // función que contiene el string de creación de una lista
  const createListString = name =>
    `<div class="list indigo darken-1" id="${generateId('list')}">
            <div class="listHeader">
                <h4>${name}</h4>
                <a class="waves-effect waves-default btn-flat"><i class="material-icons">clear</i></a>
            </div>
            <div class="tasks"></div>
            <div class="addTask">
                <input type="text" placeholder="Add task">
                <a class="waves-effect waves-default btn-flat add"><i class="material-icons">add</i></a>
            </div>
        </div>`

  // función que añade una lista a la section ".lists"
  const appendNewList = () => {
    //  cogemos el text del input
    let listName = addListInput.val();

    //Nombre por defecto de la lista si el valor es ''
    if (listName === '' || listName.trim().length < 1) {
      alert("Añade un título");
      return;
    }
    // creamos el nodo .list
    let list = $(createListString(listName));


    // añadimos el node al DOM
    $('.lists').append(list)

    // Limpiamos el texto del input
    addListInput.val('');
    saveStorage();

  }

  // codigo html para una task
  let createTaskString = taskName =>
    `<div class="task card-panel">
        <form action="#">
          <p>
            <label>
              <input type="checkbox"/>
              <span></span>
            </label>
          </p>
        </form>
        <textarea class="task-name" cols="8" rows="1" placeholder="${taskName}" disabled="true" autofocus="false"></textarea>
        <ul class="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">settings</i></div>
          <div class="collapsible-body">
            <ul>
              <li><button class="edit"><i class="material-icons">create</i></button></li>
              <li><button class="delete"><i class="material-icons">delete</i></button></li>
              <li><input
    class="jscolor"
    style="width:20px; height:20px;"></input></li>
            </ul>
          </div>
        </li>
    </div>`


  // función para append la nueva task pasamos el nodo donde crea y el input que hemos rellenado
  const appendNewTask = (tNode, tInput) => {
    // cogemos el valor del input de task
    let taskInputValue = tInput.val();
    //Nombre por defecto de la lista si el valor es ''
    if (taskInputValue === '' || taskInputValue.trim().length < 1) {
      alert("Añade un título");
      return;
    }

    // añadimos a task el string que crea el html de task
    let task = $(createTaskString(taskInputValue));

    // añadimos al dom el node nuevo
    tNode.append(task);

    // reseteamos el valor del input a vacio
    tInput.val('');
    saveStorage();

  }


  // Listeners
  addListInput.on('keyup', function(event) {
    // cuando se clicka el botón enter --> code 13
    if (event.keyCode === 13) {
      appendNewList();
      saveStorage();
    }

  })

  //añadir lista clickando en el botón
  addListButton.on('click', function(event) {
    appendNewList();
    $(document.querySelector('label')).removeClass('active');
    saveStorage();

  })


  // evento delegado para borrar lista y afecte al botón creado despues del .document.ready
  $('.lists').on('click', '.listHeader a', function(event) {
    let listNode = $(event.target.closest('.list'));
    listNode.detach();
    saveStorage();

  })


  //delegate event para añadir tareas con enter
  $('.lists').on('keyup', '.addTask input', function(event) {
    if (event.keyCode === 13) {
      //guarda el nodo ".tasks"
      let taskNode = $(event.target.parentNode.parentNode.querySelector('.tasks'));
      // guarda el propio input
      let addTaskInput = $(event.target);
      // pasa el nodo donde se tiene que crear la nueva task y el input de ésta para recoger el valor dentro de la función
      appendNewTask(taskNode, addTaskInput);

      autosize($(event.target.parentNode.parentNode.querySelector('textarea')));
      $(event.target.parentNode.parentNode.parentNode.querySelectorAll('.collapsible')).collapsible();
      jscolor.installByClassName("jscolor");

    }
    saveStorage();
  })


  //delegate event para añadir tareas con click
  $('.lists').on('click', '.addTask i', function(event) {
    //guarda el nodo ".tasks"
    let taskNode = $(event.target.parentNode.parentNode.parentNode.querySelector('.tasks'));
    // guarda el propio input
    let addTaskInput = $(event.target.parentNode.parentNode.querySelector('input'));

    // pasa el nodo donde se tiene que crear la nueva task y el input de ésta para recoger el valor dentro de la función
    appendNewTask(taskNode, addTaskInput);

    autosize($(event.target.parentNode.parentNode.querySelector('textarea')));
    $(event.target.parentNode.parentNode.parentNode.querySelectorAll('.collapsible')).collapsible();
    saveStorage();
  })


  //delegate event para eliminar tareas
  $('.lists').on('click', '.tasks .task .delete', function(event) {
    let tasksNode = $(event.target.closest('.task'));
    tasksNode.detach();
    saveStorage();
  })

  //edita textarea
  $('.lists').on('click', '.task .edit', function(event) {
    $(event.target.closest('.task').querySelector('.task-name')).removeAttr('disabled');
    $(event.target.closest('.task').querySelector('.task-name')).focus();
    autosize($(event.target.closest('.task').querySelector('.task-name')));
    saveStorage();
  })

  //disable textarea cuando ya se ha modificado
  $('.lists').on('change', '.task .task-name', function(event) {
    console.log('hola');
    $(event.target).attr('disabled', true);
    saveStorage();
  })

  $('.lists').on('change', '.tasks .task .jscolor',function(event){
    let color = $(event.target).css('background-color');
    $(event.target.closest('.card-panel')).css("border-left-color", color);
saveStorage();
  })
})
