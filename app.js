const ITEMS = [
  {
    index: 1,
    collation: 1,
    koreanName: "꼬",
    koreanExample: "까이",
    symbol: "ก",
    thaiName: "ก ไก่",
    nameProper: "Ko Kai",
    rtgsName: "ko kai",
    meaning: "chicken",
    korean: "꼬 까이",
    image: "assets/1.png",
  },
  {
    index: 2,
    collation: 2,
    koreanName: "코",
    koreanExample: "카이",
    symbol: "ข",
    thaiName: "ข ไข่",
    nameProper: "Kho Khai",
    rtgsName: "kho khai",
    meaning: "egg",
    korean: "코 카이",
    image: "assets/2.png",
  },
  {
    index: 3,
    collation: 3,
    koreanName: "코",
    koreanExample: "쿠앗",
    symbol: "ฃ",
    thaiName: "ฃ ขวด",
    nameProper: "Kho Khuat",
    rtgsName: "kho khuat",
    meaning: "bottle",
    korean: "코 쿠앗",
    image: "assets/3.png",
  },
  {
    index: 4,
    collation: 4,
    koreanName: "코",
    koreanExample: "콰이",
    symbol: "ค",
    thaiName: "ค ควาย",
    nameProper: "Kho Khwai",
    rtgsName: "kho khwai",
    meaning: "buffalo",
    korean: "코 콰이",
    image: "assets/4.png",
  },
  {
    index: 5,
    collation: 5,
    koreanName: "코",
    koreanExample: "콘",
    symbol: "ฅ",
    thaiName: "ฅ คน",
    nameProper: "Kho Khon",
    rtgsName: "kho khon",
    meaning: "person",
    korean: "코 콘",
    image: "assets/5.png",
  },
  {
    index: 6,
    collation: 6,
    koreanName: "코",
    koreanExample: "라캉",
    symbol: "ฆ",
    thaiName: "ฆ ระฆัง",
    nameProper: "Kho Rakhang",
    rtgsName: "kho rakhang",
    meaning: "bell",
    korean: "코 라캉",
    image: "assets/6.png",
  },
  {
    index: 7,
    collation: 7,
    koreanName: "응오",
    koreanExample: "응우",
    symbol: "ง",
    thaiName: "ง งู",
    nameProper: "Ngo Ngu",
    rtgsName: "ngo ngu",
    meaning: "snake",
    korean: "응오 응우",
    image: "assets/7.png",
  },
  {
    index: 8,
    collation: 8,
    koreanName: "쪼",
    koreanExample: "짠",
    symbol: "จ",
    thaiName: "จ จาน",
    nameProper: "Cho Chan",
    rtgsName: "cho chan",
    meaning: "plate",
    korean: "쪼 짠",
    image: "assets/8.png",
  },
  {
    index: 9,
    collation: 9,
    koreanName: "초",
    koreanExample: "칭",
    symbol: "ฉ",
    thaiName: "ฉ ฉิ่ง",
    nameProper: "Cho Ching",
    rtgsName: "cho ching",
    meaning: "cymbals",
    korean: "초 칭",
    image: "assets/9.png",
  },
  {
    index: 10,
    collation: 10,
    koreanName: "초",
    koreanExample: "창",
    symbol: "ช",
    thaiName: "ช ช้าง",
    nameProper: "Cho Chang",
    rtgsName: "cho chang",
    meaning: "elephant",
    korean: "초 창",
    image: "assets/10.png",
  },
  {
    index: 11,
    collation: 11,
    koreanName: "쏘",
    koreanExample: "쏘",
    symbol: "ซ",
    thaiName: "ซ โซ่",
    nameProper: "So So",
    rtgsName: "so so",
    meaning: "chain",
    korean: "쏘 쏘",
    image: "assets/11.png",
  },
  {
    index: 12,
    collation: 12,
    koreanName: "초",
    koreanExample: "츠",
    symbol: "ฌ",
    thaiName: "ฌ เฌอ",
    nameProper: "Cho Choe",
    rtgsName: "cho choe",
    meaning: "tree",
    korean: "초 츠",
    image: "assets/12.png",
  },
  {
    index: 13,
    collation: 13,
    koreanName: "요",
    koreanExample: "잉",
    symbol: "ญ",
    thaiName: "ญ หญิง",
    nameProper: "Yo Ying",
    rtgsName: "yo ying",
    meaning: "woman",
    korean: "요 잉",
    image: "assets/13.png",
  },
  {
    index: 14,
    collation: 14,
    koreanName: "도",
    koreanExample: "차다",
    symbol: "ฎ",
    thaiName: "ฎ ชฎา",
    nameProper: "Do Chada",
    rtgsName: "do chada",
    meaning: "headdress",
    korean: "도 차다",
    image: "assets/14.png",
  },
  {
    index: 15,
    collation: 15,
    koreanName: "또",
    koreanExample: "빠딱",
    symbol: "ฏ",
    thaiName: "ฏ ปฏัก",
    nameProper: "To Patak",
    rtgsName: "to patak",
    meaning: "goad, javelin",
    korean: "또 빠딱",
    image: "assets/15.png",
  },
  {
    index: 16,
    collation: 16,
    koreanName: "토",
    koreanExample: "탄",
    symbol: "ฐ",
    thaiName: "ฐ ฐาน",
    nameProper: "Tho Than",
    rtgsName: "tho than",
    meaning: "pedestal",
    korean: "토 탄",
    image: "assets/16.png",
  },
  {
    index: 17,
    collation: 17,
    koreanName: "토",
    koreanExample: "몬토",
    symbol: "ฑ",
    thaiName: "ฑ มณโฑ",
    nameProper: "Tho Montho",
    rtgsName: "tho montho",
    meaning: "Montho",
    korean: "토 몬토",
    image: "assets/17.png",
  },
  {
    index: 18,
    collation: 18,
    koreanName: "토",
    koreanExample: "푸타우",
    symbol: "ฒ",
    thaiName: "ฒ ผู้เฒ่า",
    nameProper: "Tho Phuthao",
    rtgsName: "tho phuthao",
    meaning: "elder",
    korean: "토 푸타우",
    image: "assets/18.png",
  },
  {
    index: 19,
    collation: 19,
    koreanName: "노",
    koreanExample: "넨",
    symbol: "ณ",
    thaiName: "ณ เณร",
    nameProper: "No Nen",
    rtgsName: "no nen",
    meaning: "samanera",
    korean: "노 넨",
    image: "assets/19.png",
  },
  {
    index: 20,
    collation: 20,
    koreanName: "도",
    koreanExample: "덱",
    symbol: "ด",
    thaiName: "ด เด็ก",
    nameProper: "Do Dek",
    rtgsName: "do dek",
    meaning: "child",
    korean: "도 덱",
    image: "assets/20.png",
  },
  {
    index: 21,
    collation: 21,
    koreanName: "또",
    koreanExample: "따우",
    symbol: "ต",
    thaiName: "ต เต่า",
    nameProper: "To Tao",
    rtgsName: "to tao",
    meaning: "turtle",
    korean: "또 따우",
    image: "assets/21.png",
  },
  {
    index: 22,
    collation: 22,
    koreanName: "토",
    koreanExample: "퉁",
    symbol: "ถ",
    thaiName: "ถ ถุง",
    nameProper: "Tho Thung",
    rtgsName: "tho thung",
    meaning: "sack",
    korean: "토 퉁",
    image: "assets/22.png",
  },
  {
    index: 23,
    collation: 23,
    koreanName: "토",
    koreanExample: "타한",
    symbol: "ท",
    thaiName: "ท ทหาร",
    nameProper: "Tho Thahan",
    rtgsName: "tho thahan",
    meaning: "soldier",
    korean: "토 타한",
    image: "assets/23.png",
  },
  {
    index: 24,
    collation: 24,
    koreanName: "토",
    koreanExample: "통",
    symbol: "ธ",
    thaiName: "ธ ธง",
    nameProper: "Tho Thong",
    rtgsName: "tho thong",
    meaning: "flag",
    korean: "토 통",
    image: "assets/24.png",
  },
  {
    index: 25,
    collation: 25,
    koreanName: "노",
    koreanExample: "누",
    symbol: "น",
    thaiName: "น หนู",
    nameProper: "No Nu",
    rtgsName: "no nu",
    meaning: "mouse",
    korean: "노 누",
    image: "assets/25.png",
  },
  {
    index: 26,
    collation: 26,
    koreanName: "보",
    koreanExample: "바이마이",
    symbol: "บ",
    thaiName: "บ ใบไม้",
    nameProper: "Bo Baimai",
    rtgsName: "bo baimai",
    meaning: "leaf",
    korean: "보 바이마이",
    image: "assets/26.png",
  },
  {
    index: 27,
    collation: 27,
    koreanName: "뽀",
    koreanExample: "쁠라",
    symbol: "ป",
    thaiName: "ป ปลา",
    nameProper: "Po Pla",
    rtgsName: "po pla",
    meaning: "fish",
    korean: "뽀 쁠라",
    image: "assets/27.png",
  },
  {
    index: 28,
    collation: 28,
    koreanName: "포",
    koreanExample: "픙",
    symbol: "ผ",
    thaiName: "ผ ผึ้ง",
    nameProper: "Pho Phueng",
    rtgsName: "pho phueng",
    meaning: "bee",
    korean: "포 픙",
    image: "assets/28.png",
  },
  {
    index: 29,
    collation: 29,
    koreanName: "포",
    koreanExample: "파",
    symbol: "ฝ",
    thaiName: "ฝ ฝา",
    nameProper: "Fo Fa",
    rtgsName: "fo fa",
    meaning: "lid",
    korean: "포 파",
    image: "assets/29.png",
  },
  {
    index: 30,
    collation: 30,
    koreanName: "포",
    koreanExample: "판",
    symbol: "พ",
    thaiName: "พ พาน",
    nameProper: "Pho Phan",
    rtgsName: "pho phan",
    meaning: "phan",
    korean: "포 판",
    image: "assets/30.png",
  },
  {
    index: 31,
    collation: 31,
    koreanName: "포",
    koreanExample: "판",
    symbol: "ฟ",
    thaiName: "ฟ ฟัน",
    nameProper: "Fo Fan",
    rtgsName: "fo fan",
    meaning: "teeth",
    korean: "포 판",
    image: "assets/31.png",
  },
  {
    index: 32,
    collation: 32,
    koreanName: "포",
    koreanExample: "쌈파우",
    symbol: "ภ",
    thaiName: "ภ สำเภา",
    nameProper: "Pho Samphao",
    rtgsName: "pho samphao",
    meaning: "Junk",
    korean: "포 쌈파우",
    image: "assets/32.png",
  },
  {
    index: 33,
    collation: 33,
    koreanName: "모",
    koreanExample: "마",
    symbol: "ม",
    thaiName: "ม ม้า",
    nameProper: "Mo Ma",
    rtgsName: "mo ma",
    meaning: "horse",
    korean: "모 마",
    image: "assets/33.png",
  },
  {
    index: 34,
    collation: 34,
    koreanName: "요",
    koreanExample: "약",
    symbol: "ย",
    thaiName: "ย ยักษ์",
    nameProper: "Yo Yak",
    rtgsName: "yo yak",
    meaning: "giant, yaksha",
    korean: "요 약",
    image: "assets/34.png",
  },
  {
    index: 35,
    collation: 35,
    koreanName: "로",
    koreanExample: "르아",
    symbol: "ร",
    thaiName: "ร เรือ",
    nameProper: "Ro Ruea",
    rtgsName: "ro ruea",
    meaning: "boat",
    korean: "로 르아",
    image: "assets/35.png",
  },
  {
    index: 36,
    collation: 36,
    koreanName: "로",
    koreanExample: "링",
    symbol: "ล",
    thaiName: "ล ลิง",
    nameProper: "Lo Ling",
    rtgsName: "lo ling",
    meaning: "monkey",
    korean: "로 링",
    image: "assets/36.png",
  },
  {
    index: 37,
    collation: 37,
    koreanName: "워",
    koreanExample: "왠",
    symbol: "ว",
    thaiName: "ว แหวน",
    nameProper: "Wo Waen",
    rtgsName: "wo waen",
    meaning: "ring",
    korean: "워 왠",
    image: "assets/37.png",
  },
  {
    index: 38,
    collation: 38,
    koreanName: "쏘",
    koreanExample: "쌀라",
    symbol: "ศ",
    thaiName: "ศ ศาลา",
    nameProper: "So Sala",
    rtgsName: "so sala",
    meaning: "pavilion, sala",
    korean: "쏘 쌀라",
    image: "assets/38.png",
  },
  {
    index: 39,
    collation: 39,
    koreanName: "쏘",
    koreanExample: "르씨",
    symbol: "ษ",
    thaiName: "ษ ฤๅษี",
    nameProper: "So Ruesi",
    rtgsName: "so ruesi",
    meaning: "hermit",
    korean: "쏘 르씨",
    image: "assets/39.png",
  },
  {
    index: 40,
    collation: 40,
    koreanName: "쏘",
    koreanExample: "쓰아",
    symbol: "ส",
    thaiName: "ส เสือ",
    nameProper: "So Suea",
    rtgsName: "so suea",
    meaning: "tiger",
    korean: "쏘 쓰아",
    image: "assets/40.png",
  },
  {
    index: 41,
    collation: 41,
    koreanName: "호",
    koreanExample: "힙",
    symbol: "ห",
    thaiName: "ห หีบ",
    nameProper: "Ho Hip",
    rtgsName: "ho hip",
    meaning: "chest, box",
    korean: "호 힙",
    image: "assets/41.png",
  },
  {
    index: 42,
    collation: 42,
    koreanName: "로",
    koreanExample: "쭐라",
    symbol: "ฬ",
    thaiName: "ฬ จุฬา",
    nameProper: "Lo Chula",
    rtgsName: "lo chula",
    meaning: "kite",
    korean: "로 쭐라",
    image: "assets/42.png",
  },
  {
    index: 43,
    collation: 43,
    koreanName: "오",
    koreanExample: "앙",
    symbol: "อ",
    thaiName: "อ อ่าง",
    nameProper: "O Ang",
    rtgsName: "o ang",
    meaning: "basin",
    korean: "오 앙",
    image: "assets/43.png",
  },
  {
    index: 44,
    collation: 44,
    koreanName: "호",
    koreanExample: "녹훅",
    symbol: "ฮ",
    thaiName: "ฮ นกฮูก",
    nameProper: "Ho Nokhuk",
    rtgsName: "ho nokhuk",
    meaning: "owl",
    korean: "호 녹훅",
    image: "assets/44.png",
  },
];

