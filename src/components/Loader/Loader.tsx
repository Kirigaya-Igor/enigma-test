import React from "react"
import spinner from './spinner.svg'

export const Loader: React.FC = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img src={spinner} alt='Loader Loading...'/>
        </div>
    )
}