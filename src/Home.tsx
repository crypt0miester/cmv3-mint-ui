import { useCallback } from "react";
import { Paper, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Nft } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import confetti from "canvas-confetti";
import Link from "next/link";
import Countdown from "react-countdown";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { network } from "./config";

import { MultiMintButton } from "./MultiMintButton";
import {
  Heading,
  Hero,
  MintCount,
  NftWrapper,
  NftWrapper2,
  Root,
  StyledContainer,
} from "./styles";
import { AlertState } from "./utils";
import NftsModal from "./NftsModal";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import useCandyMachineV3 from "./hooks/useCandyMachineV3";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  margin: 30px;
  z-index: 999;
  position: relative;

  // .wallet-adapter-dropdown-list {
  //   background: #ffffff;
  // }
  // .wallet-adapter-dropdown-list-item {
  //   background: #000000;
  // }
  .wallet-adapter-dropdown-list {
    grid-row-gap: 5px;
  }
`;

const WalletAmount = styled.div`
  color: black;
  width: auto;
  padding: 5px 5px 5px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 5px;
  background-color: #85b1e2;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(WalletMultiButton)`
  border-radius: 5px !important;
  padding: 6px 16px;
  background-color: #fff;
  color: #000;
  margin: 0 auto;

  :hover{
    background-color: #000;
    color: #fff;
  }

`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;
  h1 {
    margin: 0px;
  }
`;

export interface HomeProps {
  candyMachineId: PublicKey;
}

export interface priceType {
  price: number;
  label: string;

}


