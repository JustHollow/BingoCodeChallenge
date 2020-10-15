import React from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { getStore } from "@store";
import "@styles/global.scss";
import { RootState } from "@ducks";

type MyAppInitProps = { storeState: RootState };
type MyAppProps = AppProps & MyAppInitProps;

const MyApp: NextPage<MyAppProps, MyAppInitProps> = (props: MyAppProps) => {
    const { Component, pageProps } = props;
    const store = getStore(props.storeState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

/**
 * Uncomment in case of need sync server state with the client
 * Commented by P.Deneshchik 15 oct 2020
 */
// MyApp.getInitialProps = async () => {
//     return { storeState: getStore().getState() };
// };

export default MyApp;