const NUMBER_ITEMS = [
  {
    index: 1,
    collation: 1,
    koreanName: "순",
    koreanExample: "",
    symbol: "๐",
    thaiName: "ศูนย์",
    nameProper: "Sun",
    rtgsName: "sun",
    meaning: "0",
    korean: "순",
    image: "",
  },
  {
    index: 2,
    collation: 2,
    koreanName: "능",
    koreanExample: "",
    symbol: "๑",
    thaiName: "หนึ่ง",
    nameProper: "Nueng",
    rtgsName: "nueng",
    meaning: "1",
    korean: "능",
    image: "",
  },
  {
    index: 3,
    collation: 3,
    koreanName: "쏭",
    koreanExample: "",
    symbol: "๒",
    thaiName: "สอง",
    nameProper: "Song",
    rtgsName: "song",
    meaning: "2",
    korean: "쏭",
    image: "",
  },
  {
    index: 4,
    collation: 4,
    koreanName: "쌈",
    koreanExample: "",
    symbol: "๓",
    thaiName: "สาม",
    nameProper: "Sam",
    rtgsName: "sam",
    meaning: "3",
    korean: "쌈",
    image: "",
  },
  {
    index: 5,
    collation: 5,
    koreanName: "씨",
    koreanExample: "",
    symbol: "๔",
    thaiName: "สี่",
    nameProper: "Si",
    rtgsName: "si",
    meaning: "4",
    korean: "씨",
    image: "",
  },
  {
    index: 6,
    collation: 6,
    koreanName: "하",
    koreanExample: "",
    symbol: "๕",
    thaiName: "ห้า",
    nameProper: "Ha",
    rtgsName: "ha",
    meaning: "5",
    korean: "하",
    image: "",
  },
  {
    index: 7,
    collation: 7,
    koreanName: "혹",
    koreanExample: "",
    symbol: "๖",
    thaiName: "หก",
    nameProper: "Hok",
    rtgsName: "hok",
    meaning: "6",
    korean: "혹",
    image: "",
  },
  {
    index: 8,
    collation: 8,
    koreanName: "쩻",
    koreanExample: "",
    symbol: "๗",
    thaiName: "เจ็ด",
    nameProper: "Chet",
    rtgsName: "chet",
    meaning: "7",
    korean: "쩻",
    image: "",
  },
  {
    index: 9,
    collation: 9,
    koreanName: "뺏",
    koreanExample: "",
    symbol: "๘",
    thaiName: "แปด",
    nameProper: "Paet",
    rtgsName: "paet",
    meaning: "8",
    korean: "뺏",
    image: "",
  },
  {
    index: 10,
    collation: 10,
    koreanName: "까우",
    koreanExample: "",
    symbol: "๙",
    thaiName: "เก้า",
    nameProper: "Kao",
    rtgsName: "kao",
    meaning: "9",
    korean: "까우",
    image: "",
  },

  {
    index: 11,
    collation: 11,
    koreanName: "씹",
    koreanExample: "",
    symbol: "๑๐",
    thaiName: "สิบ",
    nameProper: "Sip",
    rtgsName: "sip",
    meaning: "10",
    korean: "씹",
    image: "",
  },
  {
    index: 12,
    collation: 12,
    koreanName: "씹엣",
    koreanExample: "",
    symbol: "๑๑",
    thaiName: "สิบเอ็ด",
    nameProper: "Sip Et",
    rtgsName: "sip et",
    meaning: "11",
    korean: "씹엣",
    image: "",
  },
  {
    index: 13,
    collation: 13,
    koreanName: "씹쏭",
    koreanExample: "",
    symbol: "๑๒",
    thaiName: "สิบสอง",
    nameProper: "Sip Song",
    rtgsName: "sip song",
    meaning: "12",
    korean: "씹쏭",
    image: "",
  },
  {
    index: 14,
    collation: 14,
    koreanName: "씹쌈",
    koreanExample: "",
    symbol: "๑๓",
    thaiName: "สิบสาม",
    nameProper: "Sip Sam",
    rtgsName: "sip sam",
    meaning: "13",
    korean: "씹쌈",
    image: "",
  },
  {
    index: 15,
    collation: 15,
    koreanName: "씹씨",
    koreanExample: "",
    symbol: "๑๔",
    thaiName: "สิบสี่",
    nameProper: "Sip Si",
    rtgsName: "sip si",
    meaning: "14",
    korean: "씹씨",
    image: "",
  },
  {
    index: 16,
    collation: 16,
    koreanName: "씹하",
    koreanExample: "",
    symbol: "๑๕",
    thaiName: "สิบห้า",
    nameProper: "Sip Ha",
    rtgsName: "sip ha",
    meaning: "15",
    korean: "씹하",
    image: "",
  },
  {
    index: 17,
    collation: 17,
    koreanName: "씹혹",
    koreanExample: "",
    symbol: "๑๖",
    thaiName: "สิบหก",
    nameProper: "Sip Hok",
    rtgsName: "sip hok",
    meaning: "16",
    korean: "씹혹",
    image: "",
  },
  {
    index: 18,
    collation: 18,
    koreanName: "씹쩻",
    koreanExample: "",
    symbol: "๑๗",
    thaiName: "สิบเจ็ด",
    nameProper: "Sip Chet",
    rtgsName: "sip chet",
    meaning: "17",
    korean: "씹쩻",
    image: "",
  },
  {
    index: 19,
    collation: 19,
    koreanName: "씹뺏",
    koreanExample: "",
    symbol: "๑๘",
    thaiName: "สิบแปด",
    nameProper: "Sip Paet",
    rtgsName: "sip paet",
    meaning: "18",
    korean: "씹뺏",
    image: "",
  },
  {
    index: 20,
    collation: 20,
    koreanName: "씹까우",
    koreanExample: "",
    symbol: "๑๙",
    thaiName: "สิบเก้า",
    nameProper: "Sip Kao",
    rtgsName: "sip kao",
    meaning: "19",
    korean: "씹까우",
    image: "",
  },

  {
    index: 21,
    collation: 21,
    koreanName: "이씹",
    koreanExample: "",
    symbol: "๒๐",
    thaiName: "ยี่สิบ",
    nameProper: "Yi Sip",
    rtgsName: "yi sip",
    meaning: "20",
    korean: "이씹",
    image: "",
  },
];

