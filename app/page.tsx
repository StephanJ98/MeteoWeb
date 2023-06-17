import Body from "@/components/Body/Body";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Toaster />
      <Header darkTheme={true} />
      <Body darkTheme={true} />
    </div>
  )
}
