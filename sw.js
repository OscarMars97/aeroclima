/* Copia este archivo como config.js para conectar un proxy propio de Unsplash o Pexels.
   Nunca incluyas una clave de API en el navegador ni en este repositorio. */
window.AEROCLIMA_CONFIG = {
  imageProvider: 'local', // local | unsplash | pexels | auto
  imageApiEndpoint: '', // endpoint propio que recibe ?query=...
  imageProxyEndpoint: '',
  reduceData: false,
  animations: true
};
