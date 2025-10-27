// next.config.mjs
import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        typedRoutes: true
    },
    images: {
        // Add remotePatterns here later if you host images off-site.
        remotePatterns: []
    }
};

export default withContentlayer(nextConfig);
