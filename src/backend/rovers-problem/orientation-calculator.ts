export class OrientationCalculator {
  static cps: string[] = ['N', 'W', 'S', 'E'];
  static cpIndex: number;

  static start(startCP: string): void {
    this.cpIndex = this.cps.indexOf(startCP);
  }

  static rotateClockWise(): string {
    if (this.cpIndex == this.cps.length - 1) {
      this.cpIndex = 0;
    } else {
      this.cpIndex++;
    }
    return this.get();
  }

  static rotateCounterClockWise(): string {
    if (this.cpIndex == 0) {
      this.cpIndex = this.cps.length - 1;
    } else {
      this.cpIndex--;
    }
    return this.get();
  }

  static get(): string {
    return this.cps[this.cpIndex];
  }
}
