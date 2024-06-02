import { AppBar, Container, Toolbar, Typography, Box, IconButton, Avatar, Button } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';import React from 'react'

const Appbar = () => {
  return (
    <div className='flex justify-between bg-slate-100 p-2 fixed w-full'>
      <div className='flex items-center'>
        <Box sx={{flexGrow: 0}}>
          <AdminPanelSettingsIcon fontSize='large' color='primary'/>
        </Box>
        <div className='ml-2'>
          <h3>Nombre</h3>
          <h3 className='text-xs text-gray-500'>
            Administrador
          </h3>
        </div>
      </div>
      <div className='flex items-center'>
        <button className='p-2 bg-slate-700 hover:bg-slate-600 rounded text-zinc-100'>
          Atrás
        </button>
      </div>
    </div>
  )
}

export default Appbar