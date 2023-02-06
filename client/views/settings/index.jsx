import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Footer } from '../components/footer'

export const UserSettings = () => {
    return (
        <>
            <div class="content">
                <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true}
                    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable
                    pauseOnHover={false} theme="light"
                />
                <div class="mb-9">
                    <div class="row g-3 mb-6">
                        <div class="col-auto">
                            <h3 class="mb-0">Pengaturan akun</h3>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-4 col-sm-12 col-md-4">
                            <p>Reset password</p>
                            <div class="row g-3">
                                <div class="col-sm-12 col-md-12">
                                    <div class="form-floating">
                                        <input class="form-control"
                                            id="floatingInputGrid"
                                            type="password"
                                            placeholder="Subject"
                                            name='oldPassword'
                                        />
                                        <label for="floatingInputGrid">Password lama</label>
                                        {/* <span class="text-danger inputerror">{Error.subject}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3 mt-1">
                                <div class="col-sm-12 col-md-12">
                                    <div class="form-floating">
                                        <input class="form-control"
                                            id="floatingInputGrid"
                                            type="password"
                                            placeholder="Subject"
                                            name='newPassword'
                                        />
                                        <label for="floatingInputGrid">Password baru</label>
                                        {/* <span class="text-danger inputerror">{Error.subject}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3 mt-1">
                                <div class="col-sm-12 col-md-12">
                                    <div class="row g-3 justify-content-end">
                                        <div class="col-auto">
                                            <a class="btn btn-sm btn-phoenix-primary">Clear</a>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn btn-sm btn-primary">Reset</button>
                                        </div>
                                    </div>
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
