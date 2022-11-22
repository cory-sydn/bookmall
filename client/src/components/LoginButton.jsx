import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/navbar.scss'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="nav-auth_button login_button" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;