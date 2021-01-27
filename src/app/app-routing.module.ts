import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {MyGroupsComponent} from './my-groups/my-groups.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'addTask', component: AddTaskComponent,},
  { path: 'addGroup', component: AddGroupComponent,},
  { path: 'myGroups', component: MyGroupsComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

