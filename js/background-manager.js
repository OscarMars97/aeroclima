(function(){
  'use strict';

  const BACKGROUNDS = Object.freeze([
    { id:'beach', label:'Playa' }, { id:'mountain', label:'Montaña' },
    { id:'city', label:'Ciudad' }, { id:'desert', label:'Desierto' },
    { id:'forest', label:'Bosque' }, { id:'lake', label:'Lago' },
    { id:'rural', label:'Campo' }, { id:'rocky-coast', label:'Costa rocosa' }
  ]);
  const STORAGE_KEY = 'aeroclima-appearance-v2';
  const DEFAULTS = Object.freeze({ theme:'auto', lightBackground:'beach', darkBackground:'city', animations:'normal' });

  class LocalBackgroundManager {
    constructor(){
      this.layers=[];
      this.activeLayer=0;
      this.loadVersion=0;
      this.settings=this.readSettings();
    }
    init(){
      this.layers=Array.from(document.querySelectorAll('.app-background__image'));
      this.apply(this.resolvedTheme(document.body.classList.contains('night')));
    }
    readSettings(){
      try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')); }
      catch(e) { return Object.assign({}, DEFAULTS); }
    }
    saveSettings(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings)); }
    setSetting(key,value){ this.settings[key]=value; this.saveSettings(); }
    reset(){ this.settings=Object.assign({},DEFAULTS); this.saveSettings(); this.apply(this.resolvedTheme(document.body.classList.contains('night'))); }
    resolvedTheme(isNight){
      if(this.settings.theme==='light') return 'light';
      if(this.settings.theme==='dark') return 'dark';
      return isNight ? 'dark' : 'light';
    }
    syncTheme(isNight){
      const theme=this.resolvedTheme(isNight);
      document.body.classList.toggle('night', theme==='dark');
      this.apply(theme);
    }
    apply(theme){
      if(!this.layers.length) return;
      const background=theme==='dark' ? this.settings.darkBackground : this.settings.lightBackground;
      const url=`assets/backgrounds/${theme}/${background}.webp`;
      const version=++this.loadVersion;
      const image=new Image();
      image.onload=()=>{
        // Al iniciar, el modo automático puede solicitar otro fondo antes de que
        // termine de cargar el primero. Solo la solicitud más reciente puede
        // cambiar las capas, para evitar que una carga anterior oculte la nueva.
        if(version!==this.loadVersion) return;
        const previous=this.activeLayer;
        const next=(previous+1)%this.layers.length;
        const layer=this.layers[next];
        layer.style.backgroundImage=`url("${url}")`;
        layer.classList.add('is-visible');
        if(previous!==next) this.layers[previous].classList.remove('is-visible');
        this.activeLayer=next;
        document.documentElement.classList.toggle('reduce-motion', this.settings.animations==='reduced');
      };
      image.onerror=()=>{
        if(version!==this.loadVersion) return;
        console.warn(`No se pudo cargar el fondo local: ${url}`);
      };
      image.src=url;
    }
  }

  window.AEROCLIMA_BACKGROUNDS=BACKGROUNDS;
  window.LocalBackgroundManager=LocalBackgroundManager;
})();
