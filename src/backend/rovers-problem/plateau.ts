import { Position } from './position';

export class Plateau {
  height: number;
  width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  isMoveAvailable(p: Position): boolean {
    return p.x >= 0 && p.x < this.height && p.y >= 0 && p.y < this.width;
  }
}
