/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pub-b6b1e243015545a985dc4623df615e21.r2.dev"],
  },
  experimental: { typedRoutes: true },
  // async headers() {
  //   return [
  //     {
  //       source: "app/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "https://konya.vercel.app/",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "Content-Type",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
