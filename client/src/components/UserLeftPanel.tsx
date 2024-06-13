import DashIcon from '@/icons/Dashboard'
import BusIcon from '@/icons/Bus'
import NavIcon from '@/icons/NavIcon'
import SettingsIcon from '@/icons/Settings'
import LogoutIcon from '@/icons/LogOut'
import React from 'react'
import { useUserCurrentPage } from "../global-stores/useUserCurrentPage"

interface UserLeftPanelProps{}

export const UserLeftPanel: React.FC<UserLeftPanelProps> = ({}) => {
    const { currentPage, set } = useUserCurrentPage();
    return (
        <div className='admin-left-panel'>
            <div className='admin-left-panel-container bg-white rounded-lg shadow-md'>
                <div className={`panel-1 flex items-center flex-col p-10 cursor-pointer 
                ${currentPage == 'home' ? "bg-secondary text-white" : "text-secondary"}  rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'home' })
                    }}
                    >
                    <DashIcon className={currentPage == 'home' ? "bg-[#dbdbdb]" : "text-secondary"} width={20} height={20} />
                    <h4 className='font-light text-sm mt-3'>Home</h4>
                </div>
                
                <div className={`panel-3 flex items-center flex-col p-10 cursor-pointer
                    ${currentPage == 'route' ? "bg-secondary text-white" : "text-secondary"} rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'route' })
                    }}
                    >
                    <NavIcon className={currentPage == 'route' ? "bg-[#dbdbdb]" : "text-secondary"} width={20} height={20} />
                    <h4 className=' font-light text-sm mt-3'>Bus Routes</h4>
                </div>
                <div className={`panel-4 flex items-center flex-col p-10 cursor-pointer
                  ${currentPage == 'settings' ? "bg-secondary text-white" : "text-secondary"} rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'settings' })
                    }}
                  >
                    <SettingsIcon className={currentPage == 'settings' ? "bg-[#dbdbdb]" : "text-secondary"} width={20} height={20} />
                    <h4 className=' font-light text-sm mt-3'>Settings</h4>
                </div>
                <div className='panel-4 flex items-center flex-col p-10 cursor-pointer   rounded-lg'>
                    <LogoutIcon className='text-white' width={20} height={20} />
                    <h4 className=' font-light text-sm mt-3'>Log Out</h4>
                </div>
            </div>
        </div>
    )
}
