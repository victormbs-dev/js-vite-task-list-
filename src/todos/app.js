import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPendingTodos } from './use-cases';


const ElementIds = {
    CleanerCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCounter: '#pending-count'
}

/**
 * 
 * @param {String} elementId element id where will be displayed the data
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPendingTodos( ElementIds.PendingCounter );
    }

    //cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    //HTML references
    const clearCompleted = document.querySelector( ElementIds.CleanerCompleted );
    const newDescriptionInput = document.querySelector( ElementIds.NewTodoInput );
    const todoList = document.querySelector( ElementIds.TodoList );
    const filtersUL = document.querySelectorAll( ElementIds.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;        
        if ( event.target.value.trim().length === 0 ) return;
        
        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';

    });

    todoList.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoList.addEventListener('click', (event) => {
        const isDestroy = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroy ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    clearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersUL.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            console.log( element.target.text );

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
            }

            displayTodos();
        });
    });

}