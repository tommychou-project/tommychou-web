// 每個場景的資料：圖片、熱點位置、運鏡風格
// 熱點座標用百分比，這樣不同螢幕大小都能對位

export type Hotspot = {
  id: string;
  // 百分比座標（圖片內的位置）
  x: number;
  y: number;
  // 點下去的動作
  action: 'object' | 'navigate' | 'cta';
  // action=object 時：物件名稱（之後可以接故事面板）
  label?: string;
  // action=navigate 時：目標場景 id
  target?: string;
  // CTA 連結
  href?: string;
};

export type Scene = {
  id: string;
  index: number;
  title: string;
  image: string;
  // Ken Burns 鏡頭運鏡：起點與終點的位移與縮放
  kenBurns: {
    from: { scale: number; x: number; y: number };
    to: { scale: number; x: number; y: number };
    duration: number; // 秒
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
      // 大門：進入別墅
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
      // 黑色外套
      { id: 'coat-dark', x: 19, y: 47, action: 'object', label: '深色外套' },
      // 棕色外套
      { id: 'coat-brown', x: 30, y: 50, action: 'object', label: '棕色外套' },
      // 鞋
      { id: 'shoes', x: 32, y: 80, action: 'object', label: '那雙鞋' },
      // 木門 → 主廳
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
      // 相機
      { id: 'camera', x: 38, y: 73, action: 'object', label: '相機' },
      // 筆記本
      { id: 'notebook', x: 44, y: 75, action: 'object', label: '筆記本' },
      // 陶罐（左）
      { id: 'vessel-1', x: 41, y: 70, action: 'object', label: '陶罐' },
      // 陶罐（右，大的）
      { id: 'vessel-2', x: 46, y: 70, action: 'object', label: '另一個陶罐' },
      // Eames 椅
      { id: 'chair', x: 64, y: 70, action: 'object', label: 'Eames 椅' },
      // 壁爐
      { id: 'fireplace', x: 6, y: 60, action: 'object', label: '壁爐' },
      // 窗外 → 樓梯
      { id: 'to-stairs', x: 92, y: 35, action: 'navigate', target: 'staircase', label: '往樓梯' },
    ],
  },
  {
    id: 'staircase',
    index: 4,
    title: 'Ascending',
    image: '/home/04-staircase.jpg',
    kenBurns: {
      // 樓梯：自動往上推（dolly up）
      from: { scale: 1.0, x: 0, y: 4 },
      to: { scale: 1.12, x: 0, y: -3 },
      duration: 6,
    },
    hotspots: [
      // 牆上的黑白照片
      { id: 'photo', x: 14, y: 60, action: 'object', label: '那張照片' },
      // 自動繼續上樓 → 書房
      { id: 'to-study', x: 50, y: 15, action: 'navigate', target: 'study', label: '抵達書房' },
    ],
  },
  {
    id: 'study',
    index: 5,
    title: 'Where I Work',
    image: '/home/05-study.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.05, x: 2, y: -1 },
      duration: 20,
    },
    hotspots: [
      // 筆電
      { id: 'laptop', x: 33, y: 67, action: 'object', label: '筆電' },
      // 咖啡杯（桌左）
      { id: 'cup-1', x: 18, y: 73, action: 'object', label: '咖啡杯' },
      // 咖啡杯（桌右，桌燈旁）
      { id: 'cup-2', x: 39, y: 67, action: 'object', label: '另一杯咖啡' },
      // 桌燈
      { id: 'desklamp', x: 43, y: 60, action: 'object', label: '桌燈' },
      // 書架（中段）
      { id: 'bookshelf', x: 70, y: 50, action: 'object', label: '書架' },
      // 書架上的相機
      { id: 'shelf-camera', x: 56, y: 40, action: 'object', label: '架上的相機' },
      // 陽台方向（窗外） → 陽台
      { id: 'to-balcony', x: 15, y: 30, action: 'navigate', target: 'balcony', label: '走向陽台' },
    ],
  },
  {
    id: 'balcony',
    index: 6,
    title: 'A Toast to the Future',
    image: '/home/06-balcony.jpg',
    kenBurns: {
      from: { scale: 1.0, x: 0, y: 0 },
      to: { scale: 1.04, x: -2, y: 0 },
      duration: 18,
    },
    hotspots: [
      // 紅酒杯
      { id: 'wine', x: 36, y: 70, action: 'object', label: '一杯紅酒' },
      // 椅子上的毯子
      { id: 'blanket', x: 52, y: 80, action: 'object', label: '毯子' },
      // 室內溢出的光 → CTA
      { id: 'cta', x: 78, y: 55, action: 'cta', label: "Let's talk", href: '/contact' },
    ],
  },
];

// 物件文案（之後可以擴充成完整故事面板）
// 這裡先用「策展人 Tommy」風格的短句
export const objectStories: Record<string, { title: string; body: string }> = {
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
  camera: {
    title: '相機',
    body: '它教會我：光線會說話，但你得先學會閉嘴聽。',
  },
  notebook: {
    title: '筆記本',
    body: '前一半是中文，後一半是法文。中間那幾頁，是我在學會閉嘴的時候寫的。',
  },
  'vessel-1': {
    title: '陶罐',
    body: '一個我幾乎要忘記的下午。',
  },
  'vessel-2': {
    title: '另一個陶罐',
    body: '比它更重的，是它旁邊那本筆記。',
  },
  chair: {
    title: 'Eames 椅',
    body: '這個位置永遠留著。給願意坐下來聽的人。',
  },
  fireplace: {
    title: '壁爐',
    body: '冬天我會在這裡讀書。火不是用來取暖的，是用來放慢時間的。',
  },
  photo: {
    title: '那張照片',
    body: '我第一次覺得，我可能會做這一行很久。',
  },
  laptop: {
    title: '筆電',
    body: '這是我跟世界對話的工具。但對話結束時，我會把它闔上。',
  },
  'cup-1': { title: '咖啡杯', body: '早上的第一杯。通常是最安靜的時候。' },
  'cup-2': { title: '另一杯咖啡', body: '寫到一半冷掉的那杯。' },
  desklamp: {
    title: '桌燈',
    body: '我相信好燈具值得投資。光線決定了一個人能想多遠。',
  },
  bookshelf: {
    title: '書架',
    body: '上面的書都讀過至少兩次。沒讀完的，沒資格上架。',
  },
  'shelf-camera': {
    title: '架上的相機',
    body: '它退休了。但我每次抬頭看到它，都會記得一些事。',
  },
  wine: {
    title: '一杯紅酒',
    body: '敬還沒發生的事。',
  },
  blanket: {
    title: '毯子',
    body: '請坐。山的另一邊，星星還沒全亮。',
  },
};
