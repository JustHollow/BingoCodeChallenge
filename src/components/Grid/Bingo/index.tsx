import Button, { ButtonProps } from "@uikit/Button";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./bingo.module.scss";
import animations from "./animations.module.scss";
import useTypedSelector from "@hooks/useTypedSelector";
import getRandomWithRange from "@src/utils/randomWithRange";

type BingoProps = ButtonProps;
const Bingo = ({ ...restButtonProps }: BingoProps) => {
    const MatchedState = useTypedSelector((state) => state.matches.matched);
    const lastMatched = useRef(MatchedState);
    const [logoAnimation, setLogoAnimatio] = useState(animations.spin);

    const tadaSound = useMemo(
        () => process.browser && new Audio("/assets/audio/tada.mp3"),
        [process.browser]
    );

    useEffect(() => {
        const isMatchedIncr = MatchedState > lastMatched.current;
        lastMatched.current = MatchedState;

        if (isMatchedIncr) {
            tadaSound.currentTime = 0;
            tadaSound.play();
            const animationsArr = Object.values(animations);
            const newAnimationIdx = getRandomWithRange(0, animationsArr.length);
            setLogoAnimatio(animationsArr[newAnimationIdx]);
        }
    }, [MatchedState]);

    return (
        <div className={styles.wrapper}>
            <Button
                className={clsx(styles.bingo, logoAnimation)}
                {...restButtonProps}
                tabIndex={-1}
            >
                BINGO
            </Button>
        </div>
    );
};

export default Bingo;
