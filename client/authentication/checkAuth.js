import React from 'react'
import { baseUrl } from '../constants/constants';
import axios from 'axios';
import { getToken, removeUserSession } from '../common/sessions/common';

export const checkAuth = async () => {
    const token = getToken();

    try {
        const { data } = await axios.get(
            baseUrl + "/api/users/1", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return data

    } catch (ex) {
        console.log(ex);
    }

}
