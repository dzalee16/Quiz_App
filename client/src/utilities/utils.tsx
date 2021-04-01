export const handleShuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const formatTime = (time: any) => {
  let min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (time % 60).toString().padStart(2, "0");

  return `${min}:${seconds}`;
};
