import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IterateComponentComponent } from './iterate-component/iterate-component.component';
import { ViewDemoComponent } from './view-demo/view-demo.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoauthGuard } from './guards/noauth.guard';

const routes: Routes = [
  {path: 'view', component: ViewDemoComponent},
  {path: 'iterate', component: IterateComponentComponent},
  {path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoauthGuard]},
  {path: '**', redirectTo: '/tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
