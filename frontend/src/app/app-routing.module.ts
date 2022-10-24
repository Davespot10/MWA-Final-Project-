import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { CheckTokenGuard } from './protect.guard';

import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "Home",
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login",
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: "Signup",
  },
  {
    path: 'items',
    loadChildren: () =>
      import('./items/item.module').then(mod => mod.ItemModule),
    // canActivate:[CheckTokenGuard]!
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
