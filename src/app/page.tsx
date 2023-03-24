import Navbar from "@/components/Navbar";
import Button from "@/components/common/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <h2 className="text-2xl highlight">My Habits</h2>
      <Habit /> */}

      <div>
        <div className="my-10">
          <h2 className="text-center  text-2xl">
            Every habit, every day,{" "}
            <span className="block">
              with <span>Redoit</span> you'll pave the way.
            </span>
          </h2>
          <div className="flex justify-center my-5">
            <Button className="text-center" color="red" size="sm" secondary>
              Get Started
            </Button>
          </div>
        </div>

        <div>
          <Image
            src="/images/preview_screenshot.png"
            width={500}
            height={500}
            alt="app preview screenshot"
          />
        </div>
      </div>
    </>
  );
}
