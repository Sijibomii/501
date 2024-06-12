import React from 'react'
import { Auth } from '@/auth/Auth'
import { HeaderController } from '@/components/HeaderController'
import { Layout } from '@/components/AdminLayout'
import { useCurrentPage } from "../global-stores/useCurrentPage"
import AdminDash from '@/components/AdminDash'


function AdminDashboard() {

  const { currentPage, set } = useCurrentPage();

  return (
    <Auth>
      <HeaderController/>
        <Layout>
          { currentPage == 'dash' ? (
            <AdminDash />
          ):(<></>)}
        </Layout>
    </Auth>
  )
}

export default AdminDashboard
