# AeroClima

AeroClima es una PWA meteorológica mobile-first con comparación de modelos,
pronóstico horario y diario, alertas calculadas y una interfaz Spatial UI con
glassmorphism.

## Interfaz

- Fondo Aura Ambient Glow con orbes naranja, violeta y cian.
- Tarjeta principal GlassCard.
- Bento Grid de condiciones actuales.
- Pronóstico horario y diario en vidrio esmerilado.
- Gráficos neón para temperatura y precipitación.
- Comparación de seis modelos meteorológicos.
- Panel de alertas, ajustes y dock inferior flotante.

La lógica meteorológica, los cálculos, Open-Meteo y la geolocalización se
mantienen separados de la capa visual.

## Ejecutar como web

La aplicación necesita un servidor local; no abras `index.html` directamente.

En Windows puedes usar:

```powershell
python -m http.server 4173
```

Luego visita `http://localhost:4173`.

También puedes usar `Abrir-AeroClima.cmd`.

## GitHub Pages

1. Sube el contenido de este proyecto a la rama principal del repositorio.
2. En GitHub abre **Settings > Pages**.
3. Selecciona **Deploy from a branch**.
4. Elige la rama principal y la carpeta raíz `/`.
5. Espera a que GitHub publique la dirección HTTPS.

La geolocalización del navegador requiere HTTPS. GitHub Pages ya lo proporciona.

## Android con Capacitor

Instala Node.js y Android Studio. Después ejecuta:

```powershell
npm install
npm run android:open
```

El comando prepara `www`, sincroniza Capacitor y abre el proyecto Android.

Para generar una APK Debug desde una terminal configurada:

```powershell
npm run android:debug
```

Consulta [ANDROID.md](ANDROID.md) para los requisitos del SDK.

## Pruebas

```powershell
npm test
```

Las pruebas verifican el gestor de fondos, la estructura Spatial UI, el
JavaScript integrado, el manifiesto y la versión de caché de la PWA.
