import { style } from '@angular/animations';
import { Table } from './table';

export class Config {
  public static initialState: Table | undefined;
  public static goalState: Table | undefined;
  public static fingersTransition: number = 50;
  public static robotArmTransition: number = 100;

  public static configureRobotArmTransition(): void {
    const subArmElements: NodeList = document.querySelectorAll('.sub-arm');

    for (let i = 0; i < subArmElements.length; i++) {
      let subArmElement: HTMLElement = <HTMLElement>subArmElements[i];
      subArmElement.style.transition = `${Config.robotArmTransition / 1000}s`;
    }
  }
}
