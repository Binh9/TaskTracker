defmodule TaskTrackerWeb.TaskController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tasks
  alias TaskTracker.Tasks.Task

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.html", tasks: tasks)
  end

  def new(conn, _params) do
    changeset = Tasks.change_task(%Task{})
    user_id = Plug.Conn.get_session(conn, :user_id)
    underlings_id = TaskTracker.Managements.list_underlings(user_id)
    IO.inspect(underlings_id)

    underlings = Enum.map(underlings_id, fn x -> TaskTracker.Users.get_user(x).email end)
    IO.inspect(underlings)

    render(conn, "new.html", changeset: changeset, underlings: underlings)
  end

  def create(conn, %{"task" => task_params}) do
    #IO.inspect(task_params)
    user_email_tup = Map.fetch(task_params, "user_id")
    if (user_email_tup != :error) do
      user_email = elem(user_email_tup, 1)
      act_user_id = TaskTracker.Users.get_user_by_email(user_email).id
      task_params = Map.replace!(task_params, "user_id", act_user_id)
    end
    case Tasks.create_task(task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task created successfully.")
        |> redirect(to: Routes.task_path(conn, :show, task))

      {:error, %Ecto.Changeset{} = changeset} ->
        user_id = Plug.Conn.get_session(conn, :user_id)
        underlings_id = TaskTracker.Managements.list_underlings(user_id)
        underlings = Enum.map(underlings_id, fn x -> TaskTracker.Users.get_user(x).email end)
        render(conn, "new.html", changeset: changeset, underlings: underlings)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.html", task: task)
  end

  def edit(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    changeset = Tasks.change_task(task)
    user_id = Plug.Conn.get_session(conn, :user_id)
    underlings_id = TaskTracker.Managements.list_underlings(user_id)
    underlings = Enum.map(underlings_id, fn x -> TaskTracker.Users.get_user(x).email end)
    render(conn, "edit.html", task: task, changeset: changeset, underlings: underlings)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    case Tasks.update_task(task, task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: Routes.task_path(conn, :show, task))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    {:ok, _task} = Tasks.delete_task(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: Routes.task_path(conn, :index))
  end
end
