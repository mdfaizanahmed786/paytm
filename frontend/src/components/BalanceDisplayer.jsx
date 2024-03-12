import React from 'react'

function BalanceDisplayer({currentBal}) {
  return (
    <div className='mt-2 font-bold ml-5 flex justify-center items-center'>
    <h1>Your Available Balance(Rs): {currentBal}</h1>
    
    </div>
  )
}

export default BalanceDisplayer