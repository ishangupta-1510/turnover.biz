import {useState} from "react";

interface InputProps {
  label: string;
  isPasswordInput?: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Input({
  label,
  isPasswordInput = false,
  onChange,
}: InputProps) {
  const [typePassword, setTypePassword] = useState("password");
  function handlePasswordToggle() {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }
  if (!isPasswordInput)
    return (
      <div className="mb-4">
        <label
          className="  text-[16px] font-[400] mb-2 flex flex-col"
          htmlFor={label}
        >
          {label}
        </label>
        <input
          className={`shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[456px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
          id={label}
          type={label}
          placeholder={label}
          onChange={onChange}
        />
      </div>
    );

  return (
    <div className="mb-6">
      <label
        className="  text-[16px] font-[400] mb-2 flex flex-col"
        htmlFor="password"
      >
        Password
      </label>
      <div className="relative w-full">
        <input
          className={`  shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[459px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
          id="password"
          type={typePassword}
          placeholder="***********"
          onChange={onChange}
        />
        <span
          className="absolute right-2 top-2 underline cursor-pointer"
          onClick={handlePasswordToggle}
        >
          {typePassword === "password" ? "Show" : "Hide"}
        </span>
      </div>
    </div>
  );
}
