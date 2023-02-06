import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { getToken, getUser } from "../common/sessions/common";
import { baseUrl } from "../constants/constants";

const token = getToken()
const userId = getUser()

const headers = {
    authorization: `Bearer ${token}`,
    userId: userId
}

// UPDATE DATA
export const Update = (formData) => {
    const [progress, setProgress] = useState(false);

    useEffect(() => {
    }, [])

    const handleSubmit = async (event) => {
        setProgress(true)
        const updateData = formData.formData

        event.preventDefault()

        try {
            const { data } = await axios.patch(baseUrl + '/api/departemen', {
                ...updateData
            }, {
                withCredentials: true,
                headers
            });
            if (data) {
                if (data.success === 1) {
                    toast.success('Department updated successfully', {})
                    setProgress(false)
                } else {
                    toast.error(data.message, {})
                    setProgress(false)
                }
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div class="modal-footer">
                {progress === false ?
                    <button onClick={handleSubmit} class="btn btn-primary" type="button">Simpan</button>
                    :
                    <button disabled class="btn btn-primary" type="button">Updating...</button>
                }
                <button class="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Batal</button>
            </div>
        </>
    )
}

