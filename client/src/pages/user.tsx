import React from 'react'
import { Auth } from '@/auth/Auth'
import { HeaderController } from '@/components/HeaderController'
import { Layout } from '@/components/UserLayout'
import { useUserCurrentPage } from '@/global-stores/useUserCurrentPage'

function AdminDashboard() {

  const { currentPage, set } = useUserCurrentPage();

  return (
    <Auth>
      <HeaderController/>
        <Layout>
          
        </Layout>
    </Auth>
  )
}

export default AdminDashboard
