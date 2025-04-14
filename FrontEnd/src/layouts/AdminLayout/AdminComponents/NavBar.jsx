import React from 'react'

function NavBar() {
  return (
    <nav className='container mx-auto'>
        <div className='flex justify-between items-center'>
            <div>
                <h1 className='text-xl font-bold'>Dashboard Admin</h1>
            </div>
            <div className='text-[#ba181b]'>
                User
            </div>
        </div>
    </nav>
  )
}

export default NavBar