import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { AxiosError } from 'axios'

import { Spinner } from '@/components/ui/Spinner'
import { AUTO_REFRESH_INTERVAL, IDLE_TIMEOUT } from '@/config'
import {
  AuthResponse,
  AuthUser,
  LoginCredentialDTO,
  loginWithIndentificationAndPassword,
  refreshTokenWithTokenAndRefreshToken,
} from '@/features/auth'
import storage from '@/utils/storage'

export interface AuthError {
  status: number
  message: string
  cause?: AxiosError
}

export interface AuthContextInterface {
  initialLoading: boolean
  user: AuthUser | null
  isLoggingIn: boolean
  isAuthenticated: boolean
  error: AuthError | null
  login: (data: LoginCredentialDTO) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextInterface)
export const useAuth = () => useContext(AuthContext)

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth()
  if (auth.initialLoading)
    return (
      <div className='flex justify-center items-center gap-2'>
        <Spinner />
        <p>Comprobando sesión</p>
      </div>
    )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// TODO: Improve error
const useProvideAuth = (): AuthContextInterface => {
  const refreshTokenIntervalIdRef = useRef<ReturnType<typeof setInterval>>()

  const [initialLoading, setInitialLoading] = useState(true)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [error, setError] = useState<AuthError | null>(null)

  const handleUserResponse = useCallback((authResponse: AuthResponse) => {
    const { token, refreshToken, ...user } = authResponse
    storage.setToken(token)
    storage.setRefreshToken(refreshToken)

    return user
  }, [])

  const handlerResquestError = useCallback((error: any) => {
    const status = error?.response?.status as number
    const message = 'Hemos tenido un error inesperado, vuelve a intentar'

    setError({
      status,
      message,
      cause: error,
    })
  }, [])

  const handleLoginError = useCallback((error: any) => {
    const statusMessages = {
      400: 'Usuario o contraseña incorrecta',
      500: 'Hemos tenido un error en el servidor, vuelve a intentar',
    }

    const status = error?.response?.status as number
    const message =
      (statusMessages as any)[status] ?? 'Hemos tenido un error inesperado, vuelve a intentar'

    setError({
      status,
      message,
      cause: error,
    })
  }, [])

  const login = useCallback(
    async (data: LoginCredentialDTO) => {
      storage.clearCredentials()
      setUser(null)
      setError(null)
      setIsLoggingIn(true)

      try {
        const res = await loginWithIndentificationAndPassword(data)
        const authUser = handleUserResponse(res.data)
        setUser(authUser)
        setIsAuthenticated(true)

        subscribeRefreshToken()
      } catch (error: any) {
        setIsAuthenticated(false)
        handleLoginError(error)
        throw new Error(error)
      } finally {
        setIsLoggingIn(false)
      }
    },
    [setUser, setError, setIsLoggingIn]
  )

  const refreshTokenFn = useCallback(async () => {
    try {
      const res = await refreshTokenWithTokenAndRefreshToken({
        token: storage.getToken(),
        refreshToken: storage.getRefreshToken(),
      })

      const user = handleUserResponse(res.data)
      setUser(user)
      setIsAuthenticated(true)
    } catch (error: any) {
      storage.clearCredentials()

      setUser(null)
      setIsAuthenticated(false)
      handlerResquestError(error)
      unsubscribeRefreshToken()
    }
  }, [])

  const logout = useCallback(async () => {
    storage.clearCredentials()
    setIsAuthenticated(false)
    setUser(null)
    setError(null)
  }, [])

  const subscribeRefreshToken = useCallback(() => {
    if (!refreshTokenIntervalIdRef.current) {
      refreshTokenIntervalIdRef.current = setInterval(handleAutoRefreshToken, AUTO_REFRESH_INTERVAL)
    }
  }, [refreshTokenIntervalIdRef])

  const unsubscribeRefreshToken = useCallback(() => {
    if (refreshTokenIntervalIdRef.current) {
      clearInterval(refreshTokenIntervalIdRef.current)
      refreshTokenIntervalIdRef.current = undefined
    }
  }, [refreshTokenIntervalIdRef])

  const handleAutoRefreshToken = useCallback(() => {
    const { refreshToken, token } = storage.getCredentials()
    if (!refreshToken || !token) return

    refreshTokenFn()
  }, [])

  const loadUserIfHasSession = useCallback(async () => {
    const { refreshToken, token } = storage.getCredentials()
    if (!refreshToken || !token) return setInitialLoading(false)

    subscribeRefreshToken()
    setIsLoggingIn(true)
    setInitialLoading(true)
    await refreshTokenFn()
    setIsLoggingIn(false)
    setInitialLoading(false)
  }, [])

  useIdleTimer({
    onActive: () => loadUserIfHasSession(),
    onIdle: () => unsubscribeRefreshToken(),
    timeout: IDLE_TIMEOUT,
  })

  useEffect(() => {
    loadUserIfHasSession()

    return () => clearInterval(refreshTokenIntervalIdRef.current)
  }, [])

  return {
    initialLoading,
    isAuthenticated,
    isLoggingIn,
    user,
    error,
    login,
    logout,
  }
}
