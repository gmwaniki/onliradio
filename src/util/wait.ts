export const wait = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0);
    }, time);
  });
