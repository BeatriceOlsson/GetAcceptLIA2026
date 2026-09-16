import { useEffect, useState } from "react";
import FetchBackend from "../fetchBackend";
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from "recharts";
import { LoadingHandling } from "../smalComponents/loadingHandling";
import { ErrorMessage } from "../smalComponents/errorMessage";
import { BlueButton } from "../smalComponents/blueButton";
import costumTooltip from "./costumTooltip";

function StatisticsDateSentDockument() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateSentDockument, setDateSentDockument] = useState([]);
  const [filterDates, setFilterDates] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const getDateSentDockument = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        let response;

        if (!filterDates.startDate || !filterDates.endDate) {
          response = await FetchBackend({
            url: "/statistics",
            crud: "GET",
          });
        }

        if (filterDates.startDate || filterDates.endDate) {
          response = await FetchBackend({
            url: "/statistics/dates",
            crud: "POST",
            body: {
              startDate: filterDates.startDate,
              endDate: filterDates.endDate,
            },
          });
        }

        if (response instanceof Error) {
          setErrorMessage(response.message);
          setLoading(false);
          return;
        }

        setLoading(false);
        setDateSentDockument(response || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getDateSentDockument();
  }, [filterDates]);

  const colors = [
    "#4f46e5",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#8b5cf6",
  ];

  const carterData = dateSentDockument.map((user) => ({
    fulName: `${user.firstName} ${user.lastName}`,
    numberOfDoc: user.dockument ? user.dockument.length : 0,
    totalSum: user.totalValue || 0,
  }));

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilterDates({
              startDate: e.target.elements.startDate.value,
              endDate: e.target.elements.endDate.value,
            });
          }}
        >
          <span>Från: </span>
          <input
            type="date"
            name="startDate"
            defaultValue={filterDates.startDate}
          />
          <span>Till: </span>
          <input
            type="date"
            name="endDate"
            defaultValue={filterDates.endDate}
          />
          <BlueButton type="submit" buttonText={"Filtrera datum"} />
        </form>
        <div>
          <BarChart
            width={700}
            height={400}
            data={carterData}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="fulName" />
            <YAxis allowDecimals={false} />
            <Tooltip content={costumTooltip} />
            <Bar dataKey="numberOfDoc" radius={[4, 4, 0, 0]}>
              {carterData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          {errorMessage && <ErrorMessage error={errorMessage} />}
          {loading && <LoadingHandling />}
        </div>
      </div>
    </>
  );
}

export default StatisticsDateSentDockument;
