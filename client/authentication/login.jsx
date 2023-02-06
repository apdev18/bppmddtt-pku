import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getIsAdmin, getToken, getUser, setUserSession } from "../common/sessions/common";
import { baseUrl } from "../constants/constants"
// import { WelcomePreloader } from '../views/components/preloader'

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();
  const [values, setValues] = useState({ email: "", password: "" });
  const token = getToken();
  const userId = getUser()
  const isAdmin = getIsAdmin()

  useEffect(() => {
    if (token && userId && isAdmin) {
      navigate.push('/surat')
    }
  });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { data } = await axios.post(
        baseUrl + "/api/users/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.success === 1) {
          setLoading(false);
          setUserSession(data.token, data.userId);
          navigate.push('/surat');
          window.location.reload(false)
        }
        else {
          setLoading(false);
          toast.error('Email dan Password Salah', {})
          setValues({ ...values, password: "" })
        }
      }

    } catch (ex) {
      setLoading(false);
      console.log(ex);
      toast.error('Something went wrong. Please try again later', {})
    }
  };


  return (
    <>
      {/* <WelcomePreloader /> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div class="container-fluid px-0" data-layout="container">
        <div class="container">
          <div class="row flex-center min-vh-100 py-5">
            <div class="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
              <div class="text-left mb-4">
                <h3>Sign In</h3>
                <p class="text-700">Get access to your account</p>
                <hr />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-3 text-start">
                  <label class="form-label" for="email">Email address</label>
                  <div class="form-icon-container">
                    <input
                      class="form-control form-icon-input"
                      id="email"
                      type="email"
                      placeholder="Enter the email"
                      value={values.email}
                      name="email"
                      onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                      }
                    />
                    <span class="fas fa-user text-900 fs--1 form-icon"></span>
                  </div>
                </div>
                <div class="mb-3 text-start">
                  <label class="form-label" for="password">Password</label>
                  <div class="form-icon-container">
                    <input
                      class="form-control form-icon-input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                      }
                    />
                    <span class="fas fa-key text-900 fs--1 form-icon"></span>
                  </div>
                </div>
                <div class="row flex-between-center mb-7">
                  <div class="col-auto">
                    <div class="form-check mb-0">
                      <input class="form-check-input" id="basic-checkbox" type="checkbox" checked="checked" />
                      <label class="form-check-label mb-0" for="basic-checkbox">Remember me</label>
                    </div>
                  </div>
                  <div class="col-auto"><a class="fs--1 fw-semi-bold" href="../../../pages/authentication/simple/forgot-password.html">Forgot Password?</a></div>
                </div>
                {loading ?
                  <button disabled class="btn btn-primary w-100 mb-3">Loading...</button>
                  :
                  <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
