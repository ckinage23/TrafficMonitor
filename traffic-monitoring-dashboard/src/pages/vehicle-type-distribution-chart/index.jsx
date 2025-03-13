import HighChartsComponent from "../../components/HighChartsComponent";
import {useEffect, useState, useRef} from "react";
const getVehiclesForTopLevelChart = (data) => {
    var vehicleTypes = data.find(el => el.name === "Global").vehicle_types
    var result = Object.entries(vehicleTypes).filter(([key,value]) => key !== 'total_vehicles')
        .map(([key, value]) => {
        return {name:key, y:value}
    })
    console.log(result)
    return result
}

const getVehiclesForDrilldownChart = (data) => {
    var result = data.filter(el => el.name !== "Global")
        .map(v=>{return {id: v.name, data: v.vehicle_types ? Object.entries(v.vehicle_types).filter(([key,value]) => key !== 'total_vehicles')
                .map(([key, value]) => {
                    return {name:key, y:value}
                }) : []}})
    console.log(result)
    return result
}
function VehicleTypeDistributionChart({selectedCountry, countriesAllData}) {
    const vehicleChartRef = useRef(null);
    const [vehicleTypesOptions, setVehicleTypesOptions] = useState( {
        title: {
            text: 'Vehicle type distribution'
        }
    })

    useEffect(()=>{
        console.log(countriesAllData)
        if(countriesAllData && !vehicleTypesOptions.drilldown){
            setVehicleTypesOptions({...vehicleTypesOptions,
                chart:{
                    type: 'pie'
                },
                series:[{
                    type: 'pie',
                    data: getVehiclesForTopLevelChart(countriesAllData)}],
                drilldown:{
                    type:'pie',
                    series: getVehiclesForDrilldownChart(countriesAllData)
                }
            })
        }
    },[countriesAllData])
    useEffect(()=>{
        if(selectedCountry && vehicleTypesOptions)
        {
            let chart = vehicleChartRef.current.chart;

            const drilldownSeries = vehicleTypesOptions.drilldown.series.find(series => series.id === selectedCountry.name);
            console.log(drilldownSeries)
            chart.update({
                chart: {
                    type: 'pie'
                },
                series: [drilldownSeries]
            });
        }
    },[selectedCountry,vehicleTypesOptions])
    useEffect(() => {

        if(vehicleTypesOptions?.drilldown && !vehicleTypesOptions?.chart?.events){

            setVehicleTypesOptions({...vehicleTypesOptions,
                chart:{
                    type: 'pie',
                    events: {
                        drilldown: (event) => {
                            console.log(vehicleChartRef,vehicleTypesOptions)
                            let chart = vehicleChartRef.current.chart;
                            // Find the drilldown series data

                            const drilldownSeries = vehicleTypesOptions.drilldown.series.find(series => series.id === selectedCountry.name);

                            chart.applyDrilldown({
                                chart: {
                                type: 'pie'
                            },
                                series: [drilldownSeries]
                            });
                        },
                        drillup: () => {
                                // Revert to the initial series
                                this.chart.update({
                                    series: vehicleTypesOptions.series
                                });
                            }
                    }
                }})
        }
    }, [vehicleTypesOptions]);
    return (
        <div>
            <HighChartsComponent ref={vehicleChartRef} options={vehicleTypesOptions} />
        </div>
    );
}

export default VehicleTypeDistributionChart;
