import React from 'react'
import { dotSpinner } from 'ldrs'

export default function AccountLoader() {

    dotSpinner.register();
    return (
      <div className='text-center my-2'>
          <l-dot-spinner
          size="40"
          speed="0.9" 
          color="#E91B3F" 
          ></l-dot-spinner>
      </div>
    )
}
