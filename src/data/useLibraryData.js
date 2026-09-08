import { useContext } from "react";
import { LibraryDataContext } from "./LibraryDataContextValue";

export function useLibraryData() {
  const context = useContext(LibraryDataContext);

  if (!context) {
    throw new Error("useLibraryData must be used inside LibraryDataProvider");
  }

  return context;
}
