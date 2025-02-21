import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
