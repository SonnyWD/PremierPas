import { useState } from "react";
import Input from "./input";

function PasswordInput({ value, onChange, showHint = true }) {
  const [touched, setTouched] = useState(false);

  const criteria = [
    {
      label: "Au moins 8 caractères",
      test: (v) => v.length >= 8,
    },
    {
      label: "Une lettre minuscule",
      test: (v) => /[a-z]/.test(v),
    },
    {
      label: "Une lettre majuscule",
      test: (v) => /[A-Z]/.test(v),
    },
    {
      label: "Un chiffre",
      test: (v) => /\d/.test(v),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="password"
        placeholder="Mot de passe"
        value={value}
        onChange={(e) => {
          onChange(e);
          if (!touched) setTouched(true); 
        }}
        onBlur={() => setTouched(true)}
      />
      {touched && showHint && (
        <ul className="text-sm space-y-1">
          {criteria.map((criteria, i) => (
            <li key={i} className={criteria.test(value) ? "text-green-600" : "text-red-600"}>
              {criteria.test(value) ? "✅" : "❌"} {criteria.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PasswordInput;
