import { Cube } from './cube';

export class Slot {
  private slotNumber: number = -1;
  private cubes: Cube[] = [];
  private status: SlotStatus = SlotStatus.Open;

  constructor(slotNumber: number) {
    this.slotNumber = slotNumber;
  }

  public getSlotNumber(): number {
    return this.slotNumber;
  }

  public getNumberOfCubes(): number {
    return this.cubes.length;
  }

  public getCubes(): Cube[] {
    return this.cubes;
  }

  public isEmpty(): boolean {
    return this.getNumberOfCubes() == 0;
  }

  public closeSlot(): void {
    this.status = SlotStatus.Closed;
  }

  public openSlot(): void {
    this.status = SlotStatus.Open;
  }

  public isClosedSlot(): boolean {
    return this.status === SlotStatus.Closed;
  }

  public isFull(): boolean {
    return this.getNumberOfCubes() == 5;
  }

  public appendCube(cube: Cube): void {
    this.isEmpty() ? cube.putDown(this) : cube.stack(this.getPeakCube()!);

    this.cubes.push(cube);
  }

  public popCube(): void {
    this.getCubes().length == 1
      ? this.cubes[0].pickUp()
      : this.cubes[this.cubes.length - 1].unStack(
          this.cubes[this.cubes.length - 2]
        );

    this.cubes.pop();
  }

  public getPeakCube(): Cube | undefined {
    return !this.isEmpty()
      ? this.cubes[this.getNumberOfCubes() - 1]
      : undefined;
  }

  public getBaseCube(): Cube | undefined {
    return !this.isEmpty() ? this.cubes[0] : undefined;
  }

  public getCube(label: string): Cube | undefined {
    return this.cubes.find((cube: Cube) => cube.getLabel() == label);
  }

  public equals(slot: Slot): boolean {
    if (this.equalSlotLengthAndSlotNumber(slot)) {
      return this.equalCubesInTheSlot(slot.getCubes());
    }

    return false;
  }

  private equalSlotLengthAndSlotNumber(slot: Slot): boolean {
    return (
      slot.getNumberOfCubes() == this.getNumberOfCubes() &&
      this.equalSlotNumber(slot.getSlotNumber())
    );
  }

  private equalSlotNumber(slotNumber: number): boolean {
    return this.getSlotNumber() == slotNumber;
  }

  private equalCubesInTheSlot(cubes: Cube[]): boolean {
    let numberOfCubesInSlot = cubes.length;
    for (let i: number = 0; i < numberOfCubesInSlot; i++) {
      if (!this.cubes[i].equals(cubes[i])) return false;
    }

    return true;
  }
}

enum SlotStatus {
  Closed,
  Open,
}
