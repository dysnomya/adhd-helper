import axios from "axios";

export const tokenVerify = async (token) => {
    const path = '/auth/verify';

    await axios.post(path, {
        body: JSON.stringify({'token': token})
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
};