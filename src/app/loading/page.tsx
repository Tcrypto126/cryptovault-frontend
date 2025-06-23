import { FourSquare } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131212c4] z-50 w-full h-full">
      <FourSquare
        color="#8a69ee"
        size="large"
        text="Loading..."
        textColor="#fff"
      />
    </div>
  );
}
