import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from '../guards/AuthGuard'
import ApplicationsTab from '../pages/AdminPanel/tabs/applications/ApplicationsTab'
import UsersTab from '../pages/AdminPanel/tabs/users/UsersTab'

const Home = lazy(() => import('../pages/Home/Home'))
const AdminPanel = lazy(() => import('../pages/AdminPanel/AdminPanel'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* guarded routes */}

        <Route
          path="/admin-pannel"
          element={
            <AuthGuard>
              <AdminPanel />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="applications" replace />} />
          <Route path="applications" element={<ApplicationsTab />} />
          <Route path="users" element={<UsersTab />} />
        </Route>


        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  )
}
