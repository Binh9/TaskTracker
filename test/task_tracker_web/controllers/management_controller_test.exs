defmodule TaskTrackerWeb.ManagementControllerTest do
  use TaskTrackerWeb.ConnCase

  alias TaskTracker.Managements

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:management) do
    {:ok, management} = Managements.create_management(@create_attrs)
    management
  end

  describe "index" do
    test "lists all managements", %{conn: conn} do
      conn = get(conn, Routes.management_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Managements"
    end
  end

  describe "new management" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.management_path(conn, :new))
      assert html_response(conn, 200) =~ "New Management"
    end
  end

  describe "create management" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.management_path(conn, :create), management: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.management_path(conn, :show, id)

      conn = get(conn, Routes.management_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Management"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.management_path(conn, :create), management: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Management"
    end
  end

  describe "edit management" do
    setup [:create_management]

    test "renders form for editing chosen management", %{conn: conn, management: management} do
      conn = get(conn, Routes.management_path(conn, :edit, management))
      assert html_response(conn, 200) =~ "Edit Management"
    end
  end

  describe "update management" do
    setup [:create_management]

    test "redirects when data is valid", %{conn: conn, management: management} do
      conn = put(conn, Routes.management_path(conn, :update, management), management: @update_attrs)
      assert redirected_to(conn) == Routes.management_path(conn, :show, management)

      conn = get(conn, Routes.management_path(conn, :show, management))
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, management: management} do
      conn = put(conn, Routes.management_path(conn, :update, management), management: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Management"
    end
  end

  describe "delete management" do
    setup [:create_management]

    test "deletes chosen management", %{conn: conn, management: management} do
      conn = delete(conn, Routes.management_path(conn, :delete, management))
      assert redirected_to(conn) == Routes.management_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.management_path(conn, :show, management))
      end
    end
  end

  defp create_management(_) do
    management = fixture(:management)
    {:ok, management: management}
  end
end
