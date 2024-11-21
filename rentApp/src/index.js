import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



//  in app
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Standard
          "& .MuiInput-root": {
            color: "hsla(185, 6%, 65%, 1)",
            fontFamily: "inherit",

            // label (is not working)
            "& .MuiInputLabel-standard": {
              color: "hsla(185, 6%, 65%, 1)",
              fontWeight: "800",
              "&.Mui-focused": {
                color: "rgb(216, 41, 10)",
                fontWeight: "800",
              },
            },

            // Bottom border
            "&:before": {
              borderWidth: "2px",
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            // Border on focus
            "&:after": {
              textColor: "#646cff",
              borderColor: "#646cff",
              borderWidth: "2x",
            },
            // on hover
            ":hover:not(.Mui-focused)": {
              "&:before": {
                borderColor: "hsla(185, 6%, 65%, 1)",
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App theme={theme}/>
  </React.StrictMode>
);


