import CategoryForm from "@/components/CategoryForm.vue";
import ProductForm from "@/components/ProductForm.vue";
import Categories from "@/pages/Categories.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Login.vue";
import Product from "@/pages/Product.vue";
import Register from "@/pages/Register.vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";


const routes : RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth: true}
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories,
        meta: {requiresAuth: true}
    },
    {
        path: '/categories/form',
        name: 'Add Form',
        component: CategoryForm,
        meta: {requiresAuth: true}
    },
    {
        path: '/categories/form/:id?',
        name: 'Edit Form',
        component: CategoryForm,
        meta: {requiresAuth: true}
    },
    {
        path: '/products',
        name: 'Products',
        component: Product,
        meta: { requiresAuth: true }
    },
    
    {
        path: '/products/form',
        name: 'Add Product',
        component: ProductForm,
        meta: { requiresAuth: true }
    },
    
    {
        path: '/products/form/:id?',
        name: 'Update Product',
        component: ProductForm,
        meta: { requiresAuth: true }
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && !token)
        return next({name : 'Login'});
    next();
})

export default router;


