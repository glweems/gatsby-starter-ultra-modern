import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from '../Store';
import { theme, GlobalStyle } from '../utils/theme';
import { Navbar } from './Navbar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          languageCode
          countryCode
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <>
            <Helmet
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              defaultTitle={data.site.siteMetadata.title}
            >
              <html lang={data.site.siteMetadata.languageCode} />
              <meta
                name="description"
                content={data.site.siteMetadata.description}
              />

              <meta
                property="og:locale"
                content={`${data.site.siteMetadata.languageCode}_${data.site.siteMetadata.countryCode}`}
              />
            </Helmet>

            <Navbar />

            <main>{children}</main>

            <footer>{/* TODO */}</footer>
          </>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}
