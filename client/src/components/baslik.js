import React from "react";
import { Link } from "react-router-dom";
export default function baslik() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Makale Listesi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ekle">
              Makale Ekle
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
