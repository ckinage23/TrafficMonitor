import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown.js';

const HighChartsComponent = ({chartType, options, ref}) => (
    <div>
        <HighchartsReact
            ref={ref}
            highcharts={Highcharts}
            constructorType={chartType}
            options={options}
        />
    </div>
);

export default HighChartsComponent;