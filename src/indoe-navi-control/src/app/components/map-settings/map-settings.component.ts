import { Component, HostListener } from '@angular/core';
import { IndoeNaviAPIService } from 'src/app/services/indoe-navi-api.service';
import { Buffer } from "buffer";
import { IndoorMap } from 'src/app/models/indoor-map';
import { delay } from 'rxjs';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.css']
})
export class MapSettingsComponent {
  public imageData : string = "";
  public meterPerPixel : number = 0;

  constructor(public indoeNaviAPIService : IndoeNaviAPIService){
  }

  ngAfterViewInit(): void {
    let self = this;
    this.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      self.imageData = indoorMap.imageData;
      self.meterPerPixel = indoorMap.meterPerPixel;
    });
  }

  onImageUploaded(event : any){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsBinaryString(event.target.files[0])
    
    let self = this;
    function handleFileLoad(event : any){
      let imageDataBase64 : string = Buffer.from(event.target.result, 'binary').toString('base64');
      self.imageData = imageDataBase64;
      self.saveData();
    }
  }
  onOpenFileExplore(){
    document.getElementById('fileInput')?.click()
  }

  onRemoveMap(){
    this.imageData = "";
    this.saveData();
  }

  saveData(){
    let self = this;
    this.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      indoorMap.imageData = self.imageData;
      indoorMap.meterPerPixel = self.meterPerPixel;
      this.indoeNaviAPIService.updateMap(indoorMap).subscribe();
    });
  }
}
