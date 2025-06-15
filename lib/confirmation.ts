export const CONFIRMATION_PAGES = ["our-story", "wish", "my-wish", "special-invitation"] as const
export type ConfirmationPage = (typeof CONFIRMATION_PAGES)[number]

// Check if a specific page is confirmed
export function isPageConfirmed(page: ConfirmationPage): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(`confirmed_${page}`) === "true"
}

// Confirm a specific page
export function confirmPage(page: ConfirmationPage): void {
  if (typeof window === "undefined") return
  localStorage.setItem(`confirmed_${page}`, "true")

  // Dispatch a custom event to notify other components
  window.dispatchEvent(new CustomEvent("confirmationUpdate", { detail: { page } }))
}

// Check if all pages are confirmed
export function areAllPagesConfirmed(): boolean {
  if (typeof window === "undefined") return false
  return CONFIRMATION_PAGES.every((page) => isPageConfirmed(page))
}

// Reset all confirmations (for testing)
export function resetAllConfirmations(): void {
  if (typeof window === "undefined") return
  CONFIRMATION_PAGES.forEach((page) => {
    localStorage.removeItem(`confirmed_${page}`)
  })
}
