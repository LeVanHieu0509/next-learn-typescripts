import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
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
    if (req.method !== 'POST') {
        res.status(404).json({ message: 'Method does support' });
    }

    //B1: Chạy Proxy once
    //B2: Chạy proxy web (Muốn hanle response của api server trả về thì sẽ gọi hàm và xử lý ==> Xử lý thông qua PROMISS và thành công thì sẽ resolve)
    //B3:
    console.log('logout request');
    const cookies = new Cookies(req, res);
    cookies.set('accessToken');
    res.status(200).json({ messege: 'Logout Successfully' });

    //API resolved without sending a response for /api/products?_page=1, this may result in stalled requests
    //Là do đang ở trạng thái pending => Sử dụng promiss để có thể tránh được vấn đề này
    //res.status(200).json({ name: 'File nay khong co api' });
}
