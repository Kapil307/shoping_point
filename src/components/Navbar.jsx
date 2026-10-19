
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/?search=${encodeURIComponent(query)}#products`);
      setSearch("");
    }
  }

  const categories = [
    { name: "Fashion", path: "/fashion" },
    { name: "Accessories", path: "/accessories" },
    { name: "Electronics", path: "/electronics" },
    { name: "Phones", path: "/phones" },
    { name: "Home & Living", path: "/home-living" },
    { name: "Beauty", path: "/beauty" },
    { name: "Sports", path: "/sports" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shopease-navbar">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <i className="bi bi-bag-check-fill text-warning me-2"></i>
          ShopEase
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#shopEaseNavbar"
          aria-controls="shopEaseNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="shopEaseNavbar">
          {/* Search */}
          <form
            className="d-flex mx-lg-4 my-3 my-lg-0 shopease-search"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button
              className="btn btn-warning ms-2"
              type="submit"
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* Navigation Links */}
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            {categories.map((category) => (
              <li className="nav-item" key={category.path}>
                <NavLink className="nav-link" to={category.path}>
                  {category.name}
                </NavLink>
              </li>
            ))}

            {/* Cart */}
            <li className="nav-item ms-lg-2">
              <NavLink
                className="nav-link cart-link"
                to="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <i className="bi bi-cart3 fs-5"></i>
                <span className="ms-1">Cart</span>

                <span className="badge rounded-pill bg-warning text-dark ms-1">
                  {cartCount}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
