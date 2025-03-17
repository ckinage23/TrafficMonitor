import axios from "axios";

export const getSubtitleText = (selectedCountry) =>{
    return  !selectedCountry || selectedCountry?.name === 'Global' ?
        'Click on any country from the Country Wise chart below to view a breakdown of city wise traffic in that country, and to view vehicle type distribution at a country level'
        : 'Click on Global to view traffic data and vehicle type distribution at a global level'
}

export const getCountries = async () => {
    const response = await axios.get(
        "/api/countries-all-data/",
    );
    return response.data;
};