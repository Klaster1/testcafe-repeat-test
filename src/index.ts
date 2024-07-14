/// <reference types="testcafe" />

/**
 * Repeats a test multiple times and skips other tests.
 * @param times - The number of times to repeat the test.
 * @param options.rename - Whether to rename the test with an index.
 */
const repeatTest = (times: number, options?: { rename?: boolean }): void => {
  const testDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'test');
  if (!testDescriptor) return;
  const tests: TestFn[] = [];
  Object.defineProperty(globalThis, 'test', {
    get() {
      Object.defineProperty(globalThis, 'test', testDescriptor);

      const makeTest = testDescriptor.get as any;
      const testInstance = makeTest();
      function proxyInstance(name: string, fn: any) {
        for (let i = 1; i <= times; i++) {
          const instance = makeTest();
          const testName = (options?.rename ?? true) ? `${name} ${i}` : name;
          tests.push(instance.only(testName, fn));
        }
        testInstance(name, fn);
        return proxyInstance;
      }
      const skip = new Set(['prototype', 'length', 'name']);
      for (const [property, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(testInstance))) {
        if (skip.has(property)) continue;
        if (descriptor.get === undefined) {
          Object.defineProperty(proxyInstance, property, {
            get() {
              return testInstance[property];
            },
          });
        } else {
          Object.defineProperty(proxyInstance, property, {
            get: () => {
              const method = descriptor.get?.();
              if (method.name !== 'apiOrigin') {
                return (...args: any[]) => {
                  method(...args);
                  tests.forEach((test: any) => test[property](...args));
                  return proxyInstance;
                };
              } else {
                tests.forEach((test: any) => test[property]());
                return proxyInstance;
              }
            },
          });
        }
      }
      return proxyInstance;
    },
  });
};

export default repeatTest;
