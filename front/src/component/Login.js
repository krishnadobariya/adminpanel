import React from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
export default function Login() {
  const [data, setData] = useState([
    {
      Email: "",
      Password: "",
    },
  ]);
  const handle = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log("dfnjb", data);
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}user/login`, {
        Email: data.Email,
        Password: data.Password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);

        window.location = "/dashboard";
      })
      .catch((e) => {
        console.log("Cvbv", e);
        alert(e.response.data.message);
        window.location = "/";
      });
  };
  return (
    <>
      <div className="container py-5 login">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 col-8 p-5 bg-light rounded box">
            <h3 className="text-center border-bottom text-[#212A41] pb-3">LOG IN</h3>
            <div className="my-3">
              <h6>email</h6>
              <input
                type="text"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                name="Email"
                value={data.email}
                onChange={(e) => handle(e)}
              ></input>
            </div>
            <div>
              <h6>password</h6>

              <input
                type="password"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                name="Password"
                value={data.password}
                onChange={(e) => handle(e)}
              ></input>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mt-3">
                <button
                  className="px-3 py-2 bg-success1 border-rounded text-white"
                  onClick={(e) => submit(e)}
                >
                  Sign In
                </button>
              </div>
              <div className="mt-3 text-center">
                <a href="/signup" className="text-center text-[#212A41] mt-5">
                  Create your Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
