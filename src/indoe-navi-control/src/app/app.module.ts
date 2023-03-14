import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ESPComponent } from './components/esp/esp.component';
import { RoutesComponent } from './components/routes/routes.component';
import { MapSettingsComponent } from './components/map-settings/map-settings.component';
import { MapComponent } from './components/map/map.component';

const appRoutes: Routes = [
  { path: 'statistic', component: StatisticComponent },
  { path: 'spes', component: ESPComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'map-settings', component: MapSettingsComponent },
  { path: '**',
    redirectTo: '/statistic',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    StatisticComponent,
    ESPComponent,
    RoutesComponent,
    MapSettingsComponent,
    MapComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    RouterModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
