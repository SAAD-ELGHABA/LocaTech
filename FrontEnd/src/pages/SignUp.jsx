import React from 'react'; 
import { Link } from 'react-router-dom'; // Si vous utilisez React Router
import { FaGoogle } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { BiBriefcase } from 'react-icons/bi';
import logo from './assets/Location.png'; // Assurez-vous que le chemin est correct

function SignUp() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="flex items-center justify-center mb-8">
                    <img src={logo} alt="Logo LocaTech" className="h-10 mr-2" />
                    <span className="text-2xl font-bold text-gray-800">LocaTech</span>
                </div>
                <h1 className="block w-full text-center text-3xl font-bold text-gray-800 mb-6">Créer un compte</h1>

                <button
                    className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4 flex items-center justify-center"
                >
                    <FaGoogle className="mr-3 text-blue-500" /> S'inscrire avec Google
                </button>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm text-gray-500">
                        OU
                    </div>
                </div>

                <div className="space-y-4">
                    <Link to="/client-signup" className="block">
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-between">
                            <div className="flex items-center">
                                <BsPersonFill className="mr-3 text-gray-500" />
                                <div>
                                    <h3 className="font-semibold">Client</h3>
                                    <p className="text-sm text-gray-500">Acheter et louer mes biens</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </Link>

                    <Link to="/courtier-signup" className="block">
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-between">
                            <div className="flex items-center">
                                <BiBriefcase className="mr-3 text-gray-500" />
                                <div>
                                    <h3 className="font-semibold">Courtier</h3>
                                    <p className="text-sm text-gray-500">Déposer des biens</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
