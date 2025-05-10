function Input({ type, value, onChange, placeholder, onBlur }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      className="w-full px-4 py-2 text-center border border-gray-100 rounded bg-white placeholder-gray-500 text-base"
    />
  );
}

export default Input;
