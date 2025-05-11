function Card({ title, description }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
