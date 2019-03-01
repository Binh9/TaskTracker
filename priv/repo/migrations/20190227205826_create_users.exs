defmodule TaskTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :admin, :boolean, default: false, null: false

      timestamps()
    end

    alter table(:tasks) do
    	remove :user
    	add :user_id, references(:users, on_delete: :delete_all), null: true
    end

  end
end
