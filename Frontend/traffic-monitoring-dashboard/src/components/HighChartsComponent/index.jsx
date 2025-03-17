import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './index.css'
import drilldown from 'highcharts/modules/drilldown.js';
import {useEffect, useState} from "react";

const HighChartsComponent = ({chartType, options, ref}) => {
    const [optionsState, setOptionsState] = useState()
        useEffect(()=>{
            if(options?.series) setOptionsState({...options, chart:{...options.chart, backgroundColor: "#242424",
                    events:{
                        ...options?.chart?.events,
                        load: function() {
                            const chart = ref.current.chart
                              let titleHeight = chart?.title?.alignOptions?.height
                              let updatedHeight = chart?.chartHeight + titleHeight
                            chart?.setSize(undefined, updatedHeight);
                    }
                }},
                plotOptions:{...options.plotOptions, pie:{...options.plotOptions?.pie, size:'80%', borderWidth:0}},
                })
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