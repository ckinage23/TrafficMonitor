import CountryWiseTrafficChart from "../country-traffic-chart";
import axios from "axios";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import VehicleTypeDistributionChart from "../vehicle-type-distribution-chart";
import Grid from '@mui/material/Grid2';
import Topbar from "../../components/topbar";
import Typography from "@mui/material/Typography";
import './../../App.css';
import {getCountries, getSubtitleText} from '../../utils/dashboard-home'
import {IcecreamTwoTone} from "@mui/icons-material";

function DashboardHome() {
    const {
        data: countries
    } = useQuery("countriesData", getCountries);
    const [selectedCountry, setSelectedCountry] = useState()

    return (
        <>
            <Grid container direction={"column"} width={"100%"} >
            <Topbar/>
                <Grid container direction = {"column"} className={"page-header"} >
                <Typography className={"page-title"} variant={"h4"}>Traffic Stats 2025</Typography>
                <Typography className={"page-subtitle"} variant={"subtitle2"}>{getSubtitleText(selectedCountry)}</Typography>
                </Grid>
                    <Grid container direction = {"row"} spacing={2} rowSpacing={2} className={"container"}>
                    <Grid size="auto">
                        <CountryWiseTrafficChart countriesAllData={countries} selectedCounty={selectedCountry} setSelectedCountry={setSelectedCountry}/>
                    </Grid>
                    <Grid size="auto">
                        <VehicleTypeDistributionChart countriesAllData={countries} selectedCountry={selectedCountry} />
                    </Grid>
                </Grid>
            </Grid>
            </>
    );
}

export default DashboardHome;