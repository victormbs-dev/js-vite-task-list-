import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending"
};

const state = {
  todos: [
    new Todo("Example")
  ],
  filter: Filters.All,
};

/**
 * Initialice the data store
 */
const initStore = () => {
  loadStore();
  console.log("Store inizialized ✅");
};

/**
 * Load Todo list
 */
const loadStore = () => {
  if ( !localStorage.getItem('state') ) return;
  
  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
  state.todos = todos;
  state.filter = filter;
};


const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Create a new Todo
 * @param {String} description Todo description
 */
const addTodo = (description) => {
  if( !description ) throw new Error('Description is empty');
  state.todos.push( new Todo(description) );

  saveStateToLocalStorage();
};

const getTodos = ( filter = Filters.All ) => {
  switch ( filter ){
    case Filters.All:
      return [...state.todos];
    
      case Filters.Completed:
        return state.todos.filter( todo => todo.done );
      
      case Filters.Pending:
        return state.todos.filter( todo => !todo.done );

      default:
        throw new Error(`${ filter } not valid`);
  }
}

/**
 *
 * @param {String} todoId Todo ID
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map( todo => {
    if( todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveStateToLocalStorage();
};

/**
 * delete a Todo
 * @param {String'} todoId Todo ID
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter( todo => todo.id != todoId );

  saveStateToLocalStorage();
};

/**
 *
 *
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
  saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  saveStateToLocalStorage();
};

/**
 * 
 */
const getCurrentFilter = () => {
  return state.filter;
}

export default {
  getTodos,
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter
};
