export const CREATE_TODO = 'CREATE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

import request from 'axios';

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
export function createTodo(text) {
  return {
    type: CREATE_TODO,
    promise: request.post(BACKEND_URL, { text })
  }
}

// export function createTodo(text) {
//     return {
//         type: CREATE_TODO,
//         text,
//         date: Date.now()
//     }
// };

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
