defmodule TaskTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :admin, :boolean, default: false, null: false


      timestamps()
    end
    create unique_index(:users, [:email])

    alter table(:tasks) do
    	remove :user
      remove :manager
    	add :user_id, references(:users, on_delete: :delete_all), null: true
      add :manager_id, references(:users, on_delete: :delete_all), null: true
    end

  end
end
