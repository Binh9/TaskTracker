import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header';
import MainPage from './main_page';
import NewUser from './new_user';
import TaskList from './task_list';
import NewTask from './new_task';
import EditTask from './edit_task';
import ShowTask from './show_task';
import UserList from './user_list';


export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>, node);
}

class Root extends React.Component {
	constructor(props) {
		super(props);
		api.fetch_tasks();
    api.fetch_users();
	}

	render() {
		return <div>
			<Router>
				<div>
       <Header root={this} />

       <Route path="/" exact={true} render={() =>
         <MainPage />
       } />
       <Route path="/new_user" exact={true} render={() =>
         <NewUser />
       } />
       <Route path="/tasks" exact={true} render={() =>
         <TaskList />
       } />
       <Route path="/new_task" exact={true} render={() =>
         <NewTask />
       } />
       <Route path="/edit_task" exact={true} render={() =>
         <EditTask />
       } />
       <Route path="/show_task" exact={true} render={() =>
         <ShowTask />
       } />
       <Route path="/users" exact={true} render={() =>
        <UserList />
      } />
				</div>
			</Router>
		</div>
	}
}