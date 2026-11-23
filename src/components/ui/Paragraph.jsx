export const Paragraph = ({ children, className = "" }) => {
  return (
    <p className={`text-base leading-6 sm:text-[20px] font-normal sm:leading-[35px] ${className}`}>
      {children}
    </p>
  );
};
