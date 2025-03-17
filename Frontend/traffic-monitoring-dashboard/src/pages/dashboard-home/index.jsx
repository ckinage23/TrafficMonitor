import CountryWiseTrafficChart from "../country-traffic-chart";
import axios from "axios";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import VehicleTypeDistributionChart from "../vehicle-type-distribution-chart";
import Grid from '@mui/material/Grid2';
import Topbar from "../../components/topbar";
import Typography from "@mui/material/Typography";
import './../../App.css';

const getCountries = async () => {
    const response = await axios.get(
        "/countries-all-data/",
    );
    return response.data;
};

const getSubtitleText = (selectedCountry) =>{
    return  selectedCountry !== 'Global' ? 'Click on any country from the Country Wise chart below to view a breakdown of city wise traffic in that country, and to view vehicle type distribution at a country level'
        : 'Click on Global to view traffic data and vehicle type distribution at a global level'
}
function DashboardHome() {
    const {
        data: countries,
        error: countriesError,
        isLoading: countriesLoading,
    } = useQuery("countriesData", getCountries);
    const [selectedCountry, setSelectedCountry] = useState()
    useEffect(() => {
        console.log(selectedCountry)
    }, [selectedCountry]);
    return (
        <>
            <Grid container direction={"column"} width={"100%"}>
            <Topbar/>
                <Grid container direction = {"column"} className={"page-header"}>
                <Typography className={"page-title"} variant={"h4"}>Traffic Stats 2025</Typography>
                <Typography className={"page-subtitle"} variant={"subtitle2"}>{getSubtitleText(selectedCountry)}</Typography>
                </Grid>
                    <Grid container direction = {"row"}>
                    <Grid item xs={6}>
                        <CountryWiseTrafficChart countriesAllData={countries} selectedCounty={selectedCountry} setSelectedCountry={setSelectedCountry}/>
                    </Grid>
                    <Grid item xs={6}>
                        <VehicleTypeDistributionChart countriesAllData={countries} selectedCountry={selectedCountry} />
                    </Grid>
                </Grid>
            </Grid>
            </>
    );
}

export default DashboardHome;