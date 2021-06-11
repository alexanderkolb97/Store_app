import {Context} from './App';
import {useContext, useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Header() {
    const {setSearchstatus, cartNumber} = useContext(Context);

    const searchProducts = function(e) {
        if(e.target.value.length < 3) {
            setSearchstatus('')

            return
        }

        setSearchstatus(e.target.value)
    }

    return (
        <header className="header">
            <div className="logo">
                <a href="/"><img src="./logo.png" alt="logo"/></a>
            </div>
            <div className="search_wrapper">
                <input onChange={searchProducts} type="text" name="search" placeholder="Search"/>
                <span className="search_icon"></span>
            </div>
            <Link to="/cart" className="cart">
                <span className="cart_amount">{cartNumber}</span>
                <img src="cart.png" alt="cart"/>
            </Link>
        </header>
    )
}

export default Header;