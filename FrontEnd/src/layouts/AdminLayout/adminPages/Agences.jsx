import React from 'react'
import { useSelector } from 'react-redux';

function Agences() {
    const agences = useSelector((state) => state.AgencesReducer);
  return (
    <div>
        <div>
            <h1 className='text-xl font-semibold'>Tous les Agences</h1>
        </div>
        <div>
            <table className='w-full mx-auto text-center text-sm border-collapse mt-2'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border border-gray-300 py-2'>#</th>
                        <th className='border border-gray-300 py-2'>Nom Agence</th>
                        <th className='border border-gray-300 py-2'>E-mail</th>
                        <th className='border border-gray-300 py-2'>Téléphone</th>
                        <th className='border border-gray-300 py-2'>Numero ICE</th>
                    </tr>
                </thead>
                <tbody>
                    {agences.map((agence) => (
                        <tr key={agence.id} className='hover:bg-gray-100 cursor-pointer'>
                            <td className='border border-gray-300 py-2'>{agence.id}</td>
                            <td className='border border-gray-300 py-2'>{agence.agence}</td>
                            <td className='border border-gray-300 py-2'>{agence.email}</td>
                            <td className='border border-gray-300 py-2'>{agence.telephone}</td>
                            <td className='border border-gray-300 py-2'>{agence.Numéro_ICE}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Agences