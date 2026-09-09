import { BlueButton } from "./blueButton";

export default function ScrollIntoView({ targetRef, text }) {
  const scrollOnClick = () => {
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return <BlueButton buttonClick={scrollOnClick} buttonText={text} />;
}
