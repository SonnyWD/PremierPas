function Input({ type, value, onChange, placeholder, onBlur, className, onKeyDown }) {

  const baseStyle = "w-full px-4 py-2 border-t border-b border-x-0 border-gray-100 rounded bg-white placeholder-gray-500 text-base";
  const combinedClasses = `${baseStyle} ${className || ''}`.trim();
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      className={combinedClasses}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
