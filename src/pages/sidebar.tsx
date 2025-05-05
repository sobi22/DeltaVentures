import {
    Box,
    Collapse,
    CSSObject,
    Divider,
    IconButton,
    List,
    ListItem,
    Popover,
    styled,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
  } from '@mui/material';
  import React, { useContext, useEffect, useState } from 'react';
  import MuiDrawer from '@mui/material/Drawer';
  import { ThemeContext } from '../App';
  
  import { generatePath, useLocation } from 'react-router-dom';
  import cx from 'classnames';
  import routes from '../routesList';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import { useNavigate } from 'react-router-dom';
  import { MenuItem, SUBTABS, TABS } from '../types/menu';
  import { SIDEBAR_ACTION } from "../store/actions";
import { Link } from "react-router-dom";
  import styles from '../assets/css/menubar.css';
//   import { useGetUserRoleDetailsQuery } from 'api/controller/userRoleAPI';
  import AsyncDOM from '../utils/AsyncDOM';
  import UpOutlined from '@ant-design/icons/UpOutlined';
  import {
    DashboardOutlined,
    UserOutlined,
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    FileTextOutlined,
    FileOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    CreditCardOutlined,
    DollarOutlined,
    AuditOutlined,
    IdcardOutlined,
    SolutionOutlined,
    DownOutlined,
  } from '@ant-design/icons';
  import { useDispatch,useSelector } from 'react-redux';
