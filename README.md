# TaskTracker

## Design Choices 
  * Each task has title (required), description (optional), completed (required, but default is false), time (required, but default is 0), user (required). Title, completion, time and user fields are made required because these fields represent essential information required for creating a task. Description is optional because some tasks can be trivial and not require description at all. Time represents amount of time (minutes) spent working on the assigned task.
  * When a user tries to create a task or update the existing task, the time field can be only an increment of 15 minutes. 
  

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
