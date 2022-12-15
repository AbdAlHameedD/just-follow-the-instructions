import { Cube } from './cube';
import { Slot } from './slot';

export class Table {
  // Properties
  private slots: Slot[] = [];
  private totalNumberOfCubes: number = 0;
  private borderColors = [
    '004ef5',
    'ED760E',
    'D95030',
    '955F20',
    '2E3A23',
    '1B5583',
    'D6AE01',
    '8A6642',
    'C35831',
    '6D3F5B',
    'F3A505',
    'A18594',
    '8E402A',
    '6F4F28',
    '025669',
    'E1CC4F',
    'CDA434',
    '3B83BD',
    '317F43',
    'CC0605',
    '721422',
    '412227',
    'CF3476',
    '6747C1',
    '005B5B',
    '866000',
  ];
  private availableLabels: string[] = [
    'z',
    'y',
    'x',
    'w',
    'v',
    'u',
    't',
    's',
    'r',
    'q',
    'p',
    'o',
    'n',
    'm',
    'l',
    'k',
    'j',
    'i',
    'h',
    'g',
    'f',
    'e',
    'd',
    'c',
    'b',
    'a',
    'Z',
    'Y',
    'X',
    'W',
    'V',
    'U',
    'T',
    'S',
    'R',
    'Q',
    'P',
    'O',
    'N',
    'M',
    'L',
    'K',
    'J',
    'I',
    'H',
    'G',
    'F',
    'E',
    'D',
    'C',
    'B',
    'A',
  ];

  // Methods
  constructor(totalNumberOfCubes: number = 0) {
    this.totalNumberOfCubes = totalNumberOfCubes;

    for (let i = 18; i > 0; i--) {
      this.slots.push(new Slot(i));
    }
  }

  public getSlots(): Slot[] {
    return this.slots;
  }

  public getTotalNumberOfCubes(): number {
    return this.totalNumberOfCubes;
  }

  public increaseTotalNumberOfCubes(): void {
    this.totalNumberOfCubes++;
  }

  public decreaseTotalNumberOfCubes(): void {
    this.totalNumberOfCubes--;
  }

  public getLabel(): string {
    return this.availableLabels.pop()!;
  }

  public setAvailableLabels(availableLabels: string[]): void {
    this.availableLabels = availableLabels;
  }

  public addLabel(label: string): void {
    this.availableLabels.push(label);
  }

  public getRandomBorderColor(): string {
    const randomIndex = Math.floor(Math.random() * this.borderColors.length);

    return this.borderColors[randomIndex];
  }

  public equals(table: Table): boolean {
    for (let i = 0; i < 18; i++) {
      if (!this.slots[i].equals(table.slots[i])) return false;
    }

    return true;
  }

  public getCube(label: string): Cube | void {
    for (let slot of this.slots) {
      const cube: Cube | undefined = slot.getCube(label);
      if (cube) return cube;
    }
  }
}
