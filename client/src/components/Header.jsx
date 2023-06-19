/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./Header.css";
import SideBar from "./SideBar";
import { styled, alpha } from "@mui/material/styles";
import { searchQuery } from "../features/products/productsSlice";

const optionsForClient = ["Cart", "My Orders", "My Wishlist", "Logout"];
const optionsForAdmin = ["Profile", "Logout"];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0.8),
    marginLeft: theme.spacing(5),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "&:active": {
        backgroundColor: "#c8c8c8cc",
      },
    },
  },
}));

const productCategories = ["clothes", "smart phones", "accessories", "other"];

function Header({ setActiveSearchList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { queryResponse } = useSelector((state) => state.products);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [searchClick, setSearchClick] = useState({});
  const [openSearchList, setOpenSearchList] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  let showHeader = true;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    return () => {
      reset();
    };
  }, [user, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  useEffect(() => {
    if (query !== "") {
      navigate(`/search/${query}`);
    }
  }, [query]);

  useEffect(() => {
    if (Object.keys(searchClick).length !== 0) {
      navigate(`/product/${searchClick._id}`);
      setOpenSearchList(false);
    }
  }, [searchClick]);

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/resetpassword"
  ) {
    showHeader = false;
  } else {
    showHeader = true;
  }

  const onLogout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(reset());
    document.getElementById("header-searchbar-input").value = "";
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    document.getElementById("header-searchbar-input").value = "";
    setOpenSearchList(false);
  };

  const handleSearchBar = (e) => {
    const enteredQuery = document.getElementById(
      "header-searchbar-input"
    ).value;

    if (enteredQuery !== "" && e.keyCode !== 32) {
      setOpenSearchList(true);
    } else if (enteredQuery === "") {
      setOpenSearchList(false);
    }

    setTimeout(() => {
      if (enteredQuery !== "" && e.keyCode !== 32) {
        dispatch(searchQuery(enteredQuery.trim()));
      }
    }, 0);

    if (enteredQuery !== "" && e.type === "click") {
      // navigate(`/search/${quary}`);
      setOpenSearchList(false);
      setQuery(enteredQuery);
    } else if (enteredQuery !== "" && e.keyCode === 13) {
      // navigate(`/search/${quary}`);
      setOpenSearchList(false);
      setQuery(enteredQuery);
    }
  };

  const handleCategoryClick = (category) => {
    setAnchorEl(null);
    navigate(`/products?category=${category}`);
  };

  const handelInfiniteScroll = async () => {
    try {
      if (document.documentElement.scrollTop >= 550) {
        setShowCategoryMenu(true);
      } else {
        setShowCategoryMenu(false);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleQueryClick = (response) => {
    setSearchClick(response);
  };

  return (
    <>
      {showHeader === true ? (
        <>
          <div className="header">
            <div className="header-logo">
              {user ? (
                user.role === "admin" ? (
                  <Link
                    to="/admin/dashboard"
                    style={{ color: "#f0f3ed", textDecoration: "none" }}
                    onClick={handleLogoClick}
                  >
                    ShopCart
                  </Link>
                ) : (
                  <Link
                    to="/"
                    style={{ color: "#f0f3ed", textDecoration: "none" }}
                    onClick={handleLogoClick}
                  >
                    ShopCart
                  </Link>
                )
              ) : (
                <>
                  <Link
                    to="/"
                    style={{ color: "#f0f3ed", textDecoration: "none" }}
                    onClick={handleLogoClick}
                  >
                    ShopCart
                  </Link>
                </>
              )}
            </div>
            {(!user || user.role === "buyer") &&
            (!user?.user.isBlocked || !user?.user.isDeleted) ? (
              <div
                className="header-search-div"
                onBlur={() => setOpenSearchList(false)}
              >
                <div className="header-searchbar">
                  <input
                    type="text"
                    name="header-searchbar-input"
                    id="header-searchbar-input"
                    onKeyUp={handleSearchBar}
                    autoComplete="off"
                  />
                  <button onClick={handleSearchBar}>
                    <SearchIcon />
                  </button>
                </div>
                {openSearchList && queryResponse?.response?.length > 0? (
                  <>
                    <div className="query-search-list">
                      {queryResponse?.response?.map((response) => {
                        return (
                          <>
                            <div
                              className="query-result-div"
                              onMouseDown={() => handleQueryClick(response)}
                              key={response._id}
                            >
                              <div>{response.prodName}</div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}

            {location.pathname === "/" && showCategoryMenu ? (
              <>
                <div className="category-menu">
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      backgroundColor: "#f0f3ed",
                      height: "35px",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#f0f3ed",
                        color: "#000000",
                      },
                      "& .Mui-active": {},
                    }}
                    disableRipple
                  >
                    Categories
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{}}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    {productCategories.map((category) => {
                      return (
                        <MenuItem
                          onClick={() => handleCategoryClick(category)}
                          sx={{ textTransform: "capitalize" }}
                          key={category}
                          disableRipple
                        >
                          {category}
                        </MenuItem>
                      );
                    })}
                  </StyledMenu>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="header-signin">
              {user ? (
                user.role === "admin" ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <div
                        className="header-user-name"
                        style={{ color: "#f0f3ed" }}
                      >
                        Hello, {user.user.name}
                      </div>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar />
                      </IconButton>
                    </div>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        key={optionsForAdmin[0]}
                        onClick={handleCloseUserMenu}
                        disabled
                      >
                        <Link
                          style={{ textDecoration: "None", color: "black" }}
                          to="/admin/profile"
                        >
                          {optionsForAdmin[0]}
                        </Link>
                      </MenuItem>
                      <MenuItem
                        key={optionsForAdmin[1]}
                        onClick={handleCloseUserMenu}
                        className="menu-icon-options"
                        sx={{
                          backgroundColor: "#f0f3ed",
                          color: "#f0f3ed",
                        }}
                      >
                        <Link
                          style={{ textDecoration: "None", color: "black" }}
                          onClick={onLogout}
                        >
                          {optionsForAdmin[1]}
                        </Link>
                      </MenuItem>
                    </Menu>
                  </>
                ) : user?.user.isBlocked || user?.user.isDeleted ? (
                  <>
                    <MenuItem
                      key={optionsForClient[3]}
                      onClick={handleCloseUserMenu}
                    >
                      <Link
                        style={{ textDecoration: "None", color: "black" }}
                        onClick={onLogout}
                      >
                        {optionsForClient[3]}
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex" }}>
                      <div
                        className="header-user-name"
                        style={{ color: "#f0f3ed" }}
                      >
                        Hello, {user.user?.name}
                      </div>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar />
                      </IconButton>
                    </div>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        key={optionsForClient[0]}
                        onClick={handleCloseUserMenu}
                      >
                        <Link
                          style={{ textDecoration: "None", color: "black" }}
                          to="/cart"
                        >
                          {optionsForClient[0]}
                        </Link>
                      </MenuItem>
                      <MenuItem
                        key={optionsForClient[1]}
                        onClick={handleCloseUserMenu}
                      >
                        <Link
                          style={{ textDecoration: "None", color: "black" }}
                          to="/myorders"
                        >
                          {optionsForClient[1]}
                        </Link>
                      </MenuItem>
                      <MenuItem
                        key={optionsForClient[2]}
                        onClick={handleCloseUserMenu}
                      >
                        <Link
                          style={{ textDecoration: "None", color: "black" }}
                          to="/mywishlist"
                        >
                          {optionsForClient[2]}
                        </Link>
                      </MenuItem>
                      <MenuItem
                        key={optionsForClient[3]}
                        onClick={handleCloseUserMenu}
                      >
                        <Link
                          style={{ textDecoration: "None", color: "black" }}
                          onClick={onLogout}
                        >
                          {optionsForClient[3]}
                        </Link>
                      </MenuItem>
                    </Menu>
                  </>
                )
              ) : (
                <>
                  <div className="login-register-button">
                    <Link
                      style={{ textDecoration: "None", color: "#f0f3ed" }}
                      to="/login"
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          height: "35px",
                          color: "black",
                          fontSize: "15px",
                          "&:hover": {
                            backgroundColor: "#f0f3ed",
                            border: "1px solid #2a3035",
                            color: "#000000",
                          },
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      style={{ textDecoration: "None", color: "#f0f3ed" }}
                      to="/register"
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          height: "35px",
                          color: "black",
                          fontSize: "15px",
                          "&:hover": {
                            backgroundColor: "#f0f3ed",
                            border: "1px solid #2a3035",
                            color: "#000000",
                          },
                        }}
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          {user && user.role === "admin" ? (
            <>
              <SideBar />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div className="header">
            <div className="header-logo">
              <Link
                to="/"
                style={{ color: "#f0f3ed", textDecoration: "none" }}
                onClick={handleLogoClick}
              >
                ShopCart
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Header;
