import { Config } from '../Models/config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from '../Models/table';

@Component({
  selector: 'app-initial-table',
  templateUrl: './initial-table.component.html',
  styleUrls: ['./initial-table.component.css'],
})
export class InitialTableComponent implements OnInit {
  table: Table = new Table();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public submitInitialState(): void {
    Config.initialState = this.table;
    this.router.navigate(['goalState']);
  }
}