const VOWEL_ITEMS = [
  {
    index: 1,
    collation: 1,
    koreanName: "뚜아 르",
    koreanExample: "",
    symbol: "ฤ",
    thaiName: "ตัว ฤ",
    nameProper: "Tua Rue",
    rtgsName: "tua rue",
    meaning: "",
    korean: "뚜아 르",
    image: "",
  },
  {
    index: 2,
    collation: 2,
    koreanName: "뚜아 르ː",
    koreanExample: "",
    symbol: "ฤๅ",
    thaiName: "ตัว ฤๅ",
    nameProper: "Tua Rue",
    rtgsName: "tua rue",
    meaning: "",
    korean: "뚜아 르ː",
    image: "",
  },
  {
    index: 3,
    collation: 3,
    koreanName: "뚜아 ㄹ르",
    koreanExample: "",
    symbol: "ฦ",
    thaiName: "ตัว ฦ",
    nameProper: "Tua Lue",
    rtgsName: "tua lue",
    meaning: "",
    korean: "뚜아 ㄹ르",
    image: "",
  },
  {
    index: 4,
    collation: 4,
    koreanName: "뚜아 ㄹ르ː",
    koreanExample: "",
    symbol: "ฦๅ",
    thaiName: "ตัว ฦๅ",
    nameProper: "Tua Lue",
    rtgsName: "tua lue",
    meaning: "",
    korean: "뚜아 ㄹ르ː",
    image: "",
  },
  {
    index: 5,
    collation: 5,
    koreanName: "닉카힛",
    koreanExample: "",
    symbol: "◌ํ",
    thaiName: "นิคหิต",
    nameProper: "Nikkhahit",
    rtgsName: "nikkhahit",
    meaning: "",
    korean: "닉카힛",
    image: "",
  },
  {
    index: 6,
    collation: 6,
    koreanName: "마이 타이 쿠",
    koreanExample: "",
    symbol: "◌็",
    thaiName: "ไม้ไต่คู้",
    nameProper: "Mai Tai Khu",
    rtgsName: "mai tai khu",
    meaning: "",
    korean: "마이 타이 쿠",
    image: "",
  },
  {
    index: 7,
    collation: 7,
    koreanName: "야마칸",
    koreanExample: "",
    symbol: "๎",
    thaiName: "ยามักการ",
    nameProper: "Yamakkan",
    rtgsName: "yamakkan",
    meaning: "",
    korean: "야마칸",
    image: "",
  },
  {
    index: 8,
    collation: 8,
    koreanName: "탄타캇",
    koreanExample: "",
    symbol: "◌์",
    thaiName: "ทัณฑฆาต",
    nameProper: "Thanthakhat, Karan",
    rtgsName: "thanthakhat, karan",
    meaning: "",
    korean: "탄타캇",
    image: "",
  },
  {
    index: 9,
    collation: 9,
    koreanName: "마이 엑",
    koreanExample: "",
    symbol: "◌่",
    thaiName: "ไม้เอก",
    nameProper: "Mai Ek",
    rtgsName: "mai ek",
    meaning: "",
    korean: "마이 엑",
    image: "",
  },
  {
    index: 10,
    collation: 10,
    koreanName: "마이 토",
    koreanExample: "",
    symbol: "◌้",
    thaiName: "ไม้โท",
    nameProper: "Mai Tho",
    rtgsName: "mai tho",
    meaning: "",
    korean: "마이 토",
    image: "",
  },
  {
    index: 11,
    collation: 11,
    koreanName: "마이 뜨리",
    koreanExample: "",
    symbol: "◌๊",
    thaiName: "ไม้ตรี",
    nameProper: "Mai Tri",
    rtgsName: "mai tri",
    meaning: "",
    korean: "마이 뜨리",
    image: "",
  },
  {
    index: 12,
    collation: 12,
    koreanName: "마이 짯따와",
    koreanExample: "",
    symbol: "◌๋",
    thaiName: "ไม้จัตวา",
    nameProper: "Mai Chattawa",
    rtgsName: "mai chattawa",
    meaning: "",
    korean: "마이 짯따와",
    image: "",
  },
  {
    index: 13,
    collation: 13,
    koreanName: "뚜아 요",
    koreanExample: "",
    symbol: "ย",
    thaiName: "ตัว ย",
    nameProper: "Tua Yo",
    rtgsName: "tua yo",
    meaning: "",
    korean: "뚜아 요",
    image: "",
  },
  {
    index: 14,
    collation: 14,
    koreanName: "락 캉",
    koreanExample: "",
    symbol: "า",
    thaiName: "ลากข้าง",
    nameProper: "Lak Khang",
    rtgsName: "lak khang",
    meaning: "",
    korean: "락 캉",
    image: "",
  },
  {
    index: 15,
    collation: 15,
    koreanName: "로 한",
    koreanExample: "",
    symbol: "รร",
    thaiName: "โร หัน",
    nameProper: "Ro Han",
    rtgsName: "ro han",
    meaning: "",
    korean: "로 한",
    image: "",
  },
  {
    index: 16,
    collation: 16,
    koreanName: "마이 말라이",
    koreanExample: "",
    symbol: "ไ",
    thaiName: "ไม้มลาย",
    nameProper: "Mai Malai",
    rtgsName: "mai malai",
    meaning: "",
    korean: "마이 말라이",
    image: "",
  },
  {
    index: 17,
    collation: 17,
    koreanName: "마이 한 아깟",
    koreanExample: "",
    symbol: "◌ั",
    thaiName: "ไม้หันอากาศ",
    nameProper: "Mai Han Akat",
    rtgsName: "mai han akat",
    meaning: "",
    korean: "마이 한 아깟",
    image: "",
  },
  {
    index: 18,
    collation: 18,
    koreanName: "마이 나",
    koreanExample: "",
    symbol: "เ",
    thaiName: "ไม้หน้า",
    nameProper: "Mai Na",
    rtgsName: "mai na",
    meaning: "",
    korean: "마이 나",
    image: "",
  },
  {
    index: 19,
    collation: 19,
    koreanName: "마이 오",
    koreanExample: "",
    symbol: "โ",
    thaiName: "ไม้โอ",
    nameProper: "Mai O",
    rtgsName: "mai o",
    meaning: "",
    korean: "마이 오",
    image: "",
  },
  {
    index: 20,
    collation: 20,
    koreanName: "마이 무안",
    koreanExample: "",
    symbol: "ใ",
    thaiName: "ไม้ม้วน",
    nameProper: "Mai Muan",
    rtgsName: "mai muan",
    meaning: "",
    korean: "마이 무안",
    image: "",
  },
  {
    index: 21,
    collation: 21,
    koreanName: "위산차니",
    koreanExample: "",
    symbol: "ะ",
    thaiName: "วิสรรชนีย์",
    nameProper: "Wisanchani",
    rtgsName: "wisanchani",
    meaning: "",
    korean: "위산차니",
    image: "",
  },
  {
    index: 22,
    collation: 22,
    koreanName: "틴 이앗",
    koreanExample: "",
    symbol: "◌ุ",
    thaiName: "ตีนเหยียด",
    nameProper: "Tin Yiat",
    rtgsName: "tin yiat",
    meaning: "",
    korean: "틴 이앗",
    image: "",
  },
  {
    index: 23,
    collation: 23,
    koreanName: "틴 쿠",
    koreanExample: "",
    symbol: "◌ู",
    thaiName: "ตีนคู้",
    nameProper: "Tin Khu",
    rtgsName: "tin khu",
    meaning: "",
    korean: "틴 쿠",
    image: "",
  },
  {
    index: 24,
    collation: 24,
    koreanName: "핀투",
    koreanExample: "",
    symbol: "◌ฺ",
    thaiName: "พินทุ",
    nameProper: "Phinthu",
    rtgsName: "phinthu",
    meaning: "",
    korean: "핀투",
    image: "",
  },
  {
    index: 25,
    collation: 25,
    koreanName: "핀투 이",
    koreanExample: "",
    symbol: "◌ิ",
    thaiName: "พินทุอิ",
    nameProper: "Phinthu I",
    rtgsName: "phinthu i",
    meaning: "",
    korean: "핀투 이",
    image: "",
  },
  {
    index: 26,
    collation: 26,
    koreanName: "사라 이ː",
    koreanExample: "",
    symbol: "◌ี",
    thaiName: "สระอี",
    nameProper: "Sara Ii",
    rtgsName: "sara ii",
    meaning: "long i vowel sign",
    korean: "사라 이ː",
    image: "",
  },
  {
    index: 27,
    collation: 27,
    koreanName: "사라 으",
    koreanExample: "",
    symbol: "◌ึ",
    thaiName: "สระอึ",
    nameProper: "Sara Ue",
    rtgsName: "sara ue",
    meaning: "short ue vowel sign",
    korean: "사라 으",
    image: "",
  },
  {
    index: 28,
    collation: 28,
    koreanName: "사라 으ː",
    koreanExample: "",
    symbol: "◌ื",
    thaiName: "สระอือ",
    nameProper: "Sara Uee",
    rtgsName: "sara uee",
    meaning: "long ue vowel sign",
    korean: "사라 으ː",
    image: "",
  },
  {
    index: 29,
    collation: 29,
    koreanName: "마이 애",
    koreanExample: "",
    symbol: "แ",
    thaiName: "ไม้แอ",
    nameProper: "Mai Ae",
    rtgsName: "mai ae",
    meaning: "",
    korean: "마이 애",
    image: "",
  },
  {
    index: 30,
    collation: 30,
    koreanName: "뚜아 워",
    koreanExample: "",
    symbol: "ว",
    thaiName: "ตัว ว",
    nameProper: "Tua Wo",
    rtgsName: "tua wo",
    meaning: "",
    korean: "뚜아 워",
    image: "",
  },
  {
    index: 31,
    collation: 31,
    koreanName: "뚜아 오",
    koreanExample: "",
    symbol: "อ",
    thaiName: "ตัว อ",
    nameProper: "Tua O",
    rtgsName: "tua o",
    meaning: "",
    korean: "뚜아 오",
    image: "",
  },
  {
    index: 32,
    collation: 32,
    koreanName: "마이 야목",
    koreanExample: "",
    symbol: "ๆ",
    thaiName: "ไม้ยมก",
    nameProper: "Mai Yamok",
    rtgsName: "mai yamok",
    meaning: "preceding word or phrase is reduplicated",
    korean: "마이 야목",
    image: "",
  },
  {
    index: 33,
    collation: 33,
    koreanName: "마합 팍",
    koreanExample: "",
    symbol: ".",
    thaiName: "มหัพภาค, จุด",
    nameProper: "Mahap Phak, Chut",
    rtgsName: "mahap phak, chut",
    meaning: "period",
    korean: "마합 팍",
    image: "",
  },
  {
    index: 34,
    collation: 34,
    koreanName: "앙칸 디아오",
    koreanExample: "",
    symbol: "ฯ",
    thaiName: "อังคั่นเดี่ยว, คั่นเดี่ยว, ขั้นเดี่ยว",
    nameProper: "Angkhan Diao, Khan Diao, Khan Diao",
    rtgsName: "angkhan diao, khan diao, khan diao",
    meaning: "previously marked end of a sentence or stanza",
    korean: "앙칸 디아오",
    image: "",
  },
  {
    index: 35,
    collation: 35,
    koreanName: "앙칸 쿠",
    koreanExample: "",
    symbol: "๚",
    thaiName: "อังคั่นคู่, คั่นคู่, ขั้นคู่",
    nameProper: "Angkhan Khu, Khan Khu, Khan Khu",
    rtgsName: "angkhan khu, khan khu, khan khu",
    meaning: "end of stanza; end of chapter or long section",
    korean: "앙칸 쿠",
    image: "",
  },
  {
    index: 36,
    collation: 36,
    koreanName: "웡 렙",
    koreanExample: "",
    symbol: "( )",
    thaiName: "วงเล็บ, นขลิขิต",
    nameProper: "Wong Lep, Nakha Likhit",
    rtgsName: "wong lep, nakha likhit",
    meaning: "parentheses",
    korean: "웡 렙",
    image: "",
  },
  {
    index: 37,
    collation: 37,
    koreanName: "춘라팍",
    koreanExample: "",
    symbol: ",",
    thaiName: "จุลภาค, ลูกน้ำ",
    nameProper: "Chunlaphak, Luk Nam",
    rtgsName: "chunlaphak, luk nam",
    meaning: "comma",
    korean: "춘라팍",
    image: "",
  },
  {
    index: 38,
    collation: 38,
    koreanName: "코뭇",
    koreanExample: "",
    symbol: "๛",
    thaiName: "โคมูตร, สูตรนารายณ์",
    nameProper: "Khomut, Sutnarai",
    rtgsName: "khomut, sutnarai",
    meaning: "end of a chapter or document; end of a story",
    korean: "코뭇",
    image: "",
  },
  {
    index: 39,
    collation: 39,
    koreanName: "파이얀 노이",
    koreanExample: "",
    symbol: "ฯ",
    thaiName: "ไปยาลน้อย",
    nameProper: "Paiyan Noi",
    rtgsName: "paiyan noi",
    meaning: "formal phrase shortened by convention",
    korean: "파이얀 노이",
    image: "",
  },
  {
    index: 40,
    collation: 40,
    koreanName: "판 누",
    koreanExample: "",
    symbol: "◌̎",
    thaiName: "ฟันหนู",
    nameProper: "Fan Nu",
    rtgsName: "fan nu",
    meaning: "",
    korean: "판 누",
    image: "",
  },
  {
    index: 41,
    collation: 41,
    koreanName: "폰 통",
    koreanExample: "",
    symbol: "◌̍",
    thaiName: "ฝนทอง",
    nameProper: "Fon Thong",
    rtgsName: "fon thong",
    meaning: "",
    korean: "폰 통",
    image: "",
  },
  {
    index: 42,
    collation: 42,
    koreanName: "퐁 만",
    koreanExample: "",
    symbol: "๏",
    thaiName: "ฟองมัน, ตาไก่",
    nameProper: "Fong Man, Ta Kai",
    rtgsName: "fong man, ta kai",
    meaning: "previously marked beginning of a sentence, paragraph, or stanza; now also used as bullet point",
    korean: "퐁 만",
    image: "",
  },
];

