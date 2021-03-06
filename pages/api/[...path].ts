import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
// type Data = {
//     name: string;
// };

const proxy = httpProxy.createProxyServer();

//Tách phần body parser ra và chuyển phần bodyParser lên server luôn
export const config = {
    api: {
        bodyParser: false,
    },
};

//Tất cả các Api khi vào thì phải đi qua hàm này rồi mới đi tiếp lên server thật
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    return new Promise((resolve) => {
        const cookies = new Cookies(req, res);
        const accessToken = cookies.get('accessToken');

        if (accessToken) {
            req.headers.authorization = `Bearer ${accessToken}`;
        }
        req.headers.cookie = '';
        proxy.web(req, res, {
            target: process.env.API_URL,

            //Đổi đường dẫn
            changeOrigin: true,

            //KHi nhận được server thì sẽ trả về cho client luôn
            selfHandleResponse: false,
        });
        proxy.once('proxyRes', () => {
            resolve(true);
        });
    });

    //API resolved without sending a response for /api/products?_page=1, this may result in stalled requests
    //Là do đang ở trạng thái pending => Sử dụng promiss để có thể tránh được vấn đề này
    //res.status(200).json({ name: 'File nay khong co api' });
}
