import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function MainPage(props) {
  let { session } = props;
  if (!session) {
    return <div className="row my-2">
      <div className="col-9">
        <h1>Welcome to SPA Task Tracker!</h1>
        <h4>Register down below</h4>
        <p><Link className="btn btn-primary btn-lg" to={"/new_user"}>Register</Link></p>
      </div>
    </div>
  }
  else {
    return <div> 
      <h1>Welcome to SPA Task Tracker! You can now view and add tasks!</h1>
    </div>
  }
}

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(MainPage);;