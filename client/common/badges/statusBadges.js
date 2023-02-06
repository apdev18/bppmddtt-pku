import React from 'react'

export const Complete = () => {
    return (
        <>
            <span class="badge badge-phoenix fs--2 badge-phoenix-success">
                <span class="badge-label">Selesai</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id='badgestatus' class="feather feather-check ms-1" >
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </span>
        </>
    )
}

export const Processing = () => {
    return (
        <>
            <span class="badge badge-phoenix fs--2 badge-phoenix-primary">
                <span class="badge-label">Sedang diproses</span>
                <svg id='badgestatus' xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotating feather feather-loader ms-1">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
            </span>
        </>
    )
}

export const Closed = () => {
    return (
        <>
            <span class="badge badge-phoenix fs--2 badge-phoenix-danger">
                <span class="badge-label">Closed</span>
                <svg id='badgestatus' xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle ms-1">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </span>
        </>
    )
}

export const Pending = () => {
    return (
        <>
            <span class="badge badge-phoenix fs--2 badge-phoenix-warning">
                <span class="badge-label">Pending</span>
                <svg id='badgestatus' xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock ms-1">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </span>
        </>
    )
}

export const Assigneded = () => {
    return (
        <>
            <span class="badge badge-phoenix fs--2 badge-phoenix-info">
                <span class="badge-label">Assigneded</span>
                <svg id='badgestatus' xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap ms-1">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            </span>
        </>
    )
}