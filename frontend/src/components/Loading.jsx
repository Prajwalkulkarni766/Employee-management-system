import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading() {
  return (
    <ScaleLoader
      color="#36d7b7"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    />
  );
}
