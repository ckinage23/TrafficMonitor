import HighChartsComponent from "../../components/HighChartsComponent";
import {useEffect, useState, useRef} from "react";
import {
    getCountriesDataForChart,
    getCitiesDataForDrilldownChart,
    getBreadcrumbName,
    getText
} from './../../utils/country-traffic'

function CountryWiseTrafficChart({countriesAllData, setSelectedCountry, selectedCounty}) {
    const [countriesOptions, setCountriesOptions] = useState()
    const countriesChartRef = useRef(null)

    useEffect(()=>{
        //set initial options for chart
        if(countriesAllData && !countriesOptions){
            setCountriesOptions({
            chart:{
            type: 'pie',
            },
                ...getText('Global'),
            colors: ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"],
            series:[{
            type: 'pie',
                name:'Traffic index',
                cursor: 'pointer',
                className: 'drilldown',
            data: getCountriesDataForChart(countriesAllData)
            }],
            drilldown:{
                type:'pie',
                breadcrumbs: {
                    showFullPath: true,
                    formatter: function (level) {
                        return getBreadcrumbName(`${level.levelOptions.name}`);}
                },
                series: getCitiesDataForDrilldownChart(countriesAllData)
            }
            })
        }
    },[countriesAllData])

    useEffect(() => {
        //define event handlers for chart
        if(countriesOptions?.drilldown && !countriesOptions?.chart?.events){
            setCountriesOptions({...countriesOptions,
                chart:{
                    events: {
                        drilldown: (event) => {
                            let chart = countriesChartRef.current.chart;
                            let selCountry = countriesAllData.find(country => country.name === event.seriesOptions.id)
                            setSelectedCountry(selCountry);
                            chart.update(getText(selCountry.name))
                        },
                        drillup: (event) => {
                            let chart = countriesChartRef.current.chart;
                            setSelectedCountry(countriesAllData.find(country => country.name === "Global"))
                            chart.update(getText('Global'))
                        }

                }}})
        }
    }, [countriesOptions]);
    return (
        <div>
            <HighChartsComponent options={countriesOptions} ref={countriesChartRef} />
        </div>
    );
}

export default CountryWiseTrafficChart;
