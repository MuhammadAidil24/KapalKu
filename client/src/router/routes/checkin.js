export default [
  { path: '/tiket/:bookingCode', name: 'ticket', meta: { requiresAuth: true }, component: () => import('@/views/checkin/TicketView.vue') },
  { path: '/petugas/scan', name: 'scan-checkin', meta: { requiresAuth: true, roles: ['PETUGAS', 'ADMIN'] }, component: () => import('@/views/checkin/ScanCheckinView.vue') },
]
