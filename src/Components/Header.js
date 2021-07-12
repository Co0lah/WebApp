import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header class="header-login-signup">
            <div class="header-limiter">
                <h1><a href="/">Keur <span>Waxtan</span></a></h1>
                <nav>
                    <Link to="/">Home</Link>
                    <a class="selected"><Link to="/">A propos</Link></a>
                    <a><Link to="/">Contactez-nous</Link></a>
                </nav>
                <ul>
                    <li><Link to="/login">Se connecter</Link></li>
                    <li><Link to="/signup">S'enregistrer</Link></li>
                </ul>
            </div>
        </header>
    )
}
export default Header;
