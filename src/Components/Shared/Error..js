import React from 'react'
function Wrong({message}) {
    return(
        <div className="wrong">
            {message ?? 'something went wrong please try again'}
        </div>
    )
}
export default Wrong