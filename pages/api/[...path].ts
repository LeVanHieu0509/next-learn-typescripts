import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
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
    req.headers.cookie = '';
    proxy.web(req, res, {
        target: process.env.API_URL,

        //Đổi đường dẫn
        changeOrigin: true,

        //KHi nhận được server thì sẽ trả về cho client luôn
        selfHandleResponse: false,
    });

    //res.status(200).json({ name: 'File nay khong co api' });
}
