import React from 'react'
import { bouncy } from 'ldrs'
import { hourglass } from 'ldrs'


export function LoaderForChats() {

    bouncy.register()
    return (
        <div className='m-auto'>
            <l-bouncy
            size="40"
            speed="0.8" 
            color="#E91B3F" 
            ></l-bouncy>
        </div>
    )
}


export function HourglassLoader() {

    hourglass.register()
    return (
        <div className='mt-20'>
            <l-hourglass
            size="40"
            bg-opacity="0.1"
            speed="3" 
            color="#E91B3F" 
            ></l-hourglass>
        </div>
    )
}


