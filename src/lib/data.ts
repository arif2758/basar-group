// src/lib/data.ts — বাংলায় সম্পূর্ণ data

export const impactCounters = [
  { id: 'students', label: 'ছাত্রছাত্রী সহায়তা', value: 1250, suffix: '+' },
  { id: 'books', label: 'বই দান', value: 3500, suffix: '+' },
  { id: 'jobs', label: 'স্থানীয় চাকরি সৃষ্টি', value: 85, suffix: '+' },
  { id: 'meals', label: 'খাবার পরিবেশন', value: 12000, suffix: '+' },
  { id: 'hours', label: 'ঘন্টা পরামর্শ', value: 5200, suffix: '+' },
];

export const departments = [
  {
    id: 'library',
    titleBn: 'BASAR গ্রন্থাগার',
    titleEn: 'BASAR Library',
    icon: 'FiBookOpen',
    route: '/library',
    highlights: [
      'বই ও রিসোর্সের বিশাল সংগ্রহ',
      '30 মিনিটে বই ডেলিভারি সার্ভিস',
      'ডিজিটাল লার্নিং প্ল্যাটফর্ম অ্যাক্সেস'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'foundation',
    titleBn: 'BASAR Foundation',
    titleEn: 'BASAR Foundation',
    icon: 'FiHeart',
    route: '/foundation',
    highlights: [
      'কমিউনিটি উন্নয়ন প্রোগ্রাম',
      'শিক্ষা বৃত্তি',
      'স্বাস্থ্যসেবা ও জরুরি সহায়তা'
    ],
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'supershop',
    titleBn: 'BASAR Super Shop',
    titleEn: 'BASAR Super Shop',
    icon: 'FiShoppingBag',
    route: '/shop',
    highlights: [
      'ন্যায্য মূল্যে মানসম্পন্ন পণ্য',
      'দেশীয় ও আমদানিকৃত পণ্য',
      'হোম ডেলিভারি সুবিধা'
    ],
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'itpark',
    titleBn: 'BASAR IT Park',
    titleEn: 'BASAR IT Park',
    icon: 'FiMonitor',
    route: '/it-park',
    highlights: [
      'পেশাদার প্রশিক্ষণ প্রোগ্রাম',
      'আধুনিক কর্মক্ষেত্র সুবিধা',
      'প্রযুক্তি পরামর্শ সেবা'
    ],
    color: 'from-purple-500 to-indigo-600'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'রহিমা খাতুন',
    role: 'Library সদস্য',
    quote: 'BASAR লাইব্রেরির মাধ্যমে আমার ছেলে অনেক এগিয়ে গেছে। এখানকার পরিবেশ এবং সহায়তা অসাধারণ।',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 2,
    name: 'আবদুল করিম',
    role: 'IT Park গ্র্যাজুয়েট',
    quote: 'IT Park-এর প্রশিক্ষণের মাধ্যমে আমি একটি ভালো চাকরি পেয়েছি। আমার জীবন পরিবর্তন হয়েছে।',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 3,
    name: 'ফাতেমা বেগম',
    role: 'Foundation স্বেচ্ছাসেবক',
    quote: 'BASAR Foundation-এর সাথে কাজ করে আমি অনেক পরিবারকে সাহায্য করতে পেরেছি। এটি অনেক ভালো লাগে।',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 4,
    name: 'মোহাম্মদ আলী',
    role: 'Super Shop ক্রেতা',
    quote: 'BASAR Super Shop থেকে কেনাকাটা করে আমি নিশ্চিত যে আমি ভালো মানের পণ্য পাচ্ছি।',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const upcomingProjects = [
  {
    id: 1,
    title: 'IT Park সোলার ইনস্টলেশন',
    month: 'মার্চ 2025',
    description: 'IT Park-কে শক্তি-সাশ্রয়ী করতে Solar Panel স্থাপন',
    target: '৳50,000'
  },
  {
    id: 2,
    title: 'গ্রন্থাগার সম্প্রসারণ',
    month: 'এপ্রিল 2025',
    description: 'নতুন পড়ার স্থান এবং Digital Learning Zone যোগ',
    target: '৳75,000'
  },
  {
    id: 3,
    title: 'Foundation শীত অভিযান',
    month: 'ডিসেম্বর 2024',
    description: 'প্রয়োজনগ্রস্ত পরিবারগুলোকে গরম কাপড় ও কম্বল প্রদান',
    target: '৳30,000'
  },
  {
    id: 4,
    title: 'Super Shop সম্প্রসারণ',
    month: 'মে 2025',
    description: 'পার্শ্ববর্তী এলাকায় নতুন শাখা খোলা',
    target: '৳1,20,000'
  }
];

export const donors = [
  { name: 'রফিক উদ্দিন', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' },
  { name: 'সালমা খাতুন', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' },
  { name: 'করিম মিয়া', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' },
  { name: 'রুবিনা আক্তার', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' },
  { name: 'আনোয়ার হোসেন', avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' },
  { name: 'নাসিরা বেগম', avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' }
];

export const features = [
  {
    icon: 'FiUsers',
    title: 'সদস্যপদ',
    description: '100৳ ফেরতযোগ্য সদস্যপদ ফি',
    link: '/membership'
  },
  {
    icon: 'FiClock',
    title: 'দ্রুত ডেলিভারি',
    description: '30 মিনিটে বই ডেলিভারি সার্ভিস',
    link: '/library#delivery'
  },
  {
    icon: 'FiAward',
    title: 'মাসিক Quiz',
    description: 'পুরস্কারসহ Quiz প্রতিযোগিতা',
    link: '/library#quiz'
  },
  {
    icon: 'FiBriefcase',
    title: 'স্থানীয় চাকরি',
    description: 'কর্মসংস্থান ও ডেলিভারি সুযোগ',
    link: '/it-park#jobs'
  }
];