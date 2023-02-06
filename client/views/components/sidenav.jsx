import React, { useEffect, useState } from 'react'
import { Auth } from '../../common/sessions/common';

export const SideNav = () => {

    const [user, setUser] = useState([]);
    const isAdmin = user.admin

    useEffect(() => {
        Auth().then(setUser)
    }, []);

    return (
        <>
            <nav class="navbar navbar-light navbar-vertical navbar-vibrant navbar-expand-lg">
                <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
                    <div class="navbar-vertical-content scrollbar">
                        {isAdmin ?
                            <ul class="navbar-nav flex-column" id="navbarVerticalNav">
                                <li class="nav-item">
                                    <a class="nav-link mb-3" href="/" role="button" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="nav-link-text">Dashboard</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link mb-3" href="/letters" role="button" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="nav-link-text">Surat</span></div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link mb-3" href="/departments" role="button" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-pull-request"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="nav-link-text">Department</span></div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link mb-3" href="/categories" role="button" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="nav-link-text">Kategori</span></div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link mb-3" href="/users" role="button" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="nav-link-text">Akun Pengguna</span></div>
                                    </a>
                                </li>

                            </ul>
                            :
                            <ul class="navbar-nav flex-column" id="navbarVerticalNav">
                                <li class="nav-item">
                                    <a class="nav-link mb-3" href="/letters" role="button" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                            data-feather="mail"></span></span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="nav-link-text">Surat</span></div>
                                    </a>
                                </li>
                            </ul>
                        }
                    </div>
                    <div class="navbar-vertical-footer"><a class="btn btn-link border-0 fw-semi-bold d-flex ps-0"
                    ><span class="navbar-vertical-footer-icon"
                        data-feather="log-out"></span><span>Keluar</span></a></div>
                </div>
            </nav>
        </>
    )
}
