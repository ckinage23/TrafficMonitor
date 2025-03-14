import HighChartsComponent from "../../components/HighChartsComponent";
import {useEffect, useState, useRef} from "react";
const getVehiclesForTopLevelChart = (data) => {
    var vehicleTypes = data.find(el => el.name === "Global").vehicle_types
    var result = vehicleTypes ? Object.entries(vehicleTypes).filter(([key,value]) => key !== 'total_vehicles')
        .map(([key, value]) => {
        return {name:key, y:value, drilldown:key}
    }) : []
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
        if(vehicleTypesOptions)
        {
            let chart = vehicleChartRef.current.chart;
            if (selectedCountry) {
                if(selectedCountry.name==='Global'){
                    chart.update({
                        chart: {
                            type: 'pie'
                        },
                        series:[{
                            type: 'pie',
                            data: getVehiclesForTopLevelChart(countriesAllData)}]
                    });
                }else
                {
                    const drilldownSeries = vehicleTypesOptions.drilldown.series.find(series => series.id === selectedCountry.name);
                    console.log(drilldownSeries, selectedCountry, vehicleTypesOptions.drilldown.series)
                    chart.update({
                        chart: {
                            type: 'pie'
                        },
                        series: [drilldownSeries]
                    });
                }
            }
        }
    },[selectedCountry,vehicleTypesOptions])
    return (
        <div>
            <HighChartsComponent ref={vehicleChartRef} options={vehicleTypesOptions} />
        </div>
    );
}

export default VehicleTypeDistributionChart;
