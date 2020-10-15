import { gridActions, GridItem, gridSelector, isInMiddle } from "@ducks/grid";
import { findMatch } from "@ducks/matches";
import useTypedDispatch from "@hooks/useTypedDispatch";
import useTypedSelector from "@hooks/useTypedSelector";
import React, { useCallback } from "react";
import Bingo from "./Bingo";
import Cell from "./Cell";
import styles from "./grid.module.scss";

const Grid = () => {
    const dispatch = useTypedDispatch();
    const GridState = useTypedSelector(gridSelector);

    const handleChange = (cell: GridItem) => {
        dispatch(
            gridActions.toggleCell({
                col: cell.place.col,
                row: cell.place.row,
            })
        );
        dispatch(findMatch());
    };

    return (
        <div className={styles.aspectRatio}>
            <div className={styles.rowsWrapper}>
                {GridState.map((row, rowIdx) => (
                    <div key={rowIdx} className={styles.row}>
                        {row.map((cell, colIdx) => {
                            const isMiddleCell = isInMiddle({
                                col: colIdx,
                                row: rowIdx,
                                size: GridState.length,
                            });

                            if (isMiddleCell) {
                                return <Bingo key={`${colIdx} ${rowIdx}`} />;
                            } else {
                                return (
                                    <Cell
                                        key={`${colIdx} ${rowIdx}`}
                                        item={cell}
                                        onClick={useCallback(() => {
                                            handleChange(cell);
                                        }, [])}
                                    >
                                        {cell.text}
                                    </Cell>
                                );
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Grid;
