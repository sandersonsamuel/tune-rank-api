# 🔐 Guia de Autenticação — Frontend

Guia completo de como integrar a autenticação desta API em um frontend React (Vite, Next.js, etc).

## Visão Geral

A API usa **JWT com cookies `httpOnly`**. Isso significa que:

- O frontend **nunca manipula tokens diretamente** — eles ficam nos cookies
- O browser **envia os cookies automaticamente** a cada request
- A validação é **sempre feita pelo servidor** (middleware `jwt-handler`)

```
Login → API seta cookies httpOnly (accessToken + refreshToken)
     → Frontend chama GET /auth/me (cookie vai automaticamente)
     → Dados do user são cacheados no client
     → Qualquer componente acessa o user via hook
```

---

## 1. Pré-requisitos

### Instalar dependências

```bash
npm install @tanstack/react-query
# ou
pnpm add @tanstack/react-query
```

### Configurar o QueryClientProvider

```tsx
// src/main.tsx (Vite) ou src/app/providers.tsx (Next.js)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

## 2. Configurar o Fetch Base

Crie um módulo utilitário que configura requests com `credentials: 'include'` (obrigatório para enviar cookies cross-origin) e faz **refresh automático** quando o access token expira.

```ts
// src/lib/api.ts

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export async function api<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  let res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include', // ← ESSENCIAL: envia os cookies
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  // Se recebeu 401, tenta renovar o token automaticamente
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })

    if (refreshRes.ok) {
      // Token renovado — repete o request original
      res = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })
    } else {
      // Refresh falhou — sessão expirou
      throw new AuthError('Session expired')
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body.message ?? 'Request failed')
  }

  return res.json()
}

// Erros tipados
export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
```

---

## 3. Hook `useUser` — Acessar o Usuário

Este é o hook principal. Ele chama `GET /auth/me` para validar a sessão no servidor e cacheia o resultado no client.

```ts
// src/hooks/use-user.ts
import { useQuery } from '@tanstack/react-query'
import { api, AuthError } from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export function useUser() {
  const query = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => api<User>('/auth/me'),
    retry: false,
    staleTime: 1000 * 60 * 5,   // 5 min — não refaz a request se os dados são "frescos"
    gcTime: 1000 * 60 * 30,     // 30 min — mantém no cache mesmo sem observers
  })

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
    isError: query.isError,
    error: query.error,
  }
}
```

> **Por que `staleTime: 5min`?**
> Isso significa que o `GET /auth/me` só é chamado **1 vez a cada 5 minutos**, independente de quantas vezes o hook é usado. Sem load significativo no servidor.

---

## 4. Hook `useLogin`

```ts
// src/hooks/use-login.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface LoginData {
  email: string
  password: string
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginData) =>
      api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Após login, invalida o cache do user para forçar um GET /me
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
```

---

## 5. Hook `useRegister`

```ts
// src/hooks/use-register.ts
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface RegisterData {
  name: string
  email: string
  password: string
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) =>
      api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  })
}
```

---

## 6. Hook `useLogout`

```ts
// src/hooks/use-logout.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      api('/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      // Limpa o cache do user
      queryClient.setQueryData(['user'], null)
      queryClient.removeQueries({ queryKey: ['user'] })

      // Redireciona pro login
      window.location.href = '/login'
    },
  })
}
```

---

## 7. Proteger Rotas

### Componente `ProtectedRoute`

```tsx
// src/components/protected-route.tsx
import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/use-user'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUser()

  if (isLoading) {
    return <LoadingSkeleton />  // Seu componente de loading
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

### Uso no Router

```tsx
// src/router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/components/protected-route'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## 8. Exemplo Completo — Página de Login

```tsx
// src/pages/login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks/use-login'
import { useUser } from '@/hooks/use-user'

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useUser()
  const login = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Se já está autenticado, redireciona
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    login.mutate(
      { email, password },
      {
        onSuccess: () => navigate('/dashboard'),
        onError: (err) => alert(err.message),
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

---

## 9. Usando o User em Qualquer Componente

```tsx
// Em qualquer lugar da app
import { useUser } from '@/hooks/use-user'

function Header() {
  const { user, isAuthenticated } = useUser()
  const logout = useLogout()

  if (!isAuthenticated) return null

  return (
    <header>
      <span>Olá, {user.name}</span>
      <button onClick={() => logout.mutate()}>Sair</button>
    </header>
  )
}
```

---

## 10. Adaptação para Next.js (App Router)

Se o frontend é Next.js com App Router, os **Server Components** não têm acesso ao React Query. Use esta abordagem:

### Server Component (SSR)

```tsx
// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getUser() {
  const cookieStore = await cookies()

  const res = await fetch('http://localhost:4000/auth/me', {
    headers: { Cookie: cookieStore.toString() },
    cache: 'no-store',
  })

  if (!res.ok) return null
  return res.json()
}

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) redirect('/login')

  return (
    <div>
      <h1>Bem-vindo, {user.name}</h1>
      {/* Client Components recebem o user como prop */}
      <DashboardClient user={user} />
    </div>
  )
}
```

### Client Component (interatividade)

```tsx
// app/dashboard/dashboard-client.tsx
'use client'
import { useUser } from '@/hooks/use-user'

// Pode usar useUser() normalmente em Client Components
// O Server Component cuida do primeiro render (SSR)
// O Client Component mantém os dados atualizados via React Query
```

### Middleware Next.js (opcional)

Para proteger rotas no nível do middleware:

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Nota: aqui só verifica se o cookie EXISTE.
  // A validação real é feita pela API no GET /me.
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
```

---

## Referência Rápida dos Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/auth/register` | ❌ | Cria novo usuário |
| `POST` | `/auth/login` | ❌ | Faz login, seta cookies |
| `POST` | `/auth/logout` | ✅ | Faz logout, limpa cookies e sessão |
| `POST` | `/auth/refresh` | ✅ | Renova o access token |
| `GET`  | `/auth/me` | ✅ | Retorna dados do usuário logado |

---

## Checklist de Configuração

- [ ] API com `cors({ origin: 'http://seudominio.com', credentials: true })`
- [ ] Todos os fetches com `credentials: 'include'`
- [ ] `QueryClientProvider` wrapping a app
- [ ] Hook `useUser` criado
- [ ] Hook `useLogin` com `invalidateQueries(['user'])` no `onSuccess`
- [ ] Hook `useLogout` com `removeQueries(['user'])` no `onSuccess`
- [ ] `ProtectedRoute` protegendo rotas privadas
- [ ] Fetch wrapper com refresh automático de token
