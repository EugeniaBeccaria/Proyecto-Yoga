import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
<<<<<<< HEAD
import ScrollToTop from './components/ScrollToTop';
=======
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
>>>>>>> c26bdae95f356f9d83551c5c6fb24b0bd3b4d046

/*
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
);*/
const stripePromise = loadStripe('pk_test_51SU8dqIASuqUzULXtHSfuAycNRNVmvdRPEnkj24g5XHdtjnCm6C9vPQixcGMwD0e7WfSjKODtSAzE3vrpXDbqq0m00k5iz47ax')
const GOOGLE_CLIENT_ID = "961050182079-4g53a5gj6nongdd867t2medgqq1mcqun.apps.googleusercontent.com "; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
<<<<<<< HEAD
      <BrowserRouter>
        <ScrollToTop />
          <App />
        <ScrollToTop />
      </BrowserRouter>
=======
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Elements>
>>>>>>> c26bdae95f356f9d83551c5c6fb24b0bd3b4d046
    </GoogleOAuthProvider>
  </React.StrictMode>,
);