/////////////////////////////////////////////// 통제부 ///////////////////////////////////////////////
let currentCategory = "consonant";

function getCurrentItems() {
  if (currentCategory === "number") return NUMBER_ITEMS;
  if (currentCategory === "vowel") return VOWEL_ITEMS;
  return ITEMS;
}

let idx = 0;

function setActiveMode(buttonId) {
  document.querySelectorAll(".mode button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(buttonId).classList.add("active");
}

function getThaiVoice() {
  const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
  return voices.find((v) => v.lang === "th-TH") || voices.find((v) => v.lang.startsWith("th")) || null;
}

function speakThai(text) {
  if (!("speechSynthesis" in window)) return;

  const u = new SpeechSynthesisUtterance(text);

  u.lang = "th-TH";
  u.rate = 0.75;

  const voices = speechSynthesis.getVoices();

  const thaiVoice = voices.find((v) => v.lang === "th-TH") || voices.find((v) => v.lang.startsWith("th"));

  if (thaiVoice) {
    u.voice = thaiVoice;
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function render() {
  const items = getCurrentItems();
  const x = items[idx];

  const symbolEl = document.getElementById("symbol");
  const img = document.getElementById("img");

  let fallback = document.getElementById("imageFallback");
  if (!fallback) {
    fallback = document.createElement("div");
    fallback.id = "imageFallback";
    img.parentElement.appendChild(fallback);
  }

  if (currentCategory === "number") {
    symbolEl.textContent = x.symbol;

    img.style.display = "none";
    fallback.style.display = "flex";

    fallback.textContent = x.meaning || "";
    fallback.style.fontSize = "240px";
    fallback.style.lineHeight = "1";
    fallback.style.fontWeight = "bold";
    fallback.style.justifyContent = "center";
    fallback.style.alignItems = "center";
  } else if (currentCategory === "vowel") {
    symbolEl.textContent = x.symbol;

    img.style.display = "none";
    fallback.style.display = "flex";

    fallback.textContent = x.meaning || "";
    fallback.style.fontSize = "32px";
    fallback.style.lineHeight = "1.4";
    fallback.style.whiteSpace = "pre-line";
    fallback.style.textAlign = "center";
    fallback.style.justifyContent = "center";
    fallback.style.alignItems = "center";
  } else {
    symbolEl.textContent = x.symbol;

    fallback.style.display = "none";
    img.style.display = "block";
    img.src = x.image || "";
  }

  document.getElementById("thaiName").textContent = "이름: " + x.thaiName;
  document.getElementById("korean").textContent = "한글: " + x.korean;
  document.getElementById("proper").textContent = "라틴: " + x.rtgsName;
}

document.getElementById("prev").onclick = () => {
  idx = (idx - 1 + getCurrentItems().length) % getCurrentItems().length;
  render();
};

document.getElementById("next").onclick = () => {
  idx = (idx + 1) % getCurrentItems().length;
  render();
};

/////////////////////////////////////////////// 퀴즈 모드 ///////////////////////////////////////////////
function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5);
}

function playCorrect() {
  const ctx = new AudioContext();

  const notes = [523, 659, 784, 1046]; // 도 미 솔 높은 도

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(ctx.destination);

    const t = ctx.currentTime + i * 0.18;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.start(t);
    osc.stop(t + 0.18);
  });
}

