defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completion, :boolean, default: false
    field :desc, :string
    field :time, :integer
    field :title, :string

    belongs_to :user, TaskTracker.Users.User, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time, :completion, :user_id])
    |> unique_constraint(:title)
    |> validate_required([:title, :desc, :time, :completion, :user_id])
  end
end
