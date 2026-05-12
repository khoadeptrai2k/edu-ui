import React from 'react'
import { getErrorMessage } from '../../utils/errorMessage'

const Toast = ({msg, handleShow, bgColor}) => {
    const body = getErrorMessage(msg.body, 'No message provided.')

    return (
        <div className={`toast show position-fixed text-light ${bgColor}`}
        style={{top: '5px', right: '5px', minWidth: '200px', zIndex: 50}}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button className="ml-2 mb-1 close text-light"
                data-dismiss="toast" style={{outline: 'none'}}
                onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className="toast-body" style={{ color: 'black' }}>
                {body}
            </div>
        </div>
    )
}

export default Toast
