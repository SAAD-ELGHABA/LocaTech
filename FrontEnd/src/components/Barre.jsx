// components/Barre.js
import React from 'react';
import Navbar from './Navbar'; // Assurez-vous que le chemin vers Navbar est correct
import Footer from './Footer'; // Assurez-vous que le chemin vers Footer est correct

function Barre({ children }) {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Barre;