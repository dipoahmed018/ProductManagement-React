import React from 'react'
function Error({message}) {
    return(
        <div className="wrong">
            {message ?? 'something went wrong please try again'}
        </div>
    )
}
export default Error