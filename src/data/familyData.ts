// src/data/familyData.ts

export interface FamilyMember {
  key: string; // অর্থবোধক হায়ারার্কিক্যাল আইডি (Semantic ID, e.g. "1-1-1-1-1-3")
  title: string;
  gender?: "male" | "female";
  generation: number;
  children?: FamilyMember[];
  birthYear?: string;
  deathYear?: string;
  isAlive?: boolean;
  phone?: string;
  address?: string;
  profession?: string;
  spouse?: string;
  bio?: string;
}

export interface FlatFamilyMember {
  key: string;
  title: string;
  gender?: "male" | "female";
  generation: number;
  parentKey?: string | null;
  birthYear?: string;
  deathYear?: string;
  isAlive?: boolean;
  phone?: string;
  address?: string;
  profession?: string;
  spouse?: string;
  bio?: string;
}


export const familyTreeData: FamilyMember[] = [
  {
    title: "বাছার বংশ",
    key: "1",
    generation: 0,
    bio: "বাছার বংশের মূল আদি শিকড় ও ঐতিহ্যবাহী পারিবারিক মহীরূহ।",
    children: [
      {
        title: "ইজ্জত আলী বাছার",
        key: "1-1",
        gender: "male",
        generation: 1,
        birthYear: "১৮৮০",
        deathYear: "১৯৫২",
        isAlive: false,
        profession: "সমাজসেবক ও গৃহস্থালী প্রধান",
        address: "পূর্বপুরুষের আদি ভিটা",
        spouse: "মরহুমা রহিমা খাতুন",
        bio: "বাছার বংশের ১ম প্রজন্মের অন্যতম প্রবীণ আদি পুরুষ।",
        children: [
          {
            title: "হাজ্বী দাগু বাছার",
            key: "1-1-1",
            gender: "male",
            generation: 2,
            birthYear: "১৯০৫",
            deathYear: "১৯৭৮",
            isAlive: false,
            profession: "বিশিষ্ট সমাজসেবক ও ধর্মপ্রাণ ব্যক্তি",
            address: "বাছার পাড়া",
            spouse: "মরহুমা জোবেদা খাতুন",
            bio: "এলাকার সামাজিক বিচার ও উন্নয়নে গুরুত্বপূর্ণ ভূমিকা রেখেছিলেন।",
            children: [
              {
                title: "ধনাই বাছার/ দিল মোহাম্মদ বাছার",
                key: "1-1-1-1",
                gender: "male",
                generation: 3,
                birthYear: "১৯৩০",
                deathYear: "১৯৯৮",
                isAlive: false,
                profession: "কৃষিবিদ ও ব্যবসায়ী",
                address: "বাছার বাড়ি",
                spouse: "মরহুমা খাদিজা বেগম",
                children: [
                  {
                    title: "মালেক বাছার",
                    key: "1-1-1-1-1",
                    gender: "male",
                    generation: 4,
                    birthYear: "১৯৫২",
                    deathYear: "২০১৮",
                    isAlive: false,
                    profession: "ব্যবসায়ী ও শিক্ষানুরাগী",
                    address: "বাছার ভবন",
                    spouse: "মরহুমা ফিরোজা বেগম",
                    children: [
                      {
                        title: "সেলিনা",
                        key: "1-1-1-1-1-1",
                        gender: "female",
                        generation: 5,
                        birthYear: "১৯৭৫",
                        isAlive: true,
                        profession: "গৃহিণী",
                        address: "ঢাকা",
                        spouse: "মোঃ রফিকুল ইসলাম",
                      },
                      {
                        title: "নাছিমা",
                        key: "1-1-1-1-1-2",
                        gender: "female",
                        generation: 5,
                        birthYear: "১৯৭৮",
                        isAlive: true,
                        profession: "শিক্ষিকা",
                        address: "খুলনা",
                        spouse: "মোঃ আনোয়ার হোসেন",
                      },
                      {
                        title: "জাকির হোসেন",
                        key: "1-1-1-1-1-3",
                        gender: "male",
                        generation: 5,
                        birthYear: "১৯৮২",
                        isAlive: true,
                        profession: "সফটওয়্যার প্রকৌশলী ও উদ্যোক্তা",
                        phone: "০১৭১২-৩৪৫৬৭৮",
                        address: "মিরপুর, ঢাকা",
                        spouse: "ফাহমিদা আক্তার",
                        bio: "বাছার গ্রুপের ডিজিটাল রূপান্তর ও সমাজসেবায় নিবেদিত।",
                      },
                      {
                        title: "আলী হোসেন",
                        key: "1-1-1-1-1-4",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "হানীফ",
                        key: "1-1-1-1-1-5",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "ওমর ফারুক",
                        key: "1-1-1-1-1-6",
                        gender: "male",
                        generation: 5,
                      },
                    ],
                  },
                  {
                    title: "হালেম বাছার",
                    key: "1-1-1-1-2",
                    gender: "male",
                    generation: 4,
                  },
                  {
                    title: "সালেহা",
                    key: "1-1-1-1-3",
                    gender: "female",
                    generation: 4,
                  },
                ],
              },
              {
                title: "নান্দু বাছার",
                key: "1-1-1-2",
                gender: "male",
                generation: 3,
                children: [
                  {
                    title: "আদলউদ্দিন বাছার",
                    key: "1-1-1-2-1",
                    gender: "male",
                    generation: 4,
                    children: [
                      {
                        title: "ছাদেক বাছার",
                        key: "1-1-1-2-1-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "শহিদুল বাছার",
                            key: "1-1-1-2-1-1-1",
                            gender: "male",
                            generation: 6,
                            children: [
                              {
                                title: "আরাফাত",
                                key: "1-1-1-2-1-1-1-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "ইফাদ",
                                key: "1-1-1-2-1-1-1-2",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "জানু বেগম",
                            key: "1-1-1-2-1-1-2",
                            gender: "female",
                            generation: 6,
                            children: [
                              {
                                title: "শরিফ",
                                key: "1-1-1-2-1-1-2-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "আকাশ",
                                key: "1-1-1-2-1-1-2-2",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "আরিফ",
                                key: "1-1-1-2-1-1-2-3",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "শিউলি আক্তার",
                            key: "1-1-1-2-1-1-3",
                            gender: "female",
                            generation: 6,
                            children: [
                              {
                                title: "সোহান",
                                key: "1-1-1-2-1-1-3-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "হাসান",
                                key: "1-1-1-2-1-1-3-2",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "হোসাইন",
                                key: "1-1-1-2-1-1-3-3",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        title: "কাদির বাছার",
                        key: "1-1-1-2-1-2",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "রফিকুল",
                            key: "1-1-1-2-1-2-1",
                            gender: "male",
                            generation: 6,
                            children: [
                              {
                                title: "রিশাদ",
                                key: "1-1-1-2-1-2-1-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "রাফিয়া",
                                key: "1-1-1-2-1-2-1-2",
                                gender: "female",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "সাইমন",
                            key: "1-1-1-2-1-2-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রোজিনা",
                            key: "1-1-1-2-1-2-3",
                            gender: "female",
                            generation: 6,
                            children: [
                              {
                                title: "মাহমুদ",
                                key: "1-1-1-2-1-2-3-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "রিয়া মনি",
                                key: "1-1-1-2-1-2-3-2",
                                gender: "female",
                                generation: 7,
                              },
                              {
                                title: "রাতুল",
                                key: "1-1-1-2-1-2-3-3",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "ফিরোজা",
                            key: "1-1-1-2-1-2-4",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "আমেনা",
                            key: "1-1-1-2-1-2-5",
                            gender: "female",
                            generation: 6,
                            children: [
                              {
                                title: "আলিফ",
                                key: "1-1-1-2-1-2-5-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "আয়াত",
                                key: "1-1-1-2-1-2-5-2",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "রিয়াদ",
                                key: "1-1-1-2-1-2-5-3",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "আব্দুল্লাহ",
                                key: "1-1-1-2-1-2-5-4",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        title: "খিদির বাছার",
                        key: "1-1-1-2-1-3",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "লিটন",
                            key: "1-1-1-2-1-3-1",
                            gender: "male",
                            generation: 6,
                            children: [
                              {
                                title: "মিহা জিনাত",
                                key: "1-1-1-2-1-3-1-1",
                                gender: "female",
                                generation: 7,
                              },
                              {
                                title: "মায়ান রাজ",
                                key: "1-1-1-2-1-3-1-2",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "আল-আমিন",
                            key: "1-1-1-2-1-3-2",
                            gender: "male",
                            generation: 6,
                            children: [
                              {
                                title: "সাদমান সাইফ",
                                key: "1-1-1-2-1-3-2-1",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "আবুল",
                            key: "1-1-1-2-1-3-3",
                            gender: "male",
                            generation: 6,
                            children: [
                              {
                                title: "রিজওয়ান",
                                key: "1-1-1-2-1-3-3-1",
                                gender: "male",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "মামুন",
                            key: "1-1-1-2-1-3-4",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "হযরত",
                            key: "1-1-1-2-1-3-5",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "তোতা বাছার",
                        key: "1-1-1-2-1-4",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "রকি",
                            key: "1-1-1-2-1-4-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রত্না",
                            key: "1-1-1-2-1-4-2",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "মুন্নি",
                            key: "1-1-1-2-1-4-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "আতা বাছার",
                        key: "1-1-1-2-1-5",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "অমিত",
                            key: "1-1-1-2-1-5-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "অনিক",
                            key: "1-1-1-2-1-5-2",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "রাবিয়া",
                        key: "1-1-1-2-1-6",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "দেলোয়ার শেখ",
                            key: "1-1-1-2-1-6-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "ইসমাইল",
                            key: "1-1-1-2-1-6-2",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "সুফিয়া",
                        key: "1-1-1-2-1-7",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "ফারুক",
                            key: "1-1-1-2-1-7-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "সুলতান(মেষার)",
                            key: "1-1-1-2-1-7-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "দানেছ",
                            key: "1-1-1-2-1-7-3",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "নজির",
                            key: "1-1-1-2-1-7-4",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "সোনাই",
                        key: "1-1-1-2-1-8",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "দুলাল",
                            key: "1-1-1-2-1-8-1",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    title: "দলিল উদ্দিন বাছার",
                    key: "1-1-1-2-2",
                    gender: "male",
                    generation: 4,
                    children: [
                      {
                        title: "সেকান্দার বাছার",
                        key: "1-1-1-2-2-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "সোহেল রানা",
                            key: "1-1-1-2-2-1-1",
                            gender: "male",
                            generation: 6,
                            children: [
                              {
                                title: "মাশরাফি রায়ান",
                                key: "1-1-1-2-2-1-1-1",
                                gender: "male",
                                generation: 7,
                              },
                              {
                                title: "রাইসা",
                                key: "1-1-1-2-2-1-1-2",
                                gender: "female",
                                generation: 7,
                              },
                            ],
                          },
                          {
                            title: "সুবর্না",
                            key: "1-1-1-2-2-1-2",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "সাথী",
                            key: "1-1-1-2-2-1-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "ইস্কান্দার বাছার",
                        key: "1-1-1-2-2-2",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "শাহিন আলম",
                            key: "1-1-1-2-2-2-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "শারমিন",
                            key: "1-1-1-2-2-2-2",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "ইভানা",
                            key: "1-1-1-2-2-2-3",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "তানিয়া",
                            key: "1-1-1-2-2-2-4",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "রাজ্জাক বাছার",
                        key: "1-1-1-2-2-3",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "সাগর",
                            key: "1-1-1-2-2-3-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "তানভীর",
                            key: "1-1-1-2-2-3-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রূপা",
                            key: "1-1-1-2-2-3-3",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "সুমাইয়া",
                            key: "1-1-1-2-2-3-4",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "দাদন বাছার",
                        key: "1-1-1-2-2-4",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "ইমরান",
                            key: "1-1-1-2-2-4-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রাকিব",
                            key: "1-1-1-2-2-4-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রুবি",
                            key: "1-1-1-2-2-4-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "ফারুক বাছার",
                        key: "1-1-1-2-2-5",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "রাসেল",
                            key: "1-1-1-2-2-5-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রিফাত",
                            key: "1-1-1-2-2-5-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "নুসরাত",
                            key: "1-1-1-2-2-5-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "শাহ জামাল বাছার",
                        key: "1-1-1-2-2-6",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "সাদিয়া অরিন আশা",
                            key: "1-1-1-2-2-6-1",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "সামিহা",
                            key: "1-1-1-2-2-6-2",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "আরিশা",
                            key: "1-1-1-2-2-6-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    title: "বরু",
                    key: "1-1-1-2-3",
                    gender: "female",
                    generation: 4,
                    children: [
                      {
                        title: "মজিদ মোল্লা",
                        key: "1-1-1-2-3-1",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "আনোয়ারা - ইমানের(ভ্যান চালক) বউ",
                        key: "1-1-1-2-3-2",
                        gender: "female",
                        generation: 5,
                      },
                      {
                        title: "মনোয়ারা(মাওয়া স্বামী-ইনূস মৃধা)",
                        key: "1-1-1-2-3-3",
                        gender: "female",
                        generation: 5,
                      },
                      {
                        title: "সূর্য (রিয়া মনিদের বাড়ির সামনে)",
                        key: "1-1-1-2-3-4",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "ফরিদা(স্বামী-ছমুরুদ্দিন)",
                        key: "1-1-1-2-3-5",
                        gender: "female",
                        generation: 5,
                      },
                    ],
                  },
                  {
                    title: "সবুরা",
                    key: "1-1-1-2-4",
                    gender: "female",
                    generation: 4,
                    children: [
                      {
                        title: "পিয়ারি (১ম ঘরে)",
                        key: "1-1-1-2-4-1",
                        gender: "female",
                        generation: 5,
                      },
                      {
                        title: "আলাউদ্দিন হাওলাদার",
                        key: "1-1-1-2-4-2",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "জসিম",
                            key: "1-1-1-2-4-2-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "বিপ্লব",
                            key: "1-1-1-2-4-2-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "মোহাসিন",
                            key: "1-1-1-2-4-2-3",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "সোহাগ",
                            key: "1-1-1-2-4-2-4",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "ঐশি",
                            key: "1-1-1-2-4-2-5",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "সাইমা",
                            key: "1-1-1-2-4-2-6",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "খলিল হাওলাদার",
                        key: "1-1-1-2-4-3",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "জুয়েল",
                            key: "1-1-1-2-4-3-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রাবি",
                            key: "1-1-1-2-4-3-2",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "কলি",
                            key: "1-1-1-2-4-3-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                title: "ইয়াসিন বাছার",
                key: "1-1-1-3",
                gender: "male",
                generation: 3,
                children: [
                  {
                    title: "আছিয়া(১ম স্ত্রীর ঘরে)",
                    key: "1-1-1-3-1",
                    gender: "female",
                    generation: 4,
                  },
                  {
                    title: "সমর্ত্য",
                    key: "1-1-1-3-2",
                    gender: "male",
                    generation: 4,
                  },
                  {
                    title: "ছানা",
                    key: "1-1-1-3-3",
                    gender: "male",
                    generation: 4,
                  },
                  {
                    title: "হেলেনা (ফুফু)",
                    key: "1-1-1-3-4",
                    gender: "female",
                    generation: 4,
                    children: [
                      {
                        title: "সোহেল",
                        key: "1-1-1-3-4-1",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "জুয়েল",
                        key: "1-1-1-3-4-2",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "যুথী",
                        key: "1-1-1-3-4-3",
                        gender: "female",
                        generation: 5,
                      },
                    ],
                  },
                ],
              },
              {
                title: "ইব্রাহীম বাছার",
                key: "1-1-1-4",
                gender: "male",
                generation: 3,
                children: [
                  {
                    title: "নূরুল ইসলাম বাছার",
                    key: "1-1-1-4-1",
                    gender: "male",
                    generation: 4,
                    children: [
                      {
                        title: "মাসুদ",
                        key: "1-1-1-4-1-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "শান্ত",
                            key: "1-1-1-4-1-1-1",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "মফিজুল ইসলাম",
                        key: "1-1-1-4-1-2",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "নীরব",
                            key: "1-1-1-4-1-2-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "মিথীলা",
                            key: "1-1-1-4-1-2-2",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "উজ্জল বাছার",
                        key: "1-1-1-4-1-3",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "জুনায়েদ",
                            key: "1-1-1-4-1-3-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "জুবায়ের",
                            key: "1-1-1-4-1-3-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "লামিয়া",
                            key: "1-1-1-4-1-3-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "আজিজুল ইসলাম",
                        key: "1-1-1-4-1-4",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "রিহান",
                            key: "1-1-1-4-1-4-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "রিশাদ রাফি",
                            key: "1-1-1-4-1-4-2",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "মমতাজ",
                        key: "1-1-1-4-1-5",
                        gender: "female",
                        generation: 5,
                      },
                      {
                        title: "জীবনী",
                        key: "1-1-1-4-1-6",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "ফারজানা",
                            key: "1-1-1-4-1-6-1",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "ফেরদৌসি",
                            key: "1-1-1-4-1-6-2",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "আঁখি",
                        key: "1-1-1-4-1-7",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "লামিয়া",
                            key: "1-1-1-4-1-7-1",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "পলাশ",
                        key: "1-1-1-4-1-8",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "সৌরভ",
                            key: "1-1-1-4-1-8-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "সৌরভি",
                            key: "1-1-1-4-1-8-2",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "সৈকত",
                            key: "1-1-1-4-1-8-3",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "বিল্লাশ",
                        key: "1-1-1-4-1-9",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "শাকিল",
                        key: "1-1-1-4-1-10",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "পলি",
                        key: "1-1-1-4-1-11",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "শেহরিস",
                            key: "1-1-1-4-1-11-1",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    title: "সামদ বাছার",
                    key: "1-1-1-4-2",
                    gender: "male",
                    generation: 4,
                    children: [
                      {
                        title: "রাজীব বাছার",
                        key: "1-1-1-4-2-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "আব্দুল্লাহ রাহাত",
                            key: "1-1-1-4-2-1-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "আবুসাইদ",
                            key: "1-1-1-4-2-1-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "মিম",
                            key: "1-1-1-4-2-1-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "সজীব বাছার",
                        key: "1-1-1-4-2-2",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "সোলাইমান",
                            key: "1-1-1-4-2-2-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "সায়মা",
                            key: "1-1-1-4-2-2-2",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "আরিফ হাসান",
                        key: "1-1-1-4-2-3",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "আরিয়ান তানজিল",
                            key: "1-1-1-4-2-3-1",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "সাবিনা",
                        key: "1-1-1-4-2-4",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "শাহাদাৎ",
                            key: "1-1-1-4-2-4-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "সাব্বির",
                            key: "1-1-1-4-2-4-2",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "লামিয়া",
                            key: "1-1-1-4-2-4-3",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "ঝর্না",
                        key: "1-1-1-4-2-5",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "ইউসুফ",
                            key: "1-1-1-4-2-5-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "বিল্লাল",
                            key: "1-1-1-4-2-5-2",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    title: "হামিদ বাছার",
                    key: "1-1-1-4-3",
                    gender: "male",
                    generation: 4,
                    children: [
                      {
                        title: "আসিফ",
                        key: "1-1-1-4-3-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "সাজিদ",
                            key: "1-1-1-4-3-1-1",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "আসাদুজ্জামান",
                        key: "1-1-1-4-3-2",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "জাকারিয়া",
                            key: "1-1-1-4-3-2-1",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "তানজিলা",
                        key: "1-1-1-4-3-3",
                        gender: "female",
                        generation: 5,
                        children: [
                          {
                            title: "তামিম",
                            key: "1-1-1-4-3-3-1",
                            gender: "male",
                            generation: 6,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    title: "আমজাদ বাছার",
                    key: "1-1-1-4-4",
                    gender: "male",
                    generation: 4,
                    children: [
                      {
                        title: "মুন",
                        key: "1-1-1-4-4-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "নাজিফা",
                            key: "1-1-1-4-4-1-1",
                            gender: "female",
                            generation: 6,
                          },
                          {
                            title: "নাফিসা",
                            key: "1-1-1-4-4-1-2",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "আহসান উল্লাহ",
                        key: "1-1-1-4-4-2",
                        gender: "male",
                        generation: 5,
                      },
                    ],
                  },
                  {
                    title: "সালেহা বেগম",
                    key: "1-1-1-4-5",
                    gender: "female",
                    generation: 4,
                    children: [
                      {
                        title: "রুবেল",
                        key: "1-1-1-4-5-1",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "রেসোনা",
                        key: "1-1-1-4-5-2",
                        gender: "female",
                        generation: 5,
                      },
                      {
                        title: "জোৎস্না",
                        key: "1-1-1-4-5-3",
                        gender: "female",
                        generation: 5,
                      },
                    ],
                  },
                  {
                    title: "আলমাস বেগম",
                    key: "1-1-1-4-6",
                    gender: "female",
                    generation: 4,
                    children: [
                      {
                        title: "আল-আমিন",
                        key: "1-1-1-4-6-1",
                        gender: "male",
                        generation: 5,
                        children: [
                          {
                            title: "শহিদুল",
                            key: "1-1-1-4-6-1-1",
                            gender: "male",
                            generation: 6,
                          },
                          {
                            title: "আমিনা",
                            key: "1-1-1-4-6-1-2",
                            gender: "female",
                            generation: 6,
                          },
                        ],
                      },
                      {
                        title: "মিজান",
                        key: "1-1-1-4-6-2",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "মামুন",
                        key: "1-1-1-4-6-3",
                        gender: "male",
                        generation: 5,
                      },
                      {
                        title: "ইমন",
                        key: "1-1-1-4-6-4",
                        gender: "male",
                        generation: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "কানাই বাছার",
        key: "1-2",
        gender: "male",
        generation: 1,
        children: [
          {
            title: "ছন্দু বাছার",
            key: "1-2-1",
            gender: "male",
            generation: 2,
          },
          {
            title: "ছানাই বাছার",
            key: "1-2-2",
            gender: "male",
            generation: 2,
          },
        ],
      },
    ],
  },
];