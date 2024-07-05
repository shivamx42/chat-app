import React from 'react'
import { mirage } from 'ldrs'



export default function UsersLoader() {

    mirage.register()
    return (
        <div className='text-center mt-[65%]'>
            <l-mirage
            size="60"
            speed="2.5" 
            color="#E91B3F" 
            ></l-mirage>
        </div>
    )
}
