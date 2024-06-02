import { AppBar, Container, Toolbar, Typography, Box, IconButton, Avatar, Button } from '@mui/material'
import AdbIcon from "@mui/icons-material/Adb";
import React from 'react'

const Topbar = () => {
  return (
    <div>
      <AppBar position='static'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
              variant='h6'
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              REPORTECH
            </Typography>

            <Box sx={{flexGrow: 0}}>
              <IconButton sx={{ p: 0 }}>
                <Avatar></Avatar>
              </IconButton>
            </Box>
            
            <Box className='bg-red-500'>
              <Button > Back </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Topbar