import React, { useEffect, useState } from 'react'
import { List, ListSummary } from '../../api/surat';
import { Footer } from '../components/footer';
import { Preloader, WelcomePreloader } from '../components/preloader';
import { ChartJs } from './chart';

export const Dashboard = () => {
    const [letters, setLetters] = useState([]);
    const pending = letters.filter(letter => letter.status === 'pending');
    const processing = letters.filter(letter => letter.status === 'processing');
    const completed = letters.filter(letter => letter.status === 'completed');
    const closed = letters.filter(letter => letter.status === 'closed');

    useEffect(() => {
        List().then(setLetters)
    }, []);

    return (
        <>
            {/* <Preloader /> */}
            {/* <WelcomePreloader /> */}
            <div class="content">
                <div class="pb-5">
                    <div class="row g-4">
                        <div class="col-12 col-xxl-12">
                            <div class="mb-6">
                                <h2 class="mb-2">Selamat Pagi</h2>
                                <h5 class="text-700 fw-semi-bold">Here’s what’s going on at your business right now</h5>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-xl-3 col-sm-6 mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <img src="assets/img/icons/illustrations/4.png" alt=""
                                                    height="46" width="46" />
                                                <div class="ms-3">
                                                    <h4 class="mb-0">{completed.length} surat</h4>
                                                    <p class="text-800 fs--1 mb-0">Selesai</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-xl-3 col-sm-6 mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center"><img src="assets/img/icons/illustrations/2.png" alt=""
                                                height="46" width="46" />
                                                <div class="ms-3">
                                                    <h4 class="mb-0">{processing.length} surat</h4>
                                                    <p class="text-800 fs--1 mb-0">Belum diproses</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-3 col-xl-3 col-sm-6 mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center"><img src="assets/img/icons/illustrations/3.png" alt=""
                                                height="46" width="46" />
                                                <div class="ms-3">
                                                    <h4 class="mb-0">{pending.length} surat</h4>
                                                    <p class="text-800 fs--1 mb-0">Pending</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-xl-3 col-sm-6 mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center"><img src="assets/img/icons/illustrations/shield.svg" alt=""
                                                height="46" width="46" />
                                                <div class="ms-3">
                                                    <h4 class="mb-0">{closed.length} surat</h4>
                                                    <p class="text-800 fs--1 mb-0">ditutup</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="bg-200 mb-6 mt-4" />
                            <ChartJs />
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
