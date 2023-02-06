import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from "react-toastify";
import { getToken, getUser } from "../common/sessions/common";
import { baseUrl, paramsDepartment, paramsId, paramsPriority, paramsStatus } from "../constants/constants";
import Select from "react-select";

const token = getToken()
const userId = getUser()

const headers = {
    authorization: `Bearer ${token}`,
    userId: userId
}

// CREATE DATA
export const Create = () => {
    const editorRef = useRef(null);
    const [progress, setProgress] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState("none");
    const [options, setOption] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("none");
    const [optionsCategory, setCategoryOption] = useState([]);

    const [Error, setError] = useState({
        letterFrom: '',
        issuedDate: '',
        subject: '',
        registerPostId: '',
        department: '',
        priority: '',
        category: '',
        description: '',
    });

    useEffect(() => {
        fetchDepartment()
        fetchCategory()
    }, [])

    // FETCH DEPARTMENT FOR DROBDOWN
    const fetchDepartment = async () => {
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

    // FETCH CATEGORY FOR DROBDOWN
    const fetchCategory = async () => {
        axios
            .get(baseUrl + '/api/kategori', {
                headers
            }).then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    const options = data.categories.map(category => ({
                        value: category.categoryName,
                        label: category.categoryName
                    }))
                    setCategoryOption(options)
                } else {
                    // console.log('ERROR' + error);
                }
            })
            .catch((error) => console.log(error));
    };

    // CREATE CHANGE
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // SELECT DEPARTMENT
    const handleTypeSelectDepartment = e => {
        setSelectedDepartment(e.value)
        setFormData({ ...formData, department: e.value })
    };

    // SELECT CATEGORY
    const handleTypeSelectCategory = e => {
        setSelectedCategory(e.value)
        setFormData({ ...formData, category: e.value })
    };

    // GET EDITOR VALUE
    const handleEditorChange = (e) => {
        setFormData({ ...formData, description: e.target.getContent() });
    }

    // CREATE FORM
    const [formData, setFormData] = useState({
        letterFrom: '',
        issuedDate: '',
        subject: '',
        registerPostId: '',
        department: '',
        status: 'assigneded',
        priority: '',
        description: '',
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const handleSubmit = async (event) => {
        setProgress(true)
        event.preventDefault()

        if (!formData.letterFrom) {
            setProgress(false)
            setError({ ...Error, letterFrom: 'From is required' })

        } else if (!formData.issuedDate) {
            setProgress(false)
            setError({ ...Error, issuedDate: 'Date is required' })

        } else if (!formData.subject) {
            setProgress(false)
            setError({ ...Error, subject: 'Subject is required' })

        } else if (!formData.department) {
            setProgress(false)
            setError({ ...Error, department: 'Department is required' })

        } else if (!formData.priority) {
            setProgress(false)
            setError({ ...Error, priority: 'Priority is required' })

        } else if (formData.category === 'register post' && !formData.registerPostId) {
            setProgress(false)
            setError({ ...Error, registerPostId: 'Register post number is required' })

        } else {

            try {
                const { data } = await axios.post(baseUrl + '/api/surat/tambah', {
                    ...formData

                }, {
                    withCredentials: true,
                    headers
                });
                if (data) {
                    if (data.success === 1) {
                        toast.success(data.message, {})
                        setProgress(false)
                        setFormData({
                            ...formData,
                            letterFrom: '',
                            issuedDate: '',
                            subject: '',
                            registerPostId: '',
                            department: '',
                            status: '',
                            priority: '',
                            category: '',
                            description: '',
                        })
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
            <div class="row g-3 mb-6">
                <div class="col-sm-6 col-md-8">
                    <div class="form-floating">
                        <input class="form-control"
                            id="floatingInputGrid"
                            type="text"
                            placeholder="Subject"
                            name='subject'
                            value={formData.subject}
                            onChange={(e) => handleChange(e)}
                        />
                        <label for="floatingInputGrid">Subject</label>
                        <span class="text-danger inputerror">{Error.subject}</span>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="form-floating">
                        <input class="form-control"
                            id="floatingInputGrid"
                            type="text"
                            placeholder="From"
                            name='letterFrom'
                            value={formData.letterFrom}
                            onChange={(e) => handleChange(e)}
                        />
                        <label for="floatingInputGrid">From</label>
                        <span class="text-danger inputerror">{Error.letterFrom}</span>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="form-floating">
                        <input class="form-control"
                            id="basic-form-dob"
                            type="date"
                            name='issuedDate'
                            value={formData.issuedDate}
                            onChange={(e) => handleChange(e)}
                        />
                        <label for="floatingSelectPrivacy">Date</label>
                        <span class="text-danger inputerror">{Error.issuedDate}</span>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="form-floating">
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
                </div>

                <div class="col-sm-6 col-md-4">
                    <div class="form-floating">
                        <Select
                            class="form-control basic-select"
                            options={optionsCategory}
                            required
                            name="category"
                            onChange={handleTypeSelectCategory}
                            value={optionsCategory.filter(function (option) {
                                return option.value === selectedCategory;
                            })}
                            label="Single select"

                        />
                        {formData.category === "" ?
                            <label for="floatingSelectAssignees">Kategori </label>
                            : ''}
                        <span class="text-danger inputerror">{Error.category}</span>
                    </div>
                </div>

                <div class="col-sm-6 col-md-4">
                    <div class="form-floating">
                        <select class="form-select"
                            id="floatingSelectTeam"
                            name='priority'
                            value={formData.priority}
                            onChange={(e) => handleChange(e)}
                        >
                            <option selected="selected">Select...</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                        <label for="floatingSelectTeam">Priority </label>
                        <span class="text-danger inputerror">{Error.priority}</span>
                    </div>
                </div>

                {formData.category === 'register post' ?
                    <div class="col-sm-6 col-md-4">
                        <div class="form-floating">
                            <input class="form-control"
                                id="floatingInputGrid"
                                type="text"
                                placeholder="Register post number"
                                name='registerPostId'
                                value={formData.registerPostId}
                                onChange={(e) => handleChange(e)}
                            />
                            <label for="floatingInputGrid">Register number</label>
                            <span class="text-danger inputerror">{Error.registerPostId}</span>
                        </div>
                    </div>
                    : ''}

                <div class="col-12 gy-6">
                    <div class="form-floating">
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            onChange={handleEditorChange}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'a11ychecker', 'image', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                    'lists', 'link', 'directionality', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                    'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | image | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify |' + '',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}

                        />
                    </div>
                </div>

                <div class="col-12 gy-6">
                    <div class="row g-3 justify-content-end">
                        <div class="col-auto">
                            <a href='/letters' class="btn btn-sm btn-phoenix-primary">Cancel</a>
                        </div>
                        {progress === false ?
                            <div class="col-auto">
                                <button onClick={handleSubmit} class="btn btn-sm btn-primary">Assign letter</button>
                            </div>
                            :
                            <div class="col-auto">
                                <button disabled class="btn btn-sm btn-primary">Assigning...</button>
                            </div>
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
            baseUrl + "/api/surat", {
            headers
        });
        return data.letters

    } catch (ex) {
        console.log(ex);
    }
}

// LIST MONTH SUMMARY DATA
export async function ListMonthSummary() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/month-summary", {
            headers
        });
        return data.summary

    } catch (ex) {
        console.log(ex);
    }
}

