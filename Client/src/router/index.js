import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Tasks from '@/components/Tasks'
import Storage from '@/components/Storage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import AddProduct from '@/components/Product/Add'
import EditProduct from '@/components/Product/Edit'
import IndexProduct from '@/components/Product/Index'
import Products from '@/components/Products'
import Profile from '@/components/Profile'
import Search from '@/components/Search'
import ProductDetail from '@/components/ProductDetail'

Vue.use(Router)


let router = new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/items',
            name: 'Hello',
            component: HelloWorld
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: Tasks
        },
        {
            path: '/storage',
            name: 'Storage',
            component: Storage
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/manage/products',
            name: 'Products',
            component: Products,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/manage/products/add',
            name: 'AddProduct',
            component: AddProduct,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/manage/products/edit/:id',
            name: 'EditProduct',
            component: EditProduct,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/productdetail/:id',
            name: 'ProductDetail',
            component: ProductDetail
        },
        {
            path: '/manage/products/index',
            name: 'IndexProduct',
            component: IndexProduct,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.prototype.$auth.isSignedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router;