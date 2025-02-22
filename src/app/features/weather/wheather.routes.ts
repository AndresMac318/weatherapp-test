import { Routes } from "@angular/router";

export const weatherRoutes: Routes = [
    { 
        path: 'search', 
        loadComponent: () => import('./pages/search/search.component').then(c=>c.SearchComponent)
    },
    { 
        path: 'search/:id', 
        loadComponent: () => import('./pages/search-detail/search-detail.component').then(c=>c.SearchDetailComponent)
    },
    { 
        path: 'history', 
        loadComponent: () => import('./pages/history/history.component').then(c=>c.HistoryComponent)
    },
    { 
        path: 'favorites', 
        loadComponent: () => import('./pages/favorites/favorites.component').then(c=>c.FavoritesComponent)
    },
]