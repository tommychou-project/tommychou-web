// 八個場景：外觀 → 玄關 → 主廳 → 餐廳 → 廚房 → 樓梯 → 書房 → 陽台
// 敘事邏輯：抵達 → 進入 → 展示 → 分享 → 製造 → 過渡 → 工作 → 結尾

export type Hotspot = {
  id: string;
  x: number;
  y: number;
  action: 'object' | 'navigate' | 'cta';
  label?: string;
  target?: string;
  href?: string;
};

export type Scene = {
  id: string;
  index: number;
  title: string;
  image: string;
  kenBurns: {
    from: { scale: number; x: number; y: number };
    to: { scale: number; x: number; y: number };
    duration: number;
  };
  hotspots: Hotspot[];
};

export const scenes: Scene[] = [
  {
    id: 'exterior',
    index: 1,
    title: 'Arriving',
    image: '/home/01-exterior.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.08, x: -2, y: -1 },
      duration: 20,
    },
    hotspots: [
      { id: 'enter-door', x: 49, y: 67, action: 'navigate', target: 'entrance', label: '推門進入' },
    ],
  },
  {
    id: 'entrance',
    index: 2,
    title: 'Threshold',
    image: '/home/02-entrance.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.05, x: 1, y: 0 },
      duration: 16,
    },
    hotspots: [
      { id: 'coat-dark', x: 19, y: 47, action: 'object', label: '深色外套' },
      { id: 'coat-brown', x: 30, y: 50, action: 'object', label: '棕色外套' },
      { id: 'shoes', x: 32, y: 80, action: 'object', label: '那雙鞋' },
      { id: 'to-living', x: 50, y: 50, action: 'navigate', target: 'livingroom', label: '進入主廳' },
    ],
  },
  {
    id: 'livingroom',
    index: 3,
    title: 'The Curated Room',
    image: '/home/03-livingroom.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.06, x: -1, y: 1 },
      duration: 24,
    },
    hotspots: [
      { id: 'camera', x: 38, y: 73, action: 'object', label: '相機' },
      { id: 'notebook', x: 44, y: 75, action: 'object', label: '筆記本' },
      { id: 'vessel-1', x: 41, y: 70, action: 'object', label: '陶罐' },
      { id: 'vessel-2', x: 46, y: 70, action: 'object', label: '另一個陶罐' },
      { id: 'chair', x: 64, y: 70, action: 'object', label: 'Eames 椅' },
      { id: 'fireplace', x: 6, y: 60, action: 'object', label: '壁爐' },
      { id: 'to-dining', x: 92, y: 35, action: 'navigate', target: 'dining', label: '往餐廳' },
    ],
  },
  // ⭐ 新增場景 4：餐廳
  {
    id: 'dining',
    index: 4,
    title: 'The Table',
    image: '/home/07-dining.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.05, x: 0, y: 1 },
      duration: 22,
    },
    hotspots: [
      { id: 'wine-bottle', x: 50, y: 53, action: 'object', label: '紅酒' },
      { id: 'cheese-plate', x: 49, y: 56, action: 'object', label: '起司盤' },
      { id: 'open-book', x: 71, y: 59, action: 'object', label: '攤開的書' },
      { id: 'draped-scarf', x: 24, y: 71, action: 'object', label: '披巾' },
      { id: 'pendant-light', x: 50, y: 18, action: 'object', label: '吊燈' },
      { id: 'to-kitchen', x: 90, y: 50, action: 'navigate', target: 'kitchen', label: '往廚房' },
    ],
  },
  // ⭐ 新增場景 5：廚房（綠植版）
  {
    id: 'kitchen',
    index: 5,
    title: 'The Green Wall',
    image: '/home/09-kitchen-garden.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.04, x: 1, y: 0 },
      duration: 22,
    },
    hotspots: [
      { id: 'kitchen-bowl', x: 47, y: 56, action: 'object', label: '中島陶碗' },
      { id: 'green-wall', x: 75, y: 35, action: 'object', label: '綠植牆' },
      { id: 'maple-tree', x: 30, y: 30, action: 'object', label: '楓樹' },
      { id: 'kitchen-stools', x: 50, y: 80, action: 'object', label: '吧台椅' },
      { id: 'to-stairs', x: 92, y: 50, action: 'navigate', target: 'staircase', label: '往樓梯' },
    ],
  },
  {
    id: 'staircase',
    index: 6,
    title: 'Ascending',
    image: '/home/04-staircase.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 4 },
      to: { scale: 1.12, x: 0, y: -3 },
      duration: 6,
    },
    hotspots: [
      { id: 'photo', x: 14, y: 60, action: 'object', label: '那張照片' },
      { id: 'to-study', x: 50, y: 15, action: 'navigate', target: 'study', label: '抵達書房' },
    ],
  },
  {
    id: 'study',
    index: 7,
    title: 'Where I Work',
    image: '/home/05-study.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.05, x: 2, y: -1 },
      duration: 20,
    },
    hotspots: [
      { id: 'laptop', x: 33, y: 67, action: 'object', label: '筆電' },
      { id: 'cup-1', x: 18, y: 73, action: 'object', label: '咖啡杯' },
      { id: 'cup-2', x: 39, y: 67, action: 'object', label: '另一杯咖啡' },
      { id: 'desklamp', x: 43, y: 60, action: 'object', label: '桌燈' },
      { id: 'bookshelf', x: 70, y: 50, action: 'object', label: '書架' },
      { id: 'shelf-camera', x: 56, y: 40, action: 'object', label: '架上的相機' },
      { id: 'to-balcony', x: 15, y: 30, action: 'navigate', target: 'balcony', label: '走向陽台' },
    ],
  },
  {
    id: 'balcony',
    index: 8,
    title: 'A Toast to the Future',
    image: '/home/06-balcony.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.04, x: -2, y: 0 },
      duration: 18,
    },
    hotspots: [
      { id: 'wine', x: 36, y: 70, action: 'object', label: '一杯紅酒' },
      { id: 'blanket', x: 52, y: 80, action: 'object', label: '毯子' },
      { id: 'cta', x: 78, y: 55, action: 'cta', label: "Let's talk", href: '/contact' },
    ],
  },
];

