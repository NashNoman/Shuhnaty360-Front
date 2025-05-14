/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailRow = ({
  label,
  value,
}: // isLink,
{
  label: string;
  value: string;
  isLink?: boolean;
}) => {
  const styles = 'xs:text-xs overflow-hidden text-ellipsis whitespace-nowrap';
  return (
    <div className='flex flex-col items-start lg:flex-row lg:items-center gap-2'>
      <span>{label}</span>
      <span className={`${styles}`}>{value}</span>
      {/* {isLink ? (
        <a
          className={`${styles} text-[#DD7E1F] hover:underline`}
          href={value}
          target='_blank'
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) :
       (
        <span className={`${styles}`}>{value}</span>
      )} */}
    </div>
  );
};

const ClientBranchDetailsSection = ({
  title,
  branchNumber,
  address,
  mapLink,
  primaryPhone,
  secondaryPhone,
}: any) => {
  return (
    <div>
      <h1 className='text-[#1A1A1A] font-bold text-2xl mb-6'>الفرع({branchNumber}): {title}</h1>
      <div className='flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-start lg:items-center font-Rubik overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <DetailRow
            label='العنوان: '
            value={address}
          />
          {mapLink && mapLink !== address && (
            <DetailRow
              label='الموقع: '
              value={mapLink}
              isLink
            />
          )}
        </div>
        <div className='flex flex-col gap-4'>
          {primaryPhone && (
            <DetailRow
              label='رقم الهاتف (أساسي): '
              value={primaryPhone}
            />
          )}
          {secondaryPhone && (
            <DetailRow
              label='رقم الهاتف (احتياطي): '
              value={secondaryPhone}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientBranchDetailsSection;
