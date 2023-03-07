import React from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
export default function Signup() {
  const [data, setData] = useState({
    Username: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
  });
  const [userdata, setUserdata] = useState("");
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log("dnhs", data);
  };
  const onSubmits = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}user/singup`, data)
      .then((res) => {
        console.log("....", res);
        setUserdata(res.data.data);
        console.log("fhbnvhgjg", userdata);

        alert(res.data.message);
        window.location = "/";
      })
      .catch((er) => {
        console.log("mnsbdcmjs", er);
        alert(er.response.data.message);
      });
  };
  return (
    <>
      <div className="container py-5 login">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 col-8 p-5 bg-light rounded box">
            <h3 className="text-center text-[#212A41] border-bottom pb-3">
              SIGN UP
            </h3>
            <div className="my-3">
              <h6>email</h6>
              <input
                type="email"
                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                name="Email"
                onChange={inputEvent}
                value={data.Email}
              ></input>
            </div>
            <div className="my-3">
              <h6>Username</h6>
              <input
                type="text"
                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                name="Username"
                onChange={inputEvent}
                value={data.Username}
              ></input>
            </div>
            <div className="my-3">
              <h6>password</h6>
              <input
                type="password"
                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                name="Password"
                onChange={inputEvent}
                value={data.Password}
              ></input>
            </div>
            <div className="my-3">
              <h6>Phone no</h6>
              <input
                type="text"
                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                name="PhoneNumber"
                onChange={inputEvent}
                value={data.PhoneNumber}
              ></input>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mt-3">
                <button
                  className="px-3 py-2 bg-success1 border-0 text-white"
                  onClick={(e) => onSubmits(e)}
                >
                  Sign up
                </button>
              </div>
              <div className="mt-3 text-center">
                <a href="/" className="text-center text-[#212A41] mt-5">
                  Already created
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
