import DashIcon from '@/icons/Dashboard'
import React from 'react'
import { useCurrentPage } from "../global-stores/useCurrentPage"

interface AdminLeftPanelProps{}

export const AdminLeftPanel: React.FC<AdminLeftPanelProps> = ({}) => {
    
    const { currentPage, set } = useCurrentPage();

    return (
        <div className='admin-left-panel'>
            <div className='admin-left-panel-container bg-white rounded-lg shadow-md'>
                <div className={`panel-1 flex items-center flex-col p-10 cursor-pointer 
                ${currentPage == 'dash' ? "bg-secondary text-white" : "text-secondary"}  rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'dash' })
                    }}
                >
                    <DashIcon width={20} height={20} />
                    <h4 className='font-light text-sm mt-3'>Dashboard</h4>
                </div>
                <div className={`panel-2 flex items-center flex-col p-10 cursor-pointer 
                    ${currentPage == 'inventory' ? "bg-secondary text-white" : "text-secondary"}  rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'inventory' })
                    }}
                    >
                    <DashIcon width={20} height={20} />
                    <h4 className='font-light text-sm mt-3'>Trips Inventory</h4>
                </div>
                <div className={`panel-3 flex items-center flex-col p-10 cursor-pointer
                    ${currentPage == 'route' ? "bg-secondary text-white" : "text-secondary"} rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'route' })
                    }}
                    >
                    <DashIcon width={20} height={20} />
                    <h4 className=' font-light text-sm mt-3'>Bus Routes</h4>
                </div>
                <div className={`panel-4 flex items-center flex-col p-10 cursor-pointer
                  ${currentPage == 'settings' ? "bg-secondary text-white" : "text-secondary"} rounded-lg`}
                    onClick={()=>{
                        set({ currentPage: 'settings' })
                    }}
                  >
                    <DashIcon width={20} height={20} />
                    <h4 className=' font-light text-sm mt-3'>Settings</h4>
                </div>
                <div className='panel-4 flex items-center flex-col p-10 cursor-pointer   rounded-lg'>
                    <DashIcon width={20} height={20} />
                    <h4 className=' font-light text-sm mt-3'>Log Out</h4>
                </div>
            </div>
        </div>
    )
}
