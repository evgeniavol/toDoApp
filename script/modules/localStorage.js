export const getFromStorage = (userKey) => {
  const userTodo = JSON.parse(localStorage.getItem(userKey));
  return localStorage.length > 0 ? userTodo : [];
};


export const setUserTodoToStorage = (userKey, todo) => {
	
	let todos = []
	if(userKey && todo) {
		if(localStorage.length > 0) {
			todos = JSON.parse(localStorage.getItem(userKey))
		} 
		if(todo) {
			if(todos === null) {
				todos =[]
			}

			todos.push(todo);
			localStorage.setItem(`${userKey}`, JSON.stringify(todos));
		}

		return {todo}

	} else {
		return
	}

};
