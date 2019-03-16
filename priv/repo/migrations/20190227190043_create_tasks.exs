defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :desc, :text
      add :time, :integer
      add :completion, :boolean, default: false, null: false
      add :user, :string
      add :manager, :string

      timestamps()
    end

  end
end
