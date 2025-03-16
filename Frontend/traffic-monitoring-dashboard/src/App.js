import './App.css';
import DashboardHome from "./pages/dashboard-home";
import Grid from "@mui/material/Grid2";

function App() {
  return (
    <div className="App">
        <Grid container>
            <DashboardHome />
        </Grid>
    </div>
  );
}

export default App;
