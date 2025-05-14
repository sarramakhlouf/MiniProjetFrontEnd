import { Routes } from '@angular/router';
import { RechercheParDomaineComponent } from './recherche-par-domaine/recherche-par-domaine.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListerDomainesComponent } from './lister-domaines/lister-domaines.component';
import { UniversitesComponent } from './universites/universites.component';
import { AddUniversiteComponent } from './add-universite/add-universite.component';
import { UpdateUniversiteComponent } from './update-universite/update-universite.component';
import { universiteGuard } from './universite.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
  { path: 'universities', component: UniversitesComponent },
  { path: 'add-university', component: AddUniversiteComponent, canActivate: [universiteGuard] },
  { path: 'updateUniversity/:id', component: UpdateUniversiteComponent },
  { path: 'rechercheParDomaine', component: RechercheParDomaineComponent },
  {
    path: 'rechercheParNom',
    loadComponent: () =>
      import('./recherche-par-nom/recherche-par-nom.component').then(m => m.RechercheParNomComponent),
  },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: 'listerDomaines', component: ListerDomainesComponent },
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent},
];
