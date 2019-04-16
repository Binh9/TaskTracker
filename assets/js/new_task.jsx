import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';


function NewTask(props) {
	let {users} = props;

	let uusers = _.map(users, (u) => {
			return <UserOption key={u.id} user={u} />
		});

	return <form>
		<h1>Creating a New Task</h1>
		<div className="form-group">
			<strong>Title:</strong>
			<input id="task_title_edit" />
		</div>

		<div className="form-group">
			<strong>Description:</strong>
			<input id="task_desc_edit" />
		</div>

		<div className="form-group">
			<strong>Time (in 15-minute increments):</strong>
			<input type="number" id="task_time_edit" defaultValue="0" step="15"/>
		</div>

		<div className="form-group">
			<strong>Completion:</strong>
			<input id="task_compl_edit" type="checkbox" defaultChecked={false} />
		</div>

		<div className="form-group">
			<strong>Assign to:</strong>
			<select id="task_assign_to_edit">
				{uusers}
			</select>
		</div>

		<div>
			<Link to={"/tasks"} className="btn btn-success" onClick={() => { api.create_task() }}>Create</Link>
			<Link to={"/tasks"} className="btn btn-danger">Back</Link>
		</div>

	</form>
}

function UserOption(props) {
	let {user} = props;
	return <option id={user.id} value={user.id}>{user.email}</option>
}

export default connect((state) => { return { users: state.users }; })(NewTask);