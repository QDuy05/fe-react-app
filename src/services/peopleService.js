import axios from "axios";

const getPeopleInfo = async (token, id) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
        },
        params: {
            'action': 'people_id',
            'id': id.toString(),
        }
    }
    console.log(config);
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    )
}

export {
    getPeopleInfo
}