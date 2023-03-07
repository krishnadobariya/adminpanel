import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiTeacher } from 'react-icons/gi'
import { FaDiscourse } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { FcFaq } from 'react-icons/fc';
import { BiTimer } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';



const Nav = (props) => {

    const [isOpen, setIsopen] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        window.location = "/"
    }
    return (
        <>
            <div className="container-fluid px-0">
                <div className={`sidebar ${isOpen ? 'visible' : 'invisible'}`}>
                    <div className="sd-header">
                        <h4 className="mb-0 text-white">Sidebar Header</h4>
                        <i className="fa fa-times text-[white]" onClick={() => setIsopen(!isOpen)}></i>
                    </div>
                    <div className="sd-body">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm no-underline hover:no-underline hover:bg-[#212A41] hover:text-[#fff] hover:font-bold">
                                <Link
                                    to="/home"
                                    className="flex items-center p-2 space-x-3 rounded-md hover:no-underline hover:text-white"
                                >
                                    <GoHome className="w-9 h-9 p-2 text-[#fff] bg-[#3DC0DF] rounded">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </GoHome>
                                    <span className='text-white'>Home</span>
                                </Link>
                            </li>
                            
                            <li className="rounded-sm hover:bg-[#212A41] hover:text-[#fff] hover:font-bold">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md hover:no-underline hover:text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-9 h-9 p-2 text-[#fff] bg-[#3DC0DF] rounded"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className='text-white' onClick={() => { logout() }}>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={() => setIsopen(!isOpen)}></div>
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
                    <div className="container-fluid p-2">
                        <div className="btn  bg-[#3DC0DF] text-[#fff]" onClick={() => setIsopen(!isOpen)} >
                            <div className='flex justify-center gap-3'>
                                <i className="fa fa-bars self-center"></i><p className='self-center m-0'>Open Menu</p>
                            </div>
                        </div>
                        <div className=''>
                            <p className='text-[25px] font-semibold ml-5 text-[#3DC0DF] uppercase'>{props.title}</p>
                        </div>
                        <div className="form-inline ml-auto">
                            <button className='bg-[#3DC0DF] text-[#fff] font-bold rounded px-3 py-1' onClick={() => { logout() }}>Logout</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Nav