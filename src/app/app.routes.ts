import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { HomeComponent } from './layout/home/home.component';
import { NotFoundComponent } from './layout/notFound/notfound.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { CreateTodoComponent } from './layout/createTodo/createtodo.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    canMatch: [AuthGuard],
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'create-todo',
    canMatch: [AuthGuard],
    canActivate: [AuthGuard],
    component: CreateTodoComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];