const Home = (props: HomeProps) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const candyMachineV3 = useCandyMachineV3(props.candyMachineId);

  const [balance, setBalance] = useState<number>();
  const [mintedItems, setMintedItems] = useState<Nft[]>();
  const [{ price, label: priceLabel }, setPrice] = useState<priceType>({ price: 0.2, label: "SOL" });

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const { guards, guardStates } = useMemo(() => {
    const guardGroup = candyMachineV3.guardGroups.find(
      (x) => x.label === "Week 1"
    );
    const guards = guardGroup?.guards || candyMachineV3.guards
    const guardPrices = candyMachineV3.getPrice(guards);
    setPrice(guardPrices as priceType)
    return {
      guards: guards,
      guardStates: guardGroup?.states || candyMachineV3.guardStates,
    };
  }, [
    candyMachineV3.guardGroups,
    candyMachineV3.guards,
    candyMachineV3.guardStates,
  ]);

  // useEffect(() => {
  //   (async () => {
  //     if (guards) {
  //     }
  //   })();
  // }, [wallet, connection]);

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, connection]);

  const openOnSolscan = useCallback((mint) => {
    window.open(
      `https://solscan.io/address/${mint}${[WalletAdapterNetwork.Devnet, WalletAdapterNetwork.Testnet].includes(
        network
      )
        ? `?cluster=${network}`
        : ""
      }`
    );
  }, []);

  const throwConfetti = useCallback(() => {
    confetti({
      particleCount: 400,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, [confetti]);

  const startMint = async (quantityString: number = 1) => {
    try {
      const items = await candyMachineV3.mint(quantityString);
      setMintedItems(items as any);
      throwConfetti();
    } catch (e) {
      setAlertState({
        open: true,
        message: e.message,
        severity: "error",
      })
    }
  };

  return (
    <main>
      <>
        <Header>
          {/* <Link href='/'>
            <img
              style={{
                filter: 'invert(1)',
                maxWidth: '200px',
                marginLeft: 30,
                marginTop: 10,
              }}
              src='/logo.jpeg'
              alt='logo'
            />
          </Link> */}
          <WalletContainer>
            <Wallet>
              {wallet ? (
                <WalletAmount>
                  {(balance || 0).toLocaleString()} SOL
                  <ConnectButton />
                </WalletAmount>
              ) : (
                <ConnectButton>Connect Wallet</ConnectButton>
              )}
            </Wallet>
          </WalletContainer>
        </Header>
        <Root>
          <div className="cloud-content">
            {[...Array(7)].map((cloud, index) => (
              <div key={index} className={`cloud-${index + 1} cloud-block`}>
                <div className="cloud"></div>
              </div>
            ))}
          </div>
          <StyledContainer>
            {/* <MintNavigation /> */}

            <Hero>
              <Heading>
                <Link href="/">
                  <img
                    style={{
                      filter: "invert(1)",
                      maxWidth: "500px",
                    }}
                    src="/logo.jpeg"
                    alt="logo"
                  />
                </Link>
              </Heading>

              <p>
                hi.
              </p>

              {guardStates.isStarted && wallet.publicKey && (
                <MintCount>
                  Total Minted : {candyMachineV3.items.redeemed}/
                  {candyMachineV3.items.available}
                </MintCount>
              )}
              {guardStates.isStarted && wallet.publicKey && (
                <MintCount>
                  Current Round : {candyMachineV3.items.redeemed}/
                  {guards?.redeemLimit}

                </MintCount>
              )}

              {!guardStates.isStarted ? (
                <Countdown
                  date={guards.startTime}
                  renderer={renderGoLiveDateCounter}
                  onComplete={() => {
                    candyMachineV3.refresh();
                  }}
                />
              ) : !wallet?.publicKey ? (
                <ConnectButton>Connect Wallet</ConnectButton>
              ) : !guardStates.isPaymentAvailable ? (
                <h1>You cannot pay for the mint</h1>
              ) : !guardStates.isWalletWhitelisted ? (
                <h1>Mint is private.</h1>
              ) : (
                <>
                  <>
                    {!!candyMachineV3.items.remaining &&
                      guardStates.hasGatekeeper &&
                      wallet.publicKey &&
                      wallet.signTransaction ? (
                      <GatewayProvider
                        wallet={{
                          publicKey: wallet.publicKey,
                          //@ts-ignore
                          signTransaction: wallet.signTransaction,
                        }}
                        gatekeeperNetwork={guards.gatekeeperNetwork}
                        clusterUrl={connection.rpcEndpoint}
                        cluster={
                          process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
                        }
                        options={{ autoShowModal: false }}
                      >
                        <MultiMintButton
                          candyMachine={candyMachineV3.candyMachine}
                          gatekeeperNetwork={guards.gatekeeperNetwork}
                          isMinting={candyMachineV3.status.minting}
                          setIsMinting={() => { }}
                          isActive={!!candyMachineV3.items.remaining}
                          isEnded={guardStates.isEnded}
                          isSoldOut={!candyMachineV3.items.remaining}
                          isLimitReached={guardStates.isLimitReached}
                          limit={
                            guards.redeemLimit ||
                            (guards.mintLimit?.settings?.limit
                              ? guards.mintLimit?.settings?.limit -
                              (guards.mintLimit?.mintCounter?.count || 0)
                              : 10)
                          }
                          onMint={startMint}
                          price={price}
                          priceLabel={priceLabel}
                        />
                      </GatewayProvider>
                    ) : (
                      <MultiMintButton
                        candyMachine={candyMachineV3.candyMachine}
                        isMinting={candyMachineV3.status.minting}
                        setIsMinting={() => { }}
                        isActive={!!candyMachineV3.items.remaining}
                        isEnded={guardStates.isEnded}
                        isSoldOut={!candyMachineV3.items.remaining}
                        isLimitReached={guardStates.isLimitReached}
                        limit={
                          guards.redeemLimit ||
                          (guards.mintLimit?.settings?.limit
                            ? guards.mintLimit?.settings?.limit -
                            (guards.mintLimit?.mintCounter?.count || 0)
                            : 10)
                        }
                        onMint={startMint}
                        price={price}
                        priceLabel={priceLabel}
                      />
                    )}
                  </>
                </>
              )}
            </Hero>
            <NftsModal
              openOnSolscan={openOnSolscan}
              mintedItems={mintedItems || []}
              setMintedItems={setMintedItems}
            />
          </StyledContainer>
          <NftWrapper>
            <div className="marquee-wrapper">
              <div className="marquee">
                {[...Array(21)].map((item, index) => (
                  <img
                    key={index}
                    src={`/nfts/${index + 1}.png`}
                    height="200px"
                    width="200px"
                    alt=""
                  />
                ))}
              </div>
            </div>
          </NftWrapper>
          <NftWrapper2>
            <div className="marquee-wrapper second">
              <div className="marquee">
                {[...Array(21)].map((item, index) => (
                  <img
                    key={index}
                    src={`/nfts/${index + 1}.png`}
                    height="200px"
                    width="200px"
                    alt=""
                  />
                ))}
              </div>
            </div>
          </NftWrapper2>
        </Root>
      </>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Home;

const renderGoLiveDateCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div>
      <Card elevation={1}>
        <h1>{days}</h1>Days
      </Card>
      <Card elevation={1}>
        <h1>{hours}</h1>
        Hours
      </Card>
      <Card elevation={1}>
        <h1>{minutes}</h1>Mins
      </Card>
      <Card elevation={1}>
        <h1>{seconds}</h1>Secs
      </Card>
    </div>
  );
};
