import React from 'react'

function Alert(props) {


  return (
    <div className="border h-25 w-full  rounded relative">
     
        <div className={`border ${props.color} ${props.textcolor} role="alert"`}>
          <span className="block sm:inline">{props.msg}</span>
        </div>
    </div>
  )
}

export default Alert