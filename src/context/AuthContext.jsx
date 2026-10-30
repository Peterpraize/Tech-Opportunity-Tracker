
  import { useEffect, useState } from 'react'
  import { AuthContext } from './AuthContextValue.js'

  const SESSION_KEY = 'techtrack-demo-session'


  function readSession() {
    try {
      const storedSession = sessionStorage.getItem(SESSION_KEY)

      if (!storedSession) {
        return null
      }

      const session = JSON.parse(storedSession)

      if (
        !session ||
        typeof session.email !== 'string' ||
        typeof session.fullName !== 'string' ||
        !session.email.trim() ||
        !session.fullName.trim()
      ) {
        sessionStorage.removeItem(SESSION_KEY)
        return null
      }

      return session
    } catch {
      return null
    }
  }

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => readSession())

    useEffect(() => {
      if (user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
      } else {
        sessionStorage.removeItem(SESSION_KEY)
      }
    }, [user])

    function startDemoSession(profile) {
      const nextUser = {
        fullName: profile.fullName.trim(),
        email: profile.email.trim().toLowerCase(),
        role: profile.role || 'applicant',
      }

      setUser(nextUser)

      return nextUser
    }

    function logout() {
      setUser(null)
    }

    const value = {
      user,
      isAuthenticated: Boolean(user),
      startDemoSession,
      logout,
    }

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  }

