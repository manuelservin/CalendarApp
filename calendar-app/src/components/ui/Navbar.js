import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../redux/actions/auth";

const Navbar = () => {
  const {name} = useSelector( state => state.auth );
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log( "Logout" );
    dispatch(startLogout());
  }
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      { name && <span className="navbar-brand">{name}</span>}
      <button onClick={handleLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> salir</span>
      </button>
    </div>
  );
};

export default Navbar;
