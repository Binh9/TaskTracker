import store from './store';

class TheServer {

	fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data
        });
      }
    });
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_CURRENT_TASK',
          data: null
        }),
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        })
      }
    });
  }

  create_session(email, password) {
    $.ajax("/api/v1/auth", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ email, password }),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data
        })
        //window.location.href = "./"; 
      },
    });
  }

  out_session() {
    store.dispatch({
      type: 'OUT_SESSION',
      data: null
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
      // more indepth error
    });
  }

  create_user(email, password) {
    let text = JSON.stringify({
      email: email,
      password: password
    });

    console.log(text);

    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        // add session 
        console.log("success");
        this.create_session(email, password);
      },
      error: () => {
         alert('This Email is already taken! Please try another email!');
         //window.location.href = "./";
      }
    });
  }

  create_task() {
    let title = $('#task_title_edit').val();
    let desc = $('#task_desc_edit').val();
    let time = $('#task_time_edit').val();
    let completion;// = $('#task_compl_edit').val();
    if ($('#task_compl_edit').is(":checked")) {
      completion = "true"
    } else {
      completion = "false"
    }
    let assigned_to = $('#task_assign_to_edit').val();

    //if (time % 15 == 0) {
      let text = JSON.stringify({
        task: {
          title: title,
          desc: desc,
          time: time,
          completion: completion,
          user_id: assigned_to,
        }
      });

      console.log(text);

      $.ajax("/api/v1/tasks/", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => {
          this.fetch_tasks();
        }
      });
    //}
    //else {
    //  console.log("time increment of 15 only");
    //}
  }

  // Set the current task to chosen for show
  show_task(id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_CURRENT_TASK',
          data: resp.data
        })
      }
    });
  }

  // Edit the chosen task 
  edit_task(id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_CURRENT_TASK',
          data: resp.data
        })
      }
    });
  }

  // Delete the chosen task
  delete_task(id) {
    if (window.confirm('Are you sure?')) {
      $.ajax("/api/v1/tasks/" + id, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: () => {
          this.fetch_tasks();
        }
      });
    }
  }

  // Save the edits
  save_task(id) {
    let title = $('#task_title_edit').val();
    let desc = $('#task_desc_edit').val();
    let time = $('#task_time_edit').val();
    let completion = $('#task_compl_edit').val();
    let assigned_to = $('#task_assign_to_edit').val();

    if (time % 15 == 0) {
      let text = JSON.stringify({
        task: {
          id: id,
          title: title,
          desc: desc,
          time: time,
          completion: completion,
          user_id: assigned_to
        }
      });

      console.log("in if");

      $.ajax("/api/v1/tasks/" + id, {
        method: "put",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => {
          store.dispatch({
            type: 'UPDATE_CURRENT_TASK',
            data: null
          });
          this.fetch_tasks();
          console.log("success");
        }
      });
    }
    else {
      console.log("time increment of 15 only");
    }

  }


  
}

export default new TheServer();