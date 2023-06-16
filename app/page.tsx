import Body from "@/components/Body/Body";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header darkTheme={true} />
      <Body darkTheme={true} />
    </div>
  )
}
