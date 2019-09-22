/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: 'BIP39 Mnemonic Builder',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'BIP39 Mnemonic Builder',
                short_name: 'BIP39',
                start_url: '/bip39',
                background_color: '#fff',
                theme_color: '#f59237',
                display: 'standalone',
                icon: 'src/images/btc512x512.png',
            },
        },
        'gatsby-plugin-offline',
    ],
    pathPrefix: '/bip39',
};
