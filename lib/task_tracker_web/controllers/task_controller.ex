defmodule TaskTrackerWeb.TaskController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tasks
  alias TaskTracker.Tasks.Task

  action_fallback TaskTrackerWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    #IO.puts("TASK PARAMS")
    #IO.inspect(task_params)
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      #IO.inspect(Tasks.get_task!(task.id))
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, Tasks.get_task!(task.id)))
      |> render("show.json", task: Tasks.get_task!(task.id))
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    #IO.inspect(task)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)
    IO.inspect(task_params)

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
