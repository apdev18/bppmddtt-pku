import React from 'react'

export const Preloader = () => {
    return (
        <>
            <div class="content">
                <div class="position-absolute top-50 start-50 translate-middle" role="status">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>
            </div>
        </>
    )
}

export const WelcomePreloader = () => {
    return (
        <>
            <div className="preloader" id="loading">
                <div className="preloader__wrap">
                    <img id="pre-img" className="preloader__logo" src="assets/img/preloader.png" alt="Expedux" />
                    <img src="assets/img/icons/single-logo.png" alt="infocliq" width="70" />
                    <p class="text-center mt-2">Harap tunggu...</p>
                </div>
            </div>
        </>
    )
}