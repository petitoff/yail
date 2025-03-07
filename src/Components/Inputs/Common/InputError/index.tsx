import classNames from "classnames";
import { FC } from "react";

import { IInputErrorProps } from "./types";

const InputError: FC<IInputErrorProps> = ({ error, className }) => {
  const baseClassName = "text-rose-500 peer-invalid:visible mb-4 max-w-[450px]";

  if (Array.isArray(error)) {
    return error.map((e, i) => {
      return (
        <span key={i} className={classNames(baseClassName, className)}>
          {e}
        </span>
      );
    });
  }

  if (typeof error === "object") {
    return Object.keys(error).map((e, i) => {
      return (
        <span key={i} className={classNames(baseClassName, className)}>
          {error[e]}
        </span>
      );
    });
  }

  return <span className={classNames(baseClassName, className)}>{error}</span>;
};

InputError.defaultProps = {
  error: "",
  className: ""
};

export default InputError;