function playWrong() {
  const ctx = new AudioContext();

  // C5(523Hz) ~ B5 반음 12개
  const freqs = [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 987.77];

  const master = ctx.createGain();
  master.gain.value = 0.04;
  master.connect(ctx.destination);

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(master);

    const t = ctx.currentTime;

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(1, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.start(t);
    osc.stop(t + 0.7);
  });
}

function quiz() {
  const items = getCurrentItems();
  const correct = items[Math.floor(Math.random() * items.length)];

  window.currentQuizItem = correct;

  document.getElementById("quizTitle").textContent = "제시된 내용에 해당하는 글자를 키보드에서 마우스 클릭하세요.";

  document.getElementById("quizSymbol").textContent = "";
  document.getElementById("result").textContent = "";

  const quizImg = document.getElementById("quizImg");

  if (currentCategory === "number") {
    quizImg.removeAttribute("src");
    quizImg.style.display = "flex";
    quizImg.style.alignItems = "center";
    quizImg.style.justifyContent = "center";
    quizImg.style.fontSize = "240px";
    quizImg.style.fontWeight = "bold";
    quizImg.style.objectFit = "contain";
    quizImg.alt = "";
    quizImg.outerHTML = `<div id="quizImg" class="img" style="display:flex;align-items:center;justify-content:center;font-size:240px;font-weight:bold;">${correct.meaning}</div>`;
  } else if (currentCategory === "vowel") {
    quizImg.removeAttribute("src");
    quizImg.outerHTML = `
      <div id="quizImg" class="img" style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:32px;line-height:1.6;font-weight:bold;text-align:center;">
        <div>${correct.thaiName}</div>
        <div>${correct.koreanName}</div>
        <div>${correct.rtgsName}</div>
      </div>
    `;
  } else {
    quizImg.style.display = "block";
    quizImg.src = correct.image;
  }

  const box = document.getElementById("choices");
  box.innerHTML = "";

  items.forEach((v) => {
    const b = document.createElement("button");
    b.textContent = v.symbol;

    b.onclick = () => {
      if (v.collation === correct.collation) {
        playCorrect();

        document.getElementById("result").innerHTML = `
      <div>
        <div>${correct.thaiName}</div>
        <div>${correct.koreanName} ${correct.koreanExample}</div>
        <div>${correct.rtgsName}</div>
      </div>
    `;
      } else {
        playWrong();

        document.getElementById("result").innerHTML = `
      <div>
        <div>${v.thaiName}</div>
        <div>${v.koreanName} ${v.koreanExample}</div>
        <div>${v.rtgsName}</div>
      </div>
    `;
      }
    };

    box.appendChild(b);
  });
}

