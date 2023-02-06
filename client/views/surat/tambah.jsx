import React from 'react';
import { Footer } from '../components/footer';
import { Create } from '../../api/surat';
import { ToastContainer } from 'react-toastify';

export const CreateLetters = () => {

    return (
        <>
            <div class="content">
                <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true}
                    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable
                    pauseOnHover={false} theme="light"
                />
                <div class="mb-9">
                    <div class="row g-3 mb-4">
                        <div class="col-auto">
                            <h3 class="mb-0">Assign new letter</h3>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-9">
                            <Create />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
