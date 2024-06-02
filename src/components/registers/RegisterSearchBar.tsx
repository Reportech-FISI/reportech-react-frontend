import { Toolbar, InputBase } from '@mui/material'

const RegisterSearchBar = () => {
  return ( 

    <div className='p-0 flex items-center justify-center '>
      <Toolbar 
        sx={{ 
          width: '80%',
          '@media (min-width: 600px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }} 
        className='justify-end'
      >
        <input 
          placeholder='Buscar' 
          type='search'
          className='bg-white border border-slate-400 p-1 rounded outline-none focus:ring-4 focus:ring-blue-200'
        />
      </Toolbar>
    </div>

  )
}

export default RegisterSearchBar