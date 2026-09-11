import { auth } from "@/auth"

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isOnLogin = req.nextUrl.pathname.startsWith('/login');

  // Both ADMIN and SUPER_ADMIN have full admin panel access
  const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';

  if (isOnAdmin) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/login', req.nextUrl));
    }
    if (!isAdmin) {
      return Response.redirect(new URL('/family-tree', req.nextUrl));
    }
  }

  if (isOnLogin && isLoggedIn) {
    if (isAdmin) {
      return Response.redirect(new URL('/admin/family-tree', req.nextUrl));
    } else {
      return Response.redirect(new URL('/family-tree', req.nextUrl));
    }
  }
})

// Optionally, don't invoke Proxy on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}