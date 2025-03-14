import CountryWiseTrafficChart from "../country-traffic-chart";
import axios from "axios";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import VehicleTypeDistributionChart from "../vehicle-type-distribution-chart";

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
        <div>
            <CountryWiseTrafficChart countriesAllData={countries} setSelectedCountry={setSelectedCountry}/>
            <VehicleTypeDistributionChart countriesAllData={countries} selectedCountry={selectedCountry} />
        </div>
    );
}

export default DashboardHome;