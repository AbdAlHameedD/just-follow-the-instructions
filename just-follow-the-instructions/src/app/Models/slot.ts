import { Cube } from './cube';

export class Slot {
  // Properties
  private slotNumber: number = -1;
  private cubes: Cube[] = [];

  // Methods
  constructor(slotNumber: number) {
    this.slotNumber = slotNumber;
  }

  /*
   * Return number of slot
   * Return Datatype: Number (Integer)
   */
  public getSlotNumber(): number {
    return this.slotNumber;
  }

  /*
   * Return number that represent number of cubes in the slot
   * Return Datatype: Number (Integer)
   */
  public getNumberOfCubes(): number {
    return this.cubes.length;
  }

  /*
   * Return array of cubes that slot contains
   * Return Datatype: Array of Cube
   */
  public getCubes(): Cube[] {
    return this.cubes;
  }

  /*
   * Check if the slot is empty (cubes array length is equal 0)
   * Return Datatype: boolean
   * Return true if length equal 0, otherwise false
   */
  public isEmpty(): boolean {
    return this.getNumberOfCubes() == 0;
  }

  /*
   * Check if the slot is full (cubes array length is equal 5)
   * Return Datatype: boolean
   * Return true if length equal 5, otherwise false
   */
  public isFull(): boolean {
    return this.getNumberOfCubes() == 5;
  }

  /*
   * if slot is empty then execute putDown method
   * otherwise execute stack method
   * and add the cube to the slot
   * and increase the size of slot by 1
   */
  public appendCube(cube: Cube): void {
    this.isEmpty() ? cube.putDown(this) : cube.stack(this.getPeakCube()!);

    this.cubes.push(cube);
  }

  /*
   * if only one cube in the slot then execute pickup method
   * otherwise execute unStack method
   * and remove the cube from the slot
   * and decrease the size of slot by 1
   */
  public popCube(): void {
    this.getCubes().length == 1
      ? this.cubes[0].pickUp()
      : this.cubes[this.cubes.length - 1].unStack(
          this.cubes[this.cubes.length - 2]
        );

    this.cubes.pop();
  }

  /*
   * Return the last cube added on the slot
   * Return Datatype: Cube or undefined
   * Return cube if cubes in slot not empty
   * Otherwise undefined
   */
  public getPeakCube(): Cube | undefined {
    return !this.isEmpty()
      ? this.cubes[this.getNumberOfCubes() - 1]
      : undefined;
  }

  /*
   * Return the first cube added on the slot
   * Return Datatype: Cube or undefined
   * Return cube if cubes in slot not empty
   * Otherwise undefined
   */
  public getBaseCube(): Cube | undefined {
    return !this.isEmpty() ? this.cubes[0] : undefined;
  }

  /*
   * Return the cube that cube label equal the label parameter
   * Return Datatype: Cube or undefined
   * Return cube if cubes in slot not empty
   * Otherwise undefined
   */
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
