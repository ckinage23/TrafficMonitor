import HighChartsComponent from "../../components/HighChartsComponent";
import {useEffect, useState} from "react";

const getCountriesDataForChart = (data) => {
    var result = data.map(el => {
        return {name: el.name, y: el.traffic_index, drilldown:el.name}
    })
    console.log(result)
    return result
}
const getCitiesDataForDrilldownChart = (data) => {
    var result = data.map(el => {
        return {
             id: el.name, data: el.cities.map(city => {
                return {name:city.name, y:city.traffic_index}
            })
        }
    })
    console.log(result)
    return result
}

function CountryWiseTrafficChart({countriesAllData, setSelectedCountry}) {

    const [countriesOptions, setCountriesOptions] = useState( {
        title: {
            text: 'Country wise traffic distribution'
        }
    })
    useEffect(()=>{
        console.log(countriesAllData)
        if(countriesAllData && !countriesOptions.drilldown){
            setCountriesOptions({...countriesOptions,
                chart:{
                type: 'pie'
                },
                series:[{
                type: 'pie',
                data: getCountriesDataForChart(countriesAllData)
            }],
            drilldown:{
                type:'pie',
                series: getCitiesDataForDrilldownChart(countriesAllData)
            }
            })
        }
    },[countriesAllData, countriesOptions])

    useEffect(() => {
        if(countriesOptions?.drilldown && !countriesOptions?.chart?.events){

            setCountriesOptions({...countriesOptions,
                chart:{
                    type: 'pie',
                    events: {
                        drilldown: (event) => {
                            console.log(event, countriesAllData.find(country => country.name === event.seriesOptions.id));
                            setSelectedCountry(countriesAllData.find(country => country.name === event.seriesOptions.id));
                        }

                }}})
        }
    }, [countriesOptions, countriesAllData, setSelectedCountry]);
    return (
        <div>
            <HighChartsComponent options={countriesOptions} />
        </div>
    );
}

export default CountryWiseTrafficChart;
