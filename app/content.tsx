interface ReviewContent {
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string;
  score: string;
  text: string;
  icons: {
    iconImage: string;
    iconAlt: string;
    value: string;
  }[];
  cips?: string[];
}

export const reviewContent: ReviewContent[] = [
  {
    imageSrc: "/ai_auditor_icon.png",
    imageAlt: "Ai Auditor Icon",
    title: "AI auditor",
    date: "25/04/2024",
    score: "Critical",
    text: "This smart contract is vulnerable to reentrancy attacks, lacks proper access control, has potential state manipulation issues, and lacks essential features like events. These vulnerabilities could lead to financial losses and exploitation by attackers.",
    icons: [
      {
        iconImage: "/usd_icon.svg",
        iconAlt: "USDC Icon",
        value: "9000 USDC",
      },
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "Terminal White",
        value: "Zwappi - Derivatives DEX",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "Clinical Notes White",
        value: "Phoenix Shadow",
      },
    ],
    cips: ["Swap", "Critical", "Dexes"],
  },
  {
    imageSrc: "/sherlock.png",
    imageAlt: "Sherlock Icon",
    title: "Sherlock",
    date: "25/04/2024",
    score: "Critical",
    text: "M-2: Swapping large amounts of assets back and forth in an Aerodrome pool allows to bypass exposure limits",
    icons: [
      {
        iconImage: "/usd_icon.svg",
        iconAlt: "USDC Icon",
        value: "9000 USDC",
      },
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "Terminal White",
        value: "Arcadia - Aerodrome Integrations",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "Clinical Notes White",
        value: "zzykxx",
      },
    ],
    cips: ["Swap", "Critical", "Dexes"],
  },
  {
    imageSrc: "/code_hawks.png",
    imageAlt: "Code Hawks Icon",
    title: "CodeHawks",
    date: "25/04/2024",
    score: "Medium",
    text: "Ignoring the Well Function logic for a ratio of reserves calculation",
    icons: [
      {
        iconImage: "/usd_icon.svg",
        iconAlt: "USDC Icon",
        value: "5000 USDC",
      },
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "Terminal White",
        value: "Beans - Stalk: Dive Into Basin",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "Clinical Notes White",
        value: "pontifex",
      },
    ],
    cips: ["Swap", "Critical", "Dexes"],
  },
  {
    imageSrc: "/code_hawk_a.png",
    imageAlt: "Code Hawks Icon",
    title: "CodeHawks",
    date: "25/04/2024",
    score: "High",
    text: "Ignoring the Well Function logic for a ratio of reserves calculation",
    icons: [
      {
        iconImage: "/usd_icon.svg",
        iconAlt: "USDC Icon",
        value: "3000 USDC",
      },
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "Terminal White",
        value: "Beans - Stalk: Dive Into Basin",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "Clinical Notes White",
        value: "pontifex",
      },
    ],
    cips: ["Swap", "Critical", "Dexes"],
  },
  {
    imageSrc: "/code_hawks_b.png",
    imageAlt: "Code Hawks Icon",
    title: "CodeHawks",
    date: "25/04/2024",
    score: "Low",
    text: "Ignoring the Well Function logic for a ratio of reserves calculation",
    icons: [
      {
        iconImage: "/usd_icon.svg",
        iconAlt: "USDC Icon",
        value: "1500 USDC",
      },
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "Terminal White",
        value: "Beans - Stalk: Dive Into Basin",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "Clinical Notes White",
        value: "pontifex",
      },
    ],
    cips: ["Swap", "Critical", "Dexes"],
  },
];
export const cipsContent = [
  {
    title: "Zwappi - Derivatives DEX",
    imageSrc: "/terminal_black.png",
    imageAlt: "Terminal Black Icon",
  },
  {
    title: "Phoenix Shadow",
    imageSrc: "/clinical_notes_black.png",
    imageAlt: "Clinical Notes Black Icon",
  },
];
export const suggestedChanges = [
  {
    title: "Private State Variables:",
    text: (
      <p>
        The <span className="underline">balances</span> mapping is now declared
        as <span className="underline">private</span> to prevent direct external
        access. Access to balances is controlled through the{" "}
        <span className="underline">getBalance</span> function.
      </p>
    ),
  },
  {
    title: "Access Control:",
    text: (
      <p>
        The <span className="underline">onlyOwner</span> modifier is applied to
        critical functions like <span className="underline">freezeAccount</span>{" "}
        and <span className="underline">unfreezeAccount</span>, ensuring that
        only the contract owner can freeze or unfreeze accounts.
      </p>
    ),
  },
  {
    title: "Freeze Mechanism:",
    text: (
      <p>
        A <span className="underline">frozenAccount</span> mapping is introduced
        to prevent frozen accounts from performing withdrawals. A{" "}
        <span className="underline">notFrozen</span> modifier is created to
        check if the sender's account is frozen before allowing withdrawals.
      </p>
    ),
  },
  {
    title: "Events:",
    text: (
      <p>
        <span className="underline">Deposit</span> and{" "}
        <span className="underline">Withdrawal</span> events are emitted
        whenever funds are deposited or withdrawn, allowing external systems to
        monitor contract activity.
      </p>
    ),
  },
  {
    title: "Validation Checks:",
    text: (
      <p>
        Additional validation checks are added to ensure that deposit amounts
        are greater than zero and that withdrawal amounts do not exceed the
        account balance.
      </p>
    ),
  },
];
export const vulnerabilitiesCard = [
  {
    title: "Reentrancy Vulnerability:",
    text: "The withdraw function allows users to withdraw funds from the contract. However, it's susceptible to reentrancy attacks. After transferring funds to the user, the contract ",
    certainityScore: "Critical",
    suggestedChanges: suggestedChanges,
  },
  {
    title: "State Changes After Transfer:",
    text: "The withdraw function modifies the contract's state after transferring funds to the user. This is risky because if the state changes fail (for example,",
    certainityScore: "Medium",
    suggestedChanges: suggestedChanges,
  },
  {
    title: "No Access Control:",
    text: "There's no access control mechanism in place, meaning anyone can deposit or withdraw funds from the contract. This could lead to unauthorized access",
    certainityScore: "High",
    suggestedChanges: suggestedChanges,
  },
  {
    title: "Lack of Modifiers:",
    text: "Modifiers could be used to add access control and validation checks in a more modular and readable way. Without modifiers, ",
    certainityScore: "Medium",
    suggestedChanges: suggestedChanges,
  },
  {
    title: "No Events:",
    text: "Events are essential for monitoring and tracing contract activity. Without events, it becomes difficult to track transactions and debug issues.",
    certainityScore: "Low",
    suggestedChanges: suggestedChanges,
  },
];

