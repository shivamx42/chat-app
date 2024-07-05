import React from 'react'
import { dotPulse } from 'ldrs'

export default function SendMessageLoader() {
    
    dotPulse.register()
    return (
        <div className='relative bottom-1'>
            <l-dot-pulse
            size="30"
            speed="1.3" 
            color="#E91B3F" 
            ></l-dot-pulse>
        </div>
    )
}