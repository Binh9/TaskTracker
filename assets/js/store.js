import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
Application state layout
	{
	// Session 
	session: null, // { token, user_id }

	tasks: [], // List of tasks
	users: [], // List of users

	current_task: null // keep track of the task we are working on

	}
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
	switch (action.type) {
		case 'TASK_LIST':
			return action.data;
		default:
			return state;
	};
}

function users(state = [], action) {
    switch (action.type) {
        case 'USER_LIST':
            return action.data;
        default:
            return state;
    };
}

function session(state = null, action) {
	switch (action.type) {
  		case 'NEW_SESSION':
    		return action.data;
    	case 'OUT_SESSION':
    		return null;
  		default:
    		return state;
  	};
}

function current_task(state = null, action) {
	switch (action.type) {
		case 'UPDATE_CURRENT_TASK':
			return action.data;
		default:
			return state;
	};
}

function root_reducer(state0, action) {
	console.log("reducer", state0, action);

	let reducer = combineReducers({ tasks, users, session, current_task });
	let state1 = reducer(state0, action);

	console.log("reducer1", state1);

	return deepFreeze(state1);

}

let store = createStore(root_reducer);
export default store;