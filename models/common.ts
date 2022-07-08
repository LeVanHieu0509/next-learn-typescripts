import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export interface LayoutProps {
    children: ReactNode;
}

//react node => undefind string ....
export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement; // Một component nhận vào là một layout props và trả về là một react element
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
