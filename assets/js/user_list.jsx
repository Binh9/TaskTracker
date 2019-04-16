import React from 'react';
import { connect } from 'react-redux';

function UserList(props) {
	console.log(props)
	let {session} = props;
	if (session) {
		let uusers = _.map(props.users, (u) => {
			return <User key={u.id} user={u} />
		});

		return <div>
			<h1> All Users in Task Tracker </h1>
			<table className="table table-striped table-hover">
			  <thead>
			    <tr>
			      <th>ID</th>
			      <th>Email</th>
			      <th>Admin</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{uusers}
			  </tbody>
			</table>
		</div>
	}
	else {
		return <h1>Sorry, this page is only available to TaskTracker users</h1>
	}
}

function User(props) {
	let {user} = props;
	return <tr>
		<td>{user.id}</td>
		<td>{user.email}</td>
		<td>{user.admin ? "true" : "false"}</td>
	</tr>
}

export default connect((state) => { return { users: state.users, session: state.session }; })(UserList);