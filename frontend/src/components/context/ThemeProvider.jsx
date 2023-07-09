import React, { createContext } from "react";

export const ThemeContext = createContext();

const testFunction =()=>{
    console.log("Context api function")
}
export default function ThemeProvider({ children }) {
    return <ThemeContext.Provider value={{test:"This is text by context api",testFunction}}>
        {children}
    </ThemeContext.Provider>
} 