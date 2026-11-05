import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import auth from './routes/auth'
import schedule from './routes/schedule'
import booking from './routes/booking'
import payment from './routes/payment'
import checkin from './routes/checkin'
import admin from './routes/admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...auth, ...schedule, ...booking, ...payment, ...checkin, ...admin],
})

// Penjaga halaman: wajib login dan sesuai role
router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) return { name: 'login' }
  if (to.meta.roles && !to.meta.roles.includes(authStore.role)) return { name: 'search-schedule' }
})

export default router
