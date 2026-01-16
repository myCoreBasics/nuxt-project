// composables/useAuth.js
export const useAuth = () => {
  const user = useState('user', () => null) // 로그인 정보 저장
  const isLoggedIn = computed(() => !!user.value)

  const login = (userData) => {
    user.value = userData
  }

  const logout = () => {
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
}
