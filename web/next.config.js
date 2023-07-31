/** @type {import('next').NextConfig} */

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add the Firebase Storage domain here
  },
};
