import { addRowToPage, renderTemplate } from './renderElements.js';
import {
  setUserTodoToStorage,
} from './localStorage.js';

export const formPopupControl = (form, overlay) => {
  let newUser = {};
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    newUser = Object.fromEntries(formData);

    form.reset();
    overlay.classList.remove('active');

    newUser = {
      name: newUser.name,
      password: newUser.password,
      todos: [],
    };

    const { formTodo, btnsWrapper } = renderTemplate(newUser);
  });

  return {
    newUser,
  };
};

export const popupControl = (overlay, target) => {
  if (
    target.classList.contains('close') ||
    target.classList.contains('form__overlay')
  ) {
    overlay.classList.remove('active');
  }
};

export const formTodoControl = (formTodo, btnsWrapper, user) => {

  let todos = [];
  let todo = {};

  const inputTodo = formTodo.querySelector('.form__control');
  const btns = formTodo.querySelectorAll('button');

  btns.forEach((btn) => (btn.disabled = true));

  if (!inputTodo.value.length === null) {
    btns.forEach((btn) => (btn.disabled = true));
  }

  inputTodo.addEventListener('input', () => {
    if (!inputTodo.value.length) {
      btns.forEach((btn) => btn.setAttribute('disabled', true));
    }
    if (inputTodo.value.trim().length > 0) {
      btns.forEach((btn) => btn.removeAttribute('disabled'));
    }
  });

  formTodo.addEventListener('click', (e) => {
    if (e.target.classList.contains('reset')) {
      inputTodo.value = '';
      btns.forEach((btn) => btn.setAttribute('disabled', true));
    }
  });

  formTodo.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTodo = Object.fromEntries(formData);

    todo = {
      id: Math.random().toString().substring(2, 10),
      todo: newTodo.todo,
      done: false,
    };

    todos.push(todo);

    addRowToPage(todo, user.name, user.password);

    setUserTodoToStorage(`${user.name}:${user.password}`, todo);
    formTodo.reset();
    btns.forEach((btn) => btn.setAttribute('disabled', true));

    return todo;
  });
};

export const changeTodoDoneLocal = (arr, item) => {
  arr.map((obj) => {
		if (obj.id === item.id && obj.done === false) {
      obj.done = true;
    } else if (obj.id === item.id && obj.done === true){
      obj.done = false;
    }
  });
};

export const changeStatusTodoControl = (item, todo, userKey) => {
  item.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('done')) {
      const todoArr = JSON.parse(localStorage.getItem(userKey));
      changeTodoDoneLocal(todoArr, todo);
      localStorage.setItem(userKey, JSON.stringify(todoArr));
    }
  });
};

export const setDoneTodoItem = (item) => {
  if (item) {
    item.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('done')) {
        const text = item.querySelector('.task');
        const status = item.querySelector('.status');
				const doneBtn = item.querySelector('.done')
        text.classList.toggle('task__done');
        if (status.textContent === 'в процессе') {
          status.textContent = 'выполнено';
					doneBtn.textContent = 'Сделано';
        } else if (status.textContent === 'выполнено') {
          status.textContent = 'в процессе';
					doneBtn.textContent = 'Завершить';
        }
      }
    });
  }
};

export const  deleteTodo = (arr, item) => {
	const newArr = arr.filter(obj => obj.id != item.id)
	return {
		newArr,
	}
} 

export const deleteTodoFromStorage = (item, todo, userKey) => {
	item.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete')) {
      const todoArr = JSON.parse(localStorage.getItem(userKey));
      const {newArr} = deleteTodo(todoArr, todo);
      localStorage.setItem(userKey, JSON.stringify(newArr));
    }
  });

}

export const deleteTodoItem = (item) => {
  if (item) {
    item.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('delete')) {
        item.remove();
      }
    });
  }
};
