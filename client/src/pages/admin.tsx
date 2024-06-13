import React from 'react'
import { Auth } from '@/auth/Auth'
import { HeaderController } from '@/components/HeaderController'
import { Layout } from '@/components/AdminLayout'
import { useCurrentPage } from "../global-stores/useCurrentPage"
import AdminDash from '@/components/AdminDash'
import AdminRoute from '@/components/AdminRoute'
import AdminInventory from '@/components/AdminInventory'
function AdminDashboard() {

  const { currentPage, set } = useCurrentPage();

  return (
    <Auth>
      <HeaderController/>
        <Layout>
          { currentPage == 'dash' && (
            <AdminDash />
          )}
          { currentPage == 'inventory' && (
            <AdminInventory />
          )}
          { currentPage == 'route' && (
            // todo: add a new route
            <AdminRoute />
          )}
        </Layout>
    </Auth>
  )
}

export default AdminDashboard