// 物件故事 —— 策展人 Tommy 風格
// 每段 30-60 字，留白多，畫面感強，避免說教
export const objectStories: Record<string, { title: string; body: string }> = {
  // ━━━━━━━━━━━━━━━━━━━━━━
  // 玄關
  // ━━━━━━━━━━━━━━━━━━━━━━
  'coat-dark': {
    title: '深色外套',
    body: '上海冬天的。它知道我那幾年的所有故事。',
  },
  'coat-brown': {
    title: '棕色外套',
    body: '倫敦秋天的。羊毛已經有點起球。',
  },
  shoes: {
    title: '那雙鞋',
    body: '回家就脫掉。家裡不需要那麼用力。',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 主廳
  // ━━━━━━━━━━━━━━━━━━━━━━
  camera: {
    title: '相機',
    body: '它教會我:光線會說話,但你得先學會閉嘴聽。',
  },
  notebook: {
    title: '筆記本',
    body: '前一半是中文,後一半是法文。中間那幾頁,是我在學會閉嘴的時候寫的。',
  },
  'vessel-1': {
    title: '陶罐',
    body: '一個我幾乎要忘記的下午。',
  },
  'vessel-2': {
    title: '另一個陶罐',
    body: '比它更重的,是它旁邊那本筆記。',
  },
  chair: {
    title: 'Eames 椅',
    body: '這個位置永遠留著。給願意坐下來聽的人。',
  },
  fireplace: {
    title: '壁爐',
    body: '冬天我會在這裡讀書。火不是用來取暖的,是用來放慢時間的。',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 餐廳 ⭐ 新
  // ━━━━━━━━━━━━━━━━━━━━━━
  'wine-bottle': {
    title: '紅酒',
    body: '為一個剛離開的朋友開的。沒喝完,他就走了。我留著等他回來。',
  },
  'cheese-plate': {
    title: '起司盤',
    body: '他帶來的。Comté,陳化 35 個月。他說人也要這樣,才有層次。',
  },
  'open-book': {
    title: '攤開的書',
    body: '他臨走前推薦的。我還沒讀完。我故意慢慢讀。',
  },
  'draped-scarf': {
    title: '披巾',
    body: '她忘記帶走的。也許是故意的。',
  },
  'pendant-light': {
    title: '吊燈',
    body: '整間房子,我最捨得買的東西。光線決定了一頓飯的好壞。',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 廚房 ⭐ 新
  // ━━━━━━━━━━━━━━━━━━━━━━
  'kitchen-bowl': {
    title: '中島陶碗',
    body: '裝水果、裝麵包、什麼都不裝。它就是這個空間的中心點。',
  },
  'green-wall': {
    title: '綠植牆',
    body: '我在台北的公寓沒有窗。所以我答應自己,未來的家要有一面綠牆。\n\n不是為了好看,是為了提醒我:我不是為了工作而活,我是為了在某個下雨的下午,看葉子被打濕的樣子。',
  },
  'maple-tree': {
    title: '楓樹',
    body: '秋天會紅。我從台北帶過來的精神 —— 在世界的另一端,還是要記得季節的樣子。',
  },
  'kitchen-stools': {
    title: '吧台椅',
    body: '三張,剛好。多了會吵。少了會孤單。',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 樓梯
  // ━━━━━━━━━━━━━━━━━━━━━━
  photo: {
    title: '那張照片',
    body: '我第一次覺得,我可能會做這一行很久。',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 書房
  // ━━━━━━━━━━━━━━━━━━━━━━
  laptop: {
    title: '筆電',
    body: '這是我跟世界對話的工具。但對話結束時,我會把它闔上。',
  },
  'cup-1': {
    title: '咖啡杯',
    body: '早上的第一杯。通常是最安靜的時候。',
  },
  'cup-2': {
    title: '另一杯咖啡',
    body: '寫到一半冷掉的那杯。',
  },
  desklamp: {
    title: '桌燈',
    body: '我相信好燈具值得投資。光線決定了一個人能想多遠。',
  },
  bookshelf: {
    title: '書架',
    body: '上面的書都讀過至少兩次。沒讀完的,沒資格上架。',
  },
  'shelf-camera': {
    title: '架上的相機',
    body: '它退休了。但我每次抬頭看到它,都會記得一些事。',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 陽台
  // ━━━━━━━━━━━━━━━━━━━━━━
  wine: {
    title: '一杯紅酒',
    body: '敬還沒發生的事。',
  },
  blanket: {
    title: '毯子',
    body: '請坐。山的另一邊,星星還沒全亮。',
  },
};
