import {convertToTitleCase} from '../common'

export const getVehiclesForTopLevelChart = (data) => {
    let vehicleTypes = data.find(el => el.name === "Global").vehicle_types
    return vehicleTypes ? Object.entries(vehicleTypes).filter(([key,value]) => key !== 'total_vehicles')
        .map(([key, value]) => {
            return {name:convertToTitleCase(key), y:value, drilldown:key}
        }) : []
}

export const getVehiclesForDrilldownChart = (data) => {
    return data.filter(el => el.name !== "Global")
        .map(v=>{return {id: v.name, data: v.vehicle_types ? Object.entries(v.vehicle_types).filter(([key,value]) => key !== 'total_vehicles')
                .map(([key, value]) => {
                    return {name:convertToTitleCase(key), y:value}
                }) : []}})
}

export const getText = (level) => {
    return level === 'Global' ?
        {
            title: {
                text: 'Vehicle type distribution at global level'
            },
            caption: {
                text: 'Distribution of the type of vehicles used contributing to overall traffic and congestion at a global level',
                align: 'center',
            }
        } :
        {
            title: {
                text: 'Vehicle type distribution at country level'
            },
            caption: {
                text: 'Distribution of the type of vehicles used contributing to overall traffic and congestion at a country level',
                align: 'center',
            }
        }
}