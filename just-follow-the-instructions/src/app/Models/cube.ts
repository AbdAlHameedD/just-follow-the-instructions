import { Slot } from './slot';

export class Cube {
  // Properties
  private label: string = '';
  private slot: Slot | undefined;
  private onCube: Cube | undefined;

  public isHold: boolean = false;
  public isOnTable: boolean = false;
  public isClear: boolean | undefined = false;

  // Methods
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

  /*
   * Return cube label
   * Return Datatype: string
   */
  public getLabel(): string {
    return this.label;
  }

  /*
   * Return slot that cube is in it if exists
   * Otherwise undefined
   * Return Datatype: Slot or undefined
   */
  public getSlot(): Slot | undefined {
    return this.slot;
  }

  /*
   * Return cube bottom of the current cube if exists
   * Otherwise undefined
   * Return Datatype: Slot or undefined
   */
  public getOnCube(): Cube | undefined {
    return this.onCube;
  }

  /*
   * Return slot number that cube is in it if exists
   * Otherwise -1
   * Return Datatype: number (Integer)
   */
  public getSlotNumber(): number {
    if (this.slot != undefined) {
      return this.slot.getSlotNumber();
    }
    return -1;
  }

  /*
   * Execute the pickUp predicates
   * Return Datatype: void
   */
  public pickUp(): void {
    this.isHold = true;
    this.isOnTable = false;
    this.isClear = undefined;
  }

  /*
   * Execute the putDown predicates
   * Parameter:
   *    - slot: that represent cube will putDown in that slot
   * Return Datatype: void
   */
  public putDown(slot: Slot): void {
    this.slot = slot;
    this.isOnTable = true;
    this.isHold = false;
    this.isClear = true;
  }

  /*
   * Execute the unStack predicates
   * Parameter:
   *    - cube: that represent cube bottom of the unstacked cube
   * Return Datatype: void
   */
  public unStack(cube: Cube): void {
    this.isHold = true;
    this.onCube = undefined;
    this.isClear = undefined;
    cube.isClear = true;
  }

  /*
   * Execute the stack predicates
   * Parameter:
   *    - cube: that represent cube that the current cube will stack above if it
   * Return Datatype: void
   */
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

  private equalCubeBelow(cube: Cube) {
    return this.getOnCube()?.getLabel() == cube.getOnCube()?.getLabel();
  }
}
