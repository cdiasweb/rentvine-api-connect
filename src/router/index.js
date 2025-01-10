import { createRouter, createWebHistory } from 'vue-router';

const isLoggedIn = () => {
    return localStorage.getItem('authToken') !== null; // Example: Check for a token in localStorage
};

// Define your routes
const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true }
    },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Add a global navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        // If the route requires authentication and the user is not logged in
        next('/login'); // Redirect to the login page
    } else {
        next(); // Allow access
    }
});

export default router;
