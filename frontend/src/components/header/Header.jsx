import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [check, setCheck] = useState(false);
    document.onscroll = () => {
        console.log(window.scrollY);
        window.scrollY >= 180 ? setCheck(true) : setCheck(false);
    };
    return (
        <div>
            <div
                className={`navbar bg-base-100 fixed top-0 flex justify-between z-40 text-white transition-all ${
                    check
                        ? "py-0 bg-black bg-opacity-50"
                        : "py-6 bg-transparent"
                }`}
            >
                <div className="">
                    <Link className="btn btn-ghost text-2xl" to="/">
                        MPP Hotel
                    </Link>
                </div>
                <div className="">
                    <ul className="menu menu-horizontal px-1 ">
                        <li className="">
                            <Link className="font-semibold mx-2" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/room">
                                Room
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/service">
                                Service
                            </Link>
                        </li>
                        <li>
                            <details>
                                <summary>User name</summary>
                                <ul className="p-2 bg-base-100 rounded-se-none text-slate-900">
                                    <li>
                                        <a>Link 1</a>
                                    </li>
                                    <li>
                                        <a>Log out</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
