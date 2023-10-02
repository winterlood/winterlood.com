const MAX_TRY = 3;
const DELAY_MS = 500;

async function delay() {
  return new Promise((res) =>
    setTimeout(() => {
      res(undefined);
    }, DELAY_MS)
  );
}

export async function retryer<T extends (...args) => any>(
  apiFunction: T
): Promise<ReturnType<T>> {
  let cnt = 1;
  while (true) {
    try {
      return await apiFunction();
    } catch (err) {
      if (cnt === MAX_TRY) {
        throw new Error();
      }
      cnt++;
      await delay();
    }
  }
}
