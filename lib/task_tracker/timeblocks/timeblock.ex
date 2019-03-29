defmodule TaskTracker.Timeblocks.Timeblock do
  use Ecto.Schema
  import Ecto.Changeset


  schema "timeblocks" do
    field :end, :string
    field :start, :string
    
    belongs_to :task, TaskTracker.Tasks.Task, foreign_key: :task_id

    timestamps()
  end

  @doc false
  def changeset(timeblock, attrs) do
    timeblock
    |> cast(attrs, [:start, :end, :task_id])
    |> validate_required([:start, :end, :task_id])
    |> unique_constraint(:task_id, name: :timeblocks_task_id_start_index)
  end
end
