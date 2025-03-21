import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FormComponent } from './views/form/form.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DetailsComponent } from './views/details/details.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'add',  component: FormComponent},
    { path: ':id/edit',  component: FormComponent},
    { path: ':id/details',  component: DetailsComponent},

    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
