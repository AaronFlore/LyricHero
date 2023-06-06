import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ArtistView from '../views/ArtistView.vue'
import HowtoPlayView from '../views/HowtoPlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ArtistView
    },
    {
      path: '/howtoplay',
      component: HowtoPlayView
    },
    {
      path: '/about',
      component: AboutView
    },
    {
      path: '/leaderboard',
      component: LeaderboardView
    },
  ]
})

export default router
