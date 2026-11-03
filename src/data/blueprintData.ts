// src/data/blueprintData.ts

export interface BlueprintStat {
  label: string;
  value: string;
  subtext?: string;
  badge?: string;
}

export interface BlueprintStep {
  step: string;
  title: string;
  desc: string;
  iconName?: string;
  badge?: string;
}

export interface BlueprintFeatureCard {
  iconName: string;
  title: string;
  shortDesc: string;
  highlightBadge?: string;
  bulletPoints?: string[];
}

export interface BlueprintPillar {
  slug: string;
  order: number;
  title: string;
  englishTitle: string;
  tagline: string;
  category: "শাসন ও রূপরেখা" | "শিক্ষা ও জ্ঞান" | "প্রযুক্তি ও ক্যারিয়ার" | "বাণিজ্য ও কর্মসংস্থান" | "সমাজকল্যাণ" | "ঐতিহ্য ও পরিবার" | "আধ্যাত্মিকতা ও ঐক্য";
  accentColor: string; // Tailwind class prefix or hex
  gradient: string;
  bgLight: string;
  textAccent: string;
  iconName: string;
  quickStory: string; // ২-৩ লাইনের অল্পে গল্প
  stats: BlueprintStat[];
  flowTitle: string;
  flowSteps: BlueprintStep[];
  featureCards: BlueprintFeatureCard[];
  actionLink?: {
    label: string;
    href: string;
  };
}

