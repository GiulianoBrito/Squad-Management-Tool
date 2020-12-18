import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamViewComponent } from './team-view/team-view.component';

const routes: Routes = [
  {
    path: 'edit',
    component: TeamEditComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: TeamViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
