export const wait = (time: number, fun: () => void) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      fun();
    }, time);
  });
