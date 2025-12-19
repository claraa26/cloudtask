import { Link } from "react-router-dom";

export default function Navbar({ isAuth, onLogout }) {
  return (
    <nav className="navbar">
      <h3>CloudTask</h3>
      <div>
        {isAuth && <Link to="/tasks">Tasks</Link>}
        <Link to="/about">About</Link>
        {isAuth ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
