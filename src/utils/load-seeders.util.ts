import { glob } from 'glob';
import * as path from 'path';

export function loadSeeders(directory: string) {
  const seeders = [];
  const files = glob.sync(path.resolve(directory, '*.seeder.ts'));
  
  for (const file of files) {
    const module = require(file);
    const seederClass = Object.values(module)[0];
    seeders.push(seederClass);
  }
  
  return seeders;
}
