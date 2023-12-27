import axios from "axios";

const getAllLocation = async (token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
        },
        params: {
            'action': 'location',
        }
    }
    console.log(config);
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    )
}
const getAllPort = async (token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
        },
        params: {
            'action': 'portlist',
        }
    }
    console.log(config);
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    )
}
export {
    getAllLocation, getAllPort
}