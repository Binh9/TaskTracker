defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completion, :boolean, default: false
    field :desc, :string
    field :time, :integer, default: 0
    field :title, :string

    belongs_to :user, TaskTracker.Users.User, foreign_key: :user_id
    belongs_to :manager, TaskTracker.Users.User, foreign_key: :manager_id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time, :completion, :user_id, :manager_id])
    |> validate_required([:title, :time, :completion, :user_id, :manager_id])
  end
end
