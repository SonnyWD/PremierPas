function Card({ title, description, locked }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300p-4 ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
