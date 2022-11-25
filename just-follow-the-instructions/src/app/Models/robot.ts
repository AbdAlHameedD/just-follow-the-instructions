import { Slot } from './slot';
import { Config } from './config';
import { Cube } from './cube';
import { Table } from './table';

export class Robot {
  // Properties
  public holdingCube: Cube | undefined;
  private SLOT_CONSTANT = 155;
  private table: Table = Config.initialState!;

  // Methods
  constructor() {
    this.f();
  }

  public async f() {
    console.log(this.table.equals(Config.goalState!));
    console.log(Config.initialState?.getSlots());
    console.log(Config.goalState?.getSlots());

    /*await this.holdCube(this.table.getSlots()[2].getPeakCube()!);
    await this.dropOff(this.table.getSlots()[17]);

    await this.holdCube(this.table.getSlots()[3].getPeakCube()!);
    await this.dropOff(this.table.getSlots()[16]);

    await this.holdCube(this.table.getSlots()[3].getPeakCube()!);
    await this.dropOff(this.table.getSlots()[17]);

    await this.holdCube(this.table.getSlots()[16].getPeakCube()!);
    await this.dropOff(this.table.getSlots()[17]);*/
  }

  /*
   * Animate robot arm in x-axis based on slot number.
   * and animate cube also if the arm is holding cube
   * Return Datatype: void
   */
  private async translateToSlot(n: number): Promise<void> {
    document.getElementById('horizontalSubArm')!.style.width = `${
      this.SLOT_CONSTANT + n * 90
    }px`;
    document.getElementById('finguresSubArm')!.style.right = `${
      this.SLOT_CONSTANT + n * 90 - 60
    }px`;

    if (this.holdingCube !== undefined) {
      this.translateCubeX(n); // Animate holding cube
    }
  }

  /*
   * Animate robot arm in y-axis based on cube deep
   * Parameter:
   *    - cubeDeep: that represent cube at any level (range: (1, 5))
   * Return Datatype: void
   */
  private async translateY(cubeDeep: number): Promise<void> {
    document.getElementById('finguresSubArm')!.style.height = `${
      105 + cubeDeep * 70
    }px`;
    document.getElementById('fingures')!.style.top = `${cubeDeep * 70 + 50}px`;
  }

  /*
   * Animate robot to default y-axis high
   * Return Datatype: void
   */
  private async defaultY(): Promise<void> {
    document.getElementById('finguresSubArm')!.style.height = `55px`;
    document.getElementById('fingures')!.style.top = `0`;
  }

  /*
   * Animate the opening robot fingers
   * Return Datatype: void
   */
  private async deployFingers(): Promise<void> {
    document
      .getElementById('right-top-sub-right-fingure')!
      .classList.add('openRightTopFinger');

    document
      .getElementById('right-bottom-sub-right-fingure')!
      .classList.add('openRightBottomFinger');

    document
      .getElementById('left-top-sub-left-fingure')!
      .classList.add('openLeftTopFinger');

    document
      .getElementById('left-bottom-sub-left-fingure')!
      .classList.add('openLeftBottomFinger');
  }

  /*
   * Animate the closing robot fingers
   * Return Datatype: void
   */
  private async withdrawalFingers(): Promise<void> {
    document
      .getElementById('right-top-sub-right-fingure')!
      .classList.remove('openRightTopFinger');

    document
      .getElementById('right-bottom-sub-right-fingure')!
      .classList.remove('openRightBottomFinger');

    document
      .getElementById('left-top-sub-left-fingure')!
      .classList.remove('openLeftTopFinger');

    document
      .getElementById('left-bottom-sub-left-fingure')!
      .classList.remove('openLeftBottomFinger');
  }

  /*
   * Manage all process for holding cube
   * Parameter:
   *    - cube: that represent cube needed to hold
   * Return Datatype: void
   */
  public async holdCube(cube: Cube): Promise<void> {
    const cubePosition: number = cube.getSlot()?.getNumberOfCubes()!;
    const cubeDeep: number = 6 - cubePosition;

    await delay(500);
    // Animate robot arm x-axis
    this.translateToSlot(cube.getSlotNumber());
    await delay(5000);

    // Animate robot arm y-axis
    this.translateY(cubeDeep);
    await delay(5000);

    // Animate opening robot fingers
    this.deployFingers();
    await delay(3000);

    // Animate robot arm to default high
    this.defaultY();
    // Animate cube translation y-axis
    this.translateCubeY(cube.getLabel(), cubeDeep);
    await delay(5000);

    cube.getSlot()!.popCube(); // remove holding cube from slot
    this.holdingCube = cube;
  }

  /*
   * Manage all process for droping off cube
   * Parameter:
   *    - slot: that represent destination slot
   * Return Datatype: void
   */
  public async dropOff(slot: Slot): Promise<void> {
    // Animate robot arm x-axis
    this.translateToSlot(slot.getSlotNumber());
    // Animate cube translation x-axis
    this.translateCubeX(slot.getSlotNumber());
    await delay(5000);

    // Animate droping off cube
    this.dropOffCube(slot);
    await delay(5000);

    // Animate closing robot fingers
    this.withdrawalFingers();
    await delay(3000);

    // Animate robot arm to default high
    this.defaultY();
    await delay(5000);

    slot.appendCube(this.holdingCube!); // add new cube to slot
    this.holdingCube = undefined;
  }

  /*
   * Animate cube translation in y-axis
   * Parameters:
   *    - cubeLabel: that represent label of the cube
   *    - cubePosition: that represent cube position (range(1, 5))
   * Return Datatype: void
   */
  private translateCubeY(cubeLabel: string, cubePosition: number): void {
    const cubeElement: HTMLElement = <HTMLElement>(
      document.getElementById(cubeLabel)
    );
    const amountOfYTranslate: number = 50 + cubePosition * 70;
    cubeElement.style.bottom = `${amountOfYTranslate}px`;
  }

  /*
   * Animate droping off cube
   * Parameter:
   *    - slot: that represent destination slot
   * Return Datatype: void
   */
  private async dropOffCube(slot: Slot): Promise<void> {
    const slotElement: HTMLElement = <HTMLElement>(
      document.getElementById(`${slot.getSlotNumber()}`)
    );

    const cubeElement: HTMLElement = <HTMLElement>(
      document.getElementById(`${this.holdingCube?.getLabel()}`)
    );

    document
      .getElementById(`${this.holdingCube?.getSlotNumber()}`)
      ?.removeChild(cubeElement);
    slotElement.appendChild(cubeElement);
    cubeElement.style.left = '0';
    cubeElement.style.transition = '0';
    cubeElement.style.bottom = `${400 - 70 * slot.getNumberOfCubes()}px`;
    await delay(100);
    this.translateY(6 - (slot.getNumberOfCubes() + 1));
    cubeElement.style.transition = '5s';
    cubeElement.style.bottom = `0`;
  }

  /*
   * Animate cube translation in x-axis
   * Parameter:
   *    - slotNumber: that represent slot number destination
   * Return Datatype: void
   */
  private translateCubeX(slotNumber: number): void {
    const cubeLabel: string = this.holdingCube!.getLabel();
    let differ: number = 0;

    const cubeElement: HTMLElement = <HTMLElement>(
      document.getElementById(cubeLabel)
    );

    if (slotNumber < this.holdingCube!.getSlotNumber()) {
      differ = this.holdingCube!.getSlotNumber() - slotNumber;
      cubeElement.style.left = `${90 * differ}px`;
    } else {
      differ = slotNumber - this.holdingCube!.getSlotNumber();
      cubeElement.style.left = `-${90 * differ}px`;
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
