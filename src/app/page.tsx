import Image from "next/image";
import Leaderboard from '../component/Leaderboard';

export default function Home() {
  return (
   <main className="w-full flex flex-col mt-[4rem]">
    <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white to-[#ccc]">Record your lifts.</h1>
        <h2 className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-[#999]">Crush your opposition.</h2>
        <p className="text-background-300 mt-2">made with ❤️ by <a href="https://github.com/wzid" className="text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-green-600 transition-opacity hover:opacity-85">cameron</a></p>
    </div>
    <div className="mt-[4rem]">
      <h1 className="mb-4 text-background-200">Testimonials</h1>
      <div className="flex gap-4">
        <Image alt="man squatting" src="/images/man.png" width={175} height={175} className="rounded-xl size-[125px] md:size-[175px]" />
        <div className="w-80">
          <h2 className="mb-2 ">Killian Boston</h2>
          <p className="text-background-400 md:text-lg">&quot;This website has helped me tremendously in my personal fitness journey&quot;</p>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <Leaderboard />
    </div>

   </main>
  );
}
