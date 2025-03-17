
export const getCountriesDataForChart = (data) => {
    var result = data.filter(country => country.name !== 'Global')
        .map(el => {
            return {name: el.name, y: el.traffic_index, drilldown:el.name}
        })
    return result
}
export const getCitiesDataForDrilldownChart = (data) => {
    var result = data.map(el => {
        return {
            id: el.name, name:'Traffic index',  data: el.cities.map(city => {
                return {name:city.name, y:city.traffic_index}
            })
        }
    })
    return result
}

export const getBreadcrumbName = (levelName) =>{
    return levelName === 'Traffic index' ? 'Global' : levelName
}

export const getText = (level) => {
    return level !== 'Global' ?
        {
            title: {
                text: 'City wise traffic distribution'
            },
            caption:{
                text: '<b>Traffic Index:</b> a composite measure that that considers factors such as commute time, dissatisfaction with time spent in traffic, CO2 emissions, and overall traffic system inefficiencies. It provides insights into the overall traffic conditions in a city.',
                align: 'center',
            }
        }:
        {
            title: {
                text: 'Country wise traffic distribution'
            },
            caption:{
                text: '<b>Traffic Index:</b> a composite measure that that considers factors such as commute time, dissatisfaction with time spent in traffic, CO2 emissions, and overall traffic system inefficiencies. It provides insights into the overall traffic conditions in a country.',
                align: 'center',
            },
        }
}

export const getInitialCountriesOption = ({countriesAllData}) =>{
    return {
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
    }
}

export const getChartEvents = ({countriesChartRef, countriesAllData, setSelectedCountry}) =>{
    //define what should happen when we drill up or down the country chart
    return {
        chart:{
        type: 'pie',
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

        }}}
}