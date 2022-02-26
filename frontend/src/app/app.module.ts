import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AdminComponent } from './admin/admin.component';
import { AppraiserComponent } from './appraiser/appraiser.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NewAppraisalComponent } from './new-appraisal/new-appraisal.component';
import { CurrentAppraisalsComponent } from './current-appraisals/current-appraisals.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';


import { HistoryComponent } from './history/history.component';
import { ForumComponent } from './forum/forum.component';
import { AppraiserMenuComponent } from './appraiser-menu/appraiser-menu.component';
import { ArtForAppraisalComponent } from './art-for-appraisal/art-for-appraisal.component';
import { AppraiserChangeMindComponent } from './appraiser-change-mind/appraiser-change-mind.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AppraisalsHandlingComponent } from './appraisals-handling/appraisals-handling.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ForumMenuComponent } from './forum-menu/forum-menu.component';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';
import { TopicComponent } from './topic/topic.component';
// import { HighchartsChartModule } from 'highcharts-angular';
// import { HighchartsChartComponent } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AppraiserComponent,
    UserComponent,
    RegisterComponent,
    UserMenuComponent,
    NewAppraisalComponent,
    CurrentAppraisalsComponent,
    HistoryComponent,
    ForumComponent,
    AppraiserMenuComponent,
    ArtForAppraisalComponent,
    AppraiserChangeMindComponent,
    ChangePasswordComponent,
    AdminMenuComponent,
    StatisticsComponent,
    AppraisalsHandlingComponent,
    DeleteUserComponent,
    ForumMenuComponent,
    NewTopicDialogComponent,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,



    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
