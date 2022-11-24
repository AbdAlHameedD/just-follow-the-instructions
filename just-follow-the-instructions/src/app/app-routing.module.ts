import { TableComponent } from './table/table.component';
import { GoalTableComponent } from './goal-table/goal-table.component';
import { InitialTableComponent } from './initial-table/initial-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InitialTableComponent,
  },
  {
    path: 'goalState',
    component: GoalTableComponent,
  },
  {
    path: 'justFollowTheInstructions',
    component: TableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
