export default defineEventHandler(async (event) => {
  // Session 삭제 (Nuxt3 방식)
  try {
    const session = await useSession(event, {
      password: useRuntimeConfig().sessionSecret
    });
    await session.clear();
  } catch (error) {
    console.log('Session clear error:', error.message);
  }
  
  // 모든 쿠키 삭제 (기존 방식 유지)
  deleteCookie(event, 'auth_token');
  deleteCookie(event, 'user_name');
  deleteCookie(event, 'user_id');
  
  return {
    success: true,
    message: '로그아웃되었습니다.'
  };
});