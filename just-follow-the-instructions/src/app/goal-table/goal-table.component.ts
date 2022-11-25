import { Router } from '@angular/router';
import { Config } from './../Models/config';
import { Slot } from './../Models/slot';
import { Cube } from './../Models/cube';
import { Component, OnInit } from '@angular/core';
import { Table } from '../Models/table';

@Component({
  selector: 'app-goal-table',
  templateUrl: './goal-table.component.html',
  styleUrls: ['./goal-table.component.css'],
})
export class GoalTableComponent implements OnInit {
  table: Table = new Table();
  private allCubesLabels: string[] = [];

  constructor(private router: Router) {
    // Get cubes labels that used in initial state
    Config.initialState!.getSlots().forEach((slot: Slot) => {
      slot.getCubes().forEach((cube: Cube) => {
        this.allCubesLabels.push(cube.getLabel());
      });
    });

    this.table.setAvailableLabels(this.allCubesLabels.sort().reverse());
  }

  ngOnInit(): void {}

  public submitGoalState(): void {
    if (this.goalTableCubesNumberEqualsInitialTableCubesNumber()) {
      Config.goalState = this.table;
      this.router.navigate(['justFollowTheInstructions']);
    }
  }

  public goalTableCubesNumberEqualsInitialTableCubesNumber(): boolean {
    return (
      this.table.getTotalNumberOfCubes() ==
      Config.initialState?.getTotalNumberOfCubes()
    );
  }
}
