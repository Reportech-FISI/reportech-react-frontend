import Appbar from '../../components/appbar/Appbar'
import Grid from '@mui/material/Grid';
import RegistersLineChart  from '../../components/registers/charts/RegistersLineChart';
import RegistersPieChartEstado from '../../components/registers/charts/RegistersPieChartEstado';
import RegistersPieChartPrioridad from '../../components/registers/charts/RegistersPieChartPrioridad';
import Box from '@mui/material/Box';

const RegisterEstadisticas = () => {
  return (
    <div className='bg-white'>
      <Appbar />
      <h1 className="flex font-semibold text-5xl justify-center p-3 pt-5">Estadísticas</h1>
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Box
            width="100%-10px"
            height="550px"
            bgcolor="#fafaf9"
            display="flex"
            flexDirection={"column"}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            borderColor="primary.main"
            borderRadius={10}
            boxShadow={2}
            p={2}
            m={2}
          >
            <h1 className="text-2xl font-semibold">Reportes por mes</h1>
            <RegistersLineChart />
          </Box>
        </Grid>
        <Grid item xs={6} >
          <Box
            width="100%-10px"
            height="550px"
            bgcolor="#fafaf9"
            display="flex"
            flexDirection={"column"}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            borderColor="primary.main"
            borderRadius={10}
            boxShadow={2}
            p={2}
            m={2}
          >
            <h1 className="text-2xl font-semibold">Reportes por estado</h1>
            <RegistersPieChartEstado/>
          </Box>
        </Grid>
        <Grid item xs={6} >
          <Box
            width="100%-10px"
            height="550px"
            bgcolor="#fafaf9"
            display="flex"
            flexDirection={"column"}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            borderColor="primary.main"
            borderRadius={10}
            boxShadow={2}
            p={2}
            m={2}
          >
            <h1 className="text-2xl font-semibold">Reportes por prioridad</h1>
            <RegistersPieChartPrioridad/>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
export default RegisterEstadisticas