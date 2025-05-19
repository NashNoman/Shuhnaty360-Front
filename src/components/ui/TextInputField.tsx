export type TextInputFieldProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  name?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInputField = ({
  type = "text",
  placeholder = "",
  label,
  description,
  value,
  onChange,
  name,
  error,
  ...props
}: TextInputFieldProps) => {
  return (
    <div className="col-span-1 flex flex-col gap-1">
      {label && (
        <label htmlFor={props.id} className="text-xl mb-2 text-[#1A1A1A]">
          {label}
        </label>
      )}
      <input
        id={props.id}
        type={type}
        placeholder={placeholder}
        className={`p-2 text-lg border ${
          error ? "border-red-500" : "border-[#CCCCCC]"
        } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F]`}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
      {error && <span className="text-red-500 mt-1 text-sm">{error}</span>}
      {description && (
        <div className="text-[#999] font-Rubik text-sm">
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((desc, index) => (
                <li key={index} className="text-[#666666]">
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <span>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextInputField;
