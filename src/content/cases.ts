export type PublicationStatus = 'draft' | 'review' | 'approved' | 'published' | 'withdrawn'

export type CaseSection = {
  title: string
  body: string
}

export type CaseStudy = {
  slug: string
  category: string
  title: string
  lead: string
  role: string
  relationship: string
  contentStatus: string
  publicationStatus: PublicationStatus
  coverTone: 'blue' | 'yellow' | 'pale'
  coverTitle: string
  quote: string
  sections: CaseSection[]
  contactTopic: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'puremosa',
    category: '自有品牌經營',
    title: 'PUREMOSA',
    lead: '屏方根的自有食品與飲品品牌，讓策略進入產品與體驗，也讓經營觀察回到工作方法。',
    role: '屏方根自有品牌',
    relationship: '產品、製作與餐飲夥伴依個案核對',
    contentStatus: '品牌關係已確認；產品分工與公開素材待核',
    publicationStatus: 'review',
    coverTone: 'blue',
    coverTitle: '風味與地方的練習',
    quote: '風味與生活情境是品牌本身的吸引力；屏方根的策略方法則讓這些選擇有機會被說清楚。',
    sections: [
      { title: '從品牌想法走向產品', body: 'PUREMOSA 是屏方根親自參與市場實踐的一條路徑。它保有風味、分享與款待的品牌性格，也讓品牌策略有機會放進具體的產品與使用場景裡。' },
      { title: '材料、風味與體驗之間', body: '品牌發展資料包含順事琴酒與餐酒體驗等方向。正式案例將依核准內容交代原料來源、產品選擇與製作分工，讓讀者理解一個決定如何形成。' },
      { title: '誰一起把事情做成', body: '母公司與自有品牌的關係，不代表製造、餐飲或所有創作均由屏方根獨力完成。完整紀錄將依實際分工呈現合作方與各自的貢獻。' },
      { title: '讓實踐回到工作方法', body: '品牌經營中的觀察，可以帶回定位、產品與合作架構的討論。正式成果仍須有紀錄支持；本頁不填入未核實的銷售或影響數據。' },
    ],
    contactTopic: 'PUREMOSA 品牌合作',
  },
  {
    slug: 'gift',
    category: '企業合作',
    title: '企業客製禮盒',
    lead: '從企業為什麼送禮開始，理解收禮對象與希望傳達的訊息，再整理地方內容、夥伴與交付之間的關係。',
    role: '實際策略與整合範圍待核',
    relationship: '客戶、選品與製作夥伴待確認',
    contentStatus: 'Jack 為內部識別；公開名稱與客戶授權待確認',
    publicationStatus: 'review',
    coverTone: 'yellow',
    coverTitle: '從一份心意，找到地方的參與方式。',
    quote: '一份禮留下的，可以同時是物件、故事，以及夥伴共同工作的關係。',
    sections: [
      { title: '先理解這份禮的目的', body: '禮盒案例的起點，是企業的需求與收禮者的情境。正式內容將從委託背景開始，說明這份禮希望傳達什麼，以及有哪些時間、數量與使用上的條件。' },
      { title: '地方內容如何進入選擇', body: '選品的理由需要與需求連起來。除了產地名稱，也應讓人理解材料、產品與地方工作者的關係，以及最後採用的組合為何適合這次合作。' },
      { title: '整合與交付的過程', body: '本頁預留選品、包裝與交付的敘事位置。實際承接範圍、製作夥伴、成品照片與過程紀錄，將依核准資料補入。' },
      { title: '把合作的理由留下', body: '公開案例將以可確認的成果與授權回饋收束。目前不填入尚未取得的客戶引言、成效數字或虛構的設計取捨。' },
    ],
    contactTopic: '企業合作',
  },
  {
    slug: 'mangzhong',
    category: '品牌餐飲合作',
    title: '順事・芒種',
    lead: 'PUREMOSA 與 NO6 Wagyu Formula 的餐飲合作素材，提供了一個理解品牌、風味與體驗如何相遇的入口。',
    role: '公開活動頁列屏方根主辦',
    relationship: 'PUREMOSA × NO6 Wagyu Formula',
    contentStatus: '最終執行紀錄、現場素材與回饋待確認',
    publicationStatus: 'review',
    coverTone: 'pale',
    coverTitle: '風味走進一張餐桌。',
    quote: '坐在同一張桌子上的人，帶來不同的經驗，也讓品牌多了一種被理解的方式。',
    sections: [
      { title: '從風味主題開始', body: '餐酒合作需要一個能把產品、料理與場景連起來的主題。公開活動資訊提供了合作的入口；案例的完整背景，仍需與實際籌備紀錄核對。' },
      { title: '品牌與餐飲的對話', body: '正式內容將說明合作方的角色、菜單與酒款之間的選擇，以及體驗如何共同形成。沒有紀錄支持的品飲回饋與搭配理由，不以推測填入。' },
      { title: '讓共同工作被看見', body: '現場照片之外，也需要整理籌備、溝通與執行的過程，讓讀者理解屏方根及餐飲夥伴分別參與了哪些工作。' },
      { title: '從一次體驗往後看', body: '回顧將保留可引用的參與回饋與下一步觀察。活動頁的宣傳內容不直接視為實際執行成果。' },
    ],
    contactTopic: 'PUREMOSA 品牌合作',
  },
  {
    slug: 'erfeng',
    category: '地方公共合作',
    title: '2026 二峰圳生活節',
    lead: '地方內容、公共目的與參與者的需求，在一個專案中相遇。這個案例將整理場域、角色與參與體驗之間的關係。',
    role: '公開頁列屏方根承辦',
    relationship: '主辦：來義鄉公所',
    contentStatus: '最終活動狀態、承辦範圍及結案內容待核',
    publicationStatus: 'review',
    coverTone: 'blue',
    coverTitle: '沿著地方的關係，一起把事情接起來。',
    quote: '一次專案的結束，也可以是下一段地方對話的起點。',
    sections: [
      { title: '先回到地方的問題', body: '案例需要先說明公共專案希望處理的議題，以及活動與地方條件如何相關。公開活動頁提供資訊入口，完整背景仍應由正式紀錄支持。' },
      { title: '把不同角色放回過程', body: '主辦、承辦與地方夥伴各自有不同的任務。本頁將以實際分工交代參與角色，避免將公共專案的所有成果歸給單一團隊。' },
      { title: '讓參與變得可以理解', body: '參與資訊、場域動線、內容與協作過程，都是可以被整理的工作面向。實際採用的方法和執行素材，待結案資料確認後補入。' },
      { title: '活動之後的接續', body: '完整回顧將區分規劃、實際執行與可核實的成果。留下的紀錄，應能讓後續工作者理解地方內容與專案判斷的脈絡。' },
    ],
    contactTopic: '地方與公共合作',
  },
]

export const caseBySlug = new Map(caseStudies.map((item) => [item.slug, item]))
