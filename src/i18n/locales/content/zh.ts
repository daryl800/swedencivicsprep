import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";

export const zhCitizenshipUpdate: CitizenshipUpdateText = {
    title: "2026 公民规则更新",
    source: "根据 Migrationsverket 的信息整理",
    summary: "新的 2026 公民规则从六月开始适用。部分申请人获得永久居留的路径可能更容易。",
    intro: "自 2026 年 6 月 6 日起，瑞典公民申请按照更严格的要求审查。对许多成年申请人来说，要求包括：",
    bullets: [
      "有效的居留基础，通常是永久居留、居留权、居留卡或居留身份",
      "在瑞典居住达到规定年限",
      "具备瑞典语和瑞典社会知识",
      "能够自给自足",
      "生活守法、有良好品行"
    ],
    note: "自 2026 年 7 月 12 日起，部分持临时居留许可的人可能不再必须先有永久居留。你的个人情况始终由 Migrationsverket 评估。",
    migrationsverketLink: "在 Migrationsverket 查看要求",
    uhrLink: "使用 Sverige i fokus 学习"
  };

export const zhFaqContent: FaqContent = {
    title: "常见问题",
    intro: "给早期用户的简短说明。我们现在保持产品简单，是为了测试什么真正帮助学习者。",
    items: [
      {
        question: "Swedish Civics Test Preparation 是官方测试服务吗？",
        answer: "不是。Swedish Civics Test Preparation 是独立学习和练习工具。我们不隶属于 UHR、Skolverket、Migrationsverket 或官方公民测试。"
      },
      {
        question: "这些是官方考试题吗？",
        answer: "不是。这些题目是为本应用原创编写的练习题，基于 Sverige i fokus 的公开学习主题，并不是复制任何官方考试题。"
      },
      {
        question: "为什么题目是瑞典语？",
        answer: "真实的社会知识/公民测试与瑞典社会和瑞典语学习材料相关。我们保留瑞典语题目，并用你选择的语言提供帮助和解释。"
      },
      {
        question: "我的进度保存在哪里？",
        answer: "在此预览版本中，进度只保存在你当前设备的浏览器里。现在还没有账号，所以不会跨设备同步。"
      },
      {
        question: "现在免费吗？",
        answer: "是的，早期版本免费使用，我们希望收集真实学习者的反馈。之后版本可能会加入账号、更多内容或付费功能。"
      },
      {
        question: "它会模拟完整的60题考试吗？",
        answer: "还不会。预览版本是按主题练习。等题库更大后，限时混合模拟考试会是很好的下一步。"
      }
    ]
  };

export const zhLegalContent: LegalContent = {
    homeLink: "返回首页",
    privacyLink: "条款与隐私",
    footerNote: "原创练习题，基于公开学习主题；不是官方考试题。",
    title: "条款与隐私",
    updated: "最后更新：2026年8月10日",
    intro: "本页说明 Swedish Civics Test Preparation 目前如何运作。预览版本没有账号、付款、后台数据库或广告追踪，所以内容保持简短。",
    sections: [
      {
        title: "独立学习工具",
        body: [
          "Swedish Civics Test Preparation 是面向瑞典社会知识学习者的独立练习指南。我们不隶属于 UHR、Skolverket、Migrationsverket 或官方公民测试。",
          "练习题是原创内容，基于 Sverige i fokus 的公开学习主题。我们不复制、发布或声称提供官方考试题。"
        ]
      },
      {
        title: "你如何使用本应用",
        body: [
          "你可以把本应用用于个人学习，也可以向我们提供反馈。",
          "请不要抓取、重新发布或出售题库、解释、翻译或设计，把它们做成另一个产品。"
        ]
      },
      {
        title: "预览版本的隐私",
        body: [
          "预览版本没有用户账号、付款、联系表单、分析像素，也没有保存在后台的用户资料。",
          "你的练习进度和所选语言会通过 localStorage 保存在本设备浏览器中。除非你清除浏览器存储，或未来选择使用账号功能，否则这些数据留在你的设备上。"
        ]
      },
      {
        title: "未来变化",
        body: [
          "如果之后加入账号、付款、分析、邮件登录或云端进度同步，我们需要在发布这些功能前更新本政策。",
          "本页是产品说明，不是法律建议。更大规模公开发布前，仍然值得做一次 GDPR 审查。"
        ]
      }
    ]
  };
