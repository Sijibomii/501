import React from 'react'
import { Auth } from '@/auth/Auth'
import { HeaderController } from '@/components/HeaderController'
import { Layout } from '@/components/UserLayout'
import { useUserCurrentPage } from '@/global-stores/useUserCurrentPage'
import UserDash from '@/components/UserDash'
import UserRoutes from '@/components/UserRoutes'
function AdminDashboard() {

  const { currentPage, set } = useUserCurrentPage();

  return (
    <Auth>
      <HeaderController/>
        <Layout>
        {currentPage == 'home' && (
            <UserDash />
          )}
        {currentPage == 'route' && (
            <UserRoutes />
          )}
        </Layout>
    </Auth>
  )
}

export default AdminDashboard
