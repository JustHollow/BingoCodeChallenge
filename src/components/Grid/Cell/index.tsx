import { GridItem } from "@ducks/grid";
import Button, { ButtonProps } from "@uikit/Button";
import clsx from "clsx";
import React from "react";
import styles from "./cell.module.scss";

type CellProps = React.PropsWithChildren<{ item: GridItem } & ButtonProps>;

const Cell = ({ item, children, ...restButtonProps }: CellProps) => {
    return (
        <Button
            variant="filled"
            className={clsx(
                styles.cell,
                item.value && styles.cellChecked,
                item.win && styles.cellWin
            )}
            {...restButtonProps}
        >
            {children}
        </Button>
    );
};

export default Cell;