// LIST DAY SUMMARY DATA
export async function ListDaySummary() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/day-summary", {
            headers
        });
        return data.summary

    } catch (ex) {
        console.log(ex);
    }
}

// LIST DATA BY ID
export async function ListById() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/" + paramsId, {
            headers
        });
        return data.letter

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
        if (!updateData.departmentName) {
            setProgress(false)
            toast.error('letters name is required', {})
        } else {

            try {
                const { data } = await axios.patch(baseUrl + '/api/surat', {
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
    }
    return (
        <>
            <div class="modal-footer">
                {progress === false ?
                    <button onClick={handleSubmit} class="btn btn-primary" type="button">Save</button>
                    :
                    <button disabled class="btn btn-primary" type="button">Updating...</button>
                }
                <button class="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Batal</button>
            </div>
        </>
    )
}

// LIST REPLAY DATA
export async function ListReply() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/reply/" + paramsId, {
            headers
        });
        return data.replies

    } catch (ex) {
        console.log(ex);
    }
}

// LIST FILTTER DATA
export async function FiltterByStatus() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/bystatus/" + paramsStatus, {
            headers
        });
        return data.status

    } catch (ex) {
        console.log(ex);
    }
}

export async function FiltterByPriority() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/bypriority/" + paramsPriority, {
            headers
        });
        return data.priority

    } catch (ex) {
        console.log(ex);
    }
}

export async function FiltterByDepartment() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/bydepartment/" + paramsDepartment, {
            headers
        });
        return data.departments

    } catch (ex) {
        console.log(ex);
    }
}

// LIST FILTTER BY DEPARTMENT
export async function FiltterByStatusDep() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/bydepstatus/" + paramsStatus + "/" + paramsDepartment, {
            headers
        });
        return data.status

    } catch (ex) {
        console.log(ex);
    }
}

export async function FiltterByPriorityDep() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/bydeppriority/" + paramsPriority + "/" + paramsDepartment, {
            headers
        });
        return data.priority

    } catch (ex) {
        console.log(ex);
    }
}


// GET LETTER BY DEPARTMENTS
export async function GetByDepartment() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/surat/bydepartment/Plannings", {
            headers
        });
        return data.departments

    } catch (ex) {
        console.log(ex);
    }
}

// LIST DEPARTMENTS DATA
export async function ListDepartments() {
    try {
        const { data } = await axios.get(
            baseUrl + "/api/departemen", {
            headers
        });
        return data.categories

    } catch (ex) {
        console.log(ex);
    }
}


// REPLY
export const Reply = (formData) => {
    const [progress, setProgress] = useState(false);

    useEffect(() => {

    }, []);

    const handleSubmit = async (event) => {
        setProgress(true)
        const replyData = formData.formData

        event.preventDefault()
        if (!replyData.status) {
            setProgress(false)
            toast.error('status is required', {})
        } else if (!replyData.reply) {
            setProgress(false)
            toast.error('Reply is required', {})
        } else {

            try {
                const { data } = await axios.post(baseUrl + '/api/surat/reply/tambah', {
                    ...replyData
                }, {
                    withCredentials: true,
                    headers
                });
                if (data) {
                    if (data.success === 1) {
                        toast.success('Replied successfully', {})
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
            {progress ?
                <button disabled class="btn btn-sm btn-primary">Repelling...</button>
                :
                <button onClick={handleSubmit} class="btn btn-sm btn-primary">Reply</button>
            }
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
            const { data } = await axios.delete(baseUrl + '/api/surat', {
                data: { id: Id },
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
                <button onClick={handleDelete} data-bs-dismiss="modal" class="btn btn-sm btn-red">Delete</button>
                :
                <button disabled data-bs-dismiss="modal" class="btn btn-sm btn-red">Deleteing</button>
            }
        </>
    )
}