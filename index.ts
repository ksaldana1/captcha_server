console.log("Hello via Bun!");
// @ts-ignore
import Catpcha from "node-captcha-generator";

Bun.serve({
  port: 8080,
  async fetch(req: Request) {
    const captcha = await createCaptcha();
    const res = new Response(JSON.stringify(captcha), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    return res;
  },
});

const createCaptcha = (): Promise<{ value: string; base64: string }> =>
  new Promise((resolve, reject) => {
    const c = new Catpcha({
      length: 5, // number length
      size: {
        // output size
        width: 450,
        height: 200,
      },
    });

    c.toBase64((err: any, base64: string) => {
      if (err) reject(err);
      resolve({ value: c.value, base64 });
    });
  });
