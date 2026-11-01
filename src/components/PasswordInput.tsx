import { useState } from "react"
import Icon from "./Icon"

function PasswordInput({
  name,
  autoComplete,
  placeholder,
  minLength,
  required = false,
}: {
  name: string
  autoComplete?: string
  placeholder?: string
  minLength?: number
  required?: boolean
}) {
  const [visible, setVisible] = useState(false)
  return (
    <span className="password-wrap">
      <input
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        minLength={minLength}
        required={required}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      >
        <Icon name={visible ? "eye-off" : "eye"} size={16} />
      </button>
    </span>
  )
}

export default PasswordInput
