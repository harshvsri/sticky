import useFetchUsers from "../hooks/useFetchUsers";

export const Home = () => {
  const users = useFetchUsers();
  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h1>{user.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default Home;
