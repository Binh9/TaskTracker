defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
  	#managers = TaskTracker.Managements.list_managerss(conn)
  	#IO.inspect(managers)
  	#IO.puts("hey")

    render(conn, "index.html")
  end
end
