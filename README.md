# TaskTracker

## Design Choices 
  * Features as described in the assignment.
  * Only if login in as some user --> can add a new task.
  * When logged-in, pressing home opens a list of managers and underlings. 
  * There is also list of tasks available once logged in.
  * Even when the underling is deleted, we still want to display the previous assignments for tracking purposes.
  * Edit privileges for manager and employee are different. For example, manager can reassign the assignment.
  * Employee are not allowed to delete the tasks and managers that were assigned to them. 
  * Managers can remove the underlings, look/edit/delete the underlings tasks.
  

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
