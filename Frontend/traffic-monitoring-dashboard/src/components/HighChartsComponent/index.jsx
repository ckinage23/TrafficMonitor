import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './index.css'
import drilldown from 'highcharts/modules/drilldown.js';
import {useEffect, useState} from "react";

const HighChartsComponent = ({chartType, options, ref}) => {
    const [optionsState, setOptionsState] = useState()
        useEffect(()=>{
            if(options?.series) setOptionsState({...options, chart:{...options.chart, backgroundColor: "#242424"},
                plotOptions:{...options.plotOptions, pie:{...options.plotOptions?.pie, size:200, borderWidth:0},}})
        },[options])
            return (
    <div>
        <HighchartsReact
            ref={ref}
            highcharts={Highcharts}
            constructorType={chartType}
            options={optionsState}
        />
    </div>)
};

export default HighChartsComponent;