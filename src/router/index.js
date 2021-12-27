import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home.vue'
import boardApp from '../pages/board-app.vue'
import boardDetails from '../pages/board-details.vue'
import itemDetails from '../pages/item-details.vue'
import loginSignup from '../pages/login-signup.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/login',
        name: 'Login',
        component: loginSignup
    },
    {
        path: '/board',
        name: 'boardApp',
        component: boardApp,
        children: [{
            path: ':boardId',
            component: boardDetails,
            children:[{
                path: 'item/:itemId',
                component: itemDetails,
            }]
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router