import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import UseRefEg from './useref';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Link to="/">Allen</Link>
        |
        <Link to="/neet/online-coaching-class-11">Class 11</Link>
        |
        <Link to="/neet/online-coaching-class-12">Class 12</Link>
        |
        <Link to="/useref">useRef </Link>
        <br />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="neet/online-coaching-class-11" element={<Class11Program />} />
            <Route path="neet/online-coaching-class-12" element={<Class12Program />} />
            <Route path="useref" element={<UseRefEg />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>

        Footer | Contact Us

      </BrowserRouter>
    </div>
  );
}

function Header() {
  return <div>Header</div>;
}

function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div style={{ height: "90vh", background: "white" }}>
        <Outlet />
      </div>
      Footer
    </div>
  );
}

function ErrorPage() {
  return (
    <div>
      This Page does not exist
    </div>
  );
}

function Landing() {
  return (
    <div>
      Welcome to allen
    </div>
  );
}

function Class11Program() {
  return (
    <div>
      NEET programs for Class 11th
    </div>
  );
}

function Class12Program() {
  const navigate = useNavigate();

  function redirectUser() {
    navigate("/");
  }

  return (
    <div>
      NEET programs for Class 12th
      <button onClick={redirectUser}>Go Back to the Landing page</button>
    </div>
  );
}

export default App;