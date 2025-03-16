import HighChartsComponent from "../../components/HighChartsComponent";
import {useEffect, useState, useRef} from "react";

const getCountriesDataForChart = (data) => {
    var result = data.filter(country => country.name !== 'Global')
        .map(el => {
        return {name: el.name, y: el.traffic_index, drilldown:el.name}
    })
    console.log(result)
    return result
}
const getCitiesDataForDrilldownChart = (data) => {
    var result = data.map(el => {
        return {
             id: el.name,  data: el.cities.map(city => {
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
            type: 'pie',
            },
            colors: ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"],
            series:[{
            type: 'pie',
                cursor: 'pointer',
                className: 'drilldown',
            data: getCountriesDataForChart(countriesAllData)
            }],
                caption:{
                text: 'Click on any country to view city wise breakdown of traffic data'
                },
            drilldown:{
                type:'pie',
                series: getCitiesDataForDrilldownChart(countriesAllData)
            }
            })
        }
    },[countriesAllData])

    useEffect(() => {
        if(countriesOptions?.drilldown && !countriesOptions?.chart?.events){

            setCountriesOptions({...countriesOptions,
                chart:{
                    type: 'pie',
                    events: {
                        drilldown: (event) => {
                            console.log(event, countriesAllData.find(country => country.name === event.seriesOptions.id));
                            setSelectedCountry(countriesAllData.find(country => country.name === event.seriesOptions.id));
                        },
                        drillup: (event) => {
                            setSelectedCountry(countriesAllData.find(country => country.name === "Global"))
                        }

                }}})
        }
    }, [countriesOptions]);
    return (
        <div>
            <HighChartsComponent options={countriesOptions} />
        </div>
    );
}

export default CountryWiseTrafficChart;
