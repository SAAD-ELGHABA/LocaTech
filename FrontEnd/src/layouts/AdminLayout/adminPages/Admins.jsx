import React, { use } from 'react'
import { useSelector } from 'react-redux';

function Admins() {
    const admins = useSelector((state) => state.AdminsReducer);
  return (
    <div>
        <div>
            <h1 className='text-xl font-semibold'>Admin</h1>
        </div>
        <div>
            <table className='text-sm w-full text-center border-collapse border border-gray-300'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='py-2'>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id} className='hover:bg-gray-100 cursor-pointer'>
                            <td className='py-1.5'>{admin.id}</td>
                            <td>{admin.Nom_complet}</td>
                            <td>{admin.user_email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Admins