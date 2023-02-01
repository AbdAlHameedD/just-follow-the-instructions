import { Robot } from './../Models/robot';
import { Cube } from './../Models/cube';
import { Config } from './../Models/config';
import { Table } from './../Models/table';
import { TableComponent } from './../table/table.component';
import { Component, destroyPlatform, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css'],
})
export class RobotComponent implements OnInit {
  private robot: Robot | undefined;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.robot = new Robot();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
