import { Injectable } from '@angular/core';

interface Window {
  initMap: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {

  private googleMapsScriptLoaded = false;
  private googleMapsScriptLoadingPromise: Promise<void>;

  constructor() {
    this.googleMapsScriptLoadingPromise = new Promise<void>((resolve, reject) => {
      if (this.googleMapsScriptLoaded) {
        resolve();
      } else {
        (window as any).initMap = () => {
          this.googleMapsScriptLoaded = true;
          resolve();
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwyTUXlFDc-4GWIKBFsBcxWDOvcEyb_Y4&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      }
    });
  }

  load(): Promise<void> {
    return this.googleMapsScriptLoadingPromise;
  }
}
