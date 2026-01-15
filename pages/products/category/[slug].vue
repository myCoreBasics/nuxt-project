<!-- pages/products/category/[slug].vue -->
<template>
  <div>
    <div class="category-header">
      <h1>{{ categoryTitle }}</h1>
      <p>{{ categoryDescription }}</p>
    </div>

    <!-- 로딩 -->
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>제품을 불러오는 중...</p>
    </div>

    <!-- 에러 -->
    <div v-else-if="error" class="error">
      <p>⚠️ 카테고리를 찾을 수 없습니다</p>
      <NuxtLink to="/">홈으로 돌아가기</NuxtLink>
    </div>

    <!-- 제품 목록 -->
    <div v-else class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <NuxtLink :to="`/products/${product.id}`" class="product-link">
          <div class="product-image">
            <img :src="product.thumbnail" :alt="product.title" />
          </div>
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="rating">⭐ {{ product.rating }}</div>
            <div class="price">${{ product.price }}</div>
          </div>
        </NuxtLink>
        <button @click="addToCart(product)" class="add-to-cart-btn">
          🛒 담기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../../../composables/useCart'

const route = useRoute()
const { addToCart } = useCart()

const categorySlug = route.params.slug

// 카테고리별 제품 가져오기
const { data: productsData, pending, error } = await useFetch(`https://dummyjson.com/products/category/${categorySlug}`)

const products = computed(() => productsData.value?.products || [])

const categoryTitle = computed(() => {
  return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' ')
})

const categoryDescription = computed(() => {
  const descriptions = {
    'smartphones': '최신 스마트폰을 만나보세요',
    'laptops': '고성능 노트북 컬렉션',
    'fragrances': '프리미엄 향수 라인'
  }
  return descriptions[categorySlug] || '다양한 제품을 둘러보세요'
})
</script>

<style scoped>
.category-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}

.category-header h1 {
  font-size: 32px;
  margin-bottom: 8px;
  text-transform: capitalize;
}

.category-header p {
  font-size: 16px;
  opacity: 0.9;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
}

.product-image {
  width: 100%;
  height: 200px;
  background: #f8f9fa;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 16px;
}

.product-title {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.product-description {
  color: #7f8c8d;
  font-size: 14px;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  margin: 8px 0;
  color: #f39c12;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #27ae60;
  margin-top: 8px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.add-to-cart-btn:hover {
  background: #2980b9;
}
</style>