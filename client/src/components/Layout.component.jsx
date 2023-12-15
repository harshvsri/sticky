import { Outlet } from "react-router-dom";

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
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
