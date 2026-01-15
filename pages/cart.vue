<!-- pages/cart.vue -->
<template>
  <div>
    <h1 class="page-title">🛒 장바구니</h1>

    <!-- 빈 장바구니 -->
    <div v-if="cart.length === 0" class="empty-cart">
      <p>😔 장바구니가 비어있습니다</p>
      <NuxtLink to="/" class="shop-btn">쇼핑 계속하기</NuxtLink>
    </div>

    <!-- 장바구니 아이템 -->
    <div v-else class="cart-container">
      <div class="cart-items">
        <div
          v-for="item in cart"
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.thumbnail" :alt="item.title" class="item-image" />
          
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-price">${{ item.price }} × {{ item.quantity }}</p>
            <p class="item-subtotal">
              소계: ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>

          <div class="item-controls">
            <div class="quantity-control">
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="remove-btn">
              🗑️ 삭제
            </button>
          </div>
        </div>
      </div>

      <!-- 주문 요약 -->
      <div class="order-summary">
        <h2>주문 요약</h2>
        
        <div class="summary-row">
          <span>상품 수:</span>
          <span>{{ cartCount }}개</span>
        </div>
        
        <div class="summary-row">
          <span>상품 금액:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        
        <div class="summary-row">
          <span>배송비:</span>
          <span>무료</span>
        </div>
        
        <hr />
        
        <div class="summary-row total">
          <span>총 금액:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>

        <button class="checkout-btn">결제하기</button>
        <button @click="clearCart" class="clear-btn">장바구니 비우기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart'

const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
</script>

<style scoped>
.page-title {
  font-size: 32px;
  margin-bottom: 30px;
  color: #2c3e50;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
}

.empty-cart p {
  font-size: 24px;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.shop-btn {
  display: inline-block;
  padding: 12px 32px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s;
}

.shop-btn:hover {
  background: #2980b9;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-title {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.item-price {
  font-size: 14px;
  color: #7f8c8d;
  margin: 4px 0;
}

.item-subtotal {
  font-size: 20px;
  font-weight: bold;
  color: #27ae60;
  margin: 8px 0 0 0;
}

.item-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-control button {
  width: 35px;
  height: 35px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s;
}

.quantity-control button:hover {
  background: #f8f9fa;
}

.quantity-control span {
  width: 50px;
  text-align: center;
  font-weight: 500;
}

.remove-btn {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: #c0392b;
}

.order-summary {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 80px;
}

.order-summary h2 {
  font-size: 24px;
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 16px;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 16px;
}

hr {
  margin: 16px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

.checkout-btn,
.clear-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.checkout-btn {
  background: #27ae60;
  color: white;
  margin-top: 20px;
}

.checkout-btn:hover {
  background: #229954;
}

.clear-btn {
  background: white;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  margin-top: 12px;
}

.clear-btn:hover {
  background: #ffe6e6;
}

@media (max-width: 768px) {
  .cart-container {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 80px 1fr;
  }
  
  .item-controls {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 12px;
  }
}
</style>