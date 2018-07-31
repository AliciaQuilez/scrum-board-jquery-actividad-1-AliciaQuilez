$(document).ready(function() {
  // cogemos el input del header
  let addListInput = $('.addListWrapper input');
  let addListButton = $('.addListWrapper a');
  // genera un id para cada lista
  const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
  // función que contiene el string de creación de una lista
  const createListString = name =>
    `<div class="list indigo darken-1" id="${generateId('list')}">
            <div class="listHeader">
                <h4>${name}</h4>
                <a class="waves-effect waves-teal btn-flat"><i class="material-icons">clear</i></a>
            </div>
            <div class="tasks"></div>
            <div class="addTask">
                <input type="text" placeholder="Add task">
                <a class="waves-effect waves-teal btn-flat add"><i class="material-icons">add</i></a>
            </div>
        </div>`

  // función que añade una lista a la section ".lists"
  const appendNewList = () => {
    //  cogemos el text del input
    let listName = addListInput.val();
    //Nombre por defecto de la lista si el valor es ''
    if (listName === ''){
      listName = 'New List';
    }
    // creamos el nodo .list
    let list = $(createListString(listName));


    // añadimos el node al DOM
    $('.lists').append(list)

    // Limpiamos el texto del input
    addListInput.val('');

  }


  // codigo html para una task
  let createTaskString = taskName =>
    `<div class="task card-panel">
        <div class="text">${taskName}</div>
        <a class="waves-effect waves-teal btn-flat"><i class="material-icons">clear</i></a>
    </div>`

  // función para append la nueva task pasamos el nodo donde crea y el input que hemos rellenado
  const appendNewTask = (tNode, tInput) => {
    // cogemos el valor del input de task
    let taskInputValue = tInput.val();
    //Nombre por defecto de la lista si el valor es ''
    if (taskInputValue === ''){
      taskInputValue = 'New Task';
    }
    // añadimos a task el string que crea el html de task
    let task = $(createTaskString(taskInputValue));

    // añadimos al dom el node nuevo
    tNode.append(task);

    // reseteamos el valor del input a vacio
    tInput.val('');
  }

  // Listeners

  addListInput.on('keyup', function(event) {
    // cuando se clicka el botón enter --> code 13
    if (event.keyCode === 13) {
      appendNewList();

    }
  })
  //añadir lista clickando en el botón
  addListButton.on('click', function(event) {
      appendNewList();
  })


  // evento delegado para borrar lista y afecte al botón creado despues del .document.ready
  $('.lists').on('click', '.listHeader a', function(event) {
    let listNode = $(event.target.parentNode.parentNode.parentNode);

      listNode.detach();

  })

  //delegate event para añadir tareas con enter
  $('.lists').on('keyup', '.list .addTask input', function(event) {
    if (event.keyCode === 13) {
      //guarda el nodo ".tasks"
      let taskNode = $(event.target.parentNode.previousElementSibling);
      // guarda el propio input
      let addTaskInput = $(event.target);
      // pasa el nodo donde se tiene que crear la nueva task y el input de ésta para recoger el valor dentro de la función
      appendNewTask(taskNode, addTaskInput);
    }
  })

  //delegate event para eliminar tareas
  $('.lists').on('click', '.list .tasks .task a', function(event) {
    console.log($(event.target));
    let tasksNode = $(event.target.parentNode.parentNode);
    console.log(tasksNode);
    tasksNode.detach();
  })
})
