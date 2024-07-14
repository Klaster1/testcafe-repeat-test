import repeatTest from '../../src';

fixture('Default');

repeatTest(3);
test('Default', async (t) => {});

test('Should not run', async () => {});
