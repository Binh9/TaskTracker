defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completion, :boolean, default: false
    field :desc, :string
    field :title, :string

    belongs_to :user, TaskTracker.Users.User, foreign_key: :user_id
    belongs_to :manager, TaskTracker.Users.User, foreign_key: :manager_id
    has_many :timeblocks, TaskTracker.Timeblocks.Timeblock

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :completion, :user_id, :manager_id])
    |> validate_required([:title, :completion, :user_id, :manager_id])
  end
end
