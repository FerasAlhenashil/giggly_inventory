import React from "react";
import EndOfDay from "./EndOfDay"
import Login from "./Login"
import Admin from "./Admin"
import Sales from "./Sales"
import Production from "./Production"
import LogOut from "./LogOut"
import {Link} from "react-router-dom";

const Navbar = () => {

  const navStyle ={ 
    color: '#f2f2f2',
    textDecoration: 'none',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: '25px'

  };
  const navStyleLog ={ 
    color: '#f2f2f2',
    textDecoration: 'none',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: '15px'

  };

  return(
    <nav >
      <ul className= "nav-links">
        <Link style={navStyleLog} to="/Login">
         <li>Login</li>
        </Link>
        <Link style={navStyle} to="/InventoryTable">
          <li>Inventory</li>
        </Link>

        <Link style={navStyle} to="/Sales">
          <li>Sales</li>
        </Link>

        <Link style={navStyle} to="/Production">
          <li>Production</li>
        </Link>

        <Link style={navStyle} to="/EndOfDay">
          <li>End of Day</li>
        </Link>

        <Link style={navStyle} to="/Admin">
          <li>Admin</li>
        </Link>
        <Link style={navStyleLog} to="/LogOut">
        <li>Logout</li>
      </Link>
      </ul>
    </nav>
    
  )
}
 

export default Navbar
