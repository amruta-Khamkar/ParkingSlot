import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return <footer class="bg-dark text-center text-lg-start">
        <div class="text-center p-3" style={{backgroundColor:" rgba(0, 0, 0, 0.2)"}}>
            <Link class="text-light text-decoration-none fw-bold "  to="/dashboard">© 2022 Copyright ParkingStars.com</Link>
        </div>
    </footer>
}
