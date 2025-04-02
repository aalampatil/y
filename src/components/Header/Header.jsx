import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutBtn, Container } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "My Account", slug: "/myaccount", active: authStatus },
    { name: "All Posts", slug: "/allpost", active: authStatus },
    { name: "Add Post", slug: "/addpost", active: authStatus },
    { name: "Sign Up", slug: "/signup", active: !authStatus },
    { name: "Log In", slug: "/login", active: !authStatus },
  ];

  return (
    <header className="bg-white shadow-md py-4">
      <Container>
        <nav className="flex justify-between items-center">
          <ul className="flex gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>
          {authStatus && <div><LogoutBtn /></div> }
        </nav>
      </Container>
    </header>
  );
}

export default Header;
