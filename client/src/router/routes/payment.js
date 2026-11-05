export default [
  { path: '/pembayaran/:bookingCode', name: 'payment', meta: { requiresAuth: true }, component: () => import('@/views/payment/PaymentView.vue') },
]
