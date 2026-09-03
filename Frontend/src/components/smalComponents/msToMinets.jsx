export function MsToMinets({ ms }) {
  const minMs = Math.max(0, ms);

  const totalSeconds = Math.ceil(minMs / 1000);
  const min = Math.ceil(totalSeconds / 60);
  const sec = totalSeconds % 60;

  const format = `${min}:${sec}${sec < 10 ? "0" : ""}`;
  return <p>{format}</p>;
}