document.getElementById("newQuiz").onclick = quiz;

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = getThaiVoice;
}

/////////////////////////////////////////////// 게임 모드 ///////////////////////////////////////////////

let gameQueue = [];
let gameIndex = 0;
let gameResults = [];
let participantName = "";
let participantId = "";
let resultSaved = false;
let analysisGenerated = false;
let reportSaved = false;

let gameDifficulty = "advanced";

const difficultySettings = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

function makeGameQueue() {
  const base = [];
  const repetition = difficultySettings[gameDifficulty];

  for (let r = 1; r <= repetition; r++) {
    getCurrentItems().forEach((item) => {
      base.push({
        ...item,
        repetition: r,
      });
    });
  }

  return shuffle(base);
}

let gameStartTime = null;
let gameEndTime = null;
let trialStartTime = null;
analysisGenerated = false;
resultSaved = false;

function startGame() {
  gameStartTime = Date.now();
  gameEndTime = null;
  gameQueue = makeGameQueue();
  gameIndex = 0;
  gameResults = [];
  resultSaved = false;
  analysisGenerated = false;
  reportSaved = false;
  document.getElementById("showResult").style.display = "none";
  renderGame();
}

function renderGame() {
  if (gameIndex >= gameQueue.length) {
    gameEndTime = Date.now();
    document.getElementById("progressBar").style.width = "100%";
    document.getElementById("gameProgressText").textContent = "게임 종료!";
    document.getElementById("showResult").style.display = "inline-block";
    return;
  }

  const x = gameQueue[gameIndex];

  trialStartTime = Date.now();

  document.getElementById("gameKorean").textContent = x.koreanName + " " + x.koreanExample;
  document.getElementById("gameRtgs").textContent = x.rtgsName;

  const gameImageBox = document.querySelector(".gameImageBox");

  if (currentCategory === "number") {
    gameImageBox.innerHTML = `
      <div style="font-size:240px;font-weight:bold;line-height:1;text-align:center;">
        ${x.meaning}
      </div>
    `;
  } else if (currentCategory === "vowel") {
    gameImageBox.innerHTML = `
      <div style="font-size:36px;font-weight:bold;line-height:1.6;text-align:center;">
        <div>${x.koreanName}</div>
        <div>${x.rtgsName}</div>
      </div>
    `;
  } else {
    gameImageBox.innerHTML = `<img id="gameImg" class="img" />`;
    document.getElementById("gameImg").src = x.image;
  }

  document.getElementById("gameProgressText").textContent = gameIndex + 1 + " / " + gameQueue.length;

  const progress = ((gameIndex + 1) / gameQueue.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  const box = document.getElementById("gameChoices");
  box.innerHTML = "";

  getCurrentItems().forEach((v) => {
    const b = document.createElement("button");
    b.textContent = v.symbol;

    b.onclick = () => {
      gameResults.push({
        trial: gameIndex + 1,
        repetition: x.repetition,
        difficulty: gameDifficulty,
        question: x.collation,
        answer: v.collation,
        correct: v.collation === x.collation,
        rt: Date.now() - trialStartTime,
      });

      gameIndex += 1;
      renderGame();
    };

    box.appendChild(b);
  });
}

function getPointRadius(r) {
  if (r.repetition === 1) return 5;
  if (r.repetition === 2) return 7;
  if (r.repetition === 3) return 9;
  return 6;
}

function showGameResult() {
  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "block";
  document.getElementById("speak").style.display = "none";

  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, W, H);

  const pad = 70;
  const min = 1;
  const max = getCurrentItems().length;

  function sx(x) {
    return pad + ((x - min) / (max - min)) * (W - pad * 2);
  }

  function sy(y) {
    return H - pad - ((y - min) / (max - min)) * (H - pad * 2);
  }

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, H - pad);
  ctx.lineTo(W - pad, H - pad);
  ctx.stroke();

  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sx(1), sy(1));
  ctx.lineTo(sx(max), sy(max));
  ctx.stroke();

  ctx.strokeStyle = "#e5e5e5";
  ctx.lineWidth = 1;

  for (let i = 1; i <= max; i++) {
    ctx.beginPath();
    ctx.moveTo(sx(i), sy(1));
    ctx.lineTo(sx(i), sy(max));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(sx(1), sy(i));
    ctx.lineTo(sx(max), sy(i));
    ctx.stroke();
  }

  ctx.fillStyle = "#111";
  ctx.font = "24px sans-serif";
  ctx.fillText("Stimuli", W / 2, H - 8);
  ctx.save();
  ctx.translate(24, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Responses", 0, 0);
  ctx.restore();

  ctx.textAlign = "center";
  for (let i = 1; i <= max; i += 5) {
    ctx.fillText(String(i), sx(i), H - pad + 32);
  }

  ctx.textAlign = "right";
  for (let i = 1; i <= max; i += 5) {
    ctx.fillText(String(i), pad - 9, sy(i) + 8);
  }

  const total = gameResults.length;
  const correctCount = gameResults.filter((r) => r.question === r.answer).length;
  const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 10000) / 100;

  ctx.fillStyle = "#111";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";

  ctx.fillText("정답률: " + accuracy.toFixed(2) + "%", W / 2, 40);

  // =========================
  // 범례 상대 위치 설정
  // =========================
  // =========================
  // 범례 위치 설정
  // 캔버스 오른쪽 눈금과 외곽선 사이
  // =========================
  const legendX = W - pad + 18;

  // 위쪽: 반복 범례
  const legendTopY = pad + 10;

  // 아래쪽: 정오답 범례
  const legendBottomY = H - pad - 80;

  // =========================
  // 반복 범례 (우상단)
  // =========================
  ctx.textAlign = "left";
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#111";

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;

  // 1회
  ctx.beginPath();
  ctx.arc(legendX, legendTopY, 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillText("1회", legendX + 18, legendTopY + 6);

  // 2회
  ctx.beginPath();
  ctx.arc(legendX, legendTopY + 30, 7, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillText("2회", legendX + 18, legendTopY + 36);

  // 3회
  ctx.beginPath();
  ctx.arc(legendX, legendTopY + 60, 9, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillText("3회", legendX + 18, legendTopY + 66);

  // =========================
  // 정오답 범례 (우하단)
  // =========================
  ctx.textAlign = "left";
  ctx.font = "18px sans-serif";

  // 정답
  ctx.beginPath();
  ctx.arc(legendX, legendBottomY, 7, 0, Math.PI * 2);

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#111";

  ctx.fillText("정답", legendX + 18, legendBottomY + 6);

  // 오답
  ctx.beginPath();
  ctx.arc(legendX, legendBottomY + 30, 7, 0, Math.PI * 2);

  ctx.strokeStyle = "#d11";
  ctx.stroke();

  ctx.fillText("오답", legendX + 18, legendBottomY + 36);

  // 확인
  ctx.beginPath();
  ctx.arc(legendX, legendBottomY + 60, 8, 0, Math.PI * 2);

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillText("확인", legendX + 18, legendBottomY + 66);

  document.getElementById("r2Text").textContent = "";

  window.resultPoints = [];

  gameResults.forEach((r) => {
    const x = sx(r.question);
    const y = sy(r.answer);
    const radius = getPointRadius(r);

    window.resultPoints.push({ x, y, r });

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    ctx.strokeStyle = r.question === r.answer ? "#111" : "#d11";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  document.querySelectorAll(".sideTitle").forEach((x) => {
    x.style.display = "none";
  });

  document.getElementById("responseSymbol").textContent = "";
  document.getElementById("stimulusSymbol").textContent = "";

  document.getElementById("analysisLeft").style.display = "block";
  document.getElementById("analysisRight").style.display = "block";
  document.getElementById("analysisLeft").style.visibility = "hidden";
  document.getElementById("analysisRight").style.visibility = "hidden";

  document.getElementById("analysisLeft").textContent = "";
  document.getElementById("analysisRight").textContent = "";

  hoveredPoint = null;
  selectedPoint = null;
}

document.getElementById("resultCanvas").onclick = (e) => {
  const canvas = document.getElementById("resultCanvas");
  const rect = canvas.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
  const hit = window.resultPoints.find((p) => Math.hypot(p.x - x, p.y - y) < 12);

  if (!hit) return;

  if (selectedPoint) {
    drawPoint(selectedPoint, false);
  }

  selectedPoint = hit;
  drawPoint(selectedPoint, true);

  const q = getCurrentItems().find((v) => v.collation === hit.r.question);
  const a = getCurrentItems().find((v) => v.collation === hit.r.answer);

  // 왼쪽 = 자극
  document.getElementById("stimulusSymbol").textContent = q.symbol;
  // 오른쪽 = 반응
  document.getElementById("responseSymbol").textContent = a.symbol;
  document.querySelectorAll(".sideTitle").forEach((x) => {
    x.style.display = "block";
  });
};

let hoveredPoint = null;
let selectedPoint = null;

function drawPoint(point, isBlue = false) {
  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");

  const baseRadius = getPointRadius(point.r);
  const drawRadius = isBlue ? baseRadius + 2 : baseRadius;

  // 기존 hover/확인 흔적 지우기
  ctx.beginPath();
  ctx.arc(point.x, point.y, baseRadius + 4, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // 점 다시 그리기
  ctx.beginPath();
  ctx.arc(point.x, point.y, drawRadius, 0, Math.PI * 2);

  ctx.strokeStyle = isBlue ? "blue" : point.r.question === point.r.answer ? "#111" : "#d11";

  ctx.lineWidth = isBlue ? 3 : 2;
  ctx.stroke();
}

document.getElementById("resultCanvas").onmousemove = (e) => {
  const canvas = document.getElementById("resultCanvas");
  const rect = canvas.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

  const hit = window.resultPoints.find((p) => Math.hypot(p.x - x, p.y - y) < 12);

  canvas.style.cursor = hit ? "pointer" : "default";

  if (hoveredPoint && hoveredPoint !== selectedPoint) {
    drawPoint(hoveredPoint, false);
  }

  hoveredPoint = null;

  if (hit) {
    if (hit !== selectedPoint) {
      drawPoint(hit, true);
      hoveredPoint = hit;
    }
  }

  if (selectedPoint) {
    drawPoint(selectedPoint, true);
  }
};

function downloadResultImage(includeReport = false) {
  participantName = prompt("이름을 입력하세요 (선택)\n비워두면 자동 파일명으로 저장됩니다.");

  if (participantName === null) return false;

  participantName = participantName.trim();

  const start = new Date(gameStartTime);

  const yyyy = start.getFullYear();
  const mm = String(start.getMonth() + 1).padStart(2, "0");
  const dd = String(start.getDate()).padStart(2, "0");
  const hh = String(start.getHours()).padStart(2, "0");
  const mi = String(start.getMinutes()).padStart(2, "0");
  const ss = String(start.getSeconds()).padStart(2, "0");

  const durationSec = Math.round((gameEndTime - gameStartTime) / 1000);

  const safeName = participantName || "thai_study";

  const fileBaseName = `${safeName}_${yyyy}${mm}${dd}_${hh}${mi}${ss}_${durationSec}s_${gameQueue.length}`;

  const resultData = {
    participantName: participantName || "",
    difficulty: gameDifficulty,
    gameStartTime: new Date(gameStartTime).toISOString(),
    gameEndTime: new Date(gameEndTime).toISOString(),
    durationMs: gameEndTime - gameStartTime,
    totalTrials: gameQueue.length,
    results: gameResults,
    analysis: includeReport
      ? {
          diagnosis: makeDiagnosisText(gameResults),
          strategy: makeStrategyText(gameResults),
        }
      : null,
  };

  const blob = new Blob([JSON.stringify(resultData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = fileBaseName + ".json";
  a.click();

  URL.revokeObjectURL(url);

  const canvas = document.getElementById("resultCanvas");
  const link = document.createElement("a");

  link.download = fileBaseName + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  if (includeReport) {
    makeReport();
  }

  resultSaved = true;

  if (includeReport) {
    reportSaved = true;
  }

  return true;
}

function makeReport() {
  document.getElementById("reportMeta").textContent =
    `이름: ${participantName}\n` +
    `ID: ${participantId}\n` +
    `난이도: ${gameDifficulty}\n` +
    `문항 수: ${gameQueue.length}\n` +
    `소요 시간: ${Math.round((gameEndTime - gameStartTime) / 1000)}초`;

  const sourceCanvas = document.getElementById("resultCanvas");
  const reportCanvas = document.getElementById("reportCanvas");
  const ctx = reportCanvas.getContext("2d");

  ctx.clearRect(0, 0, reportCanvas.width, reportCanvas.height);
  ctx.drawImage(sourceCanvas, 0, 0);

  document.getElementById("reportDiagnosis").textContent = makeDiagnosisText(gameResults);

  document.getElementById("reportStrategy").textContent = makeStrategyText(gameResults);

  window.print();
}

document.getElementById("gameTab").onclick = () => {
  confirmSaveIfNeeded();
  setActiveMode("gameTab");
  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "none";
  if (gameResults.length > 0) {
    renderGame();
  } else {
    startGame();
  }
};

document.getElementById("showResult").onclick = showGameResult;
document.getElementById("downloadResult").onclick = () => {
  const save = confirm(analysisGenerated ? "결과 분석 보고서를 저장하시겠습니까?" : "현재 결과를 저장하시겠습니까?");

  if (!save) return;

  downloadResultImage(analysisGenerated);
};

function confirmSaveIfNeeded() {
  if (document.getElementById("resultView").style.display !== "block") return true;

  if (reportSaved) return true;

  if (analysisGenerated && resultSaved && !reportSaved) {
    const saveReport = confirm("결과분석보고서를 저장하시겠습니까?");
    if (saveReport) downloadResultImage(true);
    return true;
  }

  if (resultSaved) return true;

  const save = confirm(analysisGenerated ? "결과분석보고서를 저장하시겠습니까?" : "현재 결과를 저장하시겠습니까?");

  if (save) {
    downloadResultImage(analysisGenerated);
  }

  return true;
}

document.getElementById("analyzeResult").onclick = () => {
  analysisGenerated = true;

  document.getElementById("analysisLeft").style.display = "block";
  document.getElementById("analysisRight").style.display = "block";

  document.getElementById("analysisLeft").style.visibility = "visible";
  document.getElementById("analysisRight").style.visibility = "visible";

  document.getElementById("analysisLeft").textContent = makeDiagnosisText(gameResults);
  document.getElementById("analysisRight").textContent = makeStrategyText(gameResults);
};

document.getElementById("restartGame").onclick = () => {
  if (!resultSaved) {
    const save = confirm("이번 게임의 결과를 저장할까요?");

    if (save) {
      downloadResultImage(analysisGenerated);
    }
  }

  document.getElementById("resultView").style.display = "none";

  document.getElementById("game").style.display = "block";

  gameResults = [];
  resultSaved = false;

  startGame();
};

document.getElementById("speak").onclick = () => {
  let item;

  // 게임 모드
  if (document.getElementById("game").style.display === "block") {
    item = gameQueue[gameIndex];
  }
  // 퀴즈 모드
  else if (document.getElementById("quiz").style.display === "block") {
    item = currentQuizItem;
  }
  // 학습 모드
  else {
    item = getCurrentItems()[idx];
  }

  const wordOnly = item.thaiName.trim().split(/\s+/).slice(1).join(" ");

  speakThai(wordOnly);
};

document.getElementById("learnTab").onclick = () => {
  confirmSaveIfNeeded();
  setActiveMode("learnTab");
  document.getElementById("learn").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";
};

document.getElementById("quizTab").onclick = () => {
  confirmSaveIfNeeded();
  setActiveMode("quizTab");
  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";
  quiz();
};

function changeCategory(category, buttonId) {
  confirmSaveIfNeeded();

  currentCategory = category;
  idx = 0;

  gameQueue = [];
  gameIndex = 0;
  gameResults = [];
  window.resultPoints = [];
  resultSaved = false;
  analysisGenerated = false;
  reportSaved = false;

  document.querySelectorAll(".category button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(buttonId).classList.add("active");

  document.getElementById("learn").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";

  setActiveMode("learnTab");
  render();
}

function setDifficulty(level) {
  gameDifficulty = level;

  document.querySelectorAll(".difficultyBox button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(level + "Btn").classList.add("active");
}

document.getElementById("beginnerBtn").onclick = () => {
  setDifficulty("beginner");
  startGame();
};

document.getElementById("intermediateBtn").onclick = () => {
  setDifficulty("intermediate");
  startGame();
};

document.getElementById("advancedBtn").onclick = () => {
  setDifficulty("advanced");
  startGame();
};

setDifficulty("advanced");

setActiveMode("learnTab");

document.getElementById("consonantBtn").onclick = () => {
  changeCategory("consonant", "consonantBtn");
};

document.getElementById("vowelBtn").onclick = () => {
  changeCategory("vowel", "vowelBtn");
};

document.getElementById("numberBtn").onclick = () => {
  changeCategory("number", "numberBtn");
};

render();
