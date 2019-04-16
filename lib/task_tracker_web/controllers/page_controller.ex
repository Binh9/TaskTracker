defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tasks

  def index(conn, _params) do
  	tasks = Tasks.list_tasks()
  	|> Enum.map(&(Map.take(&1, [:id, :title, :desc, :time, :completion, :user])))

  	users = TaskTracker.Users.list_users()
    |> Enum.map(&(Map.take(&1, [:id, :email, :admin])))

    IO.inspect(users)

    render conn, "index.html", tasks: tasks, users: users
  end
end
