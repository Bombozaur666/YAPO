let prod: boolean = false;
export const host_example = {
  hostname: prod ? '127.0.0.1' : 'localhost',
  protocol: prod ? 'http://' : 'https://',
  port: '8080',
}
