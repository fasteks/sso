import React from 'react'
import InputClass from './classComponent'

const Dummy = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-4/5 w-4/5 flex flex-col items-center rounded-md bg-gray-600">
        <p className="p-5 text-white">Functional Component Wrapper</p>
        <InputClass />
      </div>
    </div>
  )
}

export default Dummy
