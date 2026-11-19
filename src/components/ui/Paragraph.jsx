export const Paragraph = ({ children, className = "" }) => {
  return (
    <p className={`text-[20px] font-normal leading-[35px] ${className}`}>
      {children}
    </p>
  );
};
