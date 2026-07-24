
import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("agroshield-language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("agroshield-language", language);
  }, [language]);

  function t(key) {
    return translations[language]?.[key] || translations.en[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}