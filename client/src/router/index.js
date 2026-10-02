// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [],
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth
    { path: '/login', name: 'login', component: () => import('@/views/auth/LoginView.vue') },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
    },

    // Jadwal
    {
      path: '/',
      name: 'search-schedule',
      component: () => import('@/views/schedule/SearchScheduleView.vue'),
    },

    // Booking
    {
      path: '/booking/penumpang',
      name: 'booking-passenger',
      component: () => import('@/views/booking/BookingPassengerView.vue'),
    },
    {
      path: '/booking/barang',
      name: 'booking-cargo',
      component: () => import('@/views/booking/BookingCargoView.vue'),
    },
    {
      path: '/riwayat',
      name: 'booking-history',
      component: () => import('@/views/booking/BookingHistoryView.vue'),
    },

    // Payment
    {
      path: '/pembayaran/:bookingCode',
      name: 'payment',
      component: () => import('@/views/payment/PaymentView.vue'),
    },

    // Check-in / QR
    {
      path: '/tiket/:bookingCode',
      name: 'ticket',
      component: () => import('@/views/checkin/TicketView.vue'),
    },
    {
      path: '/petugas/scan',
      name: 'scan-checkin',
      component: () => import('@/views/checkin/ScanCheckinView.vue'),
    },

    // Admin
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('@/views/admin/AdminDashboardView.vue'),
    },
    {
      path: '/admin/jadwal',
      name: 'admin-schedule',
      component: () => import('@/views/admin/AdminScheduleView.vue'),
    },
    {
      path: '/admin/pembayaran',
      name: 'admin-payment',
      component: () => import('@/views/admin/AdminPaymentView.vue'),
    },
  ],
})

export default router
