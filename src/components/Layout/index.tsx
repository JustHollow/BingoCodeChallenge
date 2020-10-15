import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";

type LayoutProps = {
    children?: JSX.Element;
    title?: React.ReactNode;
    headerNavigationLeft?: React.ReactNode;
    headerNavigationRight?: React.ReactNode;
    footer?: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{props.title ?? "Bingo"}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <main className={styles.wrapper}>
                <header className={styles.header}>
                    <nav className={styles.navigation}>
                        <span className={styles.navigationLeft}>
                            {props.headerNavigationLeft &&
                                props.headerNavigationLeft}
                        </span>
                        <h1 className={styles.navigationTitle}>
                            {props.title}
                        </h1>
                        <span className={styles.navigationRight}>
                            {props.headerNavigationRight &&
                                props.headerNavigationRight}
                        </span>
                    </nav>
                </header>
                <div className={styles.content}>{props.children}</div>
                {props.footer && (
                    <footer className={styles.footer}>{props.footer}</footer>
                )}
            </main>
        </>
    );
};

export default Layout;
