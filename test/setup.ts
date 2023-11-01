import { rm } from 'fs/promises';
import { join } from 'path';

// With this function we delete the test.sqlite db file every time we run the dest, otherwise we get error the second time we run the test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});
