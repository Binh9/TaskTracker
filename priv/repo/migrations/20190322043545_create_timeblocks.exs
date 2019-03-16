defmodule TaskTracker.Repo.Migrations.CreateTimeblocks do
  use Ecto.Migration

  def change do
    create table(:timeblocks) do
      add :start, :string
      add :end, :string
      add :task_id, references(:tasks, on_delete: :delete_all)

      timestamps()
    end

    create index(:timeblocks, [:task_id, :start], unique: true)

    alter table(:tasks) do
      #remove :timeblocks
      add :timeblocks, references(:timeblocks, on_delete: :delete_all) 
    end
  end
end
