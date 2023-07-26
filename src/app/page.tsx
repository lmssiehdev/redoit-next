import DummyHabitDemo from "@/components/DummyHabitDemo";
import LandingPageCallToAction from "@/components/LandingPageCallToAction";

const accessToken = "F7I2qBgjZ-rN-kRuPXdGUuPBXn2stsRbM8xAQ9psifk";
export default async function Home() {
  return (
    <>
      <div>
        <div className="my-10">
          <h2 className="text-center text-3xl leading-10">
            Every habit, every day,{" "}
            <span className="block">
              with{" "}
              <span className="font-bold relative before:absolute before:z-[-1] before: before:bottom-[15%] before:left-0 before:h-[30%] before:w-full before:bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 bg-opacity-90">
                Redoit
              </span>{" "}
              {"you'll"} pave the way.
            </span>
          </h2>
          <div className="flex justify-center my-5">
            <LandingPageCallToAction />
          </div>
        </div>
        <div>
          {/* <p className="py-2 text-gray-500 text-center">
            * Click on any date to see how it’s work
          </p> */}
          <DummyHabitDemo />
          <p className="py-2 text-gray-500 text-center">
            Like what you see? Sign up now and start tracking
          </p>
        </div>
        {/* <div>
          <Image
            src="/images/preview_screenshot.png"
            width={500}
            height={500}
            alt="app preview screenshot"
          />
        </div> */}
      </div>
    </>
  );
}
