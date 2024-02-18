import Image from "next/image";
import Leaderboard from '../component/Leaderboard';

export default function Home() {
  return (
   <main className="w-full flex flex-col mt-[5rem]">
    <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-blue-600">Record your lifts</h1>
        <h2 className="text-4xl">Increase your <span className="text-[#ff6f6f]">cyber</span> skill</h2>
        <p className="text-background-300 mt-2">made with ❤️ by <a href="https://github.com/wzid" className="text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-blue-600 transition-opacity hover:opacity-85">cameron</a></p>
    </div>
    <div className="mt-[10rem]">
      <h1 className="mb-4 text-background-200">Testimonials</h1>
      <div className="flex gap-4">
        <Image alt="man squatting" src="/images/man.png" width={175} height={175} className="rounded-xl" />
        <div className="w-80">
          <h2 className="mb-2">Killian Boston</h2>
          <p className="text-background-400 text-lg">&quot;This website has helped me tremendously in my personal fitness journey&quot;</p>
        </div>
      </div>
    </div>
    <div>
      <Leaderboard />
    </div>

   </main>
  );
}
