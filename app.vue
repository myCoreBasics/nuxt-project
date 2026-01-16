<!-- app.vue -->
<template>
  <div>
    <nav class="navbar">
      <div class="nav-container">
        <NuxtLink to="/" class="logo">
          🛒 MyShop
        </NuxtLink>

        <!-- 로그인 안 했을 때 -->
        <div v-if="!user" class="nav-links">
          <NuxtLink to="/login" class="nav-link">로그인</NuxtLink>
        </div>
        
        <!-- 로그인 했을 때 -->
        <div v-else class="nav-links">
          <NuxtLink to="/">홈</NuxtLink>
          <button @click="handleLogout" class="logout-btn">
            로그아웃
          </button>

          <!-- Board 드롭다운 -->
          <div class="dropdown">
            <span class="dropdown-title">Board</span>
            <div class="dropdown-menu">
              <NuxtLink to="/board/list">게시판</NuxtLink>
            </div>
          </div>

          <!-- Shop 드롭다운 -->
          <div class="dropdown">
            <span class="dropdown-title">Shop</span>
            <div class="dropdown-menu">
              <NuxtLink to="/products/category/smartphones">스마트폰</NuxtLink>
              <NuxtLink to="/products/category/laptops">노트북</NuxtLink>
              <NuxtLink to="/products/category/fragrances">향수</NuxtLink>
            </div>
          </div>

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
const router = useRouter()

const user = useCookie('user_name')
const authToken = useCookie('auth_token')

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' });
  const authToken = useCookie('auth_token');
  const userIdCookie = useCookie('user_id');
  const userNameCookie = useCookie('user_name');
  authToken.value = null;
  userIdCookie.value = null;
  userNameCookie.value = null;
  router.push('/');
};

const { cartCount } = useCart()
// 로그인 사용자 이름 (쿠키)
const userName = useCookie('user_name')
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

.logout-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;

  font: inherit;
  color: #2c3e50;
  font-weight: 500;

  cursor: pointer;
  transition: color 0.3s;
}

.logout-btn:hover {
  color: #3498db;
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

.user-info {
  color: #666;
  font-size: 14px;
}

/* 드롭다운 공통 */
.dropdown {
  position: relative;
}

.dropdown-title {
  cursor: pointer;
  font-weight: 500;
  color: #2c3e50;
}

.dropdown-title:hover {
  color: #3498db;
}

/* 드롭다운 전체 wrapper */
.dropdown {
  position: relative;
  cursor: pointer;
}

/* 드롭다운 타이틀 */
.dropdown-title {
  font-weight: 500;
  display: inline-block;
  padding: 8px 12px;
}

/* 드롭다운 메뉴 */
.dropdown-menu {
  position: absolute;
  top: 100%; /* 타이틀 바로 아래 */
  left: 0;
  background: white;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 6px;
  display: none;
  flex-direction: column;
  z-index: 200;
  margin-top: 4px; /* 약간 간격 */
}

/* 링크 스타일 */
.dropdown-menu a {
  padding: 10px 14px;
  text-decoration: none;
  color: #2c3e50;
  white-space: nowrap;
}

/* 링크 hover */
.dropdown-menu a:hover {
  background: #f0f4ff;
  color: #3498db;
}

/* hover 시 메뉴 표시 */
.dropdown:hover .dropdown-menu {
  display: flex;
}

/* 메뉴 영역까지 hover 유지 */
.dropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 10px; /* 메뉴와 타이틀 사이 마우스 끊김 방지 */
}


</style>