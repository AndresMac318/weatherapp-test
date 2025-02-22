import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: '/weather/search', pathMatch: 'full',
    },
    {
        path: 'weather',
        loadChildren: () => import('./features/weather/wheather.routes').then(m=>m.weatherRoutes)
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent) 
    }
];
