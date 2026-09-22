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
    role: '品牌策略、產品與體驗整合',
    relationship: '屏方根自有品牌 × 製作與餐飲夥伴',
    coverTone: 'blue',
    coverTitle: '風味與地方的練習',
    quote: '風味與生活情境是品牌本身的吸引力；屏方根的策略方法則讓這些選擇有機會被說清楚。',
    sections: [
      { title: '從品牌想法走向產品', body: 'PUREMOSA 是屏方根親自參與市場實踐的一條路徑。它保有風味、分享與款待的品牌性格，也讓品牌策略有機會放進具體的產品與使用場景裡。' },
      { title: '材料、風味與體驗之間', body: '順事琴酒與餐酒體驗，讓風味不只停留在產品描述，而是進入餐桌、季節與人相遇的情境。每一個選擇，都需要回到材料與使用方式來理解。' },
      { title: '誰一起把事情做成', body: '母公司與自有品牌的關係，不代表製造、餐飲或所有創作均由屏方根獨力完成。完整紀錄將依實際分工呈現合作方與各自的貢獻。' },
      { title: '讓實踐回到工作方法', body: '市場裡的真實反應，會反過來修正定位、產品與合作架構。品牌因此不是一次完成的答案，而是一套持續觀察、選擇與調整的方法。' },
    ],
    contactTopic: 'PUREMOSA 品牌合作',
  },
  {
    slug: 'gift',
    category: '企業合作',
    title: '企業客製禮盒',
    lead: '從企業為什麼送禮開始，理解收禮對象與希望傳達的訊息，再整理地方內容、夥伴與交付之間的關係。',
    role: '需求梳理、地方選品與整合',
    relationship: '企業委託 × 地方品牌與製作夥伴',
    coverTone: 'yellow',
    coverTitle: '從一份心意，找到地方的參與方式。',
    quote: '一份禮留下的，可以同時是物件、故事，以及夥伴共同工作的關係。',
    sections: [
      { title: '先理解這份禮的目的', body: '禮盒的起點不是選品清單，而是企業想對誰說話、希望留下什麼感受。把目的、時間、數量與使用情境說清楚，選擇才有依據。' },
      { title: '地方內容如何進入選擇', body: '選品的理由需要與需求連起來。除了產地名稱，也應讓人理解材料、產品與地方工作者的關係，以及最後採用的組合為何適合這次合作。' },
      { title: '整合與交付的過程', body: '選品、包裝與交付彼此相連。屏方根把內容、規格與夥伴節奏放在同一張工作表上，讓心意能在真實條件裡落地。' },
      { title: '把合作的理由留下', body: '一份禮留下的不只是物件，也包含為何選擇這些地方內容、夥伴如何參與，以及企業希望延續的關係。' },
    ],
    contactTopic: '企業合作',
  },
  {
    slug: 'mangzhong',
    category: '品牌餐飲合作',
    title: '順事・芒種',
    lead: 'PUREMOSA 與 NO6 Wagyu Formula 的餐飲合作素材，提供了一個理解品牌、風味與體驗如何相遇的入口。',
    role: '主題策劃與品牌體驗整合',
    relationship: 'PUREMOSA × NO6 Wagyu Formula',
    coverTone: 'pale',
    coverTitle: '風味走進一張餐桌。',
    quote: '坐在同一張桌子上的人，帶來不同的經驗，也讓品牌多了一種被理解的方式。',
    sections: [
      { title: '從風味主題開始', body: '以節氣與風味建立共同主題，讓酒款、料理與場景不是各自出現，而是在同一段體驗裡互相回應。' },
      { title: '品牌與餐飲的對話', body: '餐飲夥伴帶來料理與服務的判斷，PUREMOSA 帶來酒款與品牌脈絡。合作的價值，來自雙方願意為彼此調整。' },
      { title: '讓共同工作被看見', body: '一場餐酒體驗的形成，包含主題、菜單、酒款、節奏與現場服務。把角色說清楚，也讓成果不只歸於單一品牌。' },
      { title: '從一次體驗往後看', body: '每一次相遇都是觀察品牌如何被理解的機會。人的提問、感受與使用情境，會成為下一次調整的起點。' },
    ],
    contactTopic: 'PUREMOSA 品牌合作',
  },
  {
    slug: 'erfeng',
    category: '地方公共合作',
    title: '2026 二峰圳生活節',
    lead: '地方內容、公共目的與參與者的需求，在一個專案中相遇。這個案例將整理場域、角色與參與體驗之間的關係。',
    role: '專案承辦與地方內容整合',
    relationship: '來義鄉公所 × 地方夥伴',
    coverTone: 'blue',
    coverTitle: '沿著地方的關係，一起把事情接起來。',
    quote: '一次專案的結束，也可以是下一段地方對話的起點。',
    sections: [
      { title: '先回到地方的問題', body: '二峰圳不只是活動背景，而是水、土地、產業與生活長期交織的地方系統。專案從人們如何理解並參與這段關係開始。' },
      { title: '把不同角色放回過程', body: '主辦、承辦與地方夥伴各自有不同的任務。本頁將以實際分工交代參與角色，避免將公共專案的所有成果歸給單一團隊。' },
      { title: '讓參與變得可以理解', body: '參與資訊、場域動線、內容與協作過程需要被放在一起思考，讓第一次來的人有入口，也讓熟悉地方的人感到被尊重。' },
      { title: '活動之後的接續', body: '活動會結束，但地方知識可以留下。把方法、角色與判斷整理成可再使用的紀錄，下一次合作就不必從零開始。' },
    ],
    contactTopic: '地方與公共合作',
  },
]

export const caseBySlug = new Map(caseStudies.map((item) => [item.slug, item]))
