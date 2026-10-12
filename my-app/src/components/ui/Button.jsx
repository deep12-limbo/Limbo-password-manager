import { cn } from "../../utils/cn";
import Spinner from "./Spinner";

const variants = {
  primary: `
     bg-gradient-to-r
  from-primary
  via-primary/70
  to-primary
  text-primary-foreground
  
  border border-primary
  hover:opacity-90
  focus:ring-primary
  `,

  outline: `
    bg-transparent
    text-primary
    border border-border
    hover:bg-social
     focus:ring-primary-50
  `,

  ghost: `
    bg-transparent
    text-foreground
    border border-transparent
    hover:c
    focus:ring-primary
  `,

  danger: `
    bg-red-600
    text-white
    border border-red-600
    hover:bg-red-700
    focus:ring-red-500
  `,
  none: "",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

function ButtonRoot({
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  children,
  isLoading,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(

        " cursor-pointer inline-flex items-center justify-center gap-x-2 rounded-sm font-small transition-colors",
        "focus:outline-none ",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}

    >

      {!disabled && isLoading && <Spinner />}
      {children}

    </button>
  );
}


function ButtonIcon({ children, className = "" }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`}>
      {children}
    </span>
  );
}

function ButtonText({ children, className = "" }) {
  return <span className={className}>{children}</span>;
}

const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Text: ButtonText,
  variants,
  sizes,
};

export default Button;




