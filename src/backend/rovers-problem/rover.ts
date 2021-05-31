import { Position } from './position';
import { OrientationCalculator } from './orientation-calculator';
import { Plateau } from './plateau';

export class Rover {
  p: Position;
  o: string;
  plateau: Plateau;
  illegalState = false;

  constructor(
    initialPosition: Position,
    initialOrientation: string,
    plateau: Plateau
  ) {
    this.p = initialPosition;
    this.o = initialOrientation;
    this.plateau = plateau;
  }

  makeTour(commands: string): void {
    OrientationCalculator.start(this.o);
    if (!this.plateau.isMoveAvailable(this.p)) this.illegalState = true;
    for (let i = 0; i < commands.length; i++) {
      this.makeMove(commands.charAt(i));
      if (!this.plateau.isMoveAvailable(this.p)) this.illegalState = true;
    }
  }

  makeMove(command: string): void {
    switch (command) {
      case 'M': {
        this.moveForward();
        break;
      }

      case 'L': {
        this.o = OrientationCalculator.rotateCounterClockWise();
        break;
      }

      case 'R': {
        this.o = OrientationCalculator.rotateClockWise();
        break;
      }
    }
  }

  moveForward(): void {
    switch (OrientationCalculator.get()) {
      case 'N': {
        this.p.y += 1;
        break;
      }
      case 'E': {
        this.p.x -= 1;
        break;
      }
      case 'S': {
        this.p.y -= 1;
        break;
      }
      case 'W': {
        this.p.x += 1;
        break;
      }
    }
  }
}
