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
    return new Promise((resolve) => {
        console.log('login request');
        req.headers.cookie = '';
        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            let body = '';
            proxyRes.on('data', function (chuck) {
                body += chuck;
            });

            proxyRes.on('end', function () {
                try {
                    //Nhận được token từ server api trả về
                    const { accessToken, exprireAt } = JSON.parse(body);
                    console.log(accessToken);

                    //Chuyển đổi token từ api server trả về thành cookies
                    const cookie = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });

                    cookie.set('accessToken', accessToken, {
                        httpOnly: true,
                        sameSite: true,
                        expires: new Date(exprireAt),
                    });
                    //Muốn trả về một json
                    (res as NextApiResponse).status(200).json({ mesenge: 'Login successfully' });

                    resolve(true);
                } catch (err) {
                    (res as NextApiResponse).status(500).json({ mesenge: 'Some thing with error' });
                }
            });
        };
        proxy.once('proxyRes', handleLoginResponse);

        //Khi user gửi request lên thì nó sẽ tự xử lý lại cái data được trả về từ server api
        // Sau khi nhận được data từ server api xuống next js thì proxy sẽ xử lý

        //Sau khi proxy xử lý xong thì trả về phía client
        proxy.web(req, res, {
            //Chọt tới api server
            target: process.env.API_URL,
            //Đổi đường dẫn
            changeOrigin: true,
            //KHi nhận được server thì sẽ trả về thông qua hàm handleLoginResponse
            selfHandleResponse: true,
        });
    });

    //API resolved without sending a response for /api/products?_page=1, this may result in stalled requests
    //Là do đang ở trạng thái pending => Sử dụng promiss để có thể tránh được vấn đề này
    //res.status(200).json({ name: 'File nay khong co api' });
}
