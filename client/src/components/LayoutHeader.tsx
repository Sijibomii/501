import CircleIcon from '@/icons/Circle'
import { UserAvatar } from '@/ui/UserAvatar'
import React from 'react'

interface LayoutHeaderProps{}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({}) => {
    
    return (
        <div className='layout-header w-screen'>
            <div className='layout-header-container w-full'>
                <div className='layout-header-top bg-secondary py-5'>
                </div>
                <div className='layout-header-bottom flex items-center justify-between max-w-7xl w-full mx-auto py-4'>
                    <div className='layout-header-left flex items-center'>
                        <CircleIcon color={'#058c42'} width={20} height={20} />
                        <h3 className='uppercase text-primary text-lg font-semibold ml-3'>bus tracker</h3>
                    </div>
                    <div className='layout-header-right flex items-center'>
                        <h3 className='text-primary text-lg font-semibold mr-3'>Ganiyui Jubrik</h3>
                        <UserAvatar />
                    </div>
                </div>
            </div>
        </div>
    )
}
