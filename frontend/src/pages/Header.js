import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, userLogout } from "../actions/userAction";
import { Link, NavLink } from "react-router-dom";

// import Snackbar from "@material-ui/core/Snackbar";

import classes from "./Header.module.css";
import UserSearch from "../components/UserSearch/UserSearch";

const Header = () => {
  // const [logoutPop, setLogoutPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  const { user } = useSelector((state) => state.userInfo);
  let userSearch = useRef();
  let userSearchInput = useRef();
  const dispatch = useDispatch();
  // const history = useHistory();

  // const showMenu = (e) => {
  //   setToggleSearch(true, () => document.addEventListener("click", closeMenu));
  // };

  // const closeMenu = (e) => {
  //   setToggleSearch(false, () =>
  //     document.removeEventListener("click", closeMenu)
  //   );
  // };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    dispatch(userLogout());
    setIsLoggedIn(false);
  };

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

  // const handleSnackbarClose = () => {
  //   setLogoutPop(false);
  // };

  return (
    <>
      <div className={classes.fakeNav}></div>
      <nav className={classes.navbar}>
        <div className={classes.navContainer}>
          <h2 className={classes.brand}>
            <Link to="/" style={{ textDecoration: "none", color: "#ebe8e8" }}>
              Fubbly
            </Link>
          </h2>
          {isLoggedIn ? (
            <div className={classes.search}>
              <input
                ref={userSearchInput}
                type="text"
                value={search}
                onFocus={handleMenu}
                onChange={(e) => setSearch(e.target.value)}
                className={classes.searchBar}
                placeholder="Search"
              />
              {toggleSearch ? (
                <div ref={userSearch}>
                  <UserSearch search={search} />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <ul className={classes.links}>
            <li>
              <span className={classes.link}>
                {!isLoggedIn ? (
                  <NavLink
                    to="/login"
                    className={classes.disableLink}
                    activeClassName={classes.activeLink}
                  >
                    <div className={classes.iconAndLabel}>
                      <i className={`fas fa-user ${classes.navIcon}`}></i>
                      <span className={classes.hideLinkText}>Sign In</span>
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    to={`/profile`}
                    style={{ textDecoration: "none" }}
                    className={classes.disableLink}
                    activeClassName={classes.activeLink}
                  >
                    <div className={`${classes.iconAndLabel}`}>
                      <i
                        className={`fas fa-user-circle ${classes.navIcon}`}
                      ></i>
                      <span>
                        <span className={classes.hideLinkText}>
                          {user.name}
                        </span>
                      </span>
                    </div>
                  </NavLink>
                )}
              </span>
            </li>
            {isLoggedIn ? (
              <li onClick={handleLogout}>
                <span className={classes.link}>
                  <div className={classes.iconAndLabel}>
                    <i className={`fas fa-sign-out-alt ${classes.navIcon}`}></i>
                    <span>
                      <span className={classes.hideLinkText}>Logout</span>
                    </span>
                  </div>
                </span>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        {/* <Snackbar
          open={logoutPop}
          autoHideDuration={3000}
          message="Logged Out Succesfully"
          onClose={handleSnackbarClose}
          // onClose={handleClose}
        ></Snackbar> */}
      </nav>
    </>
  );
};

export default Header;
