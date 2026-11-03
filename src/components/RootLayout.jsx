import Grid from '@mui/material/Grid';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <Sidebar />
                </Grid>
                <Grid size={10}>
                    <Outlet/>
                </Grid>
            </Grid>
        </div>
    )
}

export default RootLayout