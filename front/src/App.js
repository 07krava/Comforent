import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Register from './components/Registration/Register/Register';
import SignIn from './components/Registration/SignIn/SignIn';
import RentOut from './pages/RentOut';
import OAuth2Error from './components/errors/OAuth2Error';
import OAuth2RedirectHandler from './components/Registration/OAuth2Redirect/OAuth2RedirectHandler'; 


const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true, // не нужно, если нет роутов с *
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create_housing" element={<RentOut />} />
          <Route path="/oauth2/error" element={<OAuth2Error />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          {/* <Route path="/show-housings" element={<ShowHousings/>} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
