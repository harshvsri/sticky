import { useEffect, useState } from "react";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getDataFromAPI() {
      try {
        const res = await fetch("http://localhost:3000/users");
        // returns true if the http status [200-299] and false otherwise.
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log("Failed to fetch users:", err);
      }
    }
    getDataFromAPI();
  }, []);

  return users;
};

export default useFetchUsers;
