function BabyCard({ icon, children, progress }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center w-full">
      <div className="text-4xl text-pink-300 mb-2">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-center mb-2">{children}</h3>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default BabyCard;
