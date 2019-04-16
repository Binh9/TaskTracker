import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from './api'

function Header(props) {
	console.log(props);
	let {session} = props;
	let session_info;
	if (session == null) {
		session_info = 
		<div className="form-inline my-2">
				<input id="login_email" type="email" placeholder="email" />
				<input id="login_pw" type="password" placeholder="password" />
				<button className="btn btn-primary" onClick={() => {api.create_session($('#login_email').val(), $('#login_pw').val())}}>Login</button>
		</div>
	}
	else {
		session_info = 
		<div className="my-2">
			<p> Logged in as {session.user_id}</p>
			<button className="btn btn-danger" onClick={() => {api.out_session()}}>Logout</button>
		</div>
	}

	return <nav className="navbar navbar-expand-sm navbar-light bg-white">
		<div className="col-4">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<h1><Link to={"/"} className="nav-link">Task Tracker</Link></h1>
				</li>
			</ul>
		</div>
		<div className="col-4">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link to={"/tasks"} className="nav-link">Tasks</Link>
				</li>
				<li className="nav-item active">
					<Link to={"/users"} className="nav-link">Users</Link>
				</li>
			</ul>
		</div>
		<div className="col-4">
			{session_info}
		</div>
	</nav>;
}

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(Header);
//export default connect((state) => { return { session: state.session }; })(Home);