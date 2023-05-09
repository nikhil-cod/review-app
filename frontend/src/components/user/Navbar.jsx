import React from "react";
import {BsFillSunFill} from "react-icons/bs"

export default function Navbar() {
    return (
        <div className="bg-secondary">
            <div className="bg-black text-white max-w-screen-xl mx-auto p-2">
                <div className="flex justify-between items-center">
                    <img src="./logo.png" alt="logo" className="h-10"></img>
                    <ul>
                        <li>
                            <button className="bg-dark-subtle p-1 rounded">
                            <BsFillSunFill className="text-secondary" size={24}/>
                            </button>
                        </li>
                        <li>
                            <input
                            type="text"
                            className="border-2 border-dark-subtle p-1"
                            placeholder="search..."
                            >
                            </input>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}