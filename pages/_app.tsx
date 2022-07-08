import '../styles/globals.css';
import { AppPropsWithLayout } from '@/models/common';
import { EmptyLayout } from '@/components/layouts';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    //Component thì myApp sẽ rerender lại thôi còn những thứ bên ngoài sẽ không bị thay đổi
    //KHi di chuyển giữa các components thì các component thay đổi thôi
    console.log('App re-render');

    //Khi maf
    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <Layout>
            <h1>App</h1>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
