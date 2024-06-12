import React from 'react'
import { Auth } from '@/auth/Auth'
import { HeaderController } from '@/components/HeaderController'
import { Layout } from '@/components/AdminLayout'
function AdminDashboard() {
  return (
    <Auth>
      <HeaderController/>
        <Layout>
          welcome admin!
        </Layout>
    </Auth>
  )
}

export default AdminDashboard
