import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import api from './api';

function EditTask(props) {
	let {current_task, users} = props;

	let uusers = _.map(users, (u) => {
			return <UserOption key={u.id} user={u} />
		});

	if (current_task) {
		return <div>
			<h1>{current_task.title}</h1>
			<div className="form-group">
				<strong>Title:</strong>
				<input id="task_title_edit" defaultValue={current_task.title}/>
			</div>

			<div className="form-group">
				<strong>Description:</strong>
				<input id="task_desc_edit" defaultValue={current_task.desc}/>
			</div>

			<div className="form-group">
				<strong>Time (in 15-minute increments):</strong>
				<input id="task_time_edit" defaultValue={current_task.time} step="15"/>
			</div>

			<div className="form-group">
				<strong>Completion:</strong>
				<input id="task_compl_edit" type="checkbox" defaultValue={current_task.completion}/>
			</div>

			<div className="form-group">
				<strong>Assigned to:</strong>
				<select id="task_assign_to_edit" defaultValue={current_task.user_id}>
					{uusers}
				</select>
			</div>

			<div>
				<Link to={"/tasks"} className="btn btn-success" onClick={() => { api.save_task(currrent_task.id) }}>Save</Link>
				<Link to={"/tasks"} className="btn btn-danger">Back</Link>
			</div>

		</div>
	}
	else {
		return <div>NAY</div> // something wrong in this case
	}
}

function UserOption(props) {
	let {user} = props;
	return <option id={user.id} value={user.id}>{user.email}</option>
}

export default connect((state) => { return { current_task: state.current_task, session: state.session, users: state.users }; })(EditTask);