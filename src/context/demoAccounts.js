
const DEMO_ACCOUNTS_KEY = 'techtrack-demo-accounts'

export const ADMIN_DEMO_EMAIL = 'admin@techtrack.demo'

export function getDemoAccounts() {
  try {
    const accounts = JSON.parse(
      localStorage.getItem(DEMO_ACCOUNTS_KEY) || '[]'
    )

    return Array.isArray(accounts) ? accounts : []
  } catch {
    return []
  }
}

export function findDemoAccount(email) {
  const normalizedEmail = email.trim().toLowerCase()

  return getDemoAccounts().find(
    (account) => account.email === normalizedEmail
  ) || null
}

export function saveDemoAccount(account) {
  const accounts = getDemoAccounts()
  const normalizedEmail = account.email.trim().toLowerCase()

  if (accounts.some((item) => item.email === normalizedEmail)) {
    return false
  }

  accounts.push({
    fullName: account.fullName.trim(),
    email: normalizedEmail,
    role: account.role,
    createdAt: new Date().toISOString(),
  })

  localStorage.setItem(DEMO_ACCOUNTS_KEY, JSON.stringify(accounts))

  return true
}

export function getRoleHome(role) {
  const destinations = {
    applicant: '/dashboard',
    company: '/company/dashboard',
    admin: '/admin',
  }

  return destinations[role] || '/'
}
