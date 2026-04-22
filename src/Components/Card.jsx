const Card = ({ title, value, status }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-64 text-center hover:scale-105 transition">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold mt-2 text-blue-600">{value}</p>

      {status && (
        <p
          className={`mt-2 font-medium ${
            status === "Good" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default Card;