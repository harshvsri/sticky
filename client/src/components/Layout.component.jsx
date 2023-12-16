import { useEffect, useState } from "react";

/*
<Outlet /> component is used to render child routes within a parent component.

Here's how it works:
> A parent component, defined with the <Route> component, 
can have one or more child routes defined with nested <Route> components.
> Each child route can have its own path and component to render.
> The <Outlet /> component is used within the parent component to render the child routes.
> When the URL matches a child route's path, 
the corresponding component is rendered inside the <Outlet /> component in the parent component.
*/
const Layout = () => {
  const [users, setUsers] = useState([]);

  async function getDataFromAPI() {
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Failed to fetch users:", err);
    }
  }

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <div>
      <h1>These are the users from database...{Math.random()}</h1>
      {users.map((user, index) => (
        <div key={index}>
          <h1>{`UserID of ${user.username} is ${user._id}`}</h1>
        </div>
      ))}
    </div>
  );
};

export default Layout;
