import axios from '../api/axios';
const LOGIN_URL = '/user/login';

export const signInUser = async (email,password)=>{
    try{
    const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    console.log(response)
    const responseStatus = response.status
    const responseMessage = response.data.message
    if (response.data.body.token) {
        const accessToken = response.data.body.token
        return {responseStatus,responseMessage,accessToken};
    }
}catch(err){

    console.log(err)
    const responseStatus = err.response.status
    const responseMessage = err.response.data.message
    return {responseStatus,responseMessage};
}
}

const userServices = {signInUser}

export default userServices