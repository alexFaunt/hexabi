export const CREATE_TODO = 'CREATE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function createTodo(text) {
    return {
        type: CREATE_TODO,
        text,
        date: Date.now()
    }
};

export function editTodo(id, text) {
  return {
    type: EDIT_TODO,
    id,
    text,
    date: Date.now()
  };
}
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id
  };
}
