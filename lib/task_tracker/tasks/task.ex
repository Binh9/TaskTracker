defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completion, :boolean, default: false
    field :desc, :string
    field :time, :integer, default: 0
    field :title, :string
    #field :user, :string

    belongs_to :user, TaskTracker.Users.User, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time, :completion, :user_id])
    |> validate_required([:title, :time, :completion])
  end
end
