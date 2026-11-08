import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Sliders, 
  Clock, 
  CheckCircle2, 
  Radio, 
  Sparkles, 
  Smartphone, 
  Layers, 
  Share2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Maximize2,
  Cpu,
  BarChart3,
  ExternalLink,
  Target,
  Compass
} from 'lucide-react';

interface ProductDesignPageProps {
  onBackToHome: () => void;
}

// 4D Parameter Model Sample Data
const HAIRSTYLE_PRESETS = [
  {
    id: 'weifen',
    name: '微分碎盖 (Micro-Split Textured Fringe)',
    badge: '高频日常首选',
    description: '通过前额轻微自然三七或四六分界，配合发顶纹理打薄，打造清爽且兼具修饰面部轮廓的现代感发型。',
    previewImg: '/贴面烫发.png',
    params: {
      length: '前额眉上 1.5cm / 鬓角修剪留长 12mm / 后枕部自然渐变收弧',
      texture: '适合适中至细软发质，粗硬发质建议进行侧面贴面服帖软化',
      curl: '24mm 微小弧度 C 卷，仅为发顶提供支撑与空隙感',
      careTime: '每日约 3~5 分钟，少量海盐水喷雾抓松吹干即可',
    },
    scores: {
      versatility: 95,
      maintenance: 30, // 维护难度低
      faceFitting: 92,
      salonPopularity: 98,
    }
  },
  {
    id: 'qianci',
    name: '美式硬朗前刺 (Textured Crop & Fade)',
    badge: '利落立体首选',
    description: '强调头部侧后方的极度紧致渐变与顶部碎发前突立体感，赋予面部极具力量感的阳刚线条。',
    previewImg: '/如风自由.png',
    params: {
      length: '发顶保留 3.5~4.5cm / 两侧渐变由 1.5mm 渐过渡至 6mm / 顶端前刺',
      texture: '绝佳契合粗硬与直发，抗油腻抗塌陷能力极强',
      curl: '无卷度需求，重点依赖点剪打薄制造羽状锯齿交错层次',
      careTime: '每日仅需 2 分钟，哑光发泥轻揉指尖顺势抓刺',
    },
    scores: {
      versatility: 88,
      maintenance: 45,
      faceFitting: 86,
      salonPopularity: 94,
    }
  },
  {
    id: 'zhongfen',
    name: '微风温柔中分 (Airy Gentle Parting)',
    badge: '轻熟优雅气质',
    description: '强调刘海自然后掠流向与头部侧区的蓬松自然过渡，适合追求自然不经意质感的用户。',
    previewImg: '/阳光温柔.png',
    params: {
      length: '前额留长至眼眶下沿 / 侧区采用推剪预留耳垂上方 1cm / 后发饱满圆弧',
      texture: '中性发质与微自来卷最佳，发量中等偏多视觉效果尤佳',
      curl: '发根定位烫 + 28mm S型波浪大弧度，形成自然向后内扣流向',
      careTime: '需配合滚梳配合中温吹风机倒向吹干定型，约 6~8 分钟',
    },
    scores: {
      versatility: 85,
      maintenance: 60,
      faceFitting: 96,
      salonPopularity: 90,
    }
  }
];

