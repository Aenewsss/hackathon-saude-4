import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from "./app/lib/session"
 
const protectedRoutes = ['/profissional', '/hospital', '/paciente', '/perfil']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  const cookie = cookies().get('session')?.value    
  const session = await decrypt(cookie)
 
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}