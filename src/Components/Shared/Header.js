import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      {user && <Link to="/profile">{user?.name}</Link>}
    </div>
  );
}
