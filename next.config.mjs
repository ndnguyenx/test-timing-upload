/** @type {import('next').NextConfig} */
const nextConfig = {

    compiler: {
        styledComponents: true,
    },

    images: {
        minimumCacheTTL: 1500000,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "feedback.bacsinguyentuananh.com",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
