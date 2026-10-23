import { useEffect, useState } from 'react'
import SavedOpportunitiesContext from './SavedOpportunitiesContext'

function SavedOpportunitiesProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(
        'techtrack-saved-opportunities'
      )

      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'techtrack-saved-opportunities',
      JSON.stringify(savedIds)
    )
  }, [savedIds])

  function toggleSaved(id) {
    setSavedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((savedId) => savedId !== id)
        : [...currentIds, id]
    )
  }

  return (
    <SavedOpportunitiesContext.Provider
      value={{ savedIds, toggleSaved }}
    >
      {children}
    </SavedOpportunitiesContext.Provider>
  )
}

export default SavedOpportunitiesProvider