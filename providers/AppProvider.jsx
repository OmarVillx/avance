import { FeedProvider } from "../context/FeedContext";
import { LanguageProvider } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";
import { FeedProvider } from "../context/FeedContext";

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FeedProvider>{children}</FeedProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
