import React, { useState } from 'react'
import useAPI from '../hooks/useAPI'

export default function Brands() {

    let{ data , isLoading} = useAPI("brands")
    const [selectedBrand, setSelectedBrand] = useState(null);

    if (isLoading){
        return (
            <div className='flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
        )
    }
  return (
    <>

<h2 className='text-main text-center text-2xl mb-5 font-bold mt-40'>All Brands</h2>
    <div className='flex flex-wrap w-11/12 gap-4  m-auto'>
    {data?.data?.data?.map((brand) => {
                    return (
                        <div key={brand._id} className=' p-4  bg-white border border-gray-200 rounded-lg hover:shadow-2xl' style={{ width: "calc(25% - 18px)" }}  onClick={() => setSelectedBrand(brand)}>
                            <img src={brand.image} className="w-full h-48 object-cover" alt=""></img>
                            <h4 className="text-center mb-3 font-normal text-gray-700">{brand.name}</h4>
                        </div>
                    )

                })}
    </div>

    {selectedBrand?
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        <button 
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setSelectedBrand(null)}>

                            <i class="fa-solid fa-xmark"></i>
                        </button>

                        
                        <h3 className="text-2xl font-bold text-green-600">{selectedBrand.name}</h3>
                        <p className="text-gray-500 lowercase">{selectedBrand.name.toLowerCase()}</p>
                        <img src={selectedBrand.image} className="w-full h-32 object-contain my-3" alt={selectedBrand.name} />

                        
                        <button 
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                            onClick={() => setSelectedBrand(null)}>

                            Close
                        </button>
                    </div>
                </div> : ""
            }



    



    </>
  )
}

