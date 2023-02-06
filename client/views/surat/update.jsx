import React, { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/footer';
import { ToastContainer } from 'react-toastify';
import { Closed, Complete, Pending, Processing } from '../../common/badges/statusBadges';
import { ListById, ListReply, Reply } from '../../api/surat';
import { Editor } from '@tinymce/tinymce-react';
import { paramsId } from '../../constants/constants';
import { Auth } from '../../common/sessions/common';
import moment from 'moment';

export const LetterUpdate = () => {
    
    const editorRef = useRef(null);
    const [auth, setAuth] = useState([]);
    const [replies, setReplies] = useState([]);
    const [letter, setLetter] = useState([]);
    const [formData, setFormData] = useState(
        {
            status: '',
            reply: '',
            letterId: paramsId,
            user: '',
            department: ''
        }
    );
    useEffect(() => {
        Auth().then(setAuth)
        handleRefresh()
        ListById().then(setLetter)
    }, [])

    // REFRESH TABLE DATA
    const handleRefresh = () => {
        ListReply().then(setReplies)
    }

    // CREATE CHANGE
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, user: auth.userName, department: auth.department });
    };

    // GET EDITOR VALUE
    const handleEditorChange = (e) => {
        setFormData({ ...formData, reply: e.target.getContent() });
    }

    return (
        <>
            <div class="content">
                <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true}
                    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable
                    pauseOnHover={false} theme="light"
                />
                <div class="mb-9">
                    <div class="row">
                        <div class="col-xl-6 px-5">
                            <h3 class="g-3 mb-4">Assign new letter</h3>
                            <div class="row g-3 mb-6">
                                <div class="col-sm-12 col-md-12">
                                    <div class="form-floating">
                                        <select class="form-select"
                                            id="floatingSelectTeam"
                                            name='status'
                                            value={formData.status}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option selected="selected">Pilih...</option>
                                            <option value="processing">Sedang diproses</option>
                                            <option value="pending">Pending</option>
                                            <option value="closed">Batal</option>
                                            <option value="completed">Selesai</option>
                                        </select>
                                        <label for="floatingInputGrid">Status</label>
                                        {/* <span class="text-danger inputerror">{Error.subject}</span> */}
                                    </div>
                                </div>

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
                                    <div class="row g-3 d-flex flex-between-center">

                                        <div class="col-auto">
                                            <p class="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"></p>
                                            <a onClick={handleRefresh} class="refresh-lnk fw-semi-bold" href="#!" data-list-view="*">Refresh
                                                <span id="refreshIcon" class="fas  fa-arrows-rotate ms-1" data-fa-transform="down-1"></span>
                                            </a>
                                        </div>
                                        <div class="col-auto">
                                            <a href='/letters' class="btn btn-sm btn-phoenix-primary btnc-l">Batal</a>
                                            <Reply formData={formData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 offset-sm">
                            <h3 class="g-3 mb-4">Balasan & deskripsi</h3>
                            <p dangerouslySetInnerHTML={{ __html: letter.description }}></p>
                            <div class="row g-3 mb-6">
                                <div class="col-sm-12 col-md-12">
                                    {replies.length === 0 ?
                                        <div class="border-top border-300 py-4">
                                            <div class="me-n3">
                                                <div class="d-flex flex-between-center">
                                                    <div>
                                                        <div class="d-flex align-items-center mb-1">
                                                            <p class="text-1000 text-center mb-0 lh-2">
                                                                This letter don't have replies
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        :

                                        replies.map(reply => (
                                            <div class="border-top border-300 py-4">
                                                <div class="me-n3">
                                                    <div class="d-flex flex-between-center">
                                                        <div>
                                                            <div class="d-flex align-items-center mb-1">
                                                                <p class="text-1000 mb-0 lh-2" dangerouslySetInnerHTML={{ __html: reply.reply }}></p>
                                                            </div>
                                                            <p class="fs--1 text-700 mb-0">
                                                                <span>
                                                                    {
                                                                        reply.status === 'processing' ?
                                                                            <Processing />
                                                                            : reply.status === 'pending' ?
                                                                                <Pending />
                                                                                : reply.status === 'closed' ?
                                                                                    <Closed />
                                                                                    : reply.status === 'completed' ?
                                                                                        <Complete />
                                                                                        : ''
                                                                    }
                                                                </span>
                                                                <span class="text-400 mx-1">| </span>
                                                                <a href="#!">{reply.department} </a>
                                                                <span class="text-400 mx-1">| </span>
                                                                <span class="text-nowrap">{moment(reply.createdAt).format('ddd MM YYYY, hh:MM A')}</span>
                                                            </p>
                                                        </div>
                                                        <div class="font-sans-serif btn-reveal-trigger">
                                                            <button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                                                                <svg class="svg-inline--fa fa-ellipsis" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                                                    <path fill="currentColor" d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"></path>
                                                                </svg>
                                                            </button>
                                                            <div class="dropdown-menu dropdown-menu-end py-2">
                                                                <a class="dropdown-item" href="#!">Edit</a>
                                                                <a class="dropdown-item text-danger" href="#!">Hapus</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
