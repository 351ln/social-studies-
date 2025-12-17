import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
    {children}
  </span>
);

const SectionTitle = ({ kicker, title, desc }) => (
  <div className="space-y-2">
    {kicker ? <div className="text-xs font-semibold tracking-widest text-slate-500">{kicker}</div> : null}
    <div className="text-2xl font-semibold text-slate-900">{title}</div>
    {desc ? <div className="max-w-3xl text-sm leading-6 text-slate-600">{desc}</div> : null}
  </div>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    {children}
  </div>
);

const SoftCard = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
    {children}
  </div>
);

const TwoCol = ({ left, right }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card>{left}</Card>
    <Card>{right}</Card>
  </div>
);

const Timeline = ({ items }) => (
  <div className="space-y-4">
    {items.map((it, idx) => (
      <div key={idx} className="flex gap-3">
        <div className="mt-1 flex flex-col items-center">
          <div className="h-3 w-3 rounded-full bg-slate-900" />
          {idx !== items.length - 1 ? <div className="mt-1 h-full w-px bg-slate-200" /> : null}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-semibold text-slate-900">{it.title}</div>
            {it.badge ? <Pill>{it.badge}</Pill> : null}
          </div>
          {it.desc ? <div className="mt-1 text-sm leading-6 text-slate-600">{it.desc}</div> : null}
          {it.points?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {it.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    ))}
  </div>
);

const Accordion = ({ items }) => {
  const [open, setOpen] = useState(items?.[0]?.id ?? null);
  return (
    <div className="space-y-2">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-base font-semibold text-slate-900">{it.title}</div>
                  {it.meta ? <Pill>{it.meta}</Pill> : null}
                </div>
                {it.subtitle ? <div className="text-sm text-slate-600">{it.subtitle}</div> : null}
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                {isOpen ? "收起" : "展開"}
              </div>
            </button>
            {isOpen ? (
              <div className="border-t border-slate-200 px-5 py-4">
                {typeof it.content === "function" ? it.content() : it.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={
      "rounded-full px-4 py-2 text-sm font-semibold transition " +
      (active
        ? "bg-slate-900 text-white shadow-sm"
        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
    }
  >
    {children}
  </button>
);

const BadgeRow = ({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t, i) => (
      <Pill key={i}>{t}</Pill>
    ))}
  </div>
);

export default function App() {
  const [tab, setTab] = useState("lesson");

  const course = useMemo(
    () => ({
      title: "環保GO真｜解構綠色神話",
      subtitle: "五年級媒體素養 × 消費決策 × 永續思考",
      tags: ["媒體素養", "社會科/永續單元", "消費選擇", "反漂綠", "小組探究"],
      highlights: [
        {
          title: "課程核心",
          desc:
            "破除『環保符號 = 真的環保』的迷思；培養學生能辨識宣稱、檢核資訊、做出更有意識的消費選擇。",
        },
        {
          title: "設計源起",
          desc:
            "從學生生活經驗出發，把『花錢』當作一次次的選擇，連結到資源使用與環境影響，練習多想一步。",
        },
        {
          title: "素養目標",
          desc:
            "理解消費選擇與環境影響的關聯；比較宣稱與資料落差；嘗試改變一次消費行為，並能說出理由。",
        },
      ],
      path: [
        { title: "個人選擇", badge: "從生活出發", desc: "小額日常消費情境：30–50 元怎麼用？" },
        { title: "習慣反思", badge: "需求 vs 想要", desc: "回看自己一天/一週的消費時刻。" },
        { title: "系統連結", badge: "選擇 = 投票", desc: "三張消費卡：支持哪一種生產與生活方式？" },
        { title: "權衡分析", badge: "理財 × 永續", desc: "用『天秤』整理個人利益與環境影響。" },
        { title: "神話拆解", badge: "宣稱 vs 資料", desc: "紙吸管案例：為什麼被說環保？漏了哪些面向？" },
        { title: "行動實踐", badge: "小改變", desc: "設計一個可行的小行動，並能解釋它的理由。" },
      ],
      lessons: [
        {
          id: "l1",
          title: "第一節課｜消費選擇與環保的關聯",
          meta: "40 分鐘｜引起 5 / 發展 30 / 綜合 5",
          subtitle: "把『花錢』轉成可思考的選擇：需求、方便、喜好，以及環境影響。",
          content: () => (
            <div className="space-y-6">
              <TwoCol
                left={
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">引起動機（約 5 分鐘）</div>
                    <div className="text-sm leading-6 text-slate-700">
                      <div className="font-semibold">情境提問（生活版）</div>
                      <div>「如果今天你手上有 <b>30～50 元</b>，而且是在下課或放學路上，你會怎麼用？」</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>飲料/零食</li>
                        <li>文具/小物</li>
                        <li>先不花，存起來</li>
                      </ul>
                      <div className="mt-2 text-slate-600">（不預設學生有花過 100 元的經驗，改用日常小額情境）</div>
                    </div>
                  </div>
                }
                right={
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">綜合活動（約 5 分鐘）</div>
                    <div className="text-sm leading-6 text-slate-700">
                      <div className="font-semibold">一句話收束</div>
                      <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        「我發現，原來花錢不只是買東西，還是在＿＿＿＿。」
                      </div>
                      <div className="mt-2">教師統整：錢怎麼花，就是我們在支持什麼樣的生活方式。</div>
                    </div>
                  </div>
                }
              />

              <Card>
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-slate-900">發展活動（約 30 分鐘）</div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <SoftCard>
                      <div className="text-sm font-semibold text-slate-900">活動一｜我的一天小消費</div>
                      <div className="mt-1 text-sm leading-6 text-slate-700">
                        勾選「一天中可能花錢的時刻」（早餐/下課/放學/週末），並判斷是<b>需要</b>或<b>想要</b>。
                      </div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>如果不買，生活會受影響嗎？</li>
                        <li>是因為方便、流行、或真的需要？</li>
                      </ul>
                    </SoftCard>
                    <SoftCard>
                      <div className="text-sm font-semibold text-slate-900">活動二｜三張消費卡：你支持誰？</div>
                      <div className="mt-1 text-sm leading-6 text-slate-700">分組討論三張卡，選擇並說出理由。</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>一次就丟：便宜、方便</li>
                        <li>重複使用：需要多想一下</li>
                        <li>先不買：把錢留著</li>
                      </ul>
                    </SoftCard>
                    <SoftCard>
                      <div className="text-sm font-semibold text-slate-900">活動三｜理財 × 永續天秤</div>
                      <div className="mt-1 text-sm leading-6 text-slate-700">
                        把選擇放上天秤：左邊是<b>自己</b>（方便/便宜/喜好），右邊是<b>環境</b>（資源/垃圾/能源）。
                      </div>
                      <div className="mt-2 text-sm text-slate-600">重點：不給標準答案，練習說明「我為什麼這樣選」。</div>
                    </SoftCard>
                  </div>
                </div>
              </Card>
            </div>
          ),
        },
        {
          id: "l2",
          title: "第二節課｜環保宣稱是真的嗎？（紙吸管案例）",
          meta: "40 分鐘｜引起 5 / 發展 30 / 綜合 5",
          subtitle: "不做二分對立（紙 vs 塑膠誰更好），而是練習『宣稱拆解』與『漏看面向』。",
          content: () => (
            <div className="space-y-6">
              <TwoCol
                left={
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">引起動機（約 5 分鐘）</div>
                    <div className="text-sm leading-6 text-slate-700">
                      <div className="font-semibold">經驗提問</div>
                      <div>「你有沒有看過店家說：『我們改用紙吸管，是為了環保』？」</div>
                      <div className="mt-2 text-slate-600">接著追問：那它<b>為什麼</b>被說是環保？我們知道完整的資訊嗎？</div>
                    </div>
                  </div>
                }
                right={
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">綜合活動（約 5 分鐘）</div>
                    <div className="text-sm leading-6 text-slate-700">
                      <div className="font-semibold">媒體素養一句話</div>
                      <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        「判斷環不環保，不能只看一個說法，要看＿＿＿＿。」
                      </div>
                      <div className="mt-2">教師收束：廣告常給「看起來很好的理由」，我們要學會多想一步。</div>
                    </div>
                  </div>
                }
              />

              <Card>
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-slate-900">發展活動（約 30 分鐘）</div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <SoftCard>
                      <div className="text-sm font-semibold text-slate-900">活動一｜宣稱卡 × 資訊卡配對</div>
                      <div className="mt-1 text-sm leading-6 text-slate-700">
                        分組把「宣稱」和「資訊」配對，找出哪些是<b>說了一半</b>。
                      </div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>宣稱：紙做的比較好、可分解</li>
                        <li>資訊：需要防水塗層、易損壞、仍耗能</li>
                      </ul>
                    </SoftCard>
                    <SoftCard>
                      <div className="text-sm font-semibold text-slate-900">活動二｜一根吸管的一生</div>
                      <div className="mt-1 text-sm leading-6 text-slate-700">
                        以「製造 → 包裝 → 使用 → 丟棄」梳理可能影響，練習問：<b>我們漏看了什麼？</b>
                      </div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>如果很快壞掉，需要多拿幾根？</li>
                        <li>使用一次就丟，結果會去哪？</li>
                      </ul>
                    </SoftCard>
                    <SoftCard>
                      <div className="text-sm font-semibold text-slate-900">活動三｜比較不是選邊</div>
                      <div className="mt-1 text-sm leading-6 text-slate-700">
                        全班整理「塑膠吸管的問題」與「紙吸管解決/新增的問題」，強調<b>多面向</b>而非二選一。
                      </div>
                      <div className="mt-2 text-sm text-slate-600">學習目標：能說出「我為什麼這樣判斷」，而不是背答案。</div>
                    </SoftCard>
                  </div>
                </div>
              </Card>
            </div>
          ),
        },
      ],
      selfStudy: {
        title: "自學課程設計｜學生也能自己走完一輪的『拆解流程』",
        subtitle:
          "把課堂活動轉成可自學的任務路線：看宣稱 → 找證據 → 補漏點 → 下結論（暫時） → 做小行動。",
        steps: [
          {
            title: "Step 1｜選一個『環保宣稱』",
            badge: "5–8 分鐘",
            points: [
              "從飲料店/文具/生活用品中選一個標榜『環保』的產品或標語。",
              "把宣稱寫下來：它在說什麼？（例如：可分解、減塑、友善海洋）",
            ],
          },
          {
            title: "Step 2｜把宣稱拆成『可檢核的問題』",
            badge: "8–10 分鐘",
            points: [
              "這個宣稱需要哪些證據？",
              "它可能只講了哪一段？（製造/運輸/使用/丟棄）",
            ],
          },
          {
            title: "Step 3｜資料卡閱讀（老師提供/學生蒐集）",
            badge: "10–12 分鐘",
            points: [
              "閱讀 2–3 張資料卡：事實、數據、或簡短說明。",
              "標記：支持宣稱的資訊 / 讓宣稱變複雜的資訊。",
            ],
          },
          {
            title: "Step 4｜做出『暫時結論』",
            badge: "5–8 分鐘",
            points: [
              "用句型寫下：『我目前覺得＿＿＿，因為＿＿＿；但我還想知道＿＿＿。』",
              "避免絕對化：不是非黑即白，而是有條件、有前提。",
            ],
          },
          {
            title: "Step 5｜小行動（可完成、可追蹤）",
            badge: "5–8 分鐘",
            points: [
              "選一個你做得到的改變：例如一週少買一次、改用可重複使用、或先不買。",
              "寫下：我要做什麼？做多久？怎麼知道我做到了？",
            ],
          },
        ],
        deliverables: [
          "✅ 一張『宣稱拆解』小卡（宣稱＋可檢核問題）",
          "✅ 一段『暫時結論』文字（含我還想知道）",
          "✅ 一個可追蹤的小行動計畫（1 週）",
        ],
      },
      resources: {
        title: "教學資源",
        subtitle:
          "你可以把教材、學習單、投影片或參考文章放在雲端連結，並在這裡提供 QR Code（示意）。",
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold tracking-widest text-slate-500">ENV × MEDIA LITERACY</div>
              <div className="text-3xl font-semibold text-slate-900 md:text-4xl">{course.title}</div>
              <div className="text-sm leading-6 text-slate-600">{course.subtitle}</div>
              <div className="pt-2">
                <BadgeRow tags={course.tags} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <TabButton active={tab === "lesson"} onClick={() => setTab("lesson")}>教案標籤頁</TabButton>
              <TabButton active={tab === "self"} onClick={() => setTab("self")}>自學課程設計</TabButton>
              <TabButton active={tab === "resources"} onClick={() => setTab("resources")}>資源與附件</TabButton>
            </div>
          </div>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 space-y-6"
        >
          {tab === "lesson" ? (
            <>
              <SectionTitle
                kicker="COURSE OVERVIEW"
                title="課程概要"
                desc="核心是『解構綠色神話』：把看似合理的環保宣稱拆解成可檢核的問題，讓學生能以證據與多面向思考做出更成熟的消費決策。"
              />

              <div className="grid gap-4 md:grid-cols-3">
                {course.highlights.map((h, i) => (
                  <Card key={i}>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-slate-900">{h.title}</div>
                      <div className="text-sm leading-6 text-slate-600">{h.desc}</div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">課程完整路徑（從個人選擇到系統思維）</div>
                    <div className="mt-1 text-sm text-slate-600">你可以把它當成課程的「主線敘事」放在網站首頁。</div>
                  </div>
                  <Pill>6 Steps</Pill>
                </div>
                <div className="mt-4">
                  <Timeline items={course.path} />
                </div>
              </Card>

              <SectionTitle kicker="LESSON PLANS" title="兩節課教案" desc="已依指導建議調整：第一節改成小額生活情境；第二節避免二分對立，改為宣稱拆解與漏看面向分析。" />

              <Accordion items={course.lessons} />
            </>
          ) : null}

          {tab === "self" ? (
            <>
              <SectionTitle kicker="SELF-STUDY" title={course.selfStudy.title} desc={course.selfStudy.subtitle} />

              <div className="grid gap-4 md:grid-cols-5">
                {course.selfStudy.steps.map((s, i) => (
                  <Card key={i}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                        <Pill>{s.badge}</Pill>
                      </div>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {s.points.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-900">自學產出（學生要交什麼？）</div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {course.selfStudy.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  <div className="pt-2 text-sm text-slate-600">
                    建議：你可以在這一頁加上「提交方式」：拍照上傳、紙本繳交、或小組口頭分享。
                  </div>
                </div>
              </Card>
            </>
          ) : null}

          {tab === "resources" ? (
            <>
              <SectionTitle kicker="RESOURCES" title={course.resources.title} desc={course.resources.subtitle} />

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">一頁式節案（示意）</div>
                    <div className="text-sm leading-6 text-slate-700">
                      放這些最有用：
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>課程目標（理解/分析/行動）</li>
                        <li>兩節課流程（時間切分）</li>
                        <li>活動卡牌＆學習單清單</li>
                      </ul>
                    </div>
                    <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                      這裡可放：Google Drive/Notion 連結或檔案下載按鈕
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">完整資源 QR Code（示意）</div>
                    <div className="text-sm leading-6 text-slate-700">
                      將教材雲端連結做成 QR Code，學生掃描就能取得：投影片、閱讀材料、資料卡。
                    </div>
                    <div className="mt-3 grid place-items-center rounded-2xl border border-slate-200 bg-white p-6">
                      <div className="h-44 w-44 rounded-xl border border-slate-200 bg-slate-50" />
                      <div className="mt-3 text-xs text-slate-500">（QR 示意方塊，之後可替換成真的 QR 圖片）</div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-900">老師備註（可放在此頁最下方）</div>
                  <div className="text-sm leading-6 text-slate-700">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>本課程避免灌輸立場，重點在「提出可檢核的問題」與「能說出理由」。</li>
                      <li>若學生能力差異大，可用「資料卡難度分級」做差異化。</li>
                      <li>可延伸到：環保杯、可分解餐具、回收標示、二手交易等案例。</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </>
          ) : null}
        </motion.div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Built for demo • 單頁式網站預覽（可再加：組員介紹、評量規準、學生作品牆）
        </div>
      </div>
    </div>
  );
}
