import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FormComponent } from './views/form/form.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'add',  component: FormComponent},
    { path: ':id/edit',  component: FormComponent},

    { path: '**', component: NotFoundComponent }
];
