function costumTooltip({ active, payload }) {
  if (active && payload.length) {
    const userData = payload[0].payload;
    return (
      <div className="bg-gray-500 p-2 border-2 border-orange-600 text-orange-400">
        <p>{userData.fulName}</p>
        <p>Antal dockument: {userData.numberOfDoc}</p>
        <p>Totala värdet: {userData.totalSum}</p>
      </div>
    );
  }
  return null;
}

export default costumTooltip;
