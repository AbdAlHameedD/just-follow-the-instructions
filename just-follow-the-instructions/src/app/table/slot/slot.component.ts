import { Component, Input, OnInit } from '@angular/core';
import { Cube } from 'src/app/Models/cube';
import { Slot } from 'src/app/Models/slot';
import { Table } from 'src/app/Models/table';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css'],
})
export class SlotComponent implements OnInit {
  @Input() slotNumber: number = -1;
  @Input() slot: Slot | undefined;
  @Input() table: Table | undefined;

  constructor() {}

  async ngOnInit(): Promise<void> {
    await delay(100);
    for (let i: number = 0; i < this.slot?.getNumberOfCubes()!; i++) {
      this.createCubeContainer(this.slot!.getCubes()[i]);
    }
  }

  private createCubeContainer(cube: Cube): void {
    const cubeContainer = document.createElement('div');
    cubeContainer.setAttribute('class', 'p-0 m-0');
    cubeContainer.id = `${cube.getLabel()}`;

    cubeContainer.style.borderColor = `${this.table?.getRandomBorderColor()}`;
    cubeContainer.style.width = '70px';
    cubeContainer.style.height = '70px';
    cubeContainer.style.backgroundColor = '#000';
    cubeContainer.style.boxSizing = 'border-box';
    cubeContainer.style.color = '#fff';
    cubeContainer.style.borderRadius = '3px';
    cubeContainer.style.borderWidth = '5px';
    cubeContainer.style.borderStyle = 'solid';
    cubeContainer.style.borderColor = `#${this.table?.getRandomBorderColor()}`;
    cubeContainer.style.transition = '5s';
    cubeContainer.style.position = 'relative';
    cubeContainer.style.bottom = '0';
    cubeContainer.style.left = '0';

    cubeContainer.appendChild(this.createCubeLabel(cube, cubeContainer));
    document.getElementById(`${this.slotNumber}`)!.appendChild(cubeContainer);
  }

  private createCubeLabel(cube: Cube, cubeContainer: HTMLElement): HTMLElement {
    const cubeLabel = document.createElement('h1');
    cubeLabel.setAttribute('class', 'm-0 p-0 w-100 h-100 text-center');
    cubeLabel.innerText = cube.getLabel();

    cubeLabel.style.fontSize = '3rem';
    cubeLabel.style.cursor = 'default';

    return cubeLabel;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
