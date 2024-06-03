# Chainlink Hackathon | DeFi Builder

Introducing [DeFi Builder AI](https://chainlink.defibuilder.com/) that combines the power of Chainlink and Avalanche to create an automated, decentralized, and gamified smart contract auditing system, that makes the process more efficient, cost-effective, and engaging for both developers and auditors. This technology stands out because of its adaptive learning capability; every time an auditor submits a finding, the AI model improves, becoming more adept at identifying vulnerabilities in future audits. Auditors are incentivized to participate actively through a reward system that grants them shares in the vault, providing passive income based on their contributions. This continual feedback loop not only enhances the AI's accuracy and efficiency over time but also fosters a collaborative and dynamic environment where both security and innovation thrive, ultimately leading to a safer and more resilient blockchain ecosystem.

For requesting an audit call, a request object needs to be registered in the backend, then call `requestAudit` function from `AuditRegistry` with the given id. Upon successfull completion the author will receive an NFT that points to the audit as metadata. The author can then update the metadata with a new audit in case the embeddings were changed. For each `requestAudit` a fee is required that is floored in USD value and transmitted via the native gas token (in our case AVAX) for better user experience. The fee is transfer to the vault of auditors, thus generating passive income based on their contributions to the AI Model. After the request has been processed and an NFT was minted, the author can also deposit additional rewards for incentivizing a more rigurous auditing procedure from real-life human experts.

The auditors are rewarded with shares to the vault, which are minted after a vulnerability is submitted through a separate Chainlink Function in the vault, thus adding its details to the vectore database that is used to retrieve context for the AI Model in future generations. Upon uploading the embedding, the endpoint returns an uniqueness score, thus determining the number of shares to be minted and the value of the contribution.

- `/auditor` contains code for the AI Agent backend written in python. For more information on Auditor architecture, and how to run it, please visit [AUDITOR.md](./auditor/AUDITOR.md).
- `/contracts` contains the contracts used in the project, i.e. the AuditRegistry which interacts with Chainlink Price Feed and AI Agent API through Chainlink Functions, and the AuditorsVault which is responsible for uploading embeddings for the AI Agent and return an uniqueness score of the finding.
- `/app` is a Next.js project that contains client-facing code and backend that glues together the calls to AI Agent so they are prepared for the Chainlink Function.

![DeFi Builder AI Architecture](./architecture.png?raw=true "DeFi Builder AI Architecture")

#### Contract Addresses (Avalanche Fuji):

- WrappedNative at 0x3e770515D6Ed2197817dF6eeB26853df4E739080
- AuditorsVault at 0xbFcfaad9a78C0a05cf2ad7D43273DEDd35C4eB75
- AuditRegistry at 0x2a5252c7EC0261fe5480d0B83A562540A8C34d27

All contracts are verified.

#### Components

1. **Developer**: Registers with GitHub and selects the smart contracts to be audited.
1. **User**: Deploys the contract on the desired blockchain.
1. **Auditor**: Submits findings and reports vulnerabilities.
1. **Chainlink Functions**: Used for various decentralized operations, such as requesting audits, uploading auditor feedback and calculating rewards.
1. **Avalanche Network**: Utilized for storing audit records and managing tokens via ERC721 and ERC4626 standards.
1. **AI Auditor Agent (AWS EC2)**: Performs the auditing by calling an inference API.
1. **Vulnerabilities Database (MongoDB Vector Search)**: Stores embeddings and provides a uniqueness score for vulnerabilities.

#### Process Flow

1. **Registration and Selection**:

   - Developers register with GitHub and select the smart contracts to audit through the App (Audit Section).

2. **Audit Request**:

   - The audit request is sent along with a generation fee or bug bounty.
   - The App sends a function request via Chainlink to the AI Auditor Agent hosted on AWS EC2.

3. **AI Auditing**:

   - The AI Auditor Agent processes the request by calling the inference API.
   - The context and findings are uploaded to the Vulnerabilities Database, which returns a uniqueness score.

4. **Backend Processing**:

   - The App Backend receives the findings and stores them.
   - A callback Chainlink function returns the URI for the audit report.

5. **Price Conversion and NFT Minting**:

   - Chainlink AVAX/USD Price Feed fetches the price and converts the fee to the native gas token.
   - Another Chainlink function mints an NFT (ERC721) with the token metadata on Avalanche.

6. **Audit Registry and Vault**:

   - The audit details are stored in the Audit ERC721 Registry on Avalanche.
   - The Auditors ERC4626 Vault on Avalanche handles the rewards and fee distribution.

7. **Deployment and Compilation**:

   - Users deploy the contract on their desired blockchain.
   - The App (Deploy Section) communicates with the Compiler Service (AWS Lambda) to compile the contract and return artifacts.

8. **Reporting and Minting Shares**:
   - Auditors submit findings and report vulnerabilities through the App (Audit Section).
   - A Chainlink callback function returns the number of shares to mint, rewarding the auditors via the ERC4626 Vault.

## Future of DeFi Builder 🔮

We are striving to turn DeFi Builder into the #1 spot for Web3 entrepreneurship, creating a bridge between non-tech entrepreneurs, developers and security experts, through our comprehensive tools.

In order to achieve this, in the near future we are working on our first modules that will support both smart contract deployment, and frontend customization and deployment.

In order to improve our Block Magic submission, post-hackathon we will focus on launching an Avalanche Subchain, that can support native gas tokens as rewards for platform users.
