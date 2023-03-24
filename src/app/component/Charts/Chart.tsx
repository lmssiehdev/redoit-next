// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({
  data,
  color,
}: {
  data: typeof data2;
  color: string;
}) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
    crosshairType={"bottom"}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: 0,
      max: 100,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    enableArea={true}
    pointSize={8}
    pointColor={color}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    lineWidth={3}
    // enableArea={true}
    curve="linear"
    legend={null}
    colors={[color]}
    theme={{
      fontFamily: "inherit",
    }}
  />
);

const ChartWrapper = ({
  color,
  dates,
}: {
  color: string;
  dates: {
    [key: string]: string;
  };
}) => {
  function calculateDates() {
    let data = [
      { x: "Sun", y: 1, day: 0 },
      { x: "Mon", y: 1, day: 1 },
      { x: "Tue", y: 1, day: 2 },
      { x: "Wed", y: 1, day: 3 },
      { x: "Thu", y: 1, day: 4 },
      { x: "Fri", y: 1, day: 5 },
      { x: "Sat", y: 1, day: 6 },
    ];

    Object.keys(dates).forEach((date) => {
      const day = new Date(date).getDay();
      if (data[day]) {
        const index = data.findIndex((item) => item.day === day);
        data[index].y++;
        return;
      }
      data[day].y = 1;
    });
    return data;
  }

  let data = calculateDates();

  const maxCompletionCount = Math.max(...data.map((d) => d.y));
  const minCompletionCount = Math.min(...data.map((d) => d.y));
  const range = maxCompletionCount - minCompletionCount;

  const normalizedData = data.map((d) => ({
    x: d.x,
    y: ((d.y - minCompletionCount) / range) * 100,
  }));

  const data2 = [
    {
      id: "Habit A",
      color: color,
      data: normalizedData,
    },
  ];

  return (
    <>
      {/* {JSON.stringify(normalizedData)} */}
      <MyResponsiveLine data={data2} color={color} />
    </>
  );
};

export default ChartWrapper;
