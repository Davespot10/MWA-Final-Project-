import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemComponent } from './components/pages/item/item.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PostComponent } from './components/pages/post/post.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'items',
    component: PostComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'views', component:ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
