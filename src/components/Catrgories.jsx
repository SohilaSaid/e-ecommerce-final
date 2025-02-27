import React from 'react'
import useAPI from '../hooks/useAPI'

export default function Catrgories() {

    let{ data , isLoading} = useAPI("categories")

    if (isLoading){
        return (
            <div className='flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
        )
    }
  return (
    <>
    <div className='flex flex-wrap gap-4 m-10 mt-28'>
    {data?.data?.data?.map((cayegory) => {
                    return (
                        <div key={cayegory._id}  className='p-4  bg-white border border-gray-200 rounded-lg hover:shadow-2xl ' style={{ width: "calc(33% - 18px)" }}>
                            <img src={cayegory.image} className="w-full  object-cover" alt=""></img>
                            <h4 className="text-center">{cayegory.name}</h4>
                        </div>
                    )

                })}
    </div>
    </>
  )
}

