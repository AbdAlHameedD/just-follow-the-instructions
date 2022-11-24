import { Spinner } from './../Models/spinner';
import { Config } from './../Models/config';
import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../Models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public initialStateTable: Table = Config.initialState!;

  constructor() {}

  async ngOnInit(): Promise<void> {
    Spinner.show();
    await delay(3000);
    Spinner.hide();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
