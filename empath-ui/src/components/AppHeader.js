import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import '../stylesheets/AppHeader.css';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import Link from '@mui/material/Link';
import {useColorMode} from "../theme/ColorModeProvider";
import ExplicitTwoToneIcon from '@mui/icons-material/ExplicitTwoTone';
import {useAuth} from "../auth/AuthProvider";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';


function AppHeader() {
    const theme = useTheme();
    const {user} = useAuth();
    const {toggleColorMode} = useColorMode();

    const [userState, setUserState] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [pages, setPages] = React.useState([]);
    const [settings, setSettings] = React.useState([]);
    const pagesData = {
        'Upcoming Experiences': [(<DateRangeIcon fontSize={"small"}></DateRangeIcon>), '#/upcoming-exp'],
        'Your Experiences': [(<ShoppingCartIcon fontSize={"small"} ></ShoppingCartIcon>), '#/your-exp'],
        'Sign In': [(<LoginIcon fontSize={"small"} ></LoginIcon>), '#/sign-in'],
        'Sign Up': [(<HowToRegIcon fontSize={"small"} ></HowToRegIcon>), '#/sign-up'],
    };
    const settingsLinks = {'Profile':"#/profile", 'Sign Out':"#/sign-out", "Inbox":'#/messaging'};


    React.useEffect(()=>{
        setUserState(user);
        console.log(user)
        if(!user){
            setPages(['Sign In', 'Sign Up']);
        }else{
            setPages(['Upcoming Experiences', 'Your Experiences']);
            setSettings(['Profile', 'Inbox', 'Sign Out']);
        }
    },[user])


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo for medium screen */}
                    <ExplicitTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    {/* Text for medium screen */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            fontSize: '1.5rem',
                            marginTop:'1px',
                            letterSpacing: '0',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Empath
                    </Typography>


                    {/* Hamburger Menu for small screen */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem  key={page} onClick={handleCloseNavMenu}>
                                    <Link href={pagesData[page][1]} underline="none" color="inherit"><Typography textAlign="center"> {pagesData[page][0]} &nbsp; {page}</Typography></Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    {/* Logo for small screen */}
                    <ExplicitTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    {/* Text for small screen */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            letterSpacing: '0',
                            color: 'inherit',
                            marginRight:'0px',
                            marginTop: '1px',
                            textDecoration: 'none',
                        }}
                    >
                        Empath
                    </Typography>


                    {/* Menu Buttons for medium screen */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                className={"menu-buttons"}
                                key={page}
                                href={pagesData[page][1]}
                                sx={{ my: 2, color: 'white', display: 'flex' }}
                            >
                                {pagesData[page][0]} &nbsp; {page}
                            </Button>
                        ))}
                    </Box>


                    {/* Dark/Light mode for all screen */}
                    <Box sx={{ flexGrow: 0}}>
                        <Button className={"mode-button"} sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={toggleColorMode} >
                            <span className={"mode-button-span"}>  {theme.palette.mode} {theme.palette.mode === 'dark' ?  <Brightness7Icon className={"mode-icon"}/>: <Brightness4Icon className={"mode-icon"}/> } </span>
                        </Button>
                    </Box>



                    {/* User button and its options for all screen */}
                    {/* Inbox button for medium screen */}
                    {
                        (userState)?
                            (

                                <>
                                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }}}>
                                        <Button className={"inbox-button"} sx={{ my: 2, color: 'white', display: 'block' }}
                                                href={"#/messaging"} >
                                            <span className={"mode-button-span"}> <MessageIcon className={"inbox-icon"}/> Inbox  </span>
                                        </Button>
                                    </Box>


                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt={user ? user.username: ""} src="../images/user.png" />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center"><Link href={settingsLinks[setting]} underline="none" color="inherit">{setting}</Link></Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </>
                            )
                            :
                            (<></>)
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppHeader;