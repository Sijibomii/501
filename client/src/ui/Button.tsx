import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ReactNode,
  } from "react";
  import { Spinner } from "./Spinner";
  
  const sizeClassnames = {
    xxl: "py-4 px-28 text-sm rounded-lg",
    big: "py-2 px-6 text-sm rounded-lg",
    small: "px-2 py-1 text-sm rounded-md",
    tiny: "px-1 text-sm rounded-5",
  };
  
  const colorClassnames = {
    primary: "text-button bg-primary transition duration-200 ease-in-out disabled:text-primary-disabled disabled:bg-primary-hover",
    secondary: "text-white bg-secondary disabled:text-primary",
    transparent: "text-button bg-none disabled:text-primary"
  };
  
  export type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
    loading?: boolean;
    icon?: ReactNode;
    transition?: boolean;
  };
  
  export const Button: React.FC<ButtonProps> = ({
    children,
    size = "big",
    color = "primary",
    disabled,
    loading,
    icon,
    className = "",
    transition,
    ...props
  }) => {
    return (
      <button
        disabled={disabled || loading}
        className={`flex outline-none focus:ring-4 focus:ring-${color} ${sizeClassnames[size]
          } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
          } font-bold flex items-center justify-center ${className}`}
        data-testid="button"
        {...props}
      >
        <span className={loading ? "opacity-0" : `flex items-center`}>
          {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
          {children}
        </span>
        {loading ? (
          <span className={`absolute`}>
            <Spinner size={size === "small" ? "2" : "4"} />
          </span>
        ) : null}
      </button>
    );
  };