defmodule TaskTrackerWeb.ManagementController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Managements
  alias TaskTracker.Managements.Management

  def index(conn, _params) do
    managements = Managements.list_managements()
    render(conn, "index.html", managements: managements)
  end

  def new(conn, _params) do
    changeset = Managements.change_management(%Management{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"management" => management_params}) do
    case Managements.create_management(management_params) do
      {:ok, management} ->
        conn
        |> put_flash(:info, "Management created successfully.")
        |> redirect(to: Routes.management_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    management = Managements.get_management!(id)
    render(conn, "show.html", management: management)
  end

  def edit(conn, %{"id" => id}) do
    management = Managements.get_management!(id)
    changeset = Managements.change_management(management)
    render(conn, "edit.html", management: management, changeset: changeset)
  end

  def update(conn, %{"id" => id, "management" => management_params}) do
    management = Managements.get_management!(id)

    case Managements.update_management(management, management_params) do
      {:ok, management} ->
        conn
        |> put_flash(:info, "Management updated successfully.")
        |> redirect(to: Routes.management_path(conn, :show, management))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", management: management, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    management = Managements.get_management!(id)
    {:ok, _management} = Managements.delete_management(management)

    conn
    |> put_flash(:info, "Management deleted successfully.")
    |> redirect(to: Routes.management_path(conn, :index))
  end
end
