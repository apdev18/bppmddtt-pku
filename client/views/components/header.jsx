import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth, removeUserSession } from '../../common/sessions/common'
import { profileUrl } from '../../constants/constants'

export const Header = () => {
    const navigate = useHistory()
    const [user, setUser] = useState([]);

    useEffect(() => {
        Auth().then(setUser)
    }, []);

    const logout = () => {
        removeUserSession()
        navigate.push('/login')
    }
    return (
        <>
            <nav class="navbar navbar-light navbar-top navbar-expand vertical-navbar">
                <div class="navbar-logo">
                    <button class="btn navbar-toggler navbar-toggler-humburger-icon" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false"
                        aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span
                            class="toggle-line"></span></span></button>
                    <a class="navbar-brand me-1 me-sm-3" href="">
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center ms-2">
                                <img src="assets/img/icons/logo.png" alt="infocliq" width="120" />
                            </div>
                        </div>
                    </a>
                </div>
                <div class="collapse navbar-collapse">
                    <div class="search-box d-none d-lg-block" id='serchBox'>
                    </div>
                    <ul class="navbar-nav navbar-nav-icons ms-auto flex-row">
                        <li class="nav-item dropdown"><a class="nav-link lh-1 px-0 ms-5" id="navbarDropdownUser" href="#!"
                            role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="avatar avatar-l ">
                                <img class="rounded-circle" src={profileUrl + user.profileImg} alt="" />
                            </div>
                        </a>
                            <div class="dropdown-menu dropdown-menu-end py-0 dropdown-profile shadow border border-300"
                                aria-labelledby="navbarDropdownUser">
                                <div class="card bg-white position-relative border-0">
                                    <div class="card-body p-0">
                                        <div class="text-center pt-4 pb-3">
                                            <div class="avatar avatar-xl ">
                                                <img class="rounded-circle" src={profileUrl + user.profileImg} alt="" />
                                            </div>
                                            <h6 class="mt-2">{user.userName}</h6>
                                        </div>
                                    </div>
                                    <div id='profileMenu' class="overflow-auto scrollbar">
                                        <ul class="nav d-flex flex-column mb-2 pb-1">
                                            <li class="nav-item"><a class="nav-link px-3" href="/settings"> <span class="me-2 text-900"
                                                data-feather="settings"></span>Settings &amp; Privacy </a></li>
                                            <li class="nav-item"><a class="nav-link px-3" href="#" target={'_new'}> <span class="me-2 text-900"
                                                data-feather="help-circle"></span>Help Center</a></li>
                                        </ul>
                                    </div>
                                    <div class="card-footer p-0 border-top">
                                        <hr />
                                        <div class="px-3">
                                            <a onClick={logout} class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!">
                                                <span class="me-2" data-feather="log-out"> </span>Keluar
                                            </a>
                                        </div>
                                        <div class="my-2 text-center fw-bold fs--2 text-600"><a class="text-600 me-1" href="#!">Privacy
                                            policy</a>&bull;<a class="text-600 mx-1" href="#!">Terms</a>&bull;<a class="text-600 ms-1"
                                                href="#!">Cookies</a></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
