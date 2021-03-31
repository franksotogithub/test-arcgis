import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone
} from '@angular/core';

import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import esriConfig from '@arcgis/core/config.js';
import Map from '@arcgis/core/Map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private view: any = null;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  title = 'ng-cli';

  constructor(private zone: NgZone) {

    esriConfig.apiKey = "AAPK578e2b9cd8f94463a23bec648270485bIzYuQYmR32Do2cyCiresbWuwA0WZ5B5pB-ZgEalXTv9gF0dlpwC4IxdgL9goYPUk";

   }

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    /*const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });*/

    const map = new Map({
      basemap:"arcgis-topographic"
    }
    );

    const view = new MapView({
      container,
      map: map,
      zoom:13,
      center: [-77.1298, -12.0328],
      /*  map: webmap*/

    });

    

    /*view.on('mouse-wheel',()=>{
      console.log(view.center.latitude,view.center.longitude,view.zoom)
      
    });  */



    this.view = view;
    return this.view.when();
  }

  ngOnInit(): any {

    // Required: Set this property to insure assets resolve correctly.
    // IMPORTANT: the directory path may be different between your production app and your dev app
    esriConfig.assetsPath = './assets';

    this.zone.runOutsideAngular(() => {
      // Initialize MapView and return an instance of MapView
      this.initializeMap().then(() => {
        // The map has been initialized
        this.zone.run(() => {
          console.log('mapView ready: ');
        });
      });

    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}
