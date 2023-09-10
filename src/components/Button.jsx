const Button = ({ children, className, ...props }) => (
  <button className={className ? `button ${className}` : 'button'} {...props}>
    {children}
  </button>
);

export default Button;
