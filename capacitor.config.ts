import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.oscar.aeroclima',
  appName: 'AeroClima',
  webDir: 'www',
  android: {
    allowMixedContent: false,
    backgroundColor: '#0b0d12'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#0b0d12',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    StatusBar: {
      overlaysWebView: true,
      style: 'LIGHT',
      backgroundColor: '#00000000'
    }
  }
};

export default config;