export const blueprintPillars: BlueprintPillar[] = [
  {
    slug: "constitution",
    order: 1,
    title: "সংবিধান ও মূল দর্শন",
    englishTitle: "BASAR Constitution & Vision",
    tagline: "Learn. Earn. Empower. — আলোকস্তম্ভের মতো পথপ্রদর্শক জোট",
    category: "শাসন ও রূপরেখা",
    accentColor: "#0284c7",
    gradient: "from-sky-500 to-blue-600",
    bgLight: "bg-sky-50 dark:bg-sky-950/30",
    textAccent: "text-sky-600 dark:text-sky-400",
    iconName: "ShieldCheck",
    quickStory: "বাশার গ্রুপ কোনো ব্যক্তিমালিকানাধীন লাভজনক কোম্পানি নয়; এটি বাছার বংশের ঐক্য ও উত্তর বালাশুর সমাজের আত্মনির্ভরতা গড়ার একটি টেকসই ইকোসিস্টেম। এখানে ব্যবসা থেকে অর্জিত মুনাফায় শিক্ষা ও মানবসেবা পরিচালিত হয়।",
    stats: [
      { label: "মূল স্লোগান", value: "৩টি ধাপ", subtext: "Learn • Earn • Empower", badge: "মৌলিক দর্শন" },
      { label: "কার্যনির্বাহী স্তম্ভ", value: "৪টি উইং", subtext: "গ্রন্থাগার • আইটি • শপ • ফাউন্ডেশন", badge: "ইকোসিস্টেম" },
      { label: "আর্থিক স্বচ্ছতা", value: "১০০%", subtext: "পাবলিক অডিট ও ডিজিটাল খতিয়ান", badge: "স্বচ্ছ ট্রাস্ট" },
    ],
    flowTitle: "সমন্বিত ইকোসিস্টেম যেভাবে কাজ করে",
    flowSteps: [
      { step: "০১", title: "সুপার শপ ও উদ্যোগ", desc: "ব্যবসা ও ফুটকার্ট থেকে অর্থনৈতিক ফান্ড তৈরি হয়।", badge: "Earn" },
      { step: "০২", title: "শিক্ষা ও লাইব্রেরি", desc: "লভ্যাংশ দিয়ে শিক্ষার্থীদের ফ্রি বই ও আইটি স্কিল দেওয়া হয়।", badge: "Learn" },
      { step: "০৩", title: "সমাজ রূপান্তর", desc: "দক্ষ তরুণরা সমাজের অসহায়দের স্বাবলম্বী করে তোলে।", badge: "Empower" },
    ],
    featureCards: [
      {
        iconName: "Compass",
        title: "নামের ৫ তাৎপর্য",
        shortDesc: "Beacon (আলোকস্তম্ভ), Alliance (ঐক্য), Spark (অনুপ্রেরণা), Authentic (সততা), Rise (উত্থান)।",
        highlightBadge: "আদর্শ",
      },
      {
        iconName: "Users",
        title: "৪ স্তরের সদস্যপদ",
        shortDesc: "বংশীয় সদস্য (ট্রি-অন্তর্ভুক্ত), সহযোগী সদস্য, সক্রিয় ভলান্টিয়ার ও সম্মানিত পৃষ্ঠপোষক/ডোনার।",
        highlightBadge: "মেম্বারশিপ",
      },
      {
        iconName: "Scale",
        title: "জবাবদিহিতা ও শুরা",
        shortDesc: "৫ সদস্যের পরিচালনা পর্ষদ ও প্রবীণ উপদেষ্টা পরিষদের যৌথ সিদ্ধান্তে প্রতিটি পদক্ষেপ চূড়ান্ত হয়।",
        highlightBadge: "পরিচালনা",
      },
      {
        iconName: "Coins",
        title: "৭০:২০:১০ আর্থিক নীতি",
        shortDesc: "ব্যবসায়িক মুনাফার ৭০% ছাত্র/ভলান্টিয়ারের শিক্ষা খরচে, ২০% ব্যবসায় ও ১০% ফাউন্ডেশন তহবিলে যায়।",
        highlightBadge: "মুনাফা বণ্টন",
      },
    ],
    actionLink: {
      label: "বংশলতিকা দেখুন",
      href: "/family-tree",
    },
  },
  {
    slug: "library",
    order: 2,
    title: "বাসার গ্রন্থাগার",
    englishTitle: "BASAR Library",
    tagline: "বইয়ের আলো ছড়িয়ে পড়ুক প্রতিটি ঘরে — ১০০৳ ফেরতযোগ্য মেম্বারশিপ",
    category: "শিক্ষা ও জ্ঞান",
    accentColor: "#059669",
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    iconName: "BookOpen",
    quickStory: "বই পড়ার আগ্রহ আছে কিন্তু কেনার সামর্থ্য নেই—এমন কারো পড়ালেখা থামবে না। মাত্র ১০০ টাকা ফেরতযোগ্য জামানত দিয়ে আজীবন বিনামূল্যে বই পড়ার সুযোগ এবং নামমাত্র খরচে বাড়ি বাড়ি বই পৌঁছে দেওয়াই আমাদের লক্ষ্য।",
    stats: [
      { label: "মেম্বারশিপ ফি", value: "১০০৳", subtext: "যে কোনো সময় ১০০% ফেরতযোগ্য", badge: "রিফান্ডেবল" },
      { label: "পড়ার সময়সীমা", value: "১৪ দিন", subtext: "একসাথে সর্বোচ্চ ২টি বই", badge: "সহজ নিয়ম" },
      { label: "ডেলিভারি ফি", value: "২-১০৳", subtext: "দিনে ১০+ অর্ডার হলে সম্পূর্ণ ফ্রি", badge: "হোম সার্ভিস" },
    ],
    flowTitle: "বই নেওয়ার সহজ ৪টি ধাপ",
    flowSteps: [
      { step: "০১", title: "বই সিলেক্ট", desc: "ওয়েবসাইট বা মেসেঞ্জারে পছন্দের বই রিকুয়েস্ট করুন।", badge: "অনলাইন" },
      { step: "০২", title: "হোম ডেলিভারি", desc: "ভলান্টিয়ার আপনার বাড়িতে বই পৌঁছে দেবে অথবা নিজে এসে নিন।", badge: "দোরগোড়ায়" },
      { step: "০৩", title: "পড়া ও রিভিউ", desc: "১৪ দিন আনন্দের সাথে বই পড়ে ৩ লাইনের ছোট্ট রিভিউ দিন।", badge: "জ্ঞানচর্চা" },
      { step: "০৪", title: "ফেরত ও নতুন বই", desc: "বই জমা দিয়ে পরবর্তী পছন্দের নতুন বই সংগ্রহ করুন।", badge: "সীমাহীন" },
    ],
    featureCards: [
      {
        iconName: "CheckCircle",
        title: "১০০% ফেরতযোগ্য সদস্যপদ",
        shortDesc: "শুরুতে ১০০ টাকা সিকিউরিটি ডিপোজিট। মেম্বারশিপ বাতিল করলেই পুরো টাকা ফেরত।",
        highlightBadge: "আজীবন ফ্রি",
      },
      {
        iconName: "Bike",
        title: "বাড়ি বাড়ি ডেলিভারি",
        shortDesc: "প্রথমে নামমাত্র ২/৫/১০ টাকা। অর্ডার দিনে ১০টির বেশি হলেই বিনামূল্যে বাড়ি বাড়ি পৌঁছে যাবে।",
        highlightBadge: "ডোরস্টেপ",
      },
      {
        iconName: "MapPin",
        title: "সেবার অগ্রাধিকার",
        shortDesc: "বইপোকা পাঠক ➔ বাছার বাড়ি ➔ মসজিদ সমাজ ➔ উত্তর বালাশুর ➔ সমগ্র শ্রীনগর।",
        highlightBadge: "এলাকাভিত্তিক",
      },
      {
        iconName: "Gift",
        title: "বুক ডোনেশন ড্রাইভ",
        shortDesc: "আপনার পড়া পুরাতন পাঠ্যবই বা সাহিত্যগ্রন্থ লাইব্রেরিতে দিয়ে অন্যকে পড়ার সুযোগ দিন।",
        highlightBadge: "দান কর্মসূচি",
      },
    ],
    actionLink: {
      label: "বইয়ের ক্যাটালগ দেখুন",
      href: "/granthagar/books-catalog",
    },
  },
  {
    slug: "it-park",
    order: 3,
    title: "বাসার আইটি পার্ক",
    englishTitle: "BASAR IT Park",
    tagline: "প্রযুক্তি শিক্ষা, ৩ শিফটে স্টুডেন্ট হেল্পডেস্ক ও ফ্রিল্যান্সিং ল্যাব",
    category: "প্রযুক্তি ও ক্যারিয়ার",
    accentColor: "#7c3aed",
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
    textAccent: "text-violet-600 dark:text-violet-400",
    iconName: "Laptop",
    quickStory: "গ্রাম ও মফস্বলের তরুণদের বিশ্বমানের ফ্রিল্যান্সার ও দক্ষ মানবসম্পদ হিসেবে গড়ে তোলার আধুনিক প্রযুক্তি কেন্দ্র। লোডশেডিংমুক্ত মিনি আইপিএস ব্যাকআপ এবং ৩ শিফটে শিক্ষার্থীদের সকল হোমওয়ার্ক ও পড়ার সমস্যার সমাধান।",
    stats: [
      { label: "স্টুডেন্ট হেল্পডেস্ক", value: "৩ শিফট", subtext: "সকাল • দুপুর • সন্ধ্যা", badge: "দৈনিক সেবা" },
      { label: "কোর বিষয়", value: "MEST", subtext: "Math, English, Science, Tech", badge: "ভিত্তি মজবুত" },
      { label: "বংশীয় সুযোগ", value: "১ম অগ্রাধিকার", subtext: "বাছার পরিবারের জন্য বিশেষ ছাড়", badge: "অধিকার" },
    ],
    flowTitle: "দক্ষতা অর্জনের গতিপথ",
    flowSteps: [
      { step: "০১", title: "সফট স্কিলস", desc: "MS Word, Excel, Notion, Canva ও স্মার্ট এআই ব্রাউজিং।", badge: "মাসিক কোর্স" },
      { step: "০২", title: "MEST সমাধান", desc: "স্কুল-কলেজের গণিত, ইংরেজি ও বিজ্ঞানের কঠিন পড়া সমাধান।", badge: "হেল্পডেস্ক" },
      { step: "০৩", title: "হার্ড স্কিলস", desc: "প্রোগ্রামিং, ডিজিটাল মার্কেটিং, ভিডিও এডিটিং ও ডিজাইন।", badge: "ফ্রিল্যান্সিং" },
      { step: "০৪", title: "আন্তর্জাতিক আয়", desc: "গ্লোবাল মার্কেটপ্লেস ও রিমোট জবের মাধ্যমে স্বাবলম্বী হওয়া।", badge: "উপার্জন" },
    ],
    featureCards: [
      {
        iconName: "Clock",
        title: "৩ শিফটে স্টাডি হেল্পডেস্ক",
        shortDesc: "স্কুলের আগে সকাল শিফট, বিকেলে অ্যাসাইনমেন্ট সলভিং এবং সন্ধ্যায় নিবিড় গ্রুপ স্টাডি।",
        highlightBadge: "সারাদিন সেবা",
      },
      {
        iconName: "Zap",
        title: "নিরবচ্ছিন্ন মিনি আইপিএস",
        shortDesc: "লোডশেডিংয়েও ফ্যান ও লাইট জ্বলবে। পড়ার টেবিল কাস্টমাইজ করে শিক্ষার্থীদের সহায়তা।",
        highlightBadge: "বিদ্যুৎ ব্যাকআপ",
      },
      {
        iconName: "FileCheck",
        title: "জন্ম সনদ ও ডক সহায়তা",
        shortDesc: "পারিবারিক নতুন শিশুদের জন্মনিবন্ধন ও স্কুলের ডকুমেন্ট তৈরিতে বিনামূল্যে টেকনিক্যাল সাপোর্ট।",
        highlightBadge: "নাগরিক সেবা",
      },
      {
        iconName: "HeartHandshake",
        title: "মানবিক চিকিৎসা ও উপহার",
        shortDesc: "মেডিকেল ক্যাম্প, খাতা-কলম-ক্যালকুলেটর বিতরণ এবং দরিদ্রদের অটোগাড়ি ও কৃষি যন্ত্রপাতি সহায়তা।",
        highlightBadge: "সমাজসেবা",
      },
    ],
    actionLink: {
      label: "আইটি পার্ক সেবাসমূহ",
      href: "/it-park",
    },
  },
  {
    slug: "super-shop",
    order: 4,
    title: "সুপার শপ ও ফুডকার্ট",
    englishTitle: "BASAR Super Shop & Mobile Cart",
    tagline: "ব্যবসা নয় শুধু সেবা — আয়ের ৭০% যায় দায়িত্বপ্রাপ্ত শিক্ষার্থীর শিক্ষা খরচে",
    category: "বাণিজ্য ও কর্মসংস্থান",
    accentColor: "#ea580c",
    gradient: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50 dark:bg-orange-950/30",
    textAccent: "text-orange-600 dark:text-orange-400",
    iconName: "ShoppingCart",
    quickStory: "একটি ভ্রাম্যমাণ ও ডিজিটাল সমবায় দোকান যা একদিকে ন্যায্যমূল্যে পণ্য বিক্রি করে, অন্যদিকে দায়িত্বপ্রাপ্ত অসচ্ছল শিক্ষার্থীদের পড়ার খরচ জোগায়। এখানে কিছু কেনা মানেই একজন শিক্ষার্থীর শিক্ষার আলো জ্বালিয়ে রাখা।",
    stats: [
      { label: "ছাত্র/ভলান্টিয়ার ইনসেন্টিভ", value: "৭০%", subtext: "দায়িত্বপ্রাপ্তদের শিক্ষা খরচে নিট মুনাফা", badge: "শিক্ষার্থী ফান্ড" },
      { label: "ব্যবসার সম্প্রসারণ", value: "২০%", subtext: "নতুন পণ্য ও যন্ত্রপাতি রক্ষণাবেক্ষণ", badge: "রিজার্ভ" },
      { label: "সমাজকল্যাণ ফান্ড", value: "১০%", subtext: "ফাউন্ডেশনের জরুরি চিকিৎসায় জমা", badge: "চ্যারিটি" },
    ],
    flowTitle: "ফুডকার্ট ও সমবায়ী বাণিজ্যের ধারা",
    flowSteps: [
      { step: "০১", title: "ভ্রাম্যমাণ ফুটকার্ট", desc: "সহজে স্থানান্তরযোগ্য ফুটকার্ট দিয়ে ছুটির দিনে সেবা।", badge: "পোর্টেবল" },
      { step: "০২", title: "সামাজিক স্লোগান", desc: "আমরা শিখছি এবং মুনাফায় শিক্ষার্থী পড়াচ্ছি—এই বার্তা প্রচার।", badge: "অনুপ্রেরণা" },
      { step: "০৩", title: "অনলাইন অর্ডারিং", desc: "ওয়েবসাইটের মাধ্যমে লোকাল অর্গানিক পণ্য ও স্টেশনারি বিক্রয়।", badge: "ই-কমার্স" },
      { step: "০৪", title: "৭০% লভ্যাংশ বণ্টন", desc: "অর্জিত লাভের বড় অংশ দিয়ে শিক্ষার্থীদের স্কুল-কলেজের বেতন প্রদান।", badge: "শিক্ষা ফান্ড" },
    ],
    featureCards: [
      {
        iconName: "Coffee",
        title: "ভ্রাম্যমাণ ফুটকার্ট উদ্যোগ",
        shortDesc: "হলিডে ও বিশেষ দিবসে পাবলিক প্লেসে স্বাস্থ্যসম্মত খাবার ও পানীয় পরিবেশন।",
        highlightBadge: "পপ-আপ কার্ট",
      },
      {
        iconName: "MessageSquare",
        title: "অনুপ্রেরণাদায়ক বার্তা",
        shortDesc: "কার্টের গায়ে লেখা থাকে: 'আমরা শিখছি... লাভের টাকা দিয়ে শিক্ষার্থীদের পড়ালেখা চলে'।",
        highlightBadge: "স্বচ্ছ স্লোগান",
      },
      {
        iconName: "PenTool",
        title: "শিক্ষার্থীদের স্টেশনারি",
        shortDesc: "খাতা, কলম, ক্যালকুলেটর, জ্যামিতি বক্স পাইকারি মূল্যে শিক্ষার্থীদের হাতে পৌঁছে দেওয়া।",
        highlightBadge: "ন্যায্যমূল্য",
      },
      {
        iconName: "Truck",
        title: "মাল্টি-কুরিয়ার ও লোকাল হোম ডেলিভারি",
        shortDesc: "লোকাল এলাকায় সাইকেলে ভলান্টিয়ার ডেলিভারি এবং পাঠাও ও স্টিডফাস্ট কুরিয়ার সংযোগ।",
        highlightBadge: "ডেলিভারি",
      },
    ],
    actionLink: {
      label: "সুপার শপ ভিজিট করুন",
      href: "/super-shop",
    },
  },
  {
    slug: "foundation",
    order: 5,
    title: "বাসার ফাউন্ডেশন",
    englishTitle: "BASAR Foundation & Aid",
    tagline: "মানবিক সহায়তা, শিক্ষা বৃত্তি ও কেন্দ্রীয় রক্তদান নেটওয়ার্ক",
    category: "সমাজকল্যাণ",
    accentColor: "#2563eb",
    gradient: "from-blue-600 to-indigo-700",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    textAccent: "text-blue-600 dark:text-blue-400",
    iconName: "HeartHandshake",
    quickStory: "অসহায় পরিবারের মুখে হাসি ফোটানো এবং বিপদে আপদে ঢাল হয়ে দাঁড়ানোই বাশার ফাউন্ডেশনের ব্রত। প্রতিটি অনুদানের ১ টাকারও অডিট হিসাব সবার সামনে স্বচ্ছ থাকে।",
    stats: [
      { label: "আর্থিক স্বচ্ছতা", value: "১ টাকার হিসাব", subtext: "পাবলিক ট্রান্সপারেন্সি ড্যাশবোর্ড", badge: "জিরো করাপশন" },
      { label: "রক্তদান সাড়া", value: "২৪/৭", subtext: "জরুরি রক্তদানে তাৎক্ষণিক ডোনার ম্যাচ", badge: "জরুরি সেবা" },
      { label: "সহায়তা মডেল", value: "টেকসই", subtext: "শুধু ত্রাণ নয়, কর্মসংস্থানের উপকরণ বিতরণ", badge: "স্বাবলম্বী" },
    ],
    flowTitle: "স্বচ্ছ সহায়তা যাচাইকরণ প্রক্রিয়া",
    flowSteps: [
      { step: "০১", title: "আবেদন জমা", desc: "ওয়েবসাইট বা প্রতিনিধির মাধ্যমে চিকিৎসার বা বৃত্তির আবেদন।", badge: "ডিজিটাল" },
      { step: "০২", title: "তদন্ত কমিটি", desc: "২ জন ভলান্টিয়ার নিরপেক্ষভাবে প্রার্থীর ঘরে গিয়ে তথ্য যাচাই করেন।", badge: "নিরপেক্ষ" },
      { step: "০৩", title: "সরাসরি হস্তান্তর", desc: "কোনো মধ্যস্বত্বভোগী ছাড়া রোগীর কাছে ওষুধ বা টাকা হস্তান্তর।", badge: "৪৮ ঘণ্টা" },
    ],
    featureCards: [
      {
        iconName: "GraduationCap",
        title: "মেধা ও শিক্ষা সহায়তা বৃত্তি",
        shortDesc: "স্কুল ফি, পরীক্ষার ফি ও পাঠ্যবই কিনতে না পারা অসচ্ছল শিক্ষার্থীদের আর্থিক অনুদান।",
        highlightBadge: "শিক্ষা",
      },
      {
        iconName: "HeartPulse",
        title: "জরুরি চিকিৎসা ও ওষুধ ফান্ড",
        shortDesc: "অসহায় ও বয়োবৃদ্ধ রোগীদের প্রেসক্রিপশন অনুযায়ী সরাসরি প্রয়োজনীয় ওষুধ কিনে দেওয়া।",
        highlightBadge: "চিকিৎসা",
      },
      {
        iconName: "Droplet",
        title: "সরাসরি রক্তদান নেটওয়ার্ক",
        shortDesc: "উত্তর বালাশুর ও বাছার বংশের ব্লাড ডোনারদের ডিরেক্টরি দিয়ে জীবন রক্ষা করা।",
        highlightBadge: "রক্তদান",
      },
      {
        iconName: "Shirt",
        title: "দারিদ্র্য দূরীকরণ উদ্যোগ",
        shortDesc: "সেলাই মেশিন, রিকশা ও ক্ষুদ্র পুঁজি দিয়ে পরিবারের স্থায়ী উপার্জনের ব্যবস্থা করা।",
        highlightBadge: "কর্মসংস্থান",
      },
    ],
    actionLink: {
      label: "রক্তদাতার সন্ধান করুন",
      href: "/blood-donation",
    },
  },
  {
    slug: "family-tree",
    order: 6,
    title: "বাছার বংশলতিকা",
    englishTitle: "BASAR Heritage & Family Tree",
    tagline: "শিকড়ের সন্ধান, রক্তের বন্ধন এবং ভবিষ্যৎ প্রজন্মের গৌরবোজ্জ্বল সংযোগ",
    category: "ঐতিহ্য ও পরিবার",
    accentColor: "#059669",
    gradient: "from-emerald-600 to-green-700",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    textAccent: "text-emerald-700 dark:text-emerald-400",
    iconName: "GitBranch",
    quickStory: "শতবর্ষের ঐতিহ্যবাহী বাছার পরিবারের প্রতিটি প্রজন্মের রক্তসম্পর্ককে ডিজিটাল ট্রি আর্কিটেকচারে এক সূত্রে গাঁথা হয়েছে। পরিবার ভেরিফাইড সদস্যদের জন্য এটি সম্পূর্ণ সুরক্ষিত ও প্রাইভেট।",
    stats: [
      { label: "প্রজন্ম ব্যাপ্তি", value: "৮+ প্রজন্ম", subtext: "আদি শিকড় থেকে বর্তমান সন্তান", badge: "শতবর্ষের ইতিহাস" },
      { label: "আইডি সিস্টেম", value: "Semantic Key", subtext: "কোড দেখেই সম্পর্কের চেইন চেনা যায়", badge: "স্বয়ংক্রিয়" },
      { label: "প্রাইভেসি ও সিকিউরিটি", value: "Gated Access", subtext: "শুধু ভেরিফাইড পরিবারের সদস্যরাই দেখতে পারেন", badge: "সুরক্ষিত" },
    ],
    flowTitle: "বংশলতিকা যুক্ত হওয়ার ধাপসমূহ",
    flowSteps: [
      { step: "০১", title: "রেজিস্ট্রেশন", desc: "ওয়েবসাইটে নিজের ও পিতার নাম দিয়ে একাউন্ট তৈরি করুন।", badge: "সাইন-আপ" },
      { step: "০২", title: "পরিবার ভেরিফিকেশন", desc: "বংশের মুরব্বিদের তথ্যের সাথে লিঙ্ক করে অ্যাডমিন অনুমোদন দেন।", badge: "যাচাই" },
      { step: "০৩", title: "ট্রি ও আত্মীয়তা", desc: "বংশের আদিপুরুষ থেকে নিজের শাখা ও সকল আত্মীয়ের তথ্য দেখুন।", badge: "সংযুক্ত" },
    ],
    featureCards: [
      {
        iconName: "Search",
        title: "স্মার্ট সার্চ ও অটো-এক্সপ্যান্ড",
        shortDesc: "যেকোনো সদস্যের নাম সার্চ করলেই পূর্বপুরুষদের সম্পূর্ণ লাইন স্বয়ংক্রিয়ভাবে খুলে যায়।",
        highlightBadge: "Nextra আর্কিটেকচার",
      },
      {
        iconName: "Shield",
        title: "কঠোর পারিবারিক গোপনীয়তা",
        shortDesc: "সাধারণ ইন্টারনেট থেকে এই ডাটা সম্পূর্ণ আড়ালে। অনুমোদিত বংশীয় সদস্য ছাড়া প্রবেশ নিষেধ।",
        highlightBadge: "প্রাইভেট",
      },
      {
        iconName: "Calendar",
        title: "বার্ষিক বংশ সম্মেলন (Reunion)",
        shortDesc: "শীতকালে সকল সন্তান ও প্রবাসীদের নিয়ে বার্ষিক মিলনমেলা ও গুণীজন সংবর্ধনা।",
        highlightBadge: "মিলনমেলা",
      },
      {
        iconName: "Sparkles",
        title: "কৃতী শিক্ষার্থী সংবর্ধনা",
        shortDesc: "এসএসসি, এইচএসসি ও জাতীয় মেধা তালিকায় শীর্ষে থাকা সন্তানদের বিশেষ সম্মাননা।",
        highlightBadge: "অনুপ্রেরণা",
      },
    ],
    actionLink: {
      label: "বংশলতিকা এক্সপ্লোর করুন",
      href: "/family-tree",
    },
  },
  {
    slug: "mosque",
    order: 7,
    title: "বাছার বাড়ি জামে মসজিদ",
    englishTitle: "Uttar Balashur Mosque Initiative",
    tagline: "ঐক্য, ভ্রাতৃত্ব এবং সমাজের প্রতিটি খনায় ভালোবাসার আলো পৌঁছে দেওয়া",
    category: "আধ্যাত্মিকতা ও ঐক্য",
    accentColor: "#0f766e",
    gradient: "from-teal-600 to-cyan-700",
    bgLight: "bg-teal-50 dark:bg-teal-950/30",
    textAccent: "text-teal-600 dark:text-teal-400",
    iconName: "Building2",
    quickStory: "মসজিদ হবে সমাজের ঐক্য ও আত্মশুদ্ধির মূল কেন্দ্র। অতীতের মনোমালিন্য ভুলে পুরোনো পরিবারগুলোকে সম্মান ও ভালোবাসার সাথে ফিরিয়ে আনা এবং সমাজের কারো প্রতি যেন অবহেলা না হয় তা নিশ্চিত করাই মূল লক্ষ্য।",
    stats: [
      { label: "মূল লক্ষ্য", value: "সম্প্রীতি", subtext: "অভিমানী পরিবারগুলোকে ভালোবাসা দিয়ে ফিরিয়ে আনা", badge: "ঐক্য" },
      { label: "ডিজিটাল ট্র্যাকিং", value: "১২ মাস", subtext: "খনার মাসিক বেতন ও চাঁদা রেজিস্ট্রি", badge: "স্বচ্ছতা" },
      { label: "নৈতিক শিক্ষা", value: "মক্তব অগ্রগতি", subtext: "শিশুদের কুরআন শিক্ষা ও উপস্থিতি পর্যবেক্ষণ", badge: "ভবিষ্যৎ প্রজন্ম" },
    ],
    flowTitle: "মসজিদ আধুনিকায়নের কর্মপদ্ধতি",
    flowSteps: [
      { step: "০১", title: "পুনর্মিলন উদ্যোগ", desc: "পুরোনো পরিবারগুলোর ঘরে ঘরে গিয়ে সেবা ও শ্রদ্ধা পৌঁছে দেওয়া।", badge: "ভ্রাতৃত্ব" },
      { step: "০২", title: "খনা ডাটাবেজ", desc: "পরিবারগুলোর মাসিক বেতন ও বিদ্যুৎ অনুদান ডিজিটালি সংরক্ষণ।", badge: "লেজার" },
      { step: "০৩", title: "মক্তব ও লাইব্রেরি", desc: "শিশুদের সকালের কুরআন শিক্ষা ও মসজিদ পাঠাগার কর্নার চালু করা।", badge: "আলো" },
    ],
    featureCards: [
      {
        iconName: "Heart",
        title: "পুরোনো পরিবারগুলোর সাথে পুনর্মিলন",
        shortDesc: "আলতাফ মিস্ত্রি বাড়ি, ওহাব কাড়াল বাড়ি, রশিদ মাদবর বাড়িসহ সকলকে আপন করে নেওয়া।",
        highlightBadge: "ভালোবাসা ও সম্মান",
      },
      {
        iconName: "FileSpreadsheet",
        title: "১২ মাসের ডিজিটাল লেজার",
        shortDesc: "ইমাম-মুয়াজ্জিনের মাসিক বেতন ও বিদ্যুৎ খরচের খনাভিত্তিক স্বচ্ছ হিসাব।",
        highlightBadge: "ডিজিটাল খতিয়ান",
      },
      {
        iconName: "BookOpen",
        title: "মক্তব উপস্থিতি ও মূল্যায়ন",
        shortDesc: "বাচ্চারা নিয়মিত আসছে কি না এবং পড়ালেখার অবস্থা অভিভাবকদের নিয়মিত জানানো।",
        highlightBadge: "নৈতিক শিক্ষা",
      },
      {
        iconName: "Moon",
        title: "মুসলিম ডে ফিচার ইন্টিগ্রেশন",
        shortDesc: "উত্তর বালাশুরের সঠিক নামাজের ওয়াক্ত, আজানের সময় ও ডিজিটাল যাকাত ক্যালকুলেটর।",
        highlightBadge: "ডিজিটাল ওয়াক্ত",
      },
    ],
  },
];

export function getPillarBySlug(slug: string): BlueprintPillar | undefined {
  return blueprintPillars.find((p) => p.slug === slug);
}

