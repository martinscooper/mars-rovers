import { ProblemSolution, ProblemDescription, FullPosition } from './model';
import { Plateau } from './plateau';
import { Rover } from './rover';

export class ProblemSolver {
  static solve(problem: ProblemDescription): ProblemSolution | null {
    let missionFailed = false;
    const plateau = new Plateau(problem.plateauRange.x, problem.plateauRange.y);
    const roverSolutions = problem.rovers.map((roverDescription) => {
      const rover = new Rover(
        roverDescription.fullPosition.position,
        roverDescription.fullPosition.orientation,
        plateau
      );

      rover.makeTour(roverDescription.commands);
      if (rover.illegalState) {
        missionFailed = true;
      }
      const solution: FullPosition = {
        orientation: rover.o,
        position: rover.p
      };
      return solution;
    });

    return missionFailed
      ? null
      : {
          roverSolutions
        };
  }
}
