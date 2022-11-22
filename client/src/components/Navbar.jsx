import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.scss"
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dropRef = useRef(null)

  useEffect(() => {
    // click outside to close dropdown menu
    const handleDropdown = (e) => {
      if(openDropdown && dropRef.current && !dropRef.current.contains(e.target)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleDropdown);
    document.addEventListener("touchstart", handleDropdown);
    return () => {
      document.removeEventListener("mousedown", handleDropdown);
      document.removeEventListener("touchstart", handleDropdown);
    }
  }, [dropRef, openDropdown])

  // render navbar while auth0 processing
  if (isLoading) {
    return (
      <header className='bookmall_header' >
        <h1 id="logo" >BookMall</h1>
        <nav>
          <ul id='navbar' >
            <li><Link className='nav-link' to="/" >Books </Link></li>
          </ul>
        </nav>
      </header>
    )
  }

  return (
    <header className='bookmall_header' >
      <h1 id="logo" >BookMall</h1>
      <nav>
        <ul id='navbar' >
          <li><Link className='nav-link' to="/" >Books </Link></li>
          {isAuthenticated
            ? (
              <>
                <li><Link className='nav-link' to="/add" >Add New Books </Link></li>
                <li className='user_profile' >
                  <img src={user.picture} alt={user.name} onClick={() => setOpenDropdown(true)} />
                  {openDropdown &&
                    <ul className='profile_dropdown' ref={dropRef} >
                      <li>
                        <h2>{user.name}</h2>
                      </li>
                      <li>
                        <p>{user.email}</p>
                      </li>
                      <li>
                        <li><LogoutButton /> </li>
                      </li>
                    </ul>
                  }
                </li>
              </>
            )
            : (<li><LoginButton /> </li>)
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar