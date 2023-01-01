export const wait = (time: number, fun: () => void) =>
  new Promise(() => {
    setTimeout(() => {
      fun();
    }, time);
  });
