import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SiweMessage } from "siwe";
import ConnectWalletButton from "../components/ConnectWalletButton";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(() => {
    setLoading(true);
  }, []);

  const onSuccess = useCallback(
    async (message: SiweMessage, signature: string) => {
      setLoading(false);
      // TODO: verify signature with message from backend
      const valid = (await fetch("https://localhost:3000/api/valid-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
        credentials: "include",
      }).then((response) => response.json())) as boolean;
      if (valid) {
        setWallet(message.address);
      } else {
        throw new Error("Invalid signature");
        // TODO: other error handling
      }
    },
    [],
  );

  const onError = useCallback(() => {
    setLoading(false);
    setWallet("");
  }, []);

  return (
    <div className="container m-auto p-8 flex flex-col gap-8">
      <h1>Wallet: {wallet || "Not Connected"}</h1>

      <div className="flex flex-col gap-4  items-start">
        <ConnectWalletButton
          onClick={onClick}
          onSuccess={onSuccess}
          onError={onError}
        >
          <Button
            className="flex w-fit bg-blue-500 p-4"
            as="div"
            isDisabled={loading}
          >
            Connect Wallet
          </Button>
        </ConnectWalletButton>

        {/* <ConnectWalletButton */}
        {/*   onClick={onClick} */}
        {/*   onSuccess={onSuccess} */}
        {/*   onError={onError} */}
        {/* > */}
        {/*   <Button variant="outline" as="div" isDisabled={loading}> */}
        {/*     Custom Button UI */}
        {/*   </Button> */}
        {/* </ConnectWalletButton> */}
        {/**/}
        {/* <ConnectWalletButton */}
        {/*   onClick={onClick} */}
        {/*   onSuccess={onSuccess} */}
        {/*   onError={onError} */}
        {/* > */}
        {/*   <StarIcon color="green" /> */}
        {/* </ConnectWalletButton> */}
      </div>
    </div>
  );
}
