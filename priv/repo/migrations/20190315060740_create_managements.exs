defmodule TaskTracker.Repo.Migrations.CreateManagements do
  use Ecto.Migration

  def change do
    create table(:managements) do
    	add(:manager_id, references(:users, on_delete: :delete_all), primary_key: true)
    	add(:underling_id, references(:users, on_delete: :delete_all), primary_key: true)

      timestamps()
    end

    create(index(:managements, [:manager_id]))
    create(index(:managements, [:underling_id]))
    create unique_index(:managements, [:manager_id, :underling_id], name: :mng)

  end
end
