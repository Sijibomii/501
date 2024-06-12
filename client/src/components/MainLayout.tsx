import React from 'react'


interface MainLayoutProps {
    layoutHeader: React.ReactNode;
    leftPanel?: React.ReactNode;
    children?: React.ReactNode;
}
export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    leftPanel = <div />,
    layoutHeader,
  }) => {
    return (
        <div className='bg-[#ebe9e9] h-screen'>
            <div className='header'>
                {layoutHeader}
            </div>
            <div className="max-w-7xl mx-auto py-4 flex items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ">
                <div className='mr-10 flex-[15%]'>
                    {leftPanel}
                </div>
                <div className='ml-14 flex-[85%]'>
                    {children}
                </div>
            </div>
        </div>
      )
  }


export default MainLayout