export type ContactPreference = "chat-email" | "chat" | "email"

export type Preferences = {
  username: string
  emailPrivate: boolean
  contactPreference: ContactPreference
  language: "English" | "Filipino"
  homeLocation: string
  searchLocation: string
  defaultHomepage: string
  hideSold: boolean
  showRatings: boolean
}

export const defaultPreferences: Preferences = {
  username: "",
  emailPrivate: true,
  contactPreference: "chat-email",
  language: "English",
  homeLocation: "Manila",
  searchLocation: "Anywhere",
  defaultHomepage: "Home",
  hideSold: false,
  showRatings: true,
}

const asString = (value: unknown, fallback: string) =>
  typeof value === "string" ? value : fallback

const asBoolean = (value: unknown, fallback: boolean) =>
  typeof value === "boolean" ? value : fallback

const asContact = (value: unknown): ContactPreference =>
  value === "chat" || value === "email" || value === "chat-email"
    ? value
    : defaultPreferences.contactPreference

const asLanguage = (value: unknown): Preferences["language"] =>
  value === "Filipino" ? "Filipino" : "English"

export function loadPreferences(): Preferences {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem("craigslist-settings") ?? "null",
    )
    if (!stored || typeof stored !== "object") return defaultPreferences
    const source = stored as Record<string, unknown>
    return {
      username: asString(source.username, defaultPreferences.username),
      emailPrivate: asBoolean(
        source.emailPrivate,
        defaultPreferences.emailPrivate,
      ),
      contactPreference: asContact(source.contactPreference),
      language: asLanguage(source.language),
      homeLocation: asString(
        source.homeLocation,
        defaultPreferences.homeLocation,
      ),
      searchLocation: asString(
        source.searchLocation,
        defaultPreferences.searchLocation,
      ),
      defaultHomepage: asString(
        source.defaultHomepage,
        defaultPreferences.defaultHomepage,
      ),
      hideSold: asBoolean(source.hideSold, defaultPreferences.hideSold),
      showRatings: asBoolean(source.showRatings, defaultPreferences.showRatings),
    }
  } catch {
    return defaultPreferences
  }
}

export function savePreferences(preferences: Preferences) {
  localStorage.setItem("craigslist-settings", JSON.stringify(preferences))
}
