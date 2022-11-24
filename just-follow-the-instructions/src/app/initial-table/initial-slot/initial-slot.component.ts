import { Component, Input, OnInit } from '@angular/core';
import { Cube } from 'src/app/Models/cube';
import { Slot } from 'src/app/Models/slot';
import { Table } from 'src/app/Models/table';

@Component({
  selector: 'app-initial-slot',
  templateUrl: './initial-slot.component.html',
  styleUrls: ['./initial-slot.component.css'],
})
export class InitialSlotComponent implements OnInit {
  @Input() canEditCubes: boolean = true;
  @Input() slotNumber: number = -1;
  @Input() slot: Slot | undefined;
  @Input() table: Table | undefined;

  constructor() {}

  ngOnInit(): void {}

  public addCube(): void {
    if (!this.slot?.isFull() && this.table?.getTotalNumberOfCubes()! < 52) {
      const newCube: Cube = new Cube(
        this.table!.getLabel(),
        this.slot!.isEmpty(),
        this.slot!,
        this.slot?.getPeakCube()
      );

      this.slot?.appendCube(newCube);
      this.table?.increaseTotalNumberOfCubes();
      this.createCubeContainer(newCube);
      this.updateCubeFunctions();
    }
  }

  public removeCube(): void {
    if (!this.slot?.isEmpty()) {
      document
        .getElementById(`${this.slot?.getPeakCube()?.getLabel()}`)
        ?.remove();

      this.table?.addLabel(this.slot?.getPeakCube()?.getLabel()!);
      this.slot?.popCube();
      this.updateCubeFunctions();
      this.table?.decreaseTotalNumberOfCubes();
    }
  }

  public updateCubeFunctions(): void {
    this.slot?.isFull() ? this.disableAddCubeFunc() : this.enableAddCubeFunc();

    this.slot?.isEmpty()
      ? this.disableRemoveCubeFunc()
      : this.enableRemoveCubeFunc();
  }

  private disableAddCubeFunc(): void {
    const addCubeButtonElement: HTMLElement = <HTMLElement>(
      document.getElementById(`${this.slotNumber}-add`)
    );

    addCubeButtonElement.classList.remove('enable-add');
    addCubeButtonElement.classList.add('disable-add');
  }

  private enableAddCubeFunc(): void {
    const addCubeButtonElement: HTMLElement = <HTMLElement>(
      document.getElementById(`${this.slotNumber}-add`)
    );

    addCubeButtonElement.classList.add('enable-add');
    addCubeButtonElement.classList.remove('disable-add');
  }

  private disableRemoveCubeFunc(): void {
    const removeCubeButtonElement: HTMLElement = <HTMLElement>(
      document.getElementById(`${this.slotNumber}-remove`)
    );

    removeCubeButtonElement.classList.add('disable-remove');
    removeCubeButtonElement.classList.remove('enable-remove');
  }

  private enableRemoveCubeFunc(): void {
    const removeCubeButtonElement: HTMLElement = <HTMLElement>(
      document.getElementById(`${this.slotNumber}-remove`)
    );

    removeCubeButtonElement.classList.remove('disable-remove');
    removeCubeButtonElement.classList.add('enable-remove');
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
