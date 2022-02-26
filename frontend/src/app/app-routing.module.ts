import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppraiserComponent } from './appraiser/appraiser.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { CurrentAppraisalsComponent } from './current-appraisals/current-appraisals.component';
import { NewAppraisalComponent } from './new-appraisal/new-appraisal.component';
import { HistoryComponent } from './history/history.component';
import { ArtForAppraisalComponent } from './art-for-appraisal/art-for-appraisal.component';
import { AppraiserChangeMindComponent } from './appraiser-change-mind/appraiser-change-mind.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AppraisalsHandlingComponent } from './appraisals-handling/appraisals-handling.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [


  {path:'', redirectTo: 'login',  pathMatch: 'full'},
  {path:'login', component : LoginComponent },  
  {path:'user', component : UserComponent },
  {path:'appraiser', component : AppraiserComponent },
  {path:'admin', component : AdminComponent },
  {path:'register', component : RegisterComponent },
  {path:'new-appraisal', component : NewAppraisalComponent },
  {path:'current-appraisals', component : CurrentAppraisalsComponent },
  {path:'history', component : HistoryComponent },
  {path:'forum', component : ForumComponent },
  {path:'art-for-appraisal', component : ArtForAppraisalComponent},
  {path:'appraiser-change-mind', component : AppraiserChangeMindComponent},
  {path:'change-password', component : ChangePasswordComponent},
  {path:'statistics', component : StatisticsComponent},
  {path:'appraisals-handling', component : AppraisalsHandlingComponent},
  {path:'delete-user', component : DeleteUserComponent},
  {path:'forum', component : ForumComponent},
  {path:'topic/:name',  component : TopicComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 


// this._router.navigate(['SecondComponent', {p1: this.property1, p2: property2 }]);
// whereas the definition of the link with parameters would be

// @RouteConfig([
//       // ...
//       { path: '/SecondComponent/:p1:p2', name: 'SecondComponent', component: SecondComponent} 
// )]