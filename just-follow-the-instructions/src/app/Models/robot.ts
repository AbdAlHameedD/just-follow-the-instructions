import { Slot } from './slot';
import { Config } from './config';
import { Cube } from './cube';
import { Table } from './table';

export class Robot {
  public holdingCube: Cube | undefined;
  private SLOT_CONSTANT = 155;
  private initailState: Table = Config.initialState!;
  private goalState: Table = Config.goalState!;
  private initialSlots: Slot[] = this.initailState.getSlots();
  private goalSlots: Slot[] = this.goalState.getSlots();

  constructor() {
    this.operate();
    this.configureTransition();
  }

  public async operate(): Promise<void> {
    for (let slotNumber = 0; slotNumber < 18; slotNumber++) {
      if (!this.oppositeSlotAreEqualOrGoalSlotIsEmpty(slotNumber)) {
        this.initialSlots[slotNumber].closeSlot();
        if (!this.initialSlotIsEmpty(slotNumber)) {
          await this.emptySlot(slotNumber);
        }
        await this.orderCubes(
          this.initialSlots[slotNumber],
          this.goalSlots[slotNumber]
        );
        this.initialSlots[slotNumber].openSlot();
      }
    }
  }

  private configureTransition(): void {
    Config.configureRobotArmTransition();
  }

  private async emptySlot(slotNumber: number): Promise<void> {
    const slot: Slot = this.initialSlots[slotNumber];

    while (!slot.isEmpty() && !this.oppositeSlotAreEqual(slotNumber)) {
      await this.holdCube(slot.getPeakCube()!);
      await this.dropOff(this.findTemporarySlot()!);
    }
  }

  private oppositeCubeAreEqual(cube: Cube): boolean {
    return cube.equals(this.goalState.getCube(cube.getLabel())!);
  }

  private async orderCubes(initialSlot: Slot, goalSlot: Slot): Promise<void> {
    if (!initialSlot.getBaseCube()?.equals(goalSlot.getBaseCube()!)) {
      for (let i = 0; i < goalSlot.getNumberOfCubes(); i++) {
        if (initialSlot.equals(goalSlot)) break;
        await this.holdCube(
          this.initailState.getCube(goalSlot.getCubes()![i].getLabel())!
        );
        await this.dropOff(initialSlot);
      }
    }
  }

  private oppositeSlotAreEqualOrGoalSlotIsEmpty(slotNumber: number): boolean {
    return (
      this.oppositeSlotAreEqual(slotNumber) ||
      this.goalSlots[slotNumber].isEmpty()
    );
  }

  private oppositeSlotAreEqual(slotNumber: number): boolean {
    return this.goalSlots[slotNumber].equals(this.initialSlots[slotNumber]);
  }

  private initialSlotIsEmpty(slotNumber: number): boolean {
    return this.initialSlots[slotNumber].isEmpty();
  }

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

  private async translateY(cubeDeep: number): Promise<void> {
    document.getElementById('finguresSubArm')!.style.height = `${
      105 + cubeDeep * 70
    }px`;
    document.getElementById('fingures')!.style.top = `${cubeDeep * 70 + 50}px`;
  }

  private async defaultY(): Promise<void> {
    document.getElementById('finguresSubArm')!.style.height = `55px`;
    document.getElementById('fingures')!.style.top = `0`;
  }

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

  public async holdCube(cube: Cube): Promise<void> {
    if (!cube.isClear) await this.RemoveCubesAboveIt(cube);

    const cubePosition: number = cube.getSlot()?.getNumberOfCubes()!;
    const cubeDeep: number = 6 - cubePosition;

    await delay(100);
    // Animate robot arm x-axis
    this.translateToSlot(cube.getSlotNumber());
    await delay(Config.robotArmTransition);

    // Animate robot arm y-axis
    this.translateY(cubeDeep);
    await delay(Config.robotArmTransition);

    // Animate opening robot fingers
    this.deployFingers();
    await delay(Config.fingersTransition + 100);

    // Animate robot arm to default high
    this.defaultY();
    // Animate cube translation y-axis
    this.translateCubeY(cube.getLabel(), cubeDeep);
    await delay(Config.robotArmTransition);

    cube.getSlot()!.popCube(); // remove holding cube from slot
    this.holdingCube = cube;
  }

  private async RemoveCubesAboveIt(cube: Cube): Promise<void> {
    let slot: Slot = cube.getSlot()!;
    slot.closeSlot();
    while (!cube.isClear) {
      await this.holdCube(slot.getPeakCube()!);
      await this.dropOff(this.findTemporarySlot()!);
    }
    slot.openSlot();
  }

  private findTemporarySlot(): Slot | void {
    return this.initialSlots.find((slot: Slot): Slot | void => {
      if (!slot.isFull() && !slot.isClosedSlot()) {
        return slot;
      }
    });
  }

  public async dropOff(slot: Slot): Promise<void> {
    // Animate robot arm x-axis
    this.translateToSlot(slot.getSlotNumber());
    // Animate cube translation x-axis
    this.translateCubeX(slot.getSlotNumber());
    await delay(Config.robotArmTransition);

    // Animate droping off cube
    this.dropOffCube(slot);
    await delay(Config.robotArmTransition);

    // Animate closing robot fingers
    this.withdrawalFingers();
    await delay(Config.fingersTransition + 100);

    // Animate robot arm to default high
    this.defaultY();
    await delay(Config.robotArmTransition);

    slot.appendCube(this.holdingCube!); // add new cube to slot
    this.holdingCube = undefined;
  }

  private translateCubeY(cubeLabel: string, cubePosition: number): void {
    const cubeElement: HTMLElement = <HTMLElement>(
      document.getElementById(cubeLabel)
    );
    const amountOfYTranslate: number = 50 + cubePosition * 70;

    cubeElement.style.transition = `${Config.robotArmTransition / 1000}s`;
    cubeElement.style.bottom = `${amountOfYTranslate}px`;
  }

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
    cubeElement.style.transition = `${Config.robotArmTransition / 1000}s`;
    cubeElement.style.bottom = `0`;
  }

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
