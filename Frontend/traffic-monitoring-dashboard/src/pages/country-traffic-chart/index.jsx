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
             id: el.name, name:'Traffic index',  data: el.cities.map(city => {
                return {name:city.name, y:city.traffic_index}
            })
        }
    })
    console.log(result)
    return result
}

const getBreadcrumbName = (levelName) =>{
    return levelName === 'Traffic index' ? 'Global' : levelName
}
function CountryWiseTrafficChart({countriesAllData, setSelectedCountry, selectedCounty}) {
    const [countriesOptions, setCountriesOptions] = useState( {
        title: {
            text: 'Country wise traffic distribution'
        }
    })
    const countriesChartef = useRef(null)
    useEffect(()=>{
        if(countriesAllData && !countriesOptions.drilldown){
            setCountriesOptions({...countriesOptions,
            chart:{
            type: 'pie',
            },
            colors: ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"],
            series:[{
            type: 'pie',
                name:'Traffic index',
                cursor: 'pointer',
                className: 'drilldown',
            data: getCountriesDataForChart(countriesAllData)
            }],
                caption:{
                    text: '<b>Traffic Index:</b> a composite measure that that considers factors such as commute time, dissatisfaction with time spent in traffic, CO2 emissions, and overall traffic system inefficiencies. It provides insights into the overall traffic conditions in a country.',
                    align: 'center',
                },
            drilldown:{
                type:'pie',
                breadcrumbs: {
                    showFullPath: true,
                    formatter: function (level) {
                        console.log(level)
                        return getBreadcrumbName(`${level.levelOptions.name}`);}
                },
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
                            let chart = countriesChartef.current.chart;

                            console.log(event, countriesAllData.find(country => country.name === event.seriesOptions.id));
                            setSelectedCountry(countriesAllData.find(country => country.name === event.seriesOptions.id));
                            console.log(chart, countriesChartef)
                            chart.update({
                                title: {
                                    text: 'City wise traffic distribution'
                                },
                                caption:{
                                    text: '<b>Traffic Index:</b> a composite measure that that considers factors such as commute time, dissatisfaction with time spent in traffic, CO2 emissions, and overall traffic system inefficiencies. It provides insights into the overall traffic conditions in a city.',
                                    align: 'center',
                                },
                            })
                        },
                        drillup: (event) => {
                            let chart = countriesChartef.current.chart;
                            setSelectedCountry(countriesAllData.find(country => country.name === "Global"))
                            chart.update({
                                title: {
                                    text: 'Country wise traffic distribution'
                                },
                                caption:{
                                    text: '<b>Traffic Index:</b> a composite measure that that considers factors such as commute time, dissatisfaction with time spent in traffic, CO2 emissions, and overall traffic system inefficiencies. It provides insights into the overall traffic conditions in a country.',
                                    align: 'center',
                                },
                            })
                        }

                }}})
        }
    }, [countriesOptions]);
    return (
        <div>
            <HighChartsComponent options={countriesOptions} ref={countriesChartef} />
        </div>
    );
}

export default CountryWiseTrafficChart;