export const reportTag = [
  "0x",
  "1/64 Rule",
  "51% Attack",
  "AAVE",
  "Airdrop",
  "Chain ID",
  "Constructor",
  "Cooldown",
  "Delegate",
  "Data Exposure",
  "Emergency",
  "ERC1155",
  "ERC20",
  "ERC721",
  "Nonce",
];
export const protocolTag = [
  {
    text: "Algo Stablecoin",
    iconSrc: "/request_quote.svg",
  },
  {
    text: "Bridge",
    iconSrc: "/conversion_path.svg",
  },
  {
    text: "Cross Chain",
    iconSrc: "/shuffle.svg",
  },
  {
    text: "DAOs",
    iconSrc: "/how_to_vote.svg",
  },
  {
    text: "Decentralized Stablecoin",
    iconSrc: "/monetization_on.svg",
  },
  {
    text: "Derivatives",
    iconSrc: "/percent.svg",
  },
  {
    text: "Dexes",
    iconSrc: "/send_money.svg",
  },
  {
    text: "Gaming",
    iconSrc: "/videogame_asset.svg",
  },
  {
    text: "LP pools",
    iconSrc: "/water_drop.svg",
  },
];

export const cipsTags = ["Swap", "Critical", "Dexes"];
export const contributors = [
  {
    imageSrc: "/thec00n_iamge.png",
    name: "thec00n",
    comments: "3 comments",
    linesCode: "16 lines of code",
    commentsIcon: "/chat.svg",
    linesCodeIcon: "/code_blocks.svg",
    date: "19/05/2024",
  },
  {
    imageSrc: "/xiaoming90_image.png",
    name: "xiaoming90",
    comments: "2 comments",
    linesCode: "5 lines of code",
    commentsIcon: "/chat.svg",
    linesCodeIcon: "/code_blocks.svg",
    date: "19/05/2024",
  },
  {
    imageSrc: "/clems4ever_image.png",
    name: "clems4ever",
    comments: "4 comments",
    linesCode: "10 lines of code",
    commentsIcon: "/chat.svg",
    linesCodeIcon: "/code_blocks.svg",
    date: "19/05/2024",
  },
];

