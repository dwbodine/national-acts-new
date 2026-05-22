'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { store } from '@/lib/store';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        scriptProps={{
          appendTo: 'head',
          async: true,
          defer: true,
        }}
      >
        {children}
        <ToastContainer />
      </GoogleReCaptchaProvider>
    </Provider>
  );
}
