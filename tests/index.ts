import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { describe, test } from 'node:test';
import type { Report } from './types';

const getReport = async (name: string): Promise<Report> =>
  JSON.parse(await readFile(`./tests/${name}.report.json`, 'utf-8'));

const testsByFixture = (report: Report, fixtureName: string) =>
  report.fixtures.find((fixture) => fixture.name === fixtureName)?.tests;

describe('Defaults', () => {
  test('It appends index to the test name by default', async () => {
    const testNames = testsByFixture(await getReport('default'), 'Default')?.flatMap((test) =>
      !test.skipped && test.name.includes('Default') ? [test.name] : [],
    );
    assert.deepEqual(testNames, ['Default 1', 'Default 2', 'Default 3']);
  });

  test('It skips other tests', async () => {
    const testNames = testsByFixture(await getReport('default'), 'Default')?.flatMap((test) =>
      !test.skipped && test.name.includes('Should not run') ? [test.name] : [],
    );
    assert.deepEqual(testNames, []);
  });
});

describe('No rename', () => {
  test('Allows to disable renaming', async () => {
    const testNames = testsByFixture(await getReport('no-rename'), 'No rename')?.flatMap((test) =>
      !test.skipped && test.name.includes('No rename') ? [test.name] : [],
    );
    assert.deepEqual(testNames, ['No rename', 'No rename']);
  });
});

describe('ESM', () => {
  test('Works in ESM TestCafe mode', async () => {
    const testNames = testsByFixture(await getReport('esm'), 'ESM')?.flatMap((test) =>
      !test.skipped && test.name.includes('ESM') ? [test.name] : [],
    );
    assert.deepEqual(testNames, ['ESM 1', 'ESM 2']);
  });
});
