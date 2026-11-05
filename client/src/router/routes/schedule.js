export default [
  {
    path: '/',
    alias: '/beranda-pencarian-tiket-kapal',
    name: 'search-schedule',
    component: () => import('@/views/schedule/SearchScheduleView.vue'),
  },
  {
    path: '/jadwal/hasil',
    alias: '/hasil-pencarian-jadwal-kapal',
    name: 'schedule-result',
    component: () => import('@/views/schedule/ScheduleResultView.vue'),
  },
]
