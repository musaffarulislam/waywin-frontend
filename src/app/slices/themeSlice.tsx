import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () =>{
    
    const theme = window.localStorage.getItem("theme")
    if(theme){
        return theme;
    }
    return "dark"
}
const initialValue = {
    theme : getInitialTheme(),
};

export const themeSlice = createSlice({
    name: "theme",
    initialState: initialValue,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark";
            window.localStorage.setItem("theme",state.theme)
        },
    },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;