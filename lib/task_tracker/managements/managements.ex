defmodule TaskTracker.Managements do
  @moduledoc """
  The Managements context.
  """

  import Ecto.Query, warn: false
  alias TaskTracker.Repo

  alias TaskTracker.Managements.Management

  @doc """
  Returns the list of managements.

  ## Examples

      iex> list_managements()
      [%Management{}, ...]

  """
  def list_managements do
    Repo.all(Management)
  end

  @doc """
  Gets a single management.

  Raises `Ecto.NoResultsError` if the Management does not exist.

  ## Examples

      iex> get_management!(123)
      %Management{}

      iex> get_management!(456)
      ** (Ecto.NoResultsError)

  """
  def get_management!(id), do: Repo.get!(Management, id)

  @doc """
  Gets the managers of the given underling id
  """
  def list_managers(id) do
    query = from m in Management,
              where: m.underling_id == ^id,
              select: m.manager_id
    Repo.all(query)
  end

  @doc """
  Get the underlings of the given manager id
  """
  def list_underlings(id) do
    query = from m in Management,
              where: m.manager_id == ^id,
              select: m.underling_id
    Repo.all(query)
  end

  @doc """
  Creates a management.

  ## Examples

      iex> create_management(%{field: value})
      {:ok, %Management{}}

      iex> create_management(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_management(attrs \\ %{}) do
    %Management{}
    |> Management.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a management.

  ## Examples

      iex> update_management(management, %{field: new_value})
      {:ok, %Management{}}

      iex> update_management(management, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_management(%Management{} = management, attrs) do
    management
    |> Management.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Management.

  ## Examples

      iex> delete_management(management)
      {:ok, %Management{}}

      iex> delete_management(management)
      {:error, %Ecto.Changeset{}}

  """
  def delete_management(%Management{} = management) do
    Repo.delete(management)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking management changes.

  ## Examples

      iex> change_management(management)
      %Ecto.Changeset{source: %Management{}}

  """
  def change_management(%Management{} = management) do
    Management.changeset(management, %{})
  end
end
