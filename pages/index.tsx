import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import Grid from "@components/Grid";
import Button from "@uikit/Button";
import useTypedDispatch from "@hooks/useTypedDispatch";
import { gridActions } from "@ducks/grid";
import { matchesActions } from "@ducks/matches";

type IndexPageProps = unknown;
const IndexPage: NextPage<IndexPageProps> = () => {
    const dispatch = useTypedDispatch();

    return (
        <Layout
            title="Bingo"
            headerNavigationRight={
                <Button
                    color="primary"
                    variant="filled"
                    onClick={() => {
                        dispatch(gridActions.newGame());
                        dispatch(matchesActions.newGame());
                    }}
                >
                    New Game
                </Button>
            }
        >
            <Grid />
        </Layout>
    );
};

export default IndexPage;
