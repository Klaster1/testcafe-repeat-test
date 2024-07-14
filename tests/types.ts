export interface Test {
  name: string;
  meta: Record<string, unknown>;
  errs: unknown[];
  durationMs: number;
  unstable: boolean;
  screenshotPath: string | null;
  skipped: boolean;
}

export interface Fixture {
  name: string;
  path: string;
  meta: Record<string, unknown>;
  tests: Test[];
}

export interface Report {
  startTime: string;
  endTime: string;
  userAgents: string[];
  passed: number;
  total: number;
  skipped: number;
  fixtures: Fixture[];
  warnings: unknown[];
}
