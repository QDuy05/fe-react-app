import axios from "axios"

const getAllTrip = async (token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
        },
        params: {
            'action': 'ship_trips'
        }
    }
    console.log('getting all trips');
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    )
}

const getTripInfo = async (token, tripid) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            'action': 'trip_detail',
            'tripid': tripid.toString(),
        }
    }
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    ).catch((err) => {
        return err.response
    })
}

export {
    getAllTrip, getTripInfo
}