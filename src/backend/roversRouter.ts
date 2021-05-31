import { Router } from 'express';
import { ProblemDescription } from './rovers-problem/model';
import { ProblemSolution } from './rovers-problem/model';
import { ProblemSolver } from './rovers-problem/problem-solver';

export const roversRouter: Router = Router();

let problem: ProblemDescription;

roversRouter.post('/', (req, res) => {
  problem = req.body;
  res.status(200).send('We received the rovers and their commands');
});

roversRouter.get('/', (req, res) => {
  const solution: ProblemSolution | null = ProblemSolver.solve(problem);
  if (solution) res.status(200).send(solution);
  else throw Error('Mission failed');
});
