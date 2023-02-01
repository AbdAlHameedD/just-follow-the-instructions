import { Slot } from './slot';

export class Cube {
  private label: string = '';
  private slot: Slot | undefined;
  private onCube: Cube | undefined;

  public isHold: boolean = false;
  public isOnTable: boolean = false;
  public isClear: boolean | undefined = false;

  constructor(
    label: string,
    isOnTable: boolean,
    slot: Slot,
    onCube: Cube | undefined = undefined
  ) {
    this.label = label;
    this.isOnTable = this.isOnTable;
    this.slot = slot;
    this.onCube = onCube;
  }

  public getLabel(): string {
    return this.label;
  }

  public getSlot(): Slot | undefined {
    return this.slot;
  }

  public getOnCube(): Cube | undefined {
    return this.onCube;
  }

  public getSlotNumber(): number {
    if (this.slot != undefined) {
      return this.slot.getSlotNumber();
    }
    return -1;
  }

  public pickUp(): void {
    this.isHold = true;
    this.isOnTable = false;
    this.isClear = undefined;
  }

  public putDown(slot: Slot): void {
    this.slot = slot;
    this.isOnTable = true;
    this.isHold = false;
    this.isClear = true;
  }

  public unStack(cube: Cube): void {
    this.isHold = true;
    this.onCube = undefined;
    this.isClear = undefined;
    cube.isClear = true;
  }

  public stack(cube: Cube): void {
    this.slot = cube.slot;
    this.isHold = false;
    this.onCube = cube;
    this.isClear = true;
    cube.isClear = false;
  }

  public equals(cube: Cube): boolean {
    return (
      this.equalLabels(cube.getLabel()) &&
      this.equalSlotNumber(cube.getSlotNumber()) &&
      this.equalCubeBelow(cube)
    );
  }

  private equalLabels(label: string): boolean {
    return label == this.getLabel();
  }

  private equalSlotNumber(slotNumber: number): boolean {
    return this.getSlotNumber() == slotNumber;
  }

  private equalCubeBelow(cube: Cube): boolean {
    return this.getOnCube()?.getLabel() == cube.getOnCube()?.getLabel();
  }
}
