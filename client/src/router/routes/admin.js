export default [
  { path: '/admin', name: 'admin-dashboard', meta: { requiresAuth: true, roles: ['ADMIN'] }, component: () => import('@/views/admin/AdminDashboardView.vue') },
  { path: '/admin/jadwal', name: 'admin-schedule', meta: { requiresAuth: true, roles: ['ADMIN'] }, component: () => import('@/views/admin/AdminScheduleView.vue') },
  { path: '/admin/pembayaran', name: 'admin-payment', meta: { requiresAuth: true, roles: ['ADMIN'] }, component: () => import('@/views/admin/AdminPaymentView.vue') },
]
