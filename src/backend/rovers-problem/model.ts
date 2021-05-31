import { Position } from './position';

export interface ProblemSolution {
  roverSolutions: FullPosition[];
}

export interface FullPosition {
  orientation: string;
  position: Position;
}

export interface ProblemDescription {
  plateauRange: Position;
  rovers: RoverDescription[];
}

interface RoverDescription {
  fullPosition: FullPosition;
  commands: string;
}
