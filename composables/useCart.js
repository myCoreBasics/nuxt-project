// composables/useCart.js
export const useCart = () => {
  const cart = useState('cart', () => [])

  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
  }

  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      }
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  }
}