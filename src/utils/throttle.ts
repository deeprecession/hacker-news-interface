export const throttle = <R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number,
): ((...args: A) => R | undefined) => {
  let wait = false;

  return (...args: A) => {
    if (wait) return undefined;

    const val = fn(...args);

    wait = true;

    window.setTimeout(() => {
      wait = false;
    }, delay);

    return val;
  };
};

export default throttle;
