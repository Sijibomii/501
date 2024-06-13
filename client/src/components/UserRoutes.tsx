import React from 'react'
import { SearchBar } from '@/ui/SearchBar'
import InvIcon from '@/icons/InvIcon'
import PenIcon from '@/icons/PenIcon'

function UserRoutes() {
  return (
    <div className='user-routes w-full px-2 mt-5'>
        <div className='user-routes-container flex flex-col items-center w-full'>
            <div className='user-dash-header w-full flex items-center justify-between'>
                <div className=''>
                    <h3 className='text-2xl font-semibold'>Search for bus routes</h3>
                </div>
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-normal'>From</h3>
                    <SearchBar className='ml-5 border-[1px] border-secondary py-0 px-0'  bg='#EBE9E9' icon={false} transparent={true} />
                </div>
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-normal'>To</h3>
                    <SearchBar className='ml-5 border-[1px] border-secondary py-0 px-0' bg='#EBE9E9' icon={false} transparent={true} />
                </div>
            </div>
            <div className='buses-container mt-8 w-full'>
            <div className='w-full'>
                <div className='admin-inventory-top '>
                    <h4 className='font-semibold text-xl text-secondary'>Available Trips</h4>
                </div>
                <div className='admin-inventory-table w-full'>
                    {/* <h4 className=''>No active trips</h4> */}
                    <div className='trip-inventory-table w-full py-4'>
                        <div className='table-header flex items-center justify-between w-full px-10'>
                            <div className=''>
                                <h3 className='uppercase text-xl font-semibold text-secondary'>bus id</h3>
                            </div>
                            <div className=''>
                                <h3 className='uppercase text-xl font-semibold text-secondary'>from</h3>
                            </div>
                            <div className=''>
                                <h3 className='uppercase text-xl font-semibold text-secondary'>to</h3>
                            </div>
                            <div className=''>
                            </div>
                        </div>
                        <div className='trip-1 w-full flex items-center'>
                            <div className='w-full flex items-center justify-between bg-white py-4 px-7 rounded-lg mr-5 mt-4 my-2'>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>1234668</h3>
                                </div>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>White House</h3>
                                </div>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>Lagere</h3>
                                </div>
                                <div className='flex items-center'>
                                    <PenIcon width={16} height={16} />
                                    <h4 className='text-md font-light text-secondary ml-3'>Edit</h4>
                                </div>
                            </div>
                            <div className=''>
                                <InvIcon width={30} height={30} />
                            </div>
                        </div>

                        <div className='trip-1 w-full flex items-center'>
                            <div className='w-full flex items-center justify-between bg-white py-4 px-7 rounded-lg mr-5 mt-4 my-2'>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>1234668</h3>
                                </div>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>White House</h3>
                                </div>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>Lagere</h3>
                                </div>
                                <div className='flex items-center'>
                                    <PenIcon width={16} height={16} />
                                    <h4 className='text-md font-light text-secondary ml-3'>Edit</h4>
                                </div>
                            </div>
                            <div className=''>
                                <InvIcon width={30} height={30} />
                            </div>
                        </div>

                        <div className='trip-1 w-full flex items-center'>
                            <div className='w-full flex items-center justify-between bg-white py-4 px-7 rounded-lg mr-5 mt-4 my-2'>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>1234668</h3>
                                </div>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>White House</h3>
                                </div>
                                <div className='px-2'>
                                    <h3 className='capitalize text-md font-normal text-secondary'>Lagere</h3>
                                </div>
                                <div className='flex items-center'>
                                    <PenIcon width={16} height={16} />
                                    <h4 className='text-md font-light text-secondary ml-3'>Edit</h4>
                                </div>
                            </div>
                            <div className=''>
                                <InvIcon width={30} height={30} />
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserRoutes
