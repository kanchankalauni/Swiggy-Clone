import React from 'react'

function SearchBarRestaurantData({
    data: {
        card: {
            card: {
                info: {
                    id, cloudinaryImageId, aggregatedDiscountInfoV3 = {}, cuisines, promoted = false, costForTwoMessage, name: resName, avgRating, sla: { slaString }
                }
            }
        }
    }
}) {
    return (
        <div className='bg-red-500 m-4'>
            <h1>{resName}</h1>
        </div>
    )
}

export default SearchBarRestaurantData