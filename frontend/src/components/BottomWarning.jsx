import React from 'react'
import { Link } from "react-router-dom";
function BottomWarning({label, link, to}) {
  return (
    <div className='text-center mt-4'>
    <p className="font-semibold text-md">{label}<Link className="hover:underline" to={to}>{link}</Link></p>
    </div>
  )
}

export default BottomWarning