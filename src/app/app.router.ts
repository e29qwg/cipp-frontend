import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProjectorComponent } from './projector/projector.component';

export const router: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'projector', component: ProjectorComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(router);
