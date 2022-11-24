import { InitialSlotComponent } from './initial-table/initial-slot/initial-slot.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RobotComponent } from './robot/robot.component';
import { TableComponent } from './table/table.component';
import { SlotComponent } from './table/slot/slot.component';
import { FooterComponent } from './footer/footer.component';
import { InitialTableComponent } from './initial-table/initial-table.component';
import { GoalTableComponent } from './goal-table/goal-table.component';
import { GoalSlotComponent } from './goal-table/goal-slot/goal-slot.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    RobotComponent,
    TableComponent,
    SlotComponent,
    FooterComponent,
    InitialTableComponent,
    InitialSlotComponent,
    GoalTableComponent,
    GoalTableComponent,
    GoalSlotComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
