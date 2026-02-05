const BalanceCard = ({ balance }) => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold">
        Your Balance <span className="ml-2">${(balance ?? 0).toFixed(2)}</span>
      </h2>
    </div>
  );
};

export default BalanceCard;
