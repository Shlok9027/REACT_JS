import { useEffect } from "react";
import "./App.css";
import { ThemeContext } from "./context/theme";
import React, { useState } from 'react';
import { ThemeProvider } from "./context/theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";
function App() {

    const [themeMode, setThemeMode] = useState("light")

    const lightTheme = () => {
      setThemeMode("light")
    }
    const darkTheme = ()=> {
      setThemeMode("dark")
    }
// actual change in a theme
useEffect(() => {
  document.querySelector('html').classList.remove("light", "dark")
  document.querySelector('html').classList.add(themeMode)
}, [themeMode])

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>

    <div className="flex flex-wrap min-h-screen items-center">
      <div className="w-full">
        <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
          {/* themeBtn*/}
          <ThemeBtn />
        </div>

        <div className="w-full max-w-sm mx-auto">
            {/* Card*/}
            <Card />

        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
