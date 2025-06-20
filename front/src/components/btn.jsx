function Btn({ type = "button", onClick, children, className = "", variant = "primary" }) {

  const baseClasses = "px-[10px] py-[10px] min-w-[58px] rounded font-bold font-primary-cta text-xs transition"; 

  const variantClasses = {
    primary: "shadow-[calc(-4px)_1px_5px_-2px_#6DB5BD] text-bleu-clair bg-bleu-clair2",
    secondary: "shadow-[calc(-4px)_1px_5px_-2px_#E7AD7A] text-orange-text bg-orange-ombre",
    third:"shadow-[-4px_1px_2.2px_0px_#E7AD7A] text-orange-text bg-yellow-40",
    premiumBtn: "rounded-[30px] bg-gradient-to-r from-[#6DB5BD] to-[#C5DCD9] shadow-[calc(-4px)_1px_2.2px_#275C70]",
    changeAbo: "rounded-[30px] bg-gradient-to-r from-[#6DB5BD] to-[#C5DCD9] shadow-[calc(-4px)_1px_2.2px_0px_#275C70]"
  };

  const appliedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  return (
    <button type={type} onClick={onClick} className={appliedClasses}>
      {children}
    </button>
  );
}

export default Btn;
