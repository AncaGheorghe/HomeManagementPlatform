import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {MyGroupsComponent} from './my-groups/my-groups.component';
import {AuthGuardGuard} from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuardGuard]},
  { path: 'addTask', component: AddTaskComponent, canActivate: [AuthGuardGuard]},
  { path: 'addGroup', component: AddGroupComponent,canActivate: [AuthGuardGuard]},
  { path: 'myGroups', component: MyGroupsComponent,canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

