import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './components/ScrollToTop';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

/*
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
); */

const stripePromise = loadStripe('pk_test_51SUxNVGdJddZij7d0mpJIpPTDtwA8C1F7zfYZTPHhm5Q2di4Osza9f9yMO7dG8Fwzu5DHk70JZviuf8nGsfE7lZl00ZUwoawzU')
const GOOGLE_CLIENT_ID = "961050182079-4g53a5gj6nongdd867t2medgqq1mcqun.apps.googleusercontent.com"; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <ScrollToTop />
            <App />
          <ScrollToTop />
        </BrowserRouter>
      </Elements>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);