import './preloader.css'
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import BarLoader from "react-spinners/BarLoader";

export const Preloader = () => {
    const [user] = useAuthState(auth);
    return (
        <>
            {!user ? (
                <div className="preloader" id="loading">
                    <div className="preloader__wrap">
                        <BarLoader
                            color="#fff"
                            cssOverride={{
                                'border-radius': '6px'
                            }}
                            loading
                            speedMultiplier={1}
                        />
                    </div>
                </div>
            )
                : ('')
            }
        </>
    )
}