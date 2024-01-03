import { useState } from "react";

function UserForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    roles: ["user"],
  });

  async function handleSubmit(e) {
    // Prevents from refreshing form
    e.preventDefault();

    // Making a post req to the server.
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      console.log("HTTP error", response.status);
    }
    console.log(`${form.username} added successfully`);
  }

  return (
    <>
      <form className="m-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <div className="form-text">
            We will never share your details with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default UserForm;
