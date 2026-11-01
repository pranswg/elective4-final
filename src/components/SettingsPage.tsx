import { FormEvent, useState } from "react"
import Icon from "./Icon"
import PasswordInput from "./PasswordInput"
import type { ContactPreference, Preferences } from "../preferences"

type SettingsAccount = {
  name: string
  email: string
  since?: string
}

type Session = {
  id: number
  device: string
  location: string
  lastActive: string
  current: boolean
}

type ConfirmAction = {
  title: string
  body: string
  confirmLabel: string
  run: () => void
}

const initialSessions: Session[] = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "Manila, Philippines",
    lastActive: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "Quezon City, Philippines",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 3,
    device: "Chrome on Android",
    location: "Makati, Philippines",
    lastActive: "Yesterday",
    current: false,
  },
]

const contactChoices: { value: ContactPreference; label: string }[] = [
  { value: "chat-email", label: "Chat and email" },
  { value: "chat", label: "Chat only" },
  { value: "email", label: "Email only" },
]

const sectionLinks = [
  ["Account information", "settings-account"],
  ["Privacy", "settings-privacy"],
  ["Security", "settings-security"],
  ["Preferences", "settings-preferences"],
  ["Account management", "settings-management"],
]

function SettingsPage({
  account,
  preferences,
  cities,
  homepages,
  favoritesCount,
  onBack,
  onSaveProfile,
  onUpdatePreferences,
  onChooseCity,
  onOpenFavorites,
  onOpenHelp,
  onSignOut,
  onDeactivate,
  onDeleteData,
  onDownloadData,
  onToast,
}: {
  account: SettingsAccount
  preferences: Preferences
  cities: string[]
  homepages: string[]
  favoritesCount: number
  onBack: () => void
  onSaveProfile: (
    profile: { name: string; email: string },
    username: string,
  ) => void
  onUpdatePreferences: (patch: Partial<Preferences>) => void
  onChooseCity: (city: string) => void
  onOpenFavorites: () => void
  onOpenHelp: () => void
  onSignOut: () => void
  onDeactivate: () => void
  onDeleteData: () => void
  onDownloadData: () => void
  onToast: (message: string) => void
}) {
  const fallbackUsername =
    account.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "user"
  const username = preferences.username || fallbackUsername
  const created = account.since ? new Date(account.since) : null
  const memberSince =
    created && !Number.isNaN(created.getTime())
      ? created.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "November 2, 2026"
  const initials = account.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")

  const [editing, setEditing] = useState(false)
  const [changingEmail, setChangingEmail] = useState(false)
  const [draft, setDraft] = useState({
    name: account.name,
    email: account.email,
    username,
  })
  const [profileError, setProfileError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [confirm, setConfirm] = useState<ConfirmAction | null>(null)
  const otherSessions = sessions.filter((session) => !session.current).length

  const startEditing = () => {
    setDraft({
      name: account.name,
      email: account.email,
      username: preferences.username || fallbackUsername,
    })
    setChangingEmail(false)
    setProfileError("")
    setEditing(true)
  }

  const cancelEditing = () => {
    setEditing(false)
    setChangingEmail(false)
    setProfileError("")
  }

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = draft.name.trim()
    const email = draft.email.trim()
    const nextUsername = draft.username.trim()
    if (!name) {
      setProfileError("Enter your name.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError("Enter a valid email address.")
      return
    }
    if (!/^[a-z0-9_]{3,20}$/i.test(nextUsername)) {
      setProfileError(
        "Username must be 3–20 letters, numbers, or underscores.",
      )
      return
    }
    onSaveProfile({ name, email }, nextUsername)
    setEditing(false)
    setChangingEmail(false)
    setProfileError("")
    onToast("Account information updated")
  }

  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const current = String(data.get("currentPassword"))
    const next = String(data.get("newPassword"))
    const confirmation = String(data.get("confirmNewPassword"))
    if (!current) {
      setPasswordError("Enter your current password.")
      return
    }
    if (next.length < 6) {
      setPasswordError("New password must be at least 6 characters.")
      return
    }
    if (next !== confirmation) {
      setPasswordError("New passwords do not match.")
      return
    }
    setPasswordError("")
    form.reset()
    onToast("Password updated")
  }

  const signOutOtherSessions = () => {
    setSessions((current) => current.filter((session) => session.current))
    setConfirm(null)
    onToast(
      otherSessions === 1
        ? "Signed out of 1 other session"
        : `Signed out of ${otherSessions} other sessions`,
    )
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" })
  }

  return (
    <div className="settings-page">
      <button className="back-button" onClick={onBack}>
        <Icon name="arrow" size={16} />
        Back to home
      </button>

      <header className="settings-header">
        <span className="settings-avatar">{initials || "U"}</span>
        <div>
          <p>Account settings</p>
          <h1>{account.name}</h1>
          <span className="settings-meta">
            {account.email} · Member since {memberSince}
          </span>
        </div>
      </header>

      <nav className="settings-nav" aria-label="Settings sections">
        {sectionLinks.map(([label, id]) => (
          <button key={id} type="button" onClick={() => scrollToSection(id)}>
            {label}
          </button>
        ))}
      </nav>

      <section className="settings-card" id="settings-account">
        <div className="settings-card-head">
          <span className="settings-card-icon">
            <Icon name="user" size={18} />
          </span>
          <div>
            <h2>Account information</h2>
            <p>Manage your basic account details.</p>
          </div>
          {!editing && (
            <button
              type="button"
              className="settings-edit"
              onClick={startEditing}
            >
              Edit
            </button>
          )}
        </div>

        {editing ? (
          <form className="settings-form" onSubmit={saveProfile}>
            <div className="settings-form-row">
              <label className="settings-field">
                Full name
                <input
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                  autoComplete="name"
                />
              </label>
              <label className="settings-field">
                Username
                <input
                  value={draft.username}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  required
                  autoComplete="username"
                />
              </label>
            </div>
            <label className="settings-field">
              Email address
              <span className="settings-inline">
                <input
                  type="email"
                  value={draft.email}
                  readOnly={!changingEmail}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  autoComplete="email"
                />
                {!changingEmail && (
                  <button
                    type="button"
                    className="settings-link"
                    onClick={() => setChangingEmail(true)}
                  >
                    Change email
                  </button>
                )}
              </span>
            </label>
            {profileError && (
              <p className="settings-error" role="alert">
                {profileError}
              </p>
            )}
            <div className="settings-actions">
              <button className="primary" type="submit">
                Save changes
              </button>
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <dl className="settings-facts">
            <div>
              <dt>Name</dt>
              <dd>{account.name}</dd>
            </div>
            <div>
              <dt>Username</dt>
              <dd>{username}</dd>
            </div>
            <div>
              <dt>Email address</dt>
              <dd>{account.email}</dd>
            </div>
            <div>
              <dt>Member since</dt>
              <dd>{memberSince}</dd>
            </div>
          </dl>
        )}
      </section>

      <section className="settings-card" id="settings-privacy">
        <div className="settings-card-head">
          <span className="settings-card-icon">
            <Icon name="mail" size={18} />
          </span>
          <div>
            <h2>Privacy &amp; contact preferences</h2>
            <p>Control how buyers and sellers can reach you.</p>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Email privacy</strong>
            <small>
              Keep your address private and let craigslist relay replies, or
              show it directly on your posts.
            </small>
          </div>
          <div className="settings-control">
            <select
              className="settings-select"
              aria-label="Email privacy"
              value={preferences.emailPrivate ? "private" : "public"}
              onChange={(event) =>
                onUpdatePreferences({
                  emailPrivate: event.target.value === "private",
                })
              }
            >
              <option value="private">Keep my email private</option>
              <option value="public">Show my email on listings</option>
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Contact preference</strong>
            <small>Choose how people respond to your listings.</small>
          </div>
          <div className="settings-control">
            <select
              className="settings-select"
              aria-label="Contact preference"
              value={preferences.contactPreference}
              onChange={(event) =>
                onUpdatePreferences({
                  contactPreference: event.target.value as ContactPreference,
                })
              }
            >
              {contactChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Saved searches and favorites</strong>
            <small>
              You have {favoritesCount} favorite
              {favoritesCount === 1 ? "" : "s"} saved. Saved-search alerts are
              sent by email on the real site and are not simulated here.
            </small>
          </div>
          <div className="settings-control">
            <button
              type="button"
              className="settings-edit"
              onClick={onOpenFavorites}
            >
              View favorites
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Review privacy information</strong>
            <small>
              What craigslist does with your email, session, and posting data.
            </small>
          </div>
          <div className="settings-control">
            <button
              type="button"
              className="settings-link"
              aria-expanded={privacyOpen}
              onClick={() => setPrivacyOpen((value) => !value)}
            >
              {privacyOpen ? "Hide details" : "Read details"}
            </button>
          </div>
        </div>
        {privacyOpen && (
          <div className="settings-note">
            <strong>How this demo handles your data</strong>
            <ul>
              <li>
                Replies are relayed through an anonymous craigslist address, so
                your real email is never shown on a public post.
              </li>
              <li>
                Your account, preferences, and favorites are saved in this
                browser only — there is no server in this project.
              </li>
              <li>
                Callbacks and suspicious activity reports are emailed to the
                address on file.
              </li>
            </ul>
          </div>
        )}
        <p className="settings-hint">Changes to these preferences save automatically.</p>
      </section>

      <section className="settings-card" id="settings-security">
        <div className="settings-card-head">
          <span className="settings-card-icon">
            <Icon name="shield" size={18} />
          </span>
          <div>
            <h2>Security</h2>
            <p>Keep your account and personal information protected.</p>
          </div>
        </div>

        <h3 className="settings-subhead">Change password</h3>
        <form className="settings-form" onSubmit={submitPassword}>
          <label className="settings-field">
            Current password
            <PasswordInput
              name="currentPassword"
              autoComplete="current-password"
              placeholder="Enter your current password"
            />
          </label>
          <div className="settings-form-row">
            <label className="settings-field">
              New password
              <PasswordInput
                name="newPassword"
                minLength={6}
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />
            </label>
            <label className="settings-field">
              Confirm new password
              <PasswordInput
                name="confirmNewPassword"
                minLength={6}
                autoComplete="new-password"
                placeholder="Re-enter the new password"
              />
            </label>
          </div>
          {passwordError && (
            <p className="settings-error" role="alert">
              {passwordError}
            </p>
          )}
          <div className="settings-actions">
            <button className="primary" type="submit">
              Update password
            </button>
          </div>
        </form>

        <h3 className="settings-subhead">Active sessions</h3>
        <div className="session-list">
          {sessions.map((session) => (
            <div className="session-row" key={session.id}>
              <span className="session-icon">
                <Icon
                  name={
                    session.device.includes("iPhone") ||
                    session.device.includes("Android")
                      ? "phone"
                      : "user"
                  }
                  size={16}
                />
              </span>
              <div>
                <strong>{session.device}</strong>
                <small>
                  {session.location} · {session.lastActive}
                </small>
              </div>
              {session.current && (
                <span className="session-badge">This device</span>
              )}
            </div>
          ))}
        </div>
        <div className="settings-actions">
          <button
            type="button"
            onClick={() =>
              setConfirm({
                title: "Sign out other sessions?",
                body: `${otherSessions === 1 ? "1 other session" : `${otherSessions} other sessions`} will be signed out. You will stay signed in on this device.`,
                confirmLabel: "Sign out others",
                run: signOutOtherSessions,
              })
            }
            disabled={otherSessions === 0}
          >
            Sign out other sessions
          </button>
        </div>

        <h3 className="settings-subhead">Security tips</h3>
        <ul className="settings-tips">
          <li>Never share verification codes, even with someone claiming to be support.</li>
          <li>Use a unique password you do not reuse on other sites.</li>
          <li>
            Report listings or messages that ask for payment outside the site,
            or that pressure you to act urgently.
          </li>
        </ul>
      </section>

      <section className="settings-card" id="settings-preferences">
        <div className="settings-card-head">
          <span className="settings-card-icon">
            <Icon name="pin" size={18} />
          </span>
          <div>
            <h2>General preferences</h2>
            <p>Customize your craigslist experience.</p>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Default home location</strong>
            <small>Sets the city shown in the location picker.</small>
          </div>
          <div className="settings-control">
            <select
              className="settings-select"
              aria-label="Default home location"
              value={preferences.homeLocation}
              onChange={(event) => {
                const city = event.target.value
                onUpdatePreferences({ homeLocation: city })
                onChooseCity(city)
                onToast(`Default location set to ${city}`)
              }}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Default search location</strong>
            <small>
              Applies to searches when no city filter is active yet.
            </small>
          </div>
          <div className="settings-control">
            <select
              className="settings-select"
              aria-label="Default search location"
              value={preferences.searchLocation}
              onChange={(event) =>
                onUpdatePreferences({ searchLocation: event.target.value })
              }
            >
              <option value="Anywhere">Anywhere</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Default homepage</strong>
            <small>The page craigslist opens to on your next visit.</small>
          </div>
          <div className="settings-control">
            <select
              className="settings-select"
              aria-label="Default homepage"
              value={preferences.defaultHomepage}
              onChange={(event) =>
                onUpdatePreferences({ defaultHomepage: event.target.value })
              }
            >
              {homepages.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Preferred language</strong>
            <small>
              Only English is available in this demo; your choice is stored.
            </small>
          </div>
          <div className="settings-control">
            <select
              className="settings-select"
              aria-label="Preferred language"
              value={preferences.language}
              onChange={(event) => {
                const language = event.target.value as Preferences["language"]
                onUpdatePreferences({ language })
                if (language === "Filipino") {
                  onToast("Filipino isn't available yet — preference saved")
                }
              }}
            >
              <option value="English">English</option>
              <option value="Filipino">Filipino</option>
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Hide sold listings</strong>
            <small>Removes posts marked sold from browse and search.</small>
          </div>
          <div className="settings-control">
            <button
              type="button"
              className="settings-toggle"
              aria-pressed={preferences.hideSold}
              aria-label="Hide sold listings"
              onClick={() =>
                onUpdatePreferences({ hideSold: !preferences.hideSold })
              }
            />
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Show seller ratings on cards</strong>
            <small>Turn off to browse with a plainer listing grid.</small>
          </div>
          <div className="settings-control">
            <button
              type="button"
              className="settings-toggle"
              aria-pressed={preferences.showRatings}
              aria-label="Show seller ratings on cards"
              onClick={() =>
                onUpdatePreferences({ showRatings: !preferences.showRatings })
              }
            />
          </div>
        </div>
        <p className="settings-hint">Preferences save automatically.</p>
      </section>

      <section className="settings-card" id="settings-management">
        <div className="settings-card-head">
          <span className="settings-card-icon">
            <Icon name="menu" size={18} />
          </span>
          <div>
            <h2>Account management</h2>
            <p>Support, your data, and account status.</p>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Help and support</strong>
            <small>Browse help articles or contact the support team.</small>
          </div>
          <div className="settings-control">
            <button type="button" className="settings-edit" onClick={onOpenHelp}>
              Open help center
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Download my data</strong>
            <small>
              Downloads a JSON copy of your account, preferences, and favorites.
            </small>
          </div>
          <div className="settings-control">
            <button
              type="button"
              className="settings-edit"
              onClick={onDownloadData}
            >
              Download
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Log out</strong>
            <small>End this session on this device.</small>
          </div>
          <div className="settings-control">
            <button type="button" className="settings-edit" onClick={onSignOut}>
              Log out
            </button>
          </div>
        </div>

        <div className="settings-danger">
          <div>
            <strong>Deactivate account</strong>
            <small>
              Hide your posts and sign out. You can reactivate by signing in
              again.
            </small>
          </div>
          <button
            type="button"
            onClick={() =>
              setConfirm({
                title: "Deactivate your account?",
                body: "Your posts and messages would be hidden and you would be signed out. This demo has no server, so nothing is permanently deleted.",
                confirmLabel: "Deactivate",
                run: onDeactivate,
              })
            }
          >
            Deactivate
          </button>
        </div>

        <div className="settings-danger">
          <div>
            <strong>Delete account data</strong>
            <small>
              Clears the demo account, preferences, and favorites stored in this
              browser. This cannot be undone.
            </small>
          </div>
          <button
            type="button"
            onClick={() =>
              setConfirm({
                title: "Delete your account data?",
                body: "This removes the account, preferences, and favorites saved in this browser. You will be signed out and the data cannot be recovered.",
                confirmLabel: "Delete data",
                run: onDeleteData,
              })
            }
          >
            Delete data
          </button>
        </div>
        <p className="settings-hint">
          These options are simulated for this school project — there is no
          backend account to deactivate or delete.
        </p>
      </section>

      {confirm && (
        <div
          className="settings-confirm-backdrop"
          role="presentation"
          onMouseDown={() => setConfirm(null)}
        >
          <div
            className="settings-confirm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-confirm-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h3 id="settings-confirm-title">{confirm.title}</h3>
            <p>{confirm.body}</p>
            <div className="settings-confirm-actions">
              <button type="button" onClick={() => setConfirm(null)}>
                Cancel
              </button>
              <button type="button" className="danger" onClick={confirm.run}>
                {confirm.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
