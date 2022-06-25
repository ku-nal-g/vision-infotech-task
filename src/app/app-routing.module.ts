import { ShowUsersComponent } from './components/show-users/show-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent
  },
  {
    path: 'show-users',
    component: ShowUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
