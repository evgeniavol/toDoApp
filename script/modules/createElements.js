import {
  changeStatusTodoControl,
  setDoneTodoItem,
  deleteTodoItem,
  deleteTodoFromStorage,
} from './controls.js';

export const createButtonsGroup = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn__wrapper');

  const btns = params.map(({ className, type, text }) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    button.style.marginRight = '20px';

    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

export const createAppContainer = () => {
  const appContainer = document.querySelector('.app-container');
  appContainer.className =
    'app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column';

  const title = document.createElement('h3');
  title.classList.add('todo__title');
  title.textContent = `ToDo App `;

  return {
    appContainer,
    title,
  };
};

export const createFormTodo = () => {
  const formTodo = document.createElement('form');
  formTodo.className = 'd-flex flex-column align-items-center mb-3 form-todo';
  const btnsWrapper = document.createElement('div');
  btnsWrapper.className = '';

   const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning reset',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  formTodo.insertAdjacentHTML(
    'beforeend',
    `
    <label class="form__group me-3 mb-3">
      <input type="text" name="todo" class="form__control" placeholder="ввести задачу">
    </label>
		`
  );

  btnsWrapper.append(...buttonGroup.btns);

  formTodo.append(btnsWrapper);

  return {
    formTodo,
    btnsWrapper,
  };
};

export const createTableHead = () => {
  const thead = document.createElement('thead');

  const theadTitles = ['№', 'Задача', 'Статус', 'Действия'];

  const tr = document.createElement('tr');

  theadTitles.forEach((elem) => {
    const th = document.createElement('th');
    th.textContent = elem;

    thead.append(th);
  });

  return {
    thead,
    tr,
  };
};

export const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table__wrapper');
  tableWrapper.style.width = '700px';

  const table = document.createElement('table');
  table.className = 'table table-hover table-bordered';

  const tbody = document.createElement('tbody');

  const { thead, tr } = createTableHead();

  table.append(thead, tbody);

  tableWrapper.append(table);
  return {
    tableWrapper,
    table,
    tbody,
  };
};

export const createRow = (todo, userKey) => {
  const tbody = document.querySelector('tbody');

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger delete',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success done',
      type: 'button',
      text: 'Завершить',
    },
  ]);

  const tr = document.createElement('tr');
  tr.classList.add('table__line');

  const numeric = document.createElement('td');
  numeric.classList.add('numericRow');

  const tdText = document.createElement('td');
  tdText.classList.add('task');

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('status');

  if (todo) {
    tdText.textContent = todo.todo;
    if (todo.done === false) {
      tdStatus.textContent = 'в процессе';
      tdText.classList.remove('task__done');
      buttonGroup.btns[1].textContent = 'Завершить'
    }
    if (todo.done === true) {
      tdText.classList.add('task__done');
      tdStatus.textContent = 'выполнено';
      buttonGroup.btns[1].textContent = 'Сделано'
    }
  }

  const tdBtns = document.createElement('td');
  tdBtns.classList.add('btns');

  tdBtns.append(...buttonGroup.btns);

  tr.append(numeric, tdText, tdStatus, tdBtns);

  tbody.append(tr);

  changeStatusTodoControl(tr, todo, userKey);
  setDoneTodoItem(tr);
  deleteTodoFromStorage(tr, todo, userKey);
  deleteTodoItem(tr);

  return {
    tr,
  };
};
