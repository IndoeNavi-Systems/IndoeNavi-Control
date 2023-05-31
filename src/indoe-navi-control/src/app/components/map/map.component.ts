import { Component, AfterViewInit } from '@angular/core';
import { GLWindow } from 'src/gl-engine/gl-window';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  glWindow : GLWindow | null = null;

  constructor() { }

  ngAfterViewInit(): void {
    // this.initMap();

    const canvas = <HTMLCanvasElement>document.getElementById("glcanvas");
    this.glWindow = new GLWindow(canvas);
    this.glWindow.initialize();

    console.log(canvas);
    // Initialize the GL context
    let gl = canvas.getContext("webgl");

    // // Only continue if WebGL is available and working
    // if (gl === null) {
    //   alert(
    //     "Unable to initialize WebGL. Your browser or machine may not support it."
    //   );
    //   return;
    // }

    // // Set clear color to black, fully opaque
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // // Clear the color buffer with specified clear color
    // gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
