import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import "../styles/Navbar.scss";
import variables from "../styles/variables.scss";

// Logo Component
const Logo = memo(() => (
  <a href="/" className="navbar_logo">
    <img src="/assets/logo.png" alt="logo" />
  </a>
));

// SearchBar Component
const SearchBar = ({ search, setSearch, onSearch }) => (
  <div className="navbar_search">
    <input
      type="text"
      placeholder="Search ..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      aria-label="Search"
    />
    <IconButton disabled={!search} onClick={onSearch}>
      <Search sx={{ color: variables.pinkred }} />
    </IconButton>
  </div>
);

// UserMenu Component
const UserMenu = ({ user, dropdownMenu, toggleMenu, onLogout }) => (
  <div className="navbar_right">
    <a href={user ? "/create-listing" : "/login"} className="host">
      {user ? "Create Listing" : "Become A Host"}
    </a>
    <button
      className="navbar_right_account"
      onClick={toggleMenu}
      aria-expanded={dropdownMenu}
      aria-label="User Menu"
    >
      <Menu sx={{ color: variables.darkgrey }} />
      {user ? (
        <img
          src={user.profileImagePath}
          alt="profile photo"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      ) : (
        <Person sx={{ color: variables.darkgrey }} />
      )}
    </button>

    {dropdownMenu && (
      <div className="navbar_right_accountmenu">
        {!user ? (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>
            <Link to="/login" onClick={onLogout}>
              Log Out
            </Link>
          </>
        )}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setDropdownMenu(!dropdownMenu);
  const onLogout = () => {
    dispatch(setLogout());
    setDropdownMenu(false);
  };
  const onSearch = () => {
    if (search) {
      navigate(`/properties/search/${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="navbar">
      <Logo />
      <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
      <UserMenu
        user={user}
        dropdownMenu={dropdownMenu}
        toggleMenu={toggleMenu}
        onLogout={onLogout}
      />
    </nav>
  );
};

export default Navbar;
