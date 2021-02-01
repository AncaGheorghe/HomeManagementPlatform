import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddGroupComponent } from './add-group/add-group.component';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { MyOpenedTasksComponent } from './my-opened-tasks/my-opened-tasks.component';
import { MyCompletedTasksComponent } from './my-completed-tasks/my-completed-tasks.component';
import {SidebarModule} from 'ng-sidebar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    UserProfileComponent,
    SidebarComponent,
    NavbarComponent,
    RegisterComponent,
    AddTaskComponent,
    AddGroupComponent,
    MyGroupsComponent,
    MyTeamsComponent,
    MyOpenedTasksComponent,
    MyCompletedTasksComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SidebarModule.forRoot(),
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
