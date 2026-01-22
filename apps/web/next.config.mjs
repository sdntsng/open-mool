/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed 'output: export' to enable Auth0 and server-side features
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's.gravatar.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.auth0.com',
                pathname: '/**',
            },
        ],
    },
    webpack: (config, { isServer, nextRuntime }) => {
        if (nextRuntime === 'edge') {
            config.externals.push('crypto');
        }
        return config;
    },
    async redirects() {
        return [
            {
                source: '/whatsapp',
                destination: 'https://chat.whatsapp.com/DizWrcM1Mbr1vTRBvd43B5',
                permanent: false,
            },
            {
                source: '/github',
                destination: 'https://github.com/open-mool/open-mool',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
