$( document ).ready( function () {
    // cogemos el input del header
    let addListInput = $( '.addListWrapper input' );
    // genera un id para cada lista
    const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
    // función que contiene el string de creación de una lista
    const createListString = name =>
        `<div class="list" id="${generateId('list')}">
            <div class="listHeader">
                <h4>${name}</h4>
                <button>X</button>
            </div>
            <div class="tasks">

            </div>
            <div class="addTask">
                <input type="text">
                <button>Add task</button>
            </div>
        </div>`

    // función que añade una lista a la section ".lists"
    const appendNewList = () => {
         //  cogemos el text del input
         let listName = addListInput.val();

         // creamos el nodo .list
         let list = $( createListString( listName ) );

         // añadimos el node al DOM
         $( '.lists' ).append( list )

         // Limpiamos el texto del input
         addListInput.val( '' );
    }


    // Listeners
     addListInput.on( 'keyup', function ( event ) {
       // cuando se clicka el botón enter --> code 13
        if ( event.keyCode === 13 ) {
           appendNewList();
        }
    } )
    // evento delegado para cuando se cree el listHeader button
     $('.lists').on('click', '.listHeader button', function(event) {
        let listNode = $(event.target.parentNode.parentNode);
        listNode.detach();
     })

} )
