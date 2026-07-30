# AeroClima para Android

La web se conserva intacta. Capacitor copia sus archivos a `www/` antes de sincronizar Android.

## Primera vez

1. Instala Node.js LTS, Android Studio y el Android SDK 35.
2. En la raíz del proyecto ejecuta `npm install`.
3. Ejecuta `npm run android:open`.
4. Android Studio abrirá `android/`; espera a que termine la sincronización y presiona **Run**.

## APK Debug

Con Android SDK configurado, ejecuta `npm run android:debug`.
La APK se crea en `android/app/build/outputs/apk/debug/app-debug.apk`.

## Capacidades incluidas

- Permisos Android de ubicación precisa y aproximada.
- Icono adaptable y splash nativo.
- Material You, tema claro/oscuro y edge-to-edge.
- Barra de estado transparente sobre la interfaz.
- Fondos locales y Service Worker para funcionamiento sin conexión.
- `localStorage` de la app preservado dentro del WebView de Capacitor.
