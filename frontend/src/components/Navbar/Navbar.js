import React, { useRef, useState } from "react";
import UserSearch from "../UserSearch/UserSearch";
import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  let userSearch = useRef();
  let userSearchInput = useRef();
  const handleMenu = (evt) => {
    setToggleSearch(true);
    window.addEventListener("click", (e) => {
      if (userSearch.current && userSearchInput.current) {
        if (
          !userSearch.current.contains(e.target) &&
          !userSearchInput.current.contains(e.target)
        ) {
          setToggleSearch(false);
        }
      }
    });
  };
  return (
    <>
      <div className="fake-nav"></div>
      <div className="navbar">
        <div className="fake-nav"></div>
        <div className="navbar-container">
          <Link style={{ textDecoration: "none", color: "black" }} to="/home">
            <span id="brand">Fubbly.</span>
          </Link>
          <div className="searchBar">
            <i className="fas fa-search"></i>
            <input
              placeholder="Search"
              id="input-box"
              ref={userSearchInput}
              type="text"
              value={search}
              onFocus={handleMenu}
              onChange={(e) => setSearch(e.target.value)}
            />
            {toggleSearch ? (
              <div ref={userSearch}>
                <UserSearch
                  handleClose={() => setToggleSearch(false)}
                  search={search}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
