import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../images/logo1.webp';
import MenuItem from '@mui/material/MenuItem';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [navList, setNavList] = useState([]);
  const [socialList, setSocialList] = useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const getNavList = () => {
    fetch('./data/navigation_en.json')
        .then(res => res.json())
        .then(resp => {
            setNavList(resp);
        })
}
const getSocialList = () => {
    fetch('./data/social.json')
        .then(res => res.json())
        .then(resp => {
            setSocialList(resp);
        })
}
useEffect(()=> {
    getNavList();
    getSocialList();
}, []);

const navListRender = navList.map((item, index) => {
    const url = item.url;
    return <li className="nav-item" key={index} onClick={handleCloseNavMenu}><NavLink to={url} className="nav_link"><span className="link-subtitle">{item.title}</span></NavLink>
    </li>
})

const socialListRender = socialList.map((item, index) => {
    let IconComponent;
    switch (item.id) {
        case 'facebook':
            IconComponent = FacebookOutlinedIcon;
            break;
        case 'linkedin':
            IconComponent = LinkedInIcon;
            break;
        case 'instagram':
            IconComponent = InstagramIcon;
            break;
        default:
            IconComponent = FacebookOutlinedIcon;
            break;
      }
    
    return <li key={index} className="social-link-item">
        <a href={item.url} className="social-link" alt={item.id}  target="_blank" rel="noopener noreferrer"><IconComponent sx={{ fontSize: 30 }} md={{ fontSize: 34 }} lg={{ fontSize: 40 }} color="primary"/></a>
    </li>
    }
)

  return (
    <AppBar position="static" className='header'>
      <div className="container">
        <nav className="main_nav">
           <div className="logo-wrapper">
           <NavLink to="/" className="logo_link">
                    <img src={logo} alt="logo" className="logo" />
                </a>
            </div>  
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, order: {xs: -2} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {navList.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}><NavLink to={page.url}className="nav_link"> <Typography textAlign="center"><span>{page.title}</span></Typography></NavLink>                 
                </MenuItem>
              ))}
            </Menu>
          </Box>
           

          <Box  className="nav-list_wrapper" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                <ul className="nav_list">
                    {navListRender}
                </ul>
          </Box>

            <div className="social-links-wrapper">
                <ul className="social-link-list">
                    {socialListRender}
                </ul>
            </div>

        </nav>
      </div>
    </AppBar>
  );
}
export default Header;
