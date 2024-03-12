import React from 'react'

function Button({label, type}) {
  return (
   <>
   <div className="flex justify-center items-center">
   <button type={type} className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 w-full text-white rounded-md mt-5 py-2">{label}</button>
   </div>
  
   
   </>
  )
}

export default Button