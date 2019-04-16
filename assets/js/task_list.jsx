import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api'

function TaskList(props) {
	let {tasks, session} = props;

	if (session) {
		let ttasks = _.map(tasks, (t) =>{
			return <Task key={t.id} task={t} />
		});

		return <div>
			<h1> All Tasks in Task Tracker </h1>
			<table className="table table-striped table-hover">
			  <thead>
			    <tr>
			      <th>Title</th>
			      <th>Description</th>
			      <th>Time Spent</th>
			      <th>Completion</th>
			      <th>Assigned To</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{ttasks}
			  </tbody>
			</table>
			<div>
				<Link to={"/new_task"} className="btn btn-primary btn-lg">New Task</Link>
			</div>
		</div>
	}
	else {
		return <h1>Sorry, this page is only available to TaskTracker users</h1>
	}
}

function Task(props) {
	let {task} = props;

	let power;

	if (true) {
		power = <td>
		    <Link to={"/show_task"} className="btn btn-primary" onClick={() => { api.show_task(task.id) }} >Show</Link>
		    <Link to={"/edit_task"} className="btn btn-info" onClick={() => { api.edit_task(task.id) }} >Edit</Link>
		    <Link to={"/tasks"} className="btn btn-danger" onClick={() => { api.delete_task(task.id) }}>Delete</Link>
	    </td>
	} else {
		power = <td></td>
	}

	return <tr>
	    <td>{task.title}</td>
	    <td>{task.desc}</td>
	    <td>{task.time}</td>
	    <td>{task.completion ? "done" : "in progress"}</td>
	    <td>{task.user_id}</td>
	    {power}
	</tr>
}

function state2props(state) {
  return {
    tasks: state.tasks,
    current_task: state.current_task,
    session: state.session
  };
}

export default connect(state2props)(TaskList);
