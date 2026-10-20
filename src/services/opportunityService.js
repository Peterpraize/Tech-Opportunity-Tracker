
export async function getOpportunities() {
  const response = await fetch('/opportunities.json')

  if (!response.ok) {
    throw new Error('Unable to load opportunities. Please try again.')
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('The opportunity data is not in the expected format.')
  }

  return data
}
