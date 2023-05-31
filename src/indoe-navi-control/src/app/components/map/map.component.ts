import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { vec2 } from 'gl-matrix'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map : any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 0, 0 ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // var circle = L.circle([51.508, -0.11], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(this.map);

    var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
    var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
    var latLngBounds = L.latLngBounds([[55.426658114464374, 11.782611061468794], [55.428721565293664, 11.787587697226048]]);

    var imageOverlay = L.imageOverlay("../../../assets/ZBC ringsted.png", latLngBounds, {
        opacity: 1,
        errorOverlayUrl: errorOverlayUrl,
        alt: altText,
        interactive: true,
    }).addTo(this.map);

    // var nodes = this.indoorMap.getRouteNodes();
    // for (var i = 0; i < nodes.length; i++){
    //   L.circle([nodes[i].x, nodes[i].y], {
    //       color: 'red',
    //       fillColor: '#f03',
    //       fillOpacity: 0.5,
    //       radius: 1
    //   }).addTo(this.map);
    // }


    let r = this.map;
    this.map.on('click', function(e : any){
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
      console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
      var circle = L.circle([lat, lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 1
      }).addTo(r);
    });
  }

  constructor() { }

  ngAfterViewInit(): void {
    // this.initMap();

    const canvas = <HTMLCanvasElement>document.getElementById("glcanvas");
    console.log(canvas);
    // Initialize the GL context
    let gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
