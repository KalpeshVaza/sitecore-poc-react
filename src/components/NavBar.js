import React,  {useState, useEffect} from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import "./Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Link,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";



const NavBar = () => {

  const [postId, setPostId] = useState(null);
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user, null, 2)
    };
    // test url https://jsonplaceholder.typicode.com/posts
    fetch('http://ec2-18-220-230-153.us-east-2.compute.amazonaws.com/api/login/authenticate', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  console.log(user);
 
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

//     Cookies.set('user', 'loginTrue');
//     const [auth,setAuth] = React.useState(false);
//   const readcooki = () => {
//     const user = Cookies.get("user");
//     if (user){
//       setAuth(true);
//     }
//   }
//   React.useEffect(() =>{
// readcooki();
//   },[])
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/pro/resources/">
            Training
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/pro/resources/#security">
            Security
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/pro/resources/#hvac">
            HVAC
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/pro/resources/#plumbing">
            Plumbing
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/pro/resources/distributors/">
            Distributors
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/recall/">
            Recalls
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" 
          href="https://www.resideo.com/us/en/pro/utility-sell-sheets/">
           Utility Sell Pages
          </a>
        </Menu.Item>
        {/* <Menu.Item danger>a danger item</Menu.Item> */}
      </Menu>
    );
    

  return (
    <div className="nav-container">
      <Navbar color="dark" dark expand="md">
        <Container>
        {/* <b>POC Sitecore - React &nbsp;</b> */}
          <NavbarBrand >
    <img src={logo} className="logo1" />
            </NavbarBrand>
          
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
             <NavLink>
               <a href="https://www.resideo.com/us/en/products/air/" target="_blank">Link</a>
             </NavLink>
             <NavLink>
               <a href="https://www.resideo.com/us/en/pro/solutions/air/" target="_blank">Solution</a>
             </NavLink>
             <NavLink>
               <a href="https://www.resideo.com/us/en/pro/resources/" target="_blank">Training</a>
             </NavLink>
             {isAuthenticated && (
             <NavLink>
               <a href="https://www.resideo.com/us/en/pro/resources/" target="_blank">My Business</a>
             </NavLink>  
             )}
                 <Dropdown overlay={menu}>
                 <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                 {/* <p className="text">Resources</p>  */}
                 {/* <DownOutlined /> */}
                 </a>
                </Dropdown>
                    
               
              {/* {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="https://www.resideo.com/us/en/products/air/"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    Products
                  </NavLink>
                </NavItem>
              )} */}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    Sign in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Sign in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
