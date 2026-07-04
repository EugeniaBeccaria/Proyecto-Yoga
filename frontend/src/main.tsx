import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ScrollToTop from './components/ScrollToTop.tsx';

/*
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
); */

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
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