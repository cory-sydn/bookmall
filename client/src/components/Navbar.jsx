import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.scss"

const Navbar = () => {
  return (
    <header className='bookmall_header' >
      <h1 id="logo" >BookMall</h1>
      <nav>
        <ul id='navbar' >
          <li><Link className='nav-link' to="/" >Books </Link></li>
          <li><Link className='nav-link' to="/add" >Add New Books </Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar