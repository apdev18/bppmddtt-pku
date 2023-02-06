import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { getToken, getUser } from "../common/sessions/common";
import { baseUrl } from "../constants/constants";
import Select from "react-select";

const token = getToken()
const userId = getUser()

const headers = {
    authorization: `Bearer ${token}`,
    userId: userId
}

// CREATE DATA
export const Create = () => {
    const [progress, setProgress] = useState(false);
    const [Error, setError] = useState({ userName: '', email: '', password: '', department: '' });
    const [selectedDepartment, setSelectedDepartment] = useState("none");
    const [options, setOption] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])
    // CREATE CHANGE
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // CREATE FORM
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        department: "",
        password: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const handleTypeSelectDepartment = e => {
        setSelectedDepartment(e.value)
        setFormData({ ...formData, department: e.value })
    };

    const fetchData = async () => {
        axios
            .get(baseUrl + '/api/departemen', {
                headers
            }).then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    const options = data.categories.map(department => ({
                        value: department.departmentName,
                        label: department.departmentName
                    }))
                    setOption(options)
                } else {
                    // console.log('ERROR' + error);
                }
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = async (event) => {
        setProgress(true)
        event.preventDefault()

        if (!formData.userName) {
            setProgress(false)
            setError({ ...Error, userName: 'User name is required' })
        } else if (!formData.email) {
            setProgress(false)
            setError({ ...formData, email: 'Email is required' })
        } else if (!formData.department) {
            setProgress(false)
            setError({ ...formData, department: 'Department is required' })
        } else if (!formData.password) {
            setProgress(false)
            setError({ ...formData, password: 'Password is required' })
        } else {

            try {
                const { data } = await axios.post(baseUrl + '/api/users/register', {
                    ...formData

                }, {
                    withCredentials: true,
                    headers
                });
                if (data) {
                    if (data.success === 1) {
                        toast.success('User created successfully', {})
                        setProgress(false)
                        setFormData({ ...formData, userName: "", email: "", password: "" })
                    } else {
                        toast.error('something wrong please try again!')
                        setProgress(false)
                    }
                }
            } catch (error) {
                toast.error(error.response.data.message, {})
                setProgress(false)
            }
        }
    }
    return (
        <>
            <div class="g-3 mb-3 mt-3">
                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        id="userName"
                        type="text"
                        placeholder="Username"
                        name='userName'
                        value={formData.userName}
                        onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputGrid">Username</label>
                    <span class="text-danger inputerror">{Error.userName}</span>
                </div>

                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        id="email"
                        type="email"
                        placeholder="User name"
                        name='email'
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputGrid">Email</label>
                    <span class="text-danger inputerror">{Error.email}</span>
                </div>

                <div class="form-floating mb-3">
                    <Select
                        class="form-control basic-select"
                        options={options}
                        required
                        name="department"
                        onChange={handleTypeSelectDepartment}
                        value={options.filter(function (option) {
                            return option.value === selectedDepartment;
                        })}
                        label="Single select"

                    />
                    {formData.department === "" ?
                        <label for="floatingSelectAssignees">Department </label>
                        : ''}
                    <span class="text-danger inputerror">{Error.department}</span>
                </div>

                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputGrid">Password</label>
                    <span class="text-danger inputerror">{Error.password}</span>
                </div>

                <div class="row g-3 justify-content-end">
                    <div class="col-auto">
                        {progress === false ?
                            <button onClick={handleSubmit} class="btn btn-sm btn-primary">Create new</button>
                            :
                            <button disabled class="btn btn-sm btn-primary">Submitting...</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


// LIST DATA
export async function List() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/users", {
            headers
        });
        return data.users

    } catch (ex) {
        console.log(ex);
    }
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

        if (!updateData.userName) {
            setProgress(false)
            toast.error('Username is required', {})
        } else if (!updateData.email) {
            setProgress(false)
            toast.error('Status is required', {})
        } else if (!updateData.department) {
            setProgress(false)
            toast.error('Department is required', {})
        } else if (!updateData.status) {
            setProgress(false)
            toast.error('Status is required', {})
        } else {

            try {
                const { data } = await axios.patch(baseUrl + '/api/users/update', {
                    ...updateData
                }, {
                    withCredentials: true,
                    headers
                });
                if (data) {
                    if (data.success === 1) {
                        toast.success('User updated successfully', {})
                        setProgress(false)
                    } else {
                        toast.error(data.message, {})
                        setProgress(false)
                    }
                }
            } catch (error) {

            }
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


// DELETE DATA
export const Delete = (id) => {
    const [progress, setProgress] = useState(false);

    useEffect(() => {
    }, [])

    const handleDelete = async (event) => {
        setProgress(true)

        event.preventDefault()

        const Id = id.id.id

        try {
            const { data } = await axios.delete(baseUrl + '/api/users/delete', {
                data: { userId: Id },
                headers
            });
            if (data) {
                if (data.success === 1) {
                    toast.success(data.message, {})
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
            {!progress ?
                <button onClick={handleDelete} data-bs-dismiss="modal" class="btn btn-sm btn-red">Hapus</button>
                :
                <button disabled data-bs-dismiss="modal" class="btn btn-sm btn-red">Telah dihapus...</button>
            }
        </>
    )
}