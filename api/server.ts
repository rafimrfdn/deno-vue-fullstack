// backend/server.ts
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { cors } from "https://deno.land/x/hono/middleware.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("test.db");

// Initialize the database
db.execute(`
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

// Insert some initial data if the table is empty
const count = db.query("SELECT COUNT(*) FROM people")[0][0];
if (count === 0) {
  for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
    db.query("INSERT INTO people (name) VALUES (?)", [name]);
  }
}

// Create a new Hono app
const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// GET all people
app.get("/api/people", (c: any) => {
  const people = db.query("SELECT id, name FROM people");
  return c.json(people.map(([id, name]) => ({ id, name })));
});

// GET a single person by ID
app.get("/api/people/:id", (c: any) => {
  const id = c.req.param("id");
  const [person] = db.query("SELECT id, name FROM people WHERE id = ?", [id]);
  if (person) {
    return c.json({ id: person[0], name: person[1] });
  } else {
    return c.json({ error: "Person not found" }, 404);
  }
});

// POST a new person
app.post("/api/people", async (c: any) => {
  const { name } = await c.req.json();
  db.query("INSERT INTO people (name) VALUES (?)", [name]);
  return c.json({ message: "Person added successfully" });
});

// PUT (update) a person by ID
app.put("/api/people/:id", async (c: any) => {
  const id = c.req.param("id");
  const { name } = await c.req.json();
  db.query("UPDATE people SET name = ? WHERE id = ?", [name, id]);
  return c.json({ message: "Person updated successfully" });
});

// DELETE a person by ID
app.delete("/api/people/:id", (c: any) => {
  const id = c.req.param("id");
  db.query("DELETE FROM people WHERE id = ?", [id]);
  return c.json({ message: "Person deleted successfully" });
});

// Start the server
console.log("Server running on http://localhost:8000");
Deno.serve(app.fetch); // by default the server will run in port 8000
//Deno.serve({ port: 8080 }, app.fetch);
