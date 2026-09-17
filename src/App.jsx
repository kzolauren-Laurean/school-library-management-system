import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BookCatalog, { initialBooks } from "./pages/BookCatalog";
import Students, { initialStudents } from "./pages/Students";
import Returns from "./pages/Returns";
import { LibraryDataProvider } from "./data/LibraryDataContext";
import Borrowing from "./pages/Borrowing";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { defaultSettings } from "./pages/settingsDefaults";
import "./theme.css";

function App() {
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [theme, setTheme] = useState(defaultSettings.theme);

  return (
    <LibraryDataProvider
      initialBooks={initialBooks}
      initialStudents={initialStudents}
    >
      <div className={`app-theme app-theme--${theme}`}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<BookCatalog />} />
            <Route path="/students" element={<Students />} />
            <Route path="/borrowing" element={<Borrowing />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/settings"
              element={
                <Settings
                  initialSettings={savedSettings}
                  onSave={setSavedSettings}
                  onThemeChange={(nextTheme) => {
                    setTheme(nextTheme);
                    setSavedSettings((currentSettings) => ({
                      ...currentSettings,
                      theme: nextTheme,
                    }));
                  }}
                />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </div>
    </LibraryDataProvider>
  );
}

export default App;
