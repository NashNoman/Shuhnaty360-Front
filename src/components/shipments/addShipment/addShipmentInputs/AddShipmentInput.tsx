/* eslint-disable @typescript-eslint/no-explicit-any */

interface AddShipmentInputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const AddShipmentInput = ({
  type = 'text',
  placeholder = '',
  label,
  description,
  ...props
}: AddShipmentInputProps) => {
  return (
    <div className='col-span-1 flex flex-col gap-1'>
      <span className='text-[#1A1A1A]'>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className='p-3 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F]'
        min={0}
        {...props}
      />
      {description && (
        <div className='text-[#999] font-Rubik mt-1 text-sm'>
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((desc, index) => (
                <li
                  key={index}
                  className='text-[#666666]'
                >
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

export default AddShipmentInput;
