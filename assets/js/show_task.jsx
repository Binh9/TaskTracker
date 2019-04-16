import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function ShowTask(props) {
	let {current_task} = props;

  console.log(props);

	if (current_task) {
    console.log(current_task);
		return <div>
			<h1>{current_task.title}</h1>
			<ul className="list-group">
				<li className="list-group-item">
    				<strong>Title:</strong>
    				<p>{current_task.title}</p>
  				</li>

  				<li className="list-group-item">
    				<strong>Description:</strong>
    				<p>{current_task.desc}</p>
  				</li>

  				<li className="list-group-item">
    				<strong>Time:</strong>
    				<p>{current_task.time}</p>
  				</li>

  				<li className="list-group-item">
    				<strong>Completion:</strong>
    				<p>{current_task.completion ? "done" : "in progress"}</p>
  				</li>

  				<li className="list-group-item">
    				<strong>Assigned By:</strong>
    				<p>{current_task.assigned_by}</p>
  				</li>
			</ul>
			<div>
				<Link to={"/edit_task"} className="btn btn-primary" onClick={() => { api.edit_task(current_task.id) }} >Edit</Link>
				<Link to={"/tasks"} className="btn btn-danger">Back</Link>
			</div>	
		</div>
	}
	else {
		return <div>NAH</div>
	}
}

export default connect((state) => { return { current_task: state.current_task }; })(ShowTask);