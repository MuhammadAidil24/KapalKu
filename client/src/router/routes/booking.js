export default [
  {
    path: '/booking/penumpang',
    alias: '/formulir-reservasi-manifest',
    name: 'booking-passenger',
    meta: { requiresAuth: true },
    component: () => import('@/views/booking/BookingPassengerView.vue'),
  },
  { path: '/booking/barang', name: 'booking-cargo', meta: { requiresAuth: true }, component: () => import('@/views/booking/BookingCargoView.vue') },
  {
    path: '/riwayat',
    alias: '/riwayat-pesanan-alur-pembatalan-refund',
    name: 'booking-history',
    meta: { requiresAuth: true },
    component: () => import('@/views/booking/BookingHistoryView.vue'),
  },
]
