import React from 'react'

export const  MainHeader = () => {
  return (
    <div className='flex justify-center items-center border-red-500 border-b-2 '>
        <div className='flex gap-12 justify-center items-center border-b-2 py-4 px-12 bg-blue-700 text-gray-200  font-semibold'>
            <span className='text-bold text-white text-xl whitespace-nowrap'>Email-Edition :-</span>
            <p className='text-sm text-gray-100 text-justify '>© Exide Industries LTD: All rights reserved. Under our agreement this publication may not be reproduced (complete or partial), redistributed, stored in a public retrieval system or broadcast to persons other
            than the email subscriber without the prior written permission of Consensus Economics Inc.</p>
        </div>
    </div>
  )
}