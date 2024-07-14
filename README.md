[![Support Ukraine Badge](https://bit.ly/support-ukraine-now)](https://github.com/support-ukraine/support-ukraine)
[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

# TestCafe repeat test

A tool to ergonomically repeat a specific TestCafe test and skip other tests. Useful for debugging unstable tests.

## Usage notes

Test repeater only works if you use the globally available function and do not import it from TestCafe:

```
// Works
repeatTest(2)
test('Test', async t => {})
```

```
// Doesn't work
import {test} from 'testcafe'

repeatTest(2)
test('Test', async t => {})
```

## Examples:

```lang: typescript
import repeatTest from '@klaster_1/testcafe-repeat-test';

fixture`Demo`

repeatTest(3)
test('Demo', async (t) => {
  console.log('Hello world')
})

// Log:
// Default
// √ Demo 1
// √ Demo 2
// √ Demo 3
```

```lang: typescript
import repeatTest from '@klaster_1/testcafe-repeat-test';

fixture`Demo`

repeatTest(2, {rename: false})
test('Demo', async (t) => {
  console.log('Hello world')
})

// Log:
// Default
// √ Demo
// √ Demo
```
