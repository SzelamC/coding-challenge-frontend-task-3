import { Dispatch, FC, SetStateAction } from "react";
import { useAccount } from "wagmi";
import { Button, useDisclosure } from "@chakra-ui/react";
import Dialog from "../Dialog";
import { SiweMessage } from "siwe";

function addressEllipse(address: string | undefined) {
  if (!address) return "";
  return (
    address.substring(0, 10) +
    "..." +
    address.substring(address.length - 5, address.length)
  );
}

type ConfirmAddressDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cancel: () => void;
  handleSignMessage: (address: `0x${string}`) => Promise<SiweMessage | null>;
};

const FollowActionDialog: FC<ConfirmAddressDialogProps> = ({
  isOpen,
  setOpen,
  cancel,
  handleSignMessage,
}) => {
  const { address } = useAccount();
  const { onClose: confirmDialogOnClose } = useDisclosure({
    defaultIsOpen: true,
  });
  const {
    isOpen: isSignCustomMessageDialogOpen,
    onOpen: onSignCustomMessageDialogOpen,
    onClose: onSignCustomMessageDialogClose,
  } = useDisclosure();

  const handleChangeAccount = () => {
    throw new Error("Not implemented");
  };

  const handleAccountConfirm = async () => {
    if (!address) return;
    setOpen(false);
    onSignCustomMessageDialogOpen();
    await handleSignMessage(address);
    onSignCustomMessageDialogClose();
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={confirmDialogOnClose}
        title="CONFIRM WALLET"
        onOverlayClick={cancel}
      >
        <div className="flex flex-col gap-4">
          <div className="uppercase text-xs text-center space-y-4 w-3/4 mx-auto">
            <h1>you are connecting the following address</h1>
            <h1 className="bg-gray-300 rounded-full p-2">
              {addressEllipse(address)}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1 uppercase"
              fontSize="x-small"
              onClick={handleChangeAccount}
            >
              change account
            </Button>
            <Button
              className="flex-1 uppercase"
              fontSize="x-small"
              colorScheme="blue"
              onClick={handleAccountConfirm}
            >
              confirm
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isSignCustomMessageDialogOpen}
        onClose={onSignCustomMessageDialogClose}
        title="Verify Wallet"
      >
        <h1 className="uppercase text-xs">
          Please continue in your wallet application to verifiy your wallet
          owernership by signing the message
        </h1>
        <span className="w-full inline-flex justify-end">
          <Button
            className="uppercase"
            fontSize="x-small"
            onClick={onSignCustomMessageDialogClose}
          >
            Cancel
          </Button>
        </span>
      </Dialog>
    </>
  );
};

export default FollowActionDialog;
