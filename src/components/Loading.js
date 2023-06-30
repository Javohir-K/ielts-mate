import React from 'react'

function Loading() {
  return (
    <div className='loading'>
        <div className="loading-wrapper">
            <div className="loader">
                <div className="loader-inner bg-dark"></div>
            </div>
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default Loading