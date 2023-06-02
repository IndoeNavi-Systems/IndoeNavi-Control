import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { RoutesComponent } from './components/routes/routes.component';
import { MapSettingsComponent } from './components/map-settings/map-settings.component';
import { MapComponent } from './components/map/map.component';
import { SpesComponent } from './components/spes/spes.component';
import { LoginComponent } from './components/login/login.component';
import { LocationsComponent } from './components/locations/locations.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'statistic', component: StatisticComponent },
  { path: 'spes', component: SpesComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'map-settings', component: MapSettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'locations', component: LocationsComponent },
  { path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    StatisticComponent,
    RoutesComponent,
    MapSettingsComponent,
    MapComponent,
    SpesComponent,
    LoginComponent,
    LocationsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
