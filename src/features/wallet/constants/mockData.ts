export type TransactionType =
  | 'Support'
  | 'Credit'
  | 'Debit'
  | 'Entry Fee'
  | 'Tournament Reward'
  | 'Refund'
  | 'Bonus'
  | 'Referral Bonus'
  | 'Withdrawal'
  | 'Wallet Top-up';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Transaction {
  id: string;
  referenceId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  paymentMethod: string;
  date: string;
  time: string;
  description: string;
}

export interface Reward {
  id: string;
  category:
    | 'Daily'
    | 'Weekly'
    | 'Monthly'
    | 'Mission'
    | 'Tournament'
    | 'Referral'
    | 'Season'
    | 'XP';
  title: string;
  description: string;
  rewardAmount: number;
  rewardType: 'Coins' | 'XP' | 'Cash';
  progress: number;
  target: number;
  isLocked: boolean;
  claimable: boolean;
}

export interface LevelData {
  currentCoins: number;
  currentXP: number;
  currentLevel: number;
  nextLevelXP: number;
  nextReward: string;
}

export interface PaymentMethod {
  id: string;
  type:
    | 'JazzCash'
    | 'EasyPaisa'
    | 'Visa'
    | 'MasterCard'
    | 'Stripe'
    | 'PayPal'
    | 'Bank Account';
  details: string; // e.g., "**** 1234" or "0300-XXXXXXX"
  isDefault: boolean;
  icon: string;
}

export interface ReferralData {
  code: string;
  totalEarnings: number;
  pendingRewards: number;
  totalReferrals: number;
}

export const MOCK_WALLET = {
  totalBalance: 15450,
  availableBalance: 12000,
  pendingBalance: 3000,
  bonusBalance: 450,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    referenceId: 'REF-8923-ABCD',
    type: 'Tournament Reward',
    amount: 5000,
    status: 'Completed',
    paymentMethod: 'Wallet',
    date: 'Oct 15, 2026',
    time: '14:30',
    description: '1st Place Reward for VCT Local Qualifiers',
  },
  {
    id: 'tx_2',
    referenceId: 'REF-7712-XYZR',
    type: 'Entry Fee',
    amount: -500,
    status: 'Completed',
    paymentMethod: 'Wallet',
    date: 'Oct 14, 2026',
    time: '09:15',
    description: 'Registration Fee for Weekly Scrims',
  },
  {
    id: 'tx_3',
    referenceId: 'REF-9943-LDPS',
    type: 'Withdrawal',
    amount: -2000,
    status: 'Pending',
    paymentMethod: 'JazzCash',
    date: 'Oct 12, 2026',
    time: '18:45',
    description: 'Withdrawal to JazzCash account ending in 8912',
  },
  {
    id: 'tx_4',
    referenceId: 'REF-1122-POQA',
    type: 'Wallet Top-up',
    amount: 1000,
    status: 'Completed',
    paymentMethod: 'Visa',
    date: 'Oct 10, 2026',
    time: '11:20',
    description: 'Added funds via Visa **** 4242',
  },
  {
    id: 'tx_5',
    referenceId: 'REF-5588-MNBZ',
    type: 'Referral Bonus',
    amount: 250,
    status: 'Completed',
    paymentMethod: 'Bonus',
    date: 'Oct 08, 2026',
    time: '16:00',
    description: 'Referral bonus for inviting PlayerX',
  },
];

export const MOCK_REWARDS: Reward[] = [
  {
    id: 'r_1',
    category: 'Daily',
    title: 'First Win of the Day',
    description: 'Win your first match in any competitive mode.',
    rewardAmount: 100,
    rewardType: 'XP',
    progress: 1,
    target: 1,
    isLocked: false,
    claimable: true,
  },
  {
    id: 'r_2',
    category: 'Weekly',
    title: 'Sharpshooter',
    description: 'Get 50 headshots in official tournaments.',
    rewardAmount: 500,
    rewardType: 'Coins',
    progress: 35,
    target: 50,
    isLocked: false,
    claimable: false,
  },
  {
    id: 'r_3',
    category: 'Season',
    title: 'Veteran',
    description: 'Play 100 matches in Season 4.',
    rewardAmount: 1000,
    rewardType: 'Cash',
    progress: 0,
    target: 100,
    isLocked: true,
    claimable: false,
  },
];

export const MOCK_LEVEL_DATA: LevelData = {
  currentCoins: 2450,
  currentXP: 8500,
  currentLevel: 14,
  nextLevelXP: 10000,
  nextReward: 'Exclusive Avatar Border',
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'JazzCash',
    details: '0300-XXXX123',
    isDefault: true,
    icon: 'cellphone',
  },
  {
    id: 'pm_2',
    type: 'Visa',
    details: '**** 4242',
    isDefault: false,
    icon: 'credit-card-outline',
  },
];

export const MOCK_REFERRAL_DATA: ReferralData = {
  code: 'PROGAMER2026',
  totalEarnings: 1500,
  pendingRewards: 500,
  totalReferrals: 12,
};
