<!-- pages/products/[id].vue -->
<template>
  <div>
    <button @click="$router.back()" class="back-btn">
      ← 목록으로
    </button>

    <!-- 로딩 -->
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>제품 정보를 불러오는 중...</p>
    </div>

    <!-- 에러 -->
    <div v-else-if="error" class="error">
      <p>⚠️ 제품을 찾을 수 없습니다</p>
      <NuxtLink to="/">홈으로 돌아가기</NuxtLink>
    </div>

    <!-- 제품 상세 -->
    <div v-else-if="product" class="product-detail">
      <div class="product-images">
        <div class="main-image">
          <img :src="selectedImage" :alt="product.title" />
        </div>
        <div class="thumbnail-list">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            :class="{ active: selectedImage === img }"
            @click="selectedImage = img"
            class="thumbnail"
          />
        </div>
      </div>

      <div class="product-details">
        <div class="breadcrumb">
          <NuxtLink to="/">홈</NuxtLink> / 
          <NuxtLink :to="`/products/category/${product.category}`">
            {{ product.category }}
          </NuxtLink> / 
          {{ product.title }}
        </div>

        <h1 class="title">{{ product.title }}</h1>
        
        <div class="rating-section">
          <span class="rating">⭐ {{ product.rating }}</span>
          <span class="stock">{{ product.stock }}개 재고</span>
        </div>

        <p class="description">{{ product.description }}</p>

        <div class="price-section">
          <div class="current-price">${{ product.price }}</div>
          <div v-if="product.discountPercentage > 0" class="discount-info">
            <span class="original-price">
              ${{ Math.round(product.price / (1 - product.discountPercentage / 100)) }}
            </span>
            <span class="discount-badge">
              {{ Math.round(product.discountPercentage) }}% 할인
            </span>
          </div>
        </div>

        <div class="info-table">
          <div class="info-row">
            <span class="label">브랜드:</span>
            <span class="value">{{ product.brand }}</span>
          </div>
          <div class="info-row">
            <span class="label">카테고리:</span>
            <span class="value">{{ product.category }}</span>
          </div>
          <div class="info-row">
            <span class="label">무게:</span>
            <span class="value">{{ product.weight }}g</span>
          </div>
          <div class="info-row">
            <span class="label">재고:</span>
            <span class="value">{{ product.stock }}개</span>
          </div>
        </div>

        <div class="quantity-section">
          <label>수량:</label>
          <div class="quantity-control">
            <button @click="quantity > 1 && quantity--">-</button>
            <input v-model.number="quantity" type="number" min="1" :max="product.stock" />
            <button @click="quantity < product.stock && quantity++">+</button>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="handleAddToCart" class="add-to-cart-btn">
            🛒 장바구니에 {{ quantity }}개 담기
          </button>
          <button class="buy-now-btn">
            💳 바로 구매
          </button>
        </div>

        <div v-if="addedToCart" class="success-message">
          ✅ 장바구니에 추가되었습니다!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../../composables/useCart'

const route = useRoute()
const { addToCart } = useCart()

const quantity = ref(1)
const selectedImage = ref('')
const addedToCart = ref(false)

// 제품 상세 정보 가져오기
const { data: product, pending, error } = await useFetch(`https://dummyjson.com/products/${route.params.id}`, {
  transform: (data) => {
    selectedImage.value = data.thumbnail
    return data
  }
})

function handleAddToCart() {
  for (let i = 0; i < quantity.value; i++) {
    addToCart(product.value)
  }
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 3000)
}

// SEO를 위한 메타 태그
useHead({
  title: computed(() => product.value?.title || '제품 상세'),
  meta: [
    { name: 'description', content: computed(() => product.value?.description) }
  ]
})
</script>

<style scoped>
.back-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 14px;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #f8f9fa;
  border-color: #3498db;
  color: #3498db;
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

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image {
  width: 100%;
  height: 500px;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: #3498db;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.breadcrumb {
  font-size: 14px;
  color: #7f8c8d;
}

.breadcrumb a {
  color: #3498db;
  text-decoration: none;
}

.title {
  font-size: 32px;
  color: #2c3e50;
  margin: 0;
}

.rating-section {
  display: flex;
  gap: 20px;
  align-items: center;
}

.rating {
  font-size: 18px;
  color: #f39c12;
}

.stock {
  padding: 6px 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 20px;
  font-size: 14px;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.price-section {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.current-price {
  font-size: 36px;
  font-weight: bold;
  color: #27ae60;
}

.discount-info {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
}

.original-price {
  font-size: 20px;
  color: #95a5a6;
  text-decoration: line-through;
}

.discount-badge {
  background: #e74c3c;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
}

.info-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.info-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 600;
  color: #555;
}

.info-row .value {
  color: #2c3e50;
  text-transform: capitalize;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-control button {
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.3s;
}

.quantity-control button:hover {
  background: #f8f9fa;
}

.quantity-control input {
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.add-to-cart-btn,
.buy-now-btn {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-to-cart-btn {
  background: #3498db;
  color: white;
}

.add-to-cart-btn:hover {
  background: #2980b9;
}

.buy-now-btn {
  background: #27ae60;
  color: white;
}

.buy-now-btn:hover {
  background: #229954;
}

.success-message {
  padding: 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  animation: slideIn 0.3s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}
</style>