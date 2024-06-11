import { boot } from 'quasar/wrappers';
import {useAuthStore} from 'stores/auth.store'

export default boot(({ router }) => {
  router.beforeEach((to,from,next)=>{
    const authStore = useAuthStore()
    if(to.meta.requiredsAuth && !authStore.isAuthenticated()){
      next('/login')
    }
    next()
  })
});
