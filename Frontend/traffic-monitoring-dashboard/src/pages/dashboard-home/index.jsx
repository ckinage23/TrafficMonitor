import CountryWiseTrafficChart from "../country-traffic-chart";
import axios from "axios";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import VehicleTypeDistributionChart from "../vehicle-type-distribution-chart";
import Grid from '@mui/material/Grid2';
import Topbar from "../../components/topbar";

const getCountries = async () => {
    const response = await axios.get(
        "/countries-all-data/",
    );
    return response.data;
};

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

            <Topbar/>
            <Grid container>
                <Grid item xs={6}>
                    <CountryWiseTrafficChart countriesAllData={countries} setSelectedCountry={setSelectedCountry}/>
                </Grid>
                <Grid item xs={6}>
                    <VehicleTypeDistributionChart countriesAllData={countries} selectedCountry={selectedCountry} />
                </Grid>
            </Grid>
            </>
    );
}

export default DashboardHome;