import { Todo } from '../models/todo.model';
import { createHTML } from './';

let element;

/**
 * 
 * @param {String} elementId element id where will be displayed the information 
 * @param {Todo} todos todo information
 */
export const renderTodos = ( elementId, todos = [] ) => {
    
    if ( !element )
        element = document.querySelector( elementId );

    if ( !element ) throw new Error(`Element ${ elementId } not found`);

    element.innerHTML = '';

    todos.forEach( todos => {
        element.append( createHTML(todos));
    });
}