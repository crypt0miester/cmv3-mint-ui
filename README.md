# Candy Machine v3 UI
Reference UI to implement Metaplex Candy Machine V3 on frontend.

### Features/Todo
- [x] Responsive UI
- [x] Single Mint UI
- [x] Multi Mint UI
- [x] Start Time Countdown
- [x] Preview Minted NFTs
- [x] Guards Supported
  - [x] Start Date
  - [x] End Date
  - [x] Sol Payment
  - [x] Token Payment
  - [x] Mint Limit
  - [x] Bot Tax
  - [ ] Token Burn
  - [ ] Token Gate
  - [ ] NFT Payment
  - [ ] NFT Burn
  - [ ] NFT Gate
  - [ ] Redeemed Amount
  - [ ] Third Party Signer
  - [ ] Address Gate
  - [ ] Allow List
  - [ ] Gatekeeper
- [x] Multi Group Functionality (must include the group label)

### Env Variables
*All of them are optional at this moment as we're using default if they are not exists in [config.ts](src/config.ts)*
- NEXT_PUBLIC_SOLANA_NETWORK=WalletAdapterNetwork
- NEXT_PUBLIC_RPC_HOST=url
- NEXT_PUBLIC_CANDY_MACHINE_ID=publickKey

### Candy machine v3 Config & Initialization
*For configuaration and initialization please refer to [official Metaplex docs](https://docs.metaplex.com/programs/candy-machine/overview). You can also use [SugerCLI alpha](https://docs.metaplex.com/developer-tools/sugar/guides/sugar-for-cmv3) for it.*

### check cmv3_config.json