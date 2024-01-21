import React from 'react'
import img from '../../assets/Images/page-404-cartoon-astronaut-ufo-and-space-planets-vector.jpg'
import { NavLink } from 'react-router-dom'

function NotFound404() {
  return (
    <div className='min-h-[75vh] flex flex-col justify-center items-center gap-5'>
        <div className="">
        <h2 className='md:text-9xl text-5xl font-Kalnia select-none text-center'>404</h2>
        <p className='md:text-2xl font-mono text-center'>Page not Found</p>
        </div>
        <NavLink to='' className=" bg-purple-600 opacity-80 hover:opacity-100  border px-7 py-2 rounded  font-bold hover:bg-purple-950">Go Back</NavLink>
    </div>
  )
}

export default NotFound404