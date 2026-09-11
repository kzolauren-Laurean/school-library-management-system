import { useState } from "react";
import { defaultSettings } from "./settingsDefaults";
import "./Settings.css";

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21V5.5Z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6h-.8a1.7 1.7 0 0 1 0-3.4H15A6 6 0 0 0 12 3Z" />
      <path d="M7.5 10h.01M9.5 6.8h.01M14.5 7h.01M17.2 10.5h.01" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h12l3 3v15H5V3Zm3 0v6h8V3m-7 18v-7h6v7" />
    </svg>
  );
}

function Settings({ initialSettings, onSave, onThemeChange }) {
  const [settings, setSettings] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const update = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!settings.schoolName.trim())
      nextErrors.schoolName = "School name is required.";
    if (!settings.libraryName.trim())
      nextErrors.libraryName = "Library name is required.";
    if (!settings.phone.trim() || !/^\+?[\d\s()-]{7,}$/.test(settings.phone))
      nextErrors.phone = "Enter a valid phone number.";
    if (settings.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email))
      nextErrors.email = "Enter a valid email address.";
    if (
      !Number.isFinite(Number(settings.loanPeriod)) ||
      Number(settings.loanPeriod) <= 0
    )
      nextErrors.loanPeriod = "Use a positive number.";
    if (
      !Number.isInteger(Number(settings.maxBooks)) ||
      Number(settings.maxBooks) <= 0
    )
      nextErrors.maxBooks = "Use a positive whole number.";
    if (
      !Number.isInteger(Number(settings.gracePeriod)) ||
      Number(settings.gracePeriod) < 0
    )
      nextErrors.gracePeriod = "Use zero or a whole number.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setNotice("Please correct the highlighted fields.");
      return;
    }
    onSave({
      ...settings,
      loanPeriod: Number(settings.loanPeriod),
      maxBooks: Number(settings.maxBooks),
      gracePeriod: Number(settings.gracePeriod),
    });
    setNotice("Settings saved for this session.");
  };

  const reset = () => {
    const resetSettings = { ...defaultSettings };
    setSettings(resetSettings);
    setErrors({});
    onSave(resetSettings);
    onThemeChange(resetSettings.theme);
    setNotice("Settings restored to their defaults.");
  };

  const setTheme = (theme) => {
    update("theme", theme);
    onThemeChange(theme);
  };

  const fieldClass = (field) =>
    `settings-input${errors[field] ? " has-error" : ""}`;

  return (
    <div className="settings-page">
      <form onSubmit={handleSubmit} noValidate>
        <section
          className="settings-card"
          aria-labelledby="library-information-title"
        >
          <div className="settings-section-heading">
            <span className="settings-section-icon settings-section-icon--blue">
              <BuildingIcon />
            </span>
            <div>
              <h2 id="library-information-title">Library Information</h2>
              <p>Set your school and library details</p>
            </div>
          </div>
          <div className="settings-fields settings-fields--library">
            <label className="settings-field settings-field--school">
              School Name
              <input
                className={fieldClass("schoolName")}
                value={settings.schoolName}
                onChange={(e) => update("schoolName", e.target.value)}
                aria-describedby={
                  errors.schoolName ? "school-name-error" : undefined
                }
              />
              {errors.schoolName && (
                <span id="school-name-error" className="field-error">
                  {errors.schoolName}
                </span>
              )}
            </label>
            <label className="settings-field settings-field--library-name">
              Library Name
              <input
                className={fieldClass("libraryName")}
                value={settings.libraryName}
                onChange={(e) => update("libraryName", e.target.value)}
                aria-describedby={
                  errors.libraryName ? "library-name-error" : undefined
                }
              />
              {errors.libraryName && (
                <span id="library-name-error" className="field-error">
                  {errors.libraryName}
                </span>
              )}
            </label>
            <label className="settings-field settings-field--address">
              Address
              <textarea
                className={fieldClass("address")}
                value={settings.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </label>
            <label className="settings-field">
              Phone Number
              <input
                className={fieldClass("phone")}
                type="tel"
                value={settings.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="field-error">
                  {errors.phone}
                </span>
              )}
            </label>
            <label className="settings-field">
              Email Address
              <input
                className={fieldClass("email")}
                type="email"
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="field-error">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
        </section>

        <section
          className="settings-card"
          aria-labelledby="borrowing-settings-title"
        >
          <div className="settings-section-heading">
            <span className="settings-section-icon settings-section-icon--green">
              <BookIcon />
            </span>
            <div>
              <h2 id="borrowing-settings-title">Borrowing Settings</h2>
              <p>Set default lending rules</p>
            </div>
          </div>
          <div className="settings-fields settings-fields--borrowing">
            <label className="settings-field">
              Default Loan Period
              <div className="settings-unit-input">
                <input
                  className={fieldClass("loanPeriod")}
                  type="number"
                  min="1"
                  value={settings.loanPeriod}
                  onChange={(e) => update("loanPeriod", e.target.value)}
                />
                <span>days</span>
              </div>
              {errors.loanPeriod && (
                <span className="field-error">{errors.loanPeriod}</span>
              )}
            </label>
            <label className="settings-field">
              Max Books per Student
              <div className="settings-unit-input">
                <input
                  className={fieldClass("maxBooks")}
                  type="number"
                  min="1"
                  step="1"
                  value={settings.maxBooks}
                  onChange={(e) => update("maxBooks", e.target.value)}
                />
                <span>books</span>
              </div>
              {errors.maxBooks && (
                <span className="field-error">{errors.maxBooks}</span>
              )}
            </label>
            <label className="settings-field">
              Grace Period
              <div className="settings-unit-input">
                <input
                  className={fieldClass("gracePeriod")}
                  type="number"
                  min="0"
                  step="1"
                  value={settings.gracePeriod}
                  onChange={(e) => update("gracePeriod", e.target.value)}
                />
                <span>days</span>
              </div>
              {errors.gracePeriod && (
                <span className="field-error">{errors.gracePeriod}</span>
              )}
            </label>
          </div>
          <label className="renewal-control">
            <input
              type="checkbox"
              checked={settings.allowRenewal}
              onChange={(e) => update("allowRenewal", e.target.checked)}
            />
            <span className="renewal-switch" aria-hidden="true"></span>
            <span>
              <strong>Allow book renewal</strong>
              <small>Students can request to renew borrowed books</small>
            </span>
          </label>
        </section>

        <section className="settings-card" aria-labelledby="appearance-title">
          <div className="settings-section-heading">
            <span className="settings-section-icon settings-section-icon--purple">
              <PaletteIcon />
            </span>
            <div>
              <h2 id="appearance-title">Appearance</h2>
              <p>Choose your theme and language</p>
            </div>
          </div>
          <div className="settings-appearance">
            <fieldset className="theme-options">
              <legend>Theme</legend>
              <div>
                <button
                  type="button"
                  className={`theme-option ${settings.theme === "light" ? "selected" : ""}`}
                  onClick={() => setTheme("light")}
                  aria-pressed={settings.theme === "light"}
                >
                  <span aria-hidden="true">☼</span>Light
                </button>
                <button
                  type="button"
                  className={`theme-option ${settings.theme === "dark" ? "selected" : ""}`}
                  onClick={() => setTheme("dark")}
                  aria-pressed={settings.theme === "dark"}
                >
                  <span aria-hidden="true">☾</span>Dark
                </button>
              </div>
            </fieldset>
            <label className="settings-field language-field">
              Language
              <select
                className="settings-input"
                value={settings.language}
                onChange={(e) => update("language", e.target.value)}
              >
                <option>English</option>
                <option>Myanmar</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Chinese</option>
                <option>Japanese</option>
                <option>Korean</option>
              </select>
            </label>
          </div>
        </section>

        <div className="settings-actions">
          <span className="settings-notice" role="status" aria-live="polite">
            {notice}
          </span>
          <button
            type="button"
            className="settings-button settings-button--secondary"
            onClick={reset}
          >
            Reset to Default
          </button>
          <button
            type="submit"
            className="settings-button settings-button--primary"
          >
            <SaveIcon />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
