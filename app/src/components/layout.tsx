import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
 import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { HomeFilled } from '@mui/icons-material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SourceIcon from '@mui/icons-material/Source';
import MenuIcon from '@mui/icons-material/Menu';
 import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "../assets/logo.png"
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../providers/context';
 const drawerWidth = 250;

 


export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
          const projectContext = React.useContext(ProjectContext);


  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar >
        <Box mx="auto" my={1}>
            
        <img src={logo} width={120} />
        </Box>
        </Toolbar>
       
      <List>
    
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeFilled />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </Link>
            
        <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SourceIcon />
              </ListItemIcon>
              <ListItemText primary='Projects' />
            </ListItemButton>
          </ListItem>
        </Link>
  <ListItem  disablePadding>
            <ListItemButton>
             
              <ListItemText primary={projectContext?.projectId?`${projectContext?.projectId}`:'No project saved'} />
            </ListItemButton>
          </ListItem>
        
      </List>
     </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
       <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' noWrap component="div" fontFamily="Gloria Hallelujah">
            FireRESTy
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
       >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        marginTop={10}
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
