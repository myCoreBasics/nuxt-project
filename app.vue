<!-- app.vue -->
<template>
  <div>
    <nav class="navbar">
      <div class="nav-container">
        <NuxtLink to="/" class="logo">
          🛒 MyShop
        </NuxtLink>
        
        <div class="nav-links">
          <NuxtLink to="/">홈</NuxtLink>
          <NuxtLink to="/products/category/smartphones">스마트폰</NuxtLink>
          <NuxtLink to="/products/category/laptops">노트북</NuxtLink>
          <NuxtLink to="/products/category/fragrances">향수</NuxtLink>
          <NuxtLink to="/cart" class="cart-link">
            🛒 장바구니 <span class="cart-count">{{ cartCount }}</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>© 2026 MyShop - Nuxt 3 Data Fetching 예제</p>
    </footer>
  </div>
</template>

<script setup>
import { useCart } from './composables/useCart'

const { cartCount } = useCart()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
}

.nav-links a:hover {
  color: #3498db;
}

.nav-links a.router-link-active {
  color: #3498db;
  border-bottom: 2px solid #3498db;
}

.cart-link {
  position: relative;
  padding: 8px 16px;
  background: #3498db;
  color: white !important;
  border-radius: 20px;
}

.cart-link:hover {
  background: #2980b9;
  color: white !important;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
}

.main-content {
  min-height: calc(100vh - 140px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}
</style>