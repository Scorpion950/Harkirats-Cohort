import {type ReactElement} from "react";

type Variants = "primary" | "secondary"


export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const variantStyles = {
  "primary": "bg-my-purple-600 text-white",
  "secondary": "bg-my-purple-300 text-my-purple-600"
}

const sizeStyles = {
  "sm": "p-2",
  "md": "p-4",
  "lg": "p-6"
}


const defaultStyles = "rounded-md flex"

export const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
    {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text}
    {props.endIcon}
  </button>
}

<Button variant="primary" size="md" onClick={() => {}} text={"asd"} />

/*
  if (props.variant === "secondary") {
    return (
      <button
        onClick={props.onClick}
        className="bg-purple-300 text-purple-600 px-4 py-2 rounded"
      >
        {props.startIcon}
        {props.text}
        {props.endIcon}
      </button>
    );
  }

  return null;
};
*/