export const ProductDesignPage: React.FC<ProductDesignPageProps> = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState('insights');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedHairstyle, setSelectedHairstyle] = useState(HAIRSTYLE_PRESETS[0]);
  const [nfcTapped, setNfcTapped] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  // Track scroll position for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }

      // Check sections for active state
      const sections = ['insights', 'architecture', 'design-system', 'hardware', 'impact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070A13] text-[#EBEBEB] selection:bg-white/20 selection:text-white font-brand overflow-x-hidden">
      {/* 1. Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-white/30 via-white to-white/70 z-[10000] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Sticky Product Design Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-[20px] bg-[#070A13]/85 border-b border-white/5 py-3.5 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-pointer text-xs sm:text-sm font-medium py-1 px-2.5 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>返回主站</span>
            </button>
            <span className="text-white/20 text-xs hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="LIVEFOR Logo" className="w-5 h-5 object-contain" />
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase">理法 LIVEFOR</span>
              <span className="text-white/40 text-xs font-normal hidden md:inline">· 产品设计全案复盘</span>
            </div>
          </div>

          {/* Anchor Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs text-white/50">
            <button 
              onClick={() => scrollTo('insights')}
              className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'insights' ? 'text-white font-bold' : ''}`}
            >
              01 洞察与痛点
            </button>
            <button 
              onClick={() => scrollTo('architecture')}
              className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'architecture' ? 'text-white font-bold' : ''}`}
            >
              02 产品定义
            </button>
            <button 
              onClick={() => scrollTo('design-system')}
              className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'design-system' ? 'text-white font-bold' : ''}`}
            >
              03 交互系统
            </button>
            <button 
              onClick={() => scrollTo('hardware')}
              className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'hardware' ? 'text-white font-bold' : ''}`}
            >
              04 软硬件落地
            </button>
            <button 
              onClick={() => scrollTo('impact')}
              className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'impact' ? 'text-white font-bold' : ''}`}
            >
              05 验证与成效
            </button>
          </nav>

          {/* Quick CTA */}
          <button
            onClick={onBackToHome}
            className="text-xs bg-white text-[#070A13] hover:bg-white/90 font-bold py-1.5 px-3.5 rounded-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            体验官网
          </button>
        </div>
      </header>

      {/* 3. Hero Section: Case Study Overview */}
      <section className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 border-b border-white/5">
        {/* Ambient Subtle Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1100px] mx-auto flex flex-col items-start relative z-10">
          {/* Editorial Kicker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/40 mb-4 font-mono">
            <span>Product Architecture & UX Case Study</span>
            <span>·</span>
            <span>From 0 to 1</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 font-['Noto_Sans_SC']">
            理法 LIVEFOR: <br className="hidden sm:inline" />
            从一个痛点想法到全场景落地的全过程
          </h1>

          {/* Subtitle Prose */}
          <p className="text-base sm:text-xl text-white/70 max-w-3xl leading-relaxed mb-10 font-normal">
            在城市生活中，理发本应是一种充满期待的美学体验，却长期受困于“两边推短、中间打薄”的语言失真黑盒中。
            本篇详细复盘我们如何通过深入用户痛点调研、创立<span className="text-white font-medium">四维量化发型参数</span>、打造双端协同 UI 与自研智能镜台 <span className="text-white font-medium">NFC 碰一碰交互</span>，将“可视化理发指南”打造成一套真正落地的软硬件协同体系。
          </p>

          {/* Project Spec Metadata Grid (Zero-pill discipline) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-xs">
            <div>
              <div className="text-white/40 mb-1">设计角色</div>
              <div className="text-white font-medium text-sm">产品体验架构 · 全案设计</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">研发周期</div>
              <div className="text-white font-medium text-sm">6 个月 (概念到试点落地)</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">核心定位</div>
              <div className="text-white font-medium text-sm">可视化理发指南与镜台互联</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">试点成效</div>
              <div className="text-white font-medium text-sm">沟通耗时 -78.5% · 吻合度 96.7%</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Chapter 01: 想法萌芽与痛点洞察 */}
      <section id="insights" className="relative w-full py-20 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Chapter Header */}
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Chapter 01</div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">想法萌芽与理发沟通的“语言黑盒”</h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
              现代年轻人最昂贵的社交风险之一就是理发。理发店里的每一次不满意，本质上不是手艺问题，而是严重的信息传递不对称。
            </p>
          </div>

          {/* Research Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-mono">89.2%</div>
              <div className="text-sm font-medium text-white mb-1">遭遇过“发型灾难”</div>
              <p className="text-xs text-white/50 leading-relaxed">
                受访者表示曾经历“只修一点点，剪完面目全非”的惨痛经历，对理发过程抱有天然紧张感。
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-mono">74.5%</div>
              <div className="text-sm font-medium text-white mb-1">无法用语言描述确切需求</div>
              <p className="text-xs text-white/50 leading-relaxed">
                面对理发师的询问，绝大多数用户只能使用“蓬松点、自然点、别太短”等极度模糊的主观副词。
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-mono">91.4%</div>
              <div className="text-sm font-medium text-white mb-1">理发师渴望客观参数输入</div>
              <p className="text-xs text-white/50 leading-relaxed">
                一线发型师坦言：“最怕顾客只说‘看着办’，剪完却不符合心里预设，我们迫切需要客观量化标准。”
              </p>
            </div>
          </div>

          {/* The Information Distortion Funnel */}
          <div className="p-8 bg-[#0D111C] border border-white/10 rounded-2xl mb-12">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-white/70" />
              理发沟通过程中的“四层信息失真漏斗”
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              传统流程中，需求经过4次主观折损，最终产出常常与最初想法南辕北辙：
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 bg-white/[0.03] border-l-2 border-white/80 rounded-r-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-white">1. 用户所想 (Mental Image)</span>
                <span className="text-white/50">心中的理想效果：明星杂志同款自然微碎盖</span>
              </div>
              <div className="p-4 bg-white/[0.03] border-l-2 border-white/60 rounded-r-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-white">2. 用户所言 (Verbal Expression)</span>
                <span className="text-white/50">语言失真：“两边稍微推一下，上面稍微打薄点”</span>
              </div>
              <div className="p-4 bg-white/[0.03] border-l-2 border-white/40 rounded-r-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-white">3. 理发师所听 (Stylist Interpretation)</span>
                <span className="text-white/50">主观脑补：按自己习惯推光鬓角、打薄至贴皮</span>
              </div>
              <div className="p-4 bg-white/[0.03] border-l-2 border-white/20 rounded-r-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-white">4. 剪刀落地 (Actual Output)</span>
                <span className="text-white/50">最终灾难：头型缺点暴露无遗，不可逆转</span>
              </div>
            </div>
          </div>

          {/* Authentic User Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/[0.015] border border-white/5 rounded-2xl relative">
              <div className="text-white/20 text-3xl font-serif absolute top-4 right-6">“</div>
              <p className="text-sm text-white/80 italic mb-4 leading-relaxed">
                “最尴尬的就是披上围布坐下后，理发师问我今天怎么剪。我拿出手机里存的照片，理发师看了一眼说‘你这发质做不出来’，然后就开始按他的想法下剪刀，那一刻我心里就慌了。”
              </p>
              <div className="text-xs text-white/40 font-mono">— 调研受访者 A (26岁，互联网产品经理)</div>
            </div>

            <div className="p-6 bg-white/[0.015] border border-white/5 rounded-2xl relative">
              <div className="text-white/20 text-3xl font-serif absolute top-4 right-6">“</div>
              <p className="text-sm text-white/80 italic mb-4 leading-relaxed">
                “我们很多同行其实很怕顾客只说‘剪帅点’。因为每个人的头骨高低、发旋位置、发质粗细不同。没有一套标准标尺，剪完客人不笑，我们的心也悬着。”
              </p>
              <div className="text-xs text-white/40 font-mono">— 调研受访者 B (资深发型设计总监，从业11年)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chapter 02: 产品定义与核心机制创新 */}
      <section id="architecture" className="relative w-full py-20 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Chapter Header */}
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Chapter 02</div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">产品定义：创立“四维量化发型模型”</h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
              为了打破语言黑盒，我们放弃了传统图库分类法，首创了以长度、发质、卷度、打理成本为核心的<span className="text-white font-medium">四维量化发型参数标准</span>。
            </p>
          </div>

          {/* Interactive 4D Parameter Sandbox */}
          <div className="p-6 sm:p-8 bg-[#0D111C] border border-white/10 rounded-2xl mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-white/70" />
                  四维模型交互预览器 (Interactive Parameter Sandbox)
                </h3>
                <p className="text-xs text-white/50 mt-1">点击下方发型预设，查看系统如何将感性审美转化为工程级理发参数</p>
              </div>

              {/* Hairstyle Selector Tabs */}
              <div className="flex flex-wrap gap-2">
                {HAIRSTYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedHairstyle(preset)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedHairstyle.id === preset.id
                        ? 'bg-white text-[#070A13] font-bold shadow-md'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {preset.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Selected Hairstyle Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image & Description */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-4 group">
                  <img 
                    src={selectedHairstyle.previewImg} 
                    alt={selectedHairstyle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-[#070A13]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-white/90 border border-white/10">
                    {selectedHairstyle.badge}
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{selectedHairstyle.name}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{selectedHairstyle.description}</p>
              </div>

              {/* Right Column: 4D Parameter Specs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>01 长度参考 (Length & Boundaries)</span>
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed font-mono">
                    {selectedHairstyle.params.length}
                  </div>
                </div>

                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>02 发质参考 (Hair Texture Matching)</span>
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed font-mono">
                    {selectedHairstyle.params.texture}
                  </div>
                </div>

                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>03 卷烫参考 (Curvature & Angles)</span>
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed font-mono">
                    {selectedHairstyle.params.curl}
                  </div>
                </div>

                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>04 打理参考 (Daily Maintenance Cost)</span>
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed font-mono">
                    {selectedHairstyle.params.careTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The 4-Step Closed Loop Workflow */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">“四步闭环”理发全周期体验流</h3>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              产品不仅解决“剪什么”，更重塑了“如何剪”的整个过程管理：
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                <div className="text-xs font-mono text-white/40 mb-2">Step 01</div>
                <div className="text-sm font-bold text-white mb-1.5">造型个性化预检</div>
                <p className="text-xs text-white/50 leading-relaxed">
                  头型面部骨骼参数化分析，提前匹配脸型最佳刘海角度与鬓角保留线。
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                <div className="text-xs font-mono text-white/40 mb-2">Step 02</div>
                <div className="text-sm font-bold text-white mb-1.5">切片逐条确认</div>
                <p className="text-xs text-white/50 leading-relaxed">
                  拒绝笼统口头沟通，就长度、发尾薄厚、后枕弧度 3 个关键点逐一勾选确认。
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                <div className="text-xs font-mono text-white/40 mb-2">Step 03</div>
                <div className="text-sm font-bold text-white mb-1.5">时间刻度流转</div>
                <p className="text-xs text-white/50 leading-relaxed">
                  提供细分步骤时间预算（洗吹/修剪/软化/造型），消除漫无目的的枯坐等待。
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                <div className="text-xs font-mono text-white/40 mb-2">Step 04</div>
                <div className="text-sm font-bold text-white mb-1.5">进度透明指示</div>
                <p className="text-xs text-white/50 leading-relaxed">
                  镜面屏幕实时高亮当前处于哪一道工序，剩余多少时间，掌握绝对控制权。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chapter 03: 体验设计系统与关键触点原型 */}
      <section id="design-system" className="relative w-full py-20 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Chapter Header */}
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Chapter 03</div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">体验设计系统：工业级精准质感</h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
              为了传递“专业、可信、量化”的心智，LIVEFOR 的视觉语言摒弃了传统美发软件花哨的红黄渐变与卡通标签，确立了工业仪器般严谨克制的设计系统。
            </p>
          </div>

          {/* Design Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Color System */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                色彩梯级 (Color Ramp)
              </h3>
              <p className="text-xs text-white/50 mb-4">极高对比度，防镜面眩光反光干扰</p>
              <div className="space-y-2">
                <div className="h-8 rounded bg-[#070A13] border border-white/10 flex items-center justify-between px-3 text-[11px] font-mono text-white/60">
                  <span>Brand Dark</span>
                  <span>#070A13</span>
                </div>
                <div className="h-8 rounded bg-[#0D111C] border border-white/10 flex items-center justify-between px-3 text-[11px] font-mono text-white/60">
                  <span>Panel Neutral</span>
                  <span>#0D111C</span>
                </div>
                <div className="h-8 rounded bg-[#EBEBEB] text-[#070A13] font-bold flex items-center justify-between px-3 text-[11px] font-mono">
                  <span>Display Light</span>
                  <span>#EBEBEB</span>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                字体排版系统 (Typography)
              </h3>
              <p className="text-xs text-white/50 mb-4">方正悠黑 + 思源黑体 + 仪器等宽</p>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-white/40 text-[10px] font-mono uppercase">Title Display</div>
                  <div className="text-sm font-bold text-white">方正悠黑 / Source Han Sans</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] font-mono uppercase">Reading Body</div>
                  <div className="text-xs text-white/70">Noto Sans SC 400/500 抗疲劳阅读</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] font-mono uppercase">Precision Metric</div>
                  <div className="text-xs font-mono text-white/90">BIZ UDGothic 机械等宽刻度</div>
                </div>
              </div>
            </div>

            {/* Motion & Interaction */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                动效阻尼 (Haptic & Motion)
              </h3>
              <p className="text-xs text-white/50 mb-4">纯物理惯性，拒绝过度卡通 bounce</p>
              <div className="space-y-3 text-xs font-mono">
                <div className="p-2.5 bg-white/[0.03] rounded">
                  <div className="text-white/40 text-[10px]">LENIS SMOOTH CURVE</div>
                  <div className="text-white">1.001 - 2^(-10t) 渐进阻尼</div>
                </div>
                <div className="p-2.5 bg-white/[0.03] rounded">
                  <div className="text-white/40 text-[10px]">SPRING PHYSICS</div>
                  <div className="text-white">stiffness: 420, damping: 38</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="p-8 bg-[#0D111C] border border-white/10 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">核心交互触点原型切片 (Interactive Prototyping)</h3>
            <p className="text-xs sm:text-sm text-white/50 mb-6">
              针对手机端与镜台端不同视距和交互场景定制的双端界面体系：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
                <img 
                  src="/第一阶段.png" 
                  alt="UI Prototype Stage 1" 
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="p-4 bg-[#070A13]/90 border-t border-white/10">
                  <div className="text-xs font-bold text-white mb-1">触点 A: 手机端多维微调编辑器</div>
                  <div className="text-[11px] text-white/50">支持滑块直接拖动调整鬓角留长毫米数，发型随着数值实时渲染变化。</div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
                <img 
                  src="/第二阶段.png" 
                  alt="UI Prototype Stage 2" 
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="p-4 bg-[#070A13]/90 border-t border-white/10">
                  <div className="text-xs font-bold text-white mb-1">触点 B: 镜台智能 HUD 测绘指示系统</div>
                  <div className="text-[11px] text-white/50">理发师视距 60cm 专用高对比度界面，附带刘海基准刻度线与修剪指引。</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Chapter 04: 软硬件场景落地与无感交互 */}
      <section id="hardware" className="relative w-full py-20 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Chapter Header */}
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Chapter 04</div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">软硬件场景落地：NFC“碰一碰”瞬间协同</h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
              纯软件无法解决线下沙龙的终极痛点——顾客一旦披上理发围布，双手被遮盖，无法随时掏出手机；理发师戴着滑腻手套，不能触碰顾客手机。
            </p>
          </div>

          {/* NFC Tap-to-Sync Interactive Demo */}
          <div className="p-6 sm:p-8 bg-[#0D111C] border border-white/10 rounded-2xl mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-white/70" />
                  NFC 碰一碰推流模拟器 (Tap-to-Sync Simulator)
                </h3>
                <p className="text-xs text-white/50 mt-1">模拟顾客落座时将手机轻触智能镜台近场通信感应区</p>
              </div>

              <button
                onClick={() => setNfcTapped(!nfcTapped)}
                className="text-xs bg-white text-[#070A13] font-bold py-2 px-4 rounded-lg hover:bg-white/90 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{nfcTapped ? '重置模拟' : '点击模拟手机碰一碰'}</span>
              </button>
            </div>

            {/* Simulated Stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Phone Side */}
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white mb-1">顾客手机端 (Customer App)</div>
                <div className="text-xs text-white/50 mb-4 font-mono">13.56 MHz ISO/IEC 14443 NFC 发送端</div>
                <div className={`p-4 w-full rounded-lg text-xs font-mono transition-all ${
                  nfcTapped 
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-white/5 text-white/40'
                }`}>
                  {nfcTapped ? '✓ 发型方案已推流至镜台 (0.18s 握手完成)' : '手机靠近镜台感应区即触发握手'}
                </div>
              </div>

              {/* Mirror Side */}
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white mb-1">智能镜台副屏 (Stylist Smart Mirror)</div>
                <div className="text-xs text-white/50 mb-4 font-mono">毫米级高亮 HUD 实时接收器</div>
                <div className={`p-4 w-full rounded-lg text-xs font-mono transition-all ${
                  nfcTapped 
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-white/5 text-white/40'
                }`}>
                  {nfcTapped ? '✓ 镜面显示：微分碎盖 · 刘海眉上1.5cm · 鬓角12mm' : '镜面处于待机屏保状态，等待顾客连接'}
                </div>
              </div>
            </div>
          </div>

          {/* Real World Hardware Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/[0.015] border border-white/5 rounded-2xl">
              <h4 className="text-sm font-bold text-white mb-2">0.2s 极速握手连接</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                无需打开蓝牙、无需搜索配对码、无需扫二维码。落座自然一贴，加密 Token 即刻完成双向配对。
              </p>
            </div>

            <div className="p-6 bg-white/[0.015] border border-white/5 rounded-2xl">
              <h4 className="text-sm font-bold text-white mb-2">物理级隐私会话保护</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                方案仅在当次理发周期内临时展示于镜台副屏，理发完毕离开后自动离线清除，绝不泄露个人面部隐私。
              </p>
            </div>

            <div className="p-6 bg-white/[0.015] border border-white/5 rounded-2xl">
              <h4 className="text-sm font-bold text-white mb-2">防眩光高反差涂层</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                智能镜面采用专业光学微结构镀膜，既能真实清晰反射发型细节，又确保 HUD 荧光数据在射灯下绝无反光折射。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Chapter 05: 试点验证、业务成效与未来演进 */}
      <section id="impact" className="relative w-full py-20 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Chapter Header */}
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Chapter 05</div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">验证成效与产品未来演进</h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
              在 3 家合作潮流沙龙完成为期 3 个月的实店封闭试点后，我们收集了 320 组真实剪发服务周期的定量对比数据。
            </p>
          </div>

          {/* Quantitative Impact Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-white/40 text-xs mb-1 font-mono">沟通平均耗时</div>
              <div className="text-3xl font-extrabold text-white mb-1">1.8 <span className="text-sm font-normal text-white/50">min</span></div>
              <div className="text-[11px] text-emerald-400 font-mono">对比传统 8.4min 降 78.5%</div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-white/40 text-xs mb-1 font-mono">发型预期吻合率</div>
              <div className="text-3xl font-extrabold text-white mb-1">96.7 <span className="text-sm font-normal text-white/50">%</span></div>
              <div className="text-[11px] text-emerald-400 font-mono">传统满意度仅 54.2%</div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-white/40 text-xs mb-1 font-mono">理发师单日翻台效率</div>
              <div className="text-3xl font-extrabold text-white mb-1">+23 <span className="text-sm font-normal text-white/50">%</span></div>
              <div className="text-[11px] text-emerald-400 font-mono">减少反复修改返工时间</div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="text-white/40 text-xs mb-1 font-mono">试点沙龙用户复购</div>
              <div className="text-3xl font-extrabold text-white mb-1">+41.3 <span className="text-sm font-normal text-white/50">%</span></div>
              <div className="text-[11px] text-emerald-400 font-mono">信任机制带来高粘性</div>
            </div>
          </div>

          {/* Roadmap & Next Horizons */}
          <div className="p-8 bg-[#0D111C] border border-white/10 rounded-2xl mb-12">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Compass className="w-5 h-5 text-white/70" />
              产品演进路线图 (Evolution Roadmap)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative">
                <div className="text-xs font-mono text-emerald-400 mb-2">v1.0 (已落地)</div>
                <div className="text-sm font-bold text-white mb-2">四维参数库 + NFC 镜台协同</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  构建核心四维量化标准，打通移动端到镜台端数据闭环，验证商业价值与用户口碑。
                </p>
              </div>

              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative">
                <div className="text-xs font-mono text-white/70 mb-2">v2.0 (研发中)</div>
                <div className="text-sm font-bold text-white mb-2">LiDAR 3D 头骨网格扫描</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  利用手机激光雷达扫描头骨曲率与发旋分布，实现毫米级 3D 虚拟发型拟态试戴。
                </p>
              </div>

              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative">
                <div className="text-xs font-mono text-white/40 mb-2">v3.0 (愿景)</div>
                <div className="text-sm font-bold text-white mb-2">全流程 AI 剪裁姿态纠偏辅助</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  镜台内置双目视觉算法，辅助年轻理发师在关键剪裁角度上提供毫秒级平水仪参考。
                </p>
              </div>
            </div>
          </div>

          {/* Summary Quote */}
          <div className="p-8 bg-white/[0.015] border border-white/5 rounded-2xl text-center">
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 font-serif italic">
              “理发不是一次性的快消修剪，而是每个人表达自我审美的神圣仪式。我们希望通过理法 LIVEFOR，让每一次改变都清晰透明、充满期待。”
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto bg-white text-[#070A13] hover:bg-white/90 font-bold text-sm py-3 px-8 rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                返回官网首页体验
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-medium text-sm py-3 px-6 rounded-xl transition-all cursor-pointer"
              >
                回到顶部
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#070A13] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>© 2024 理法 LIVEFOR. Product Design Case Study. All Rights Reserved.</div>
          <button 
            onClick={onBackToHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ← 返回官网产品首页
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProductDesignPage;
