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



import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';



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
import { AppraisalsHandlingComponent } from './appraisals-handling/appraisals-handling.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ForumMenuComponent } from './forum-menu/forum-menu.component';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';
import { TopicComponent } from './topic/topic.component';
import { NotificationComponent } from './notification/notification.component';
import { StatisticsAppraiserRatingComponent } from './statistics-appraiser-rating/statistics-appraiser-rating.component';
import { StatisticsAppraisalComponent } from './statistics-appraisal/statistics-appraisal.component';
import { StatisticsUserComponent } from './statistics-user/statistics-user.component';
import { GoogleSignInComponent } from './google-sign-in/google-sign-in.component';
import { RedirectComponent } from './redirect/redirect.component';
import { PaymentComponent } from './payment/payment.component';
// import { HighchartsChartModule } from 'highcharts-angular';
// import { HighchartsChartComponent } as 'highcharts-angular';

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
    AppraisalsHandlingComponent,
    DeleteUserComponent,
    ForumMenuComponent,
    NewTopicDialogComponent,
    TopicComponent,
    NotificationComponent,
    StatisticsAppraiserRatingComponent,
    StatisticsAppraisalComponent,
    StatisticsUserComponent,
    GoogleSignInComponent,
    RedirectComponent,
    PaymentComponent
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
    MatDialogModule,


    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
