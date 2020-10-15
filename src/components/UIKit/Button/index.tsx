import React from "react";
import clsx from "clsx";
import * as styles from "./button.module.scss";
import * as variants from "./variants.module.scss";
import * as colors from "./colors.module.scss";

type Variants = keyof typeof variants;
type Colors = keyof typeof colors;

export type ButtonProps = {
    color?: Colors;
    variant?: Variants;
} & JSX.IntrinsicElements["button"];

const Button: React.FC<ButtonProps> = ({
    color = "base",
    variant = "text",
    className,
    children,
    ...restButtonProps
}) => {
    const dataAttrs = {
        [`data-${variant}`]: true,
    };
    return (
        <button
            type="button"
            {...restButtonProps}
            className={clsx(
                styles.buttonBase,
                colors[color],
                variants[variant],
                className
            )}
            {...dataAttrs}
        >
            {children}
        </button>
    );
};

export default Button;