export const topContributors = [
  {
    imageSrc: "/thec00n_iamge.png",
    name: "thec00n",
    reviewIcon: "/editor_choice.svg",
    review: "24 reviews",
  },
  {
    imageSrc: "/xiaoming90_image.png",
    name: "xiaoming90",
    reviewIcon: "/editor_choice.svg",
    review: "24 reviews",
  },
  {
    imageSrc: "/clems4ever_image.png",
    name: "clems4ever",
    reviewIcon: "/editor_choice.svg",
    review: "24 reviews",
  },
];
export const tag = ["0x", "Algo Stablecoin"];

export const deployCardContent = [
  {
    id: 1,
    user: "Phoenix Shadow",
    imageSrc: "/ai_auditor_icon.png",
    imageAlt: "Ai Auditor Icon",
    title: "AI auditor",
    text: "This smart contract is vulnerable to reentrancy attacks, lacks proper access control, has potential state manipulation issues, and lacks essential features like events. These vulnerabilities could lead to financial losses and exploitation by attackers.",
    date: "25/04/2024",
    progress: 90,
    icons: [
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "USDC Icon",
        value: "Zwappi - Derivatives DEX",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "USDC Icon",
        value: "Phoenix Shadow",
      },
    ],
    frameWork: [
      {
        iconImage: "/foundry.svg",
        value: "Foundry",
      },
      {
        iconImage: "/hardhat.svg",
        value: "Hardhat  ",
      },
      {
        iconImage: "/scaffold.svg",
        value: "Scaffold",
      },
      {
        iconImage: "/foundry.svg",
        version: "Solidity Version",
        value: "V 0.8.12",
      },
      {
        iconImage: "/foundry.svg",

        version: "Audit:",
        value: "Inspect Audit",
      },
    ],
  },
  {
    id: 2,
    user: "zzykxx",
    imageSrc: "/sherlock.png",
    imageAlt: "Sherlock Icon",
    title: "Sherlock",
    text: "M-2: Swapping large amounts of assets back and forth in an Aerodrome pool allows to bypass exposure limits",
    date: "25/04/2024",
    progress: 40,
    icons: [
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "terminal_white Icon",
        value: "Arcadia - Aerodrome Integrations",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "clinical_notes_white Icon",
        value: "zzykxx",
      },
    ],
    frameWork: [
      {
        iconImage: "/foundry.svg",
        value: "Foundry",
      },
      {
        iconImage: "/hardhat.svg",
        value: "Hardhat  ",
      },
      {
        iconImage: "/scaffold.svg",
        value: "Scaffold",
      },
      {
        iconImage: "/foundry.svg",
        version: "Solidity Version",
        value: "V 0.8.12",
      },
      {
        iconImage: "/foundry.svg",

        version: "Audit:",
        value: "Inspect Audit",
      },
    ],
  },
  {
    id: 3,
    user: "zzykxx",
    imageSrc: "/code_hawks.png",
    imageAlt: "CodeHawks Icon",
    title: "CodeHawks",
    text: "Ignoring the Well Function logic for a ratio of reserves calculation",
    date: "25/04/2024",
    progress: 60,
    icons: [
      {
        iconImage: "/terminal_white.svg",
        iconAlt: "terminal_white Icon",
        value: "Arcadia - Aerodrome Integrations",
      },
      {
        iconImage: "/clinical_notes_white.svg",
        iconAlt: "clinical_notes_white Icon",
        value: "zzykxx",
      },
    ],
    frameWork: [
      {
        iconImage: "/foundry.svg",
        value: "Foundry",
      },
      {
        iconImage: "/hardhat.svg",
        value: "Hardhat  ",
      },
      {
        iconImage: "/scaffold.svg",
        value: "Scaffold",
      },
      {
        iconImage: "/foundry.svg",
        version: "Solidity Version",
        value: "V 0.8.12",
      },
      {
        iconImage: "/foundry.svg",

        version: "Audit:",
        value: "Inspect Audit",
      },
    ],
  },
];
export const coins = [
  {
    imageSrc: "/arbitrum_one.svg",
    value: "Arbitrum One",
  },
  {
    imageSrc: "/base.svg",
    value: "Base",
  },
  {
    imageSrc: "/celo.svg",
    value: "Celo",
  },
  {
    imageSrc: "/ethereum.svg",
    value: "Ethereum",
  },
  {
    imageSrc: "/linea.svg",
    value: "Linea",
  },
];
