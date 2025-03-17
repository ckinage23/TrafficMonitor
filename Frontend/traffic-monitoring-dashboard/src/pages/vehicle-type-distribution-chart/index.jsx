import HighChartsComponent from "../../components/HighChartsComponent";
import {useEffect, useState, useRef} from "react";
import {getVehiclesForTopLevelChart, getVehiclesForDrilldownChart, getText} from './../../utils/vehicle-type-distribution'
function VehicleTypeDistributionChart({selectedCountry, countriesAllData}) {
    const vehicleChartRef = useRef(null);
    const [vehicleTypesOptions, setVehicleTypesOptions] = useState()

    useEffect(()=>{
        //set initial options for chart
        if(countriesAllData && !vehicleTypesOptions){
            setVehicleTypesOptions({
                chart:{
                    type: 'pie',
                    backgroundColor: "#242424",
                },
                ...getText('Global'),
                colors: ["#232388", "#8d7eb7", "#e5e5e5", "#e69798", "#d43d51"],
                series:[{
                    type: 'pie',
                    name: 'Vehicle usage(in %)',
                    data: getVehiclesForTopLevelChart(countriesAllData)}],
                drilldown:{
                    type:'pie',
                    series: getVehiclesForDrilldownChart(countriesAllData)
                }
            })
        }
    },[countriesAllData])
    useEffect(()=>{
        //define event handlers for chart
        if(vehicleTypesOptions)
        {
            let chart = vehicleChartRef.current.chart;
            if (selectedCountry) {
                if(selectedCountry.name==='Global'){
                    chart.update({
                        ...getText('Global'),
                        series:[{
                            type: 'pie',
                            data: getVehiclesForTopLevelChart(countriesAllData)}]
                    });
                }else
                {
                    const drilldownSeries = vehicleTypesOptions.drilldown.series.find(series => series.id === selectedCountry.name);
                    chart.update({
                        ...getText(selectedCountry.name),
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
