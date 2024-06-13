import { SearchBar } from '@/ui/SearchBar'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';

function UserDash() {
    const Map = dynamic(() => import('./Map'), { ssr: false });
    const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className='user-dash w-full px-2 mt-5'>
        <div className='user-dash-container flex flex-col items-center w-full'>
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
            <div className='map-container mt-6 w-full'>
                {isMounted && <Map />}
            </div>
        </div>
    </div>
  )
}

export default UserDash