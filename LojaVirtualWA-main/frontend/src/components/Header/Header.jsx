import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "POST",
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand mb-0 h1" to="/">
          Loja Virtual
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link active" aria-current="page" to="/produto/create">
            Adicionar Produto
          </Link>
          <Link className="nav-link active" aria-current="page" to="/login">
            Login
          </Link>
          <Link onClick={handleLogout} className="nav-link active" aria-current="page" to="/">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
