import axios from "axios"
import { toast } from 'react-toastify';

const createUser = (username, password, firstName, lastName, email, gender, phone, roleId) => {
    return axios.post('http://localhost:8081/api/v1/user/create', {
        username, password, firstName, lastName, email, gender, phone, roleId
    })
}

const loginUser = async (username, password) => {
    let config = {
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/x-www-form-urlencode'
        }
    }
    return await axios({
        config,
        method: 'POST',
        url: 'http://localhost:52070/api/account/login',
        data: (
            'username=' + username.toString() + '&password=' + password.toString()
        )
    }).catch((err) => {
        return err.response
    })
}

const fetchAllUsers = () => {
    // return axios.get('http://localhost:8081/api/v1/user/show')
}

const getUserById = (id) => {
    // return axios.post('http://localhost:8081/api/v1/user/show-one', {
    //     id
    // })
}





export {
    createUser, loginUser, fetchAllUsers, getUserById,
}