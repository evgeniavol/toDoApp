import { formTodoControl } from './controls.js';
import {
  createButtonsGroup,
  createAppContainer,
  createFormTodo,
  createTable,
  createRow,
} from './createElements.js';

import { getFromStorage } from './localStorage.js';

export const renderRegisterForm = (body) => {
  const overlay = document.createElement('div');
  overlay.classList.add('form__overlay');

  const form = document.createElement('form');
  form.classList.add('form');

  form.insertAdjacentHTML(
    'beforeend',
    `
			<button class="close" type="button"></button>
			<h2 class="form__title">Авторизация пользователя</h2>
			<div class="form__group">
				<label class="form__label" for="name">Логин:</label>
				<input class="form__input" name="name" id="name" type="text" required>
			</div>
			<div class="form__group">
				<label class="form__label" for="password">Пароль:</label>
				<input class="form__input" name="password" id="password" type="password" required>
			</div>
		`
  );

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Удалить',
    },
  ]);

  form.append(...buttonGroup.btns);

  overlay.append(form);
  overlay.classList.add('form__overlay');
  overlay.classList.add('active');
  body.append(overlay);

  return { form, overlay };
};

export const renderTodosFromLocalStorage = (password) => {
  console.log('password: ', password);
  let todos = [];
  if (localStorage.length > 0) {
    todos = getFromStorage(`${password}`);

    if (todos != null) {
      todos.map((item) => createRow(item, password));
    }
    return todos;
  } else {
    return;
  }
};

export const addRowToPage = (todo,userName, userKey) => {
  const key = `${userName}:${userKey}`
  createRow(todo, key);
};

export const renderTemplate = (user, todoText) => {
  const { appContainer, title } = createAppContainer();
  const { formTodo, btnsWrapper } = createFormTodo();
  const { tableWrapper, table, tbody } = createTable();

  appContainer.append(title, formTodo, tableWrapper);

  if (user) {
    formTodoControl(formTodo, btnsWrapper, user);
    renderTodosFromLocalStorage(`${user.name}:${user.password}`);
    title.textContent = `ToDo App ${user.name.toUpperCase()}`;
  }

  return {
    title,
    formTodo,
    table,
    btnsWrapper,
  };
};