import { AnyComponent } from 'styled-components/dist/types';

  const smallIconStyle = { fontSize: '18px', color: '#001528' };
  const mainIconStyle = { fontSize: '16px', color: 'white' };
  const drawerWidth = 150;
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        // backgroundColor: '#001528', // Blue color
        // background: '#123524', // Blue color
        background: '#004d4d', 
        color: 'white', // Optional: Set text color for better readability
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        // backgroundColor: '#001528', // Blue color for closed state as well
        background: '#123524', // Blue color for closed state as well
        color: 'white', // Optional: Set text color for better readability
      },
    }),
  }));
  
  interface LeftMenuBarProps {
    drawerOpen: boolean;
    handleDrawerClose: () => void;
    handleDrawerOpen: () => void;
  }
  
  const menuItems: MenuItem[] = [
    // { name: 'Dashboard', path: routes.ROOT, icon: <DashboardOutlined style={mainIconStyle} /> },
    
    // {
    //   name: 'Profile',
    //   path: routes.PROFILE,
    //   icon: <IdcardOutlined style={mainIconStyle} />,
    // },
    {
      name: 'User',
      path: routes.USER,
      icon: <IdcardOutlined style={mainIconStyle} />,
    },
    
    
  ];
  const Sidebar = (props: LeftMenuBarProps) => {
    // const [{ unfoldable, navigations }] = useSelector((state:any) => [
    //     state.globalState,
    //   ]);
    //   const [{user}] = useSelector((state:any)=>[state.authUser])
    const { theme: currentTheme } = useContext(ThemeContext);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const [selectedTab, setSelectedTab] = useState<TABS | SUBTABS>('User');
    const isMobile = useMediaQuery('(max-width: 600px)');
    const location = useLocation();
    const { pathname } = location;
    const pathurl = pathname.substring(1);
    const navigate = useNavigate();
  
    const findAppByPath = (pathurl: string, menuItems: MenuItem[]): MenuItem | null => {
      for (const menuItem of menuItems) {
        if (menuItem.path === pathurl) {
          return menuItem;
        } else if (menuItem.submenus) {
          // Recursively search submenus if they exist
          const appInSubmenu = findAppByPath(pathurl, menuItem.submenus);
          if (appInSubmenu) {
            return appInSubmenu;
          }
        }
      }
      return null;
    };
  
    const currentApp = findAppByPath(`/${pathurl}`, menuItems);
  
    useEffect(() => {
      if (currentApp) {
        setSelectedTab(currentApp.name as TABS | SUBTABS);
      }
    }, [currentApp]);
  
    const handleSubMenuClick = (index: number) => {
      if (!props.drawerOpen) {
        props.handleDrawerOpen();
      }
      setOpenSubMenu(openSubMenu === index ? null : index);
    };
  
    useEffect(() => {
      if (props.drawerOpen) {
        setOpenSubMenu(null);
      }
      const parentMenuIndex = menuItems.findIndex((menuItem) => {
        // if (menuItem.submenus) {
        //   return menuItem.submenus.some((submenu) => submenu.path === `/${pathurl}`);
        // }
        // return false;
        return true;
      });
      if (parentMenuIndex !== -1) {
        setOpenSubMenu(parentMenuIndex);
      }
    }, [props.drawerOpen]);
    const matches = useMediaQuery('(max-width:600px)');
    const matches1 = useMediaQuery('(min-width:600px)');
    useEffect(() => {
      if (matches) {
        props.handleDrawerClose();
      } else if (matches1) {
        props.handleDrawerOpen();
      }
    }, [matches, matches1]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
      setAnchorEl(event.currentTarget);
      setOpenMenuIndex(index);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
      setOpenMenuIndex(null);
    };
    return (
      <>
        <Drawer variant="permanent" open={props.drawerOpen} sx={{ width: '100px' }}>
          <DrawerHeader sx={{ justifyContent: 'space-between', ml: 1 }}>
            <Link to={generatePath(routes.ROOT)}>
              {props.drawerOpen && (
                <Box display={'flex'} alignItems={'center'} gap={2}>
                  <img style={{}} src={''} alt="User Management" width={'100%'} />
                </Box>
              )}
            </Link>
            {!props.drawerOpen && <img src={''} alt="Smaggll Logo" width={'100%'} />}
          </DrawerHeader>
          <Divider />
              
              <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <ListItemButton
                      onClick={(event) => {
                        if (item.submenus) {
                          handlePopoverOpen(event, index);
                        } else if (item.path) {
                          console.log(item.path);
                          navigate(item.path);
                          setSelectedTab(item.name);
                        }
                      }}
                      sx={{
                        p: '15px 10px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        // flexDirection: 'column',
                        borderRadius: '30px',
                        ...(selectedTab === item.name && {
                          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                            color: 'white',
                          },
                        }),
                      }}
                      selected={selectedTab === item.name}
                      className={cx(selectedTab === item.name)}
                    >
                      <ListItemIcon sx={{ alignItems: 'flex-start' }} >
                        {item.icon}
                        {!props.drawerOpen && <Typography sx={{ fontSize: '10px' }}>{item.name}</Typography>}
                      </ListItemIcon>
                      <Typography sx={{ fontSize: '16px', fontWeight: 400,alignItems: 'left' }}>{item.name}</Typography>
                     
                    </ListItemButton>
  
                    {item.submenus && (
                      <Popover
                        open={openMenuIndex === index}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'center',
                          horizontal: 'left',
                        }}
                        disableRestoreFocus
                        disableScrollLock
                        BackdropProps={{
                          style: { backgroundColor: 'transparent' },
                        }}
                      >
                        <Box sx={{ p: 0, minWidth: 200 }}>
                          {item.submenus.map((submenu, submenuIndex) => (
                            <ListItemButton
                              key={submenuIndex}
                              onClick={() => {
                                handlePopoverClose(); // Close the Popover first
                                setTimeout(() => {
                                  console.log(submenu.path);
                                  if (submenu.path) {
                                    navigate(submenu.path); // Navigate after Popover cleanup
                                    setSelectedTab(submenu.name);
                                  }
                                }, 0); // Small delay to ensure smooth transition
                              }}
                              sx={{
                                borderRadius: '8px',
                                '&:hover': {
                                  backgroundColor: 'var(--light-blue-50)',
                                },
                                ...(selectedTab === submenu.name && {
                                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                                    color: '#001528',
                                  },
                                }),
                              }}
                            >
                              <ListItemIcon sx={{ justifyContent: 'space-evenly' }}>{submenu.icon}</ListItemIcon>
                              <ListItemText
                                primary={submenu.name}
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  maxWidth: 'calc(100% - 48px)',
                                }}
                              />
                            </ListItemButton>
                          ))}
                        </Box>
                      </Popover>
                    )}
                  </React.Fragment>
                ))}
              </List>
        </Drawer>
      </>
    );
  };
  
  export default Sidebar;
  