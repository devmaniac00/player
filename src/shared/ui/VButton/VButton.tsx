import { twMerge } from "tailwind-merge";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "success" | "danger" | "regular";
  className?: string;
}

export const VButton = ({
  children,
  className,
  variant = "regular",
  ...props
}: Props) => {
  return (
    <button
      className={twMerge(
        className,
        "px-6 py-2 rounded-xl shadow-md font-semibold text-white text-sm transition-colors duration-200",
        [
          variant === "regular" && "bg-blue-600 hover:bg-blue-500",
          variant === "danger" && "bg-red-600 hover:bg-red-500",
          variant === "success" && "bg-green-600 hover:bg-green-500",
        ]
      )}
      {...props}
    >
      {children}
    </button>
  );
};
