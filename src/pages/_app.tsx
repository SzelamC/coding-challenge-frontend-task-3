import "@/styles/globals.scss";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const wagmiConfig = useMemo(() => {
    return getDefaultConfig({
      appName: "Moongate",
      projectId: "projectId",
      chains: [mainnet],
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
        <RainbowKitProvider
          appInfo={{
            appName: "Moongate",
            learnMoreUrl: "https://moongate.id",
          }}
          modalSize="compact"
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
