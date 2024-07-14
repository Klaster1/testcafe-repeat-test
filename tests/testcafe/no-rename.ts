import repeatTest from '../../src';

fixture`No rename`;

repeatTest(2, { rename: false });
test('No rename', async (t) => {});
