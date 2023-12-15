import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;

/* <Link to="/login">Employee Login</Link>
Link component from the react-router-dom module that creates a link to another page

This code creates a link with the text "Employee Login" that will take the user to the /login page when clicked. 
This is commonly used for navigation and providing a convenient way for users to access other parts of the website. 
Note that the Link component is used in conjunction with the Route component 
to define the page that will be displayed when the user navigates to the specified URL.

How is <Link> different from the <a> tag?
Link component in react-router-dom is a specialized component for handling client-side routing 
in a single-page application built with React. 
It allows for dynamic updates to the URL and page content without triggering a full page refresh, 
resulting in a faster and smoother user experience. 
In contrast, the regular HTML anchor tag (<a>) is a general-purpose element 
for linking to resources on the web, and does not have any built-in routing or rendering capabilities.
*/

/*
The <header>, <main>, and <footer> sections of a web page layout are important components 
that help to organize and structure the content of the page, 
provide users with quick access to important information and features, 
and create a consistent and cohesive user experience across the website.
*/
