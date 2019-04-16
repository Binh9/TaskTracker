import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './api';

export default function NewUser(props) {
    return <div>
	    <h1>Creating a New User</h1>

	    <h3> Email </h3>
	    <div className="form-group">
	        <input id="new-email" type="email" placeholder="email" className="form-control"/>
	    </div>
	    <h3> Password </h3>
	    <div className="form-group">
	        <input id="new-pw" type="password" placeholder="password" className="form-control"/>
		</div>
	    	
	    <div>
	        <Link to={"/"} className="btn btn-primary btn-lg" onClick={() => { api.create_user($('#new-email').val(), $('#new-pw').val()) }}>Register</Link>
	    </div>
    </div>
}