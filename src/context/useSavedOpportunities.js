import { useContext } from 'react'
import SavedOpportunitiesContext from './SavedOpportunitiesContext'

export function useSavedOpportunities() {
  const context = useContext(SavedOpportunitiesContext)

  if (!context) {
    throw new Error(
      'useSavedOpportunities must be used inside SavedOpportunitiesProvider'
    )
  }

  return context
}