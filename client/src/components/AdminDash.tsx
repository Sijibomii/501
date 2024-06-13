import { SearchBar } from '@/ui/SearchBar'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';

function AdminDash() {
    const Map = dynamic(() => import('./Map'), { ssr: false });
    const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className='admin-dash w-full px-2'>
        <div className='admin-dash-container flex flex-col items-center w-full'>
            <div className='admin-dash-header w-full'>
                <SearchBar />
            </div>
            <div className='map-container mt-12 w-full'>
                {isMounted && <Map />}
            </div>
        </div>
    </div>
  )
}

export default AdminDash