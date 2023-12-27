import axios from "axios"

const getAllShip = async (token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
        },
        params: {
            'action': 'shiplist',
        }
    }
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    ).catch((err) => {
        return err.response
    })
}

const getShipInfo = async (token, plate_number) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token.toString(),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            'action': 'ships',
            'plate_number': plate_number.toString(),
        }
    }
    return await axios.get(
        'http://localhost:52070/api/common2/get',
        config
    ).catch((err) => {
        return err.response
    })
}

const verifyShip = async (token, id) => {
    let data = ({
        "action": "shipconfirm",
        "id": id.toString(),
        "data": []
    })
    let config = {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + token.toString(),
        },
    }
    return await axios.post('http://localhost:52070/api/common2/post', data, config)
        .then((response) => {
            return response;
        }).catch((err) => {
            return err.response
        })
}
const unverifyShip = async (token, id) => {
    let data = ({
        "action": "shipunconfirm",
        "id": id.toString(),
        "data": []
    })
    let config = {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + token.toString(),
        },
    }
    return await axios.post('http://localhost:52070/api/common2/post', data, config)
        .then((response) => {
            return response;
        }).catch((err) => {
            return err.response
        })
}
// return await axios({
//     method: 'POST',
//     url: 'http://localhost:52070/api/common2/post',
//     data: data,
//     config,
// }).catch((err) => {
//     return err.response
// })
const updateShip = async (form, token) => {

    let data = ({
        "action": "shipupdate",
        "plate_number": form.getFieldValue('plate_number'),
        "location": {
            "code": form.getFieldValue('location'),
        },
        "owner": {
            "name": form.getFieldValue('owner'),
            "phone": form.getFieldValue('ownerPhone'),
            "address": form.getFieldValue('ownerAddress')
        },
        "ship": {
            "length": form.getFieldValue('length'),
            "congsuat": form.getFieldValue('congsuat'),
            "license": {
                "number": form.getFieldValue('license'),
                "registered": form.getFieldValue('licenseRegistered').format('DD/MM/YYYY'),
                "expired": form.getFieldValue('licenseExpired').format('DD/MM/YYYY'),
            },
            "business": {
                "code": form.getFieldValue('businesscode')
            },
            "business2": {
                "code": form.getFieldValue('business2code')
            },
            "caption": {
                "name": form.getFieldValue('captain'),
                "phone": form.getFieldValue('captainPhone'),
                "license": form.getFieldValue('captainLicense'),
                "year": form.getFieldValue('captainYear'),
                "cmnd": form.getFieldValue('captainIdentity'),
                "address": form.getFieldValue('captainAddress')
            },
            "maytruong": {
                "name": form.getFieldValue('maytruong'),
                "phone": form.getFieldValue('maytruongPhone'),
                "license": form.getFieldValue('maytruongLicense'),
                "year": form.getFieldValue('maytruongYear'),
                "cmnd": form.getFieldValue('maytruongIdentity'),
                "address": form.getFieldValue('maytruongAddress')
            }
        },
        "data": []
    })
    let config = {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + token.toString(),
        },
    }
    console.log(data);
    return await axios.post('http://localhost:52070/api/common2/post', data, config)
        .then((response) => {
            return response;
        }).catch((err) => {
            return err.response
        })
}


export {
    getAllShip, getShipInfo, verifyShip, unverifyShip, updateShip
}