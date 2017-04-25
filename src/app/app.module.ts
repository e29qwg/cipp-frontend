import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutes } from './app.router';
import { ProjectorComponent } from './projector/projector.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProjectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutes,
    HttpModule,
    JsonpModule,
    FacebookModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
