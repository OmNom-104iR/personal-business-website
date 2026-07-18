import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowRight, Globe, Shield, ChevronDown, Mail } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "プロフィール", href: "#about" },
  { label: "サービス", href: "#services" },
];

const SERVICES = [
  {
    id: "01",
    title: "Web制作",
    subtitle: "Website Production",
    description:
      "「ホームページを作りたいけど、何から始めればいいかわからない」そんな方でも大丈夫。お店やビジネスの魅力が伝わるサイトを、一緒に作り上げます。",
    features: ["お店・会社の紹介サイト", "新規のお客さんを集めるページ", "商品・メニューの販売ページ", "作品・実績を見せるページ"],
    icon: Globe,
  },
  {
    id: "02",
    title: "運用・保守",
    subtitle: "Maintenance & Support",
    description:
      "「更新したいけど自分ではできない…」そんな方のために、メニューの変更や写真の差し替えなど、日々のこまごまとした手入れをお任せいただけます。",
    features: ["メニューや料金の変更・更新", "写真や文章の差し替え・追加", "営業時間・店舗情報の修正", "ページの追加・削除"],
    icon: Shield,
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "お話を聞かせてください", desc: "どんなお店か、どんな人に来てほしいか、まずはゆっくりお聞きします" },
  { num: "02", title: "方向性のご提案", desc: "どんなサイトにするか、イメージや構成をわかりやすくご提案します" },
  { num: "03", title: "デザイン作成", desc: "お店の雰囲気に合ったデザインをお作りします。修正も気軽にどうぞ" },
  { num: "04", title: "サイト制作", desc: "スマホでもきれいに見えるよう、丁寧に仕上げます" },
  { num: "05", title: "公開・引き渡し", desc: "問題がないか確認してから公開。使い方もしっかりご説明します" },
];



// ─── Nav ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 group">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="31" height="31" stroke="#18A87A" strokeOpacity="0.5" />
        <rect x="4.5" y="4.5" width="23" height="23" stroke="#18A87A" strokeOpacity="0.2" />
        <line x1="8" y1="11" x2="24" y2="11" stroke="#18A87A" strokeWidth="1.5" />
        <line x1="16" y1="11" x2="16" y2="23" stroke="#18A87A" strokeWidth="1.5" />
        <circle cx="8" cy="11" r="1.5" fill="#18A87A" />
        <circle cx="24" cy="11" r="1.5" fill="#18A87A" />
        <circle cx="16" cy="23" r="1.5" fill="#18A87A" />
      </svg>
      <span className="font-display text-sm font-semibold tracking-widest group-hover:text-accent transition-colors duration-200">
        TOSHIHIRO<span className="text-accent">.</span>
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] bg-accent text-accent-foreground px-5 py-2.5 hover:bg-accent/85 transition-colors duration-200"
        >
          お問い合わせ
        </a>
        {/* スペーサー：PCではお問い合わせボタンがあるためモバイルでのみ必要 */}
        <div className="md:hidden w-5 h-5" />
      </div>

    </header>

      {/* ハンバーガー／バツボタン：ドロワーより常に上に表示 */}
      <button
        className="md:hidden fixed top-[14px] right-7 w-5 h-5 z-[200]"
        onClick={() => setOpen(!open)}
        aria-label="メニュー"
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Menu size={20} />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <X size={20} />
        </motion.span>
      </button>

      {/* オーバーレイ */}
      {open && (
        <motion.div
          className="md:hidden fixed inset-0 bg-black/30 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ドロワー */}
      <motion.div
        className="md:hidden fixed top-0 right-0 h-full w-44 bg-background border-l border-border z-[100] flex flex-col px-5"
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-[72px] flex-shrink-0" />
        <nav className="flex flex-col gap-8 flex-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center justify-center text-xs font-medium tracking-[0.2em] bg-accent text-accent-foreground px-5 py-3 mb-8"
          onClick={() => setOpen(false)}
        >
          お問い合わせ
        </a>
      </motion.div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(17,19,24,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(24,168,122,0.08) 0%, transparent 70%)",
        }}
      />

      {/* モバイル専用：ヒーロー画像 */}
      <div className="md:hidden w-full px-6 pb-10 flex gap-3 items-end">
        <motion.div
          className="w-1/2 aspect-[3/4] overflow-hidden border border-border/60 shadow-md -rotate-2"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=800&fit=crop&auto=format"
            alt="Webデザイン-作業風景"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="w-1/2 aspect-[3/4] overflow-hidden border border-border/60 shadow-lg rotate-2 mb-6"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <img
            src="https://images.unsplash.com/photo-1593425546383-260c8b86730b?w=600&h=800&fit=crop&auto=format"
            alt="Webデザイン-デザイン作業"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-8">
              Web Designer / Developer
            </p>
            <h1 className="font-display text-3xl md:text-[3.5rem] font-semibold leading-[1.2] md:leading-[1.1] mb-5 md:mb-8 tracking-tight">
              <span className="block">あなたのビジネスを</span>
              <span className="block"><span style={{ color: "#18A87A" }}>Web</span>で届ける。</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed md:leading-[2] max-w-md mb-8">
              「ホームページ、そろそろ作りたいけど何から始めれば…」
              そんな方の最初の一歩を、ていねいにサポートします。
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-6 py-3 md:px-8 md:py-4 hover:bg-accent/85 transition-colors duration-200 group"
              >
                サービスを見る
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-md h-[520px]">
              {/* 左上：ノートPC */}
              <motion.div
                className="absolute top-0 left-0 w-52 h-64 overflow-hidden border border-border/60 shadow-md -rotate-2 z-10"
                initial={{ x: -120, y: -80, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=800&fit=crop&auto=format"
                  alt="Webデザイン-ノートPCで作業中"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* 右中央：手書きスケッチ */}
              <motion.div
                className="absolute top-16 right-0 w-52 h-64 overflow-hidden border border-border/60 shadow-lg rotate-2 z-20"
                initial={{ x: 120, y: -60, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=600&h=800&fit=crop&auto=format"
                  alt="Webデザイン-デザインのスケッチ"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* 左下：作業風景 */}
              <motion.div
                className="absolute bottom-0 left-16 w-52 h-64 overflow-hidden border border-border/60 shadow-xl -rotate-1 z-30"
                initial={{ x: -80, y: 120, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1501163109389-abf37ca1276a?w=600&h=750&fit=crop&auto=format"
                  alt="Webデザイン-カフェで作業中"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] group-hover:text-foreground transition-colors duration-200">SCROLL</span>
        <ChevronDown size={16} className="text-muted-foreground animate-bounce group-hover:text-foreground transition-colors duration-200" />
      </a>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServiceCard({ s, active }: { s: typeof SERVICES[number]; active: boolean }) {
  const Icon = s.icon;
  return (
    <div className={`p-6 md:p-10 group transition-colors duration-300 md:hover:bg-card ${active ? "bg-card" : "bg-background"}`}>
      <div className="flex items-start justify-between mb-5 md:mb-8">
        <div>
          <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
          <h3 className="font-display text-xl md:text-3xl font-light mt-1">{s.title}</h3>
          <span className="font-mono text-xs md:text-sm tracking-wider" style={{ color: "#18A87A" }}>
            {s.subtitle}
          </span>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center transition-all duration-300 ${active ? "border-accent/50 text-accent" : "border-border"} md:group-hover:border-accent/50 md:group-hover:text-accent`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-muted-foreground text-xs md:text-base leading-loose mb-5 md:mb-8">{s.description}</p>
      <ul className="space-y-2 md:space-y-3">
        {s.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-xs md:text-base">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#18A87A" }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Services() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const ratios = new Array(SERVICES.length).fill(0);
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[i] = entry.intersectionRatio;
          const max = Math.max(...ratios);
          setActiveIndex(max > 0 ? ratios.indexOf(max) : null);
        },
        { threshold: Array.from({ length: 21 }, (_, k) => k / 20) }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="services" className="pt-10 pb-10 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 md:mb-16">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Services</p>
          <h2 className="font-display text-2xl md:text-5xl font-light mb-3">提供サービス</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            はじめて作る方も、今あるサイトに困っている方も、お気軽にご相談ください。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {SERVICES.map((s, i) => (
            <div key={s.id} ref={(el) => { refs.current[i] = el; }}>
              <ServiceCard s={s} active={activeIndex === i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="pt-10 pb-10 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* ラベル＋見出し */}
        <div className="mb-8 md:mb-12">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">About</p>
          <h2 className="font-display text-xl md:text-5xl font-light leading-snug md:whitespace-normal whitespace-nowrap">
            はじめまして、岡田 俊大です。
          </h2>
        </div>

        {/* 写真 ｜ 本文＋ボタン */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="relative aspect-[4/4] overflow-hidden border border-border">
            <img
              src="/myprofile_image.jpg"
              alt="岡田 俊大"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute top-4 right-4 w-10 h-10 border border-accent/25" />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-muted-foreground/40">
              岡田 俊大 / Toshihiro Okada
            </div>
          </div>

          <div>
            <div className="space-y-7 md:space-y-6 text-sm md:text-base leading-relaxed md:leading-[2] text-muted-foreground mb-8 md:mb-12">
              <p>
                飲食店や美容室など、地域のお店のホームページ制作・管理をお手伝いしています。
              </p>
              <p>
                「パソコンは苦手で…」「何を伝えればいいかわからない」という方でも大丈夫。難しい言葉は使わず、一つひとつていねいにご説明しながら進めます。
              </p>
              <p>
                作って終わりではなく、公開後も気軽に相談できる存在でいたいと思っています。
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent border border-accent/40 px-5 py-3 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group"
            >
              気軽にご相談ください
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section className="pt-10 pb-10 md:py-32 border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Process</p>
          <h2 className="font-display text-2xl md:text-5xl font-light">制作の流れ</h2>
        </div>

        <div className="relative">
          {/* PC：横ライン */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

          {/* モバイル：縦ライン */}
          <div className="md:hidden absolute top-0 bottom-0 left-7 w-px bg-border" />

          <div className="grid md:grid-cols-5 gap-6 md:gap-8 pb-8 md:pb-0">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="relative">
                {/* PC レイアウト */}
                <div className="hidden md:block mb-6">
                  <div className="w-16 h-16 border border-border bg-background flex items-center justify-center relative z-10 hover:border-accent/50 transition-colors duration-300">
                    <span className="font-mono text-xs" style={{ color: "#18A87A" }}>{step.num}</span>
                  </div>
                </div>
                <h4 className="hidden md:block text-base font-medium mb-2">{step.title}</h4>
                <p className="hidden md:block text-sm text-muted-foreground leading-loose">{step.desc}</p>

                {/* モバイル レイアウト：数字box ＋ テキスト横並び */}
                <div className="md:hidden flex items-start gap-4">
                  <div className="w-14 h-14 border border-border bg-background flex items-center justify-center flex-shrink-0 relative z-10">
                    <span className="font-mono text-xs" style={{ color: "#18A87A" }}>{step.num}</span>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xs font-medium mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="pt-10 pb-10 md:py-32 border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Contact</p>
            <h2 className="font-display text-2xl md:text-5xl font-light mb-4 md:mb-6 leading-snug">
              お問い合わせ
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-loose mb-6 md:mb-10">
              「そもそもホームページって必要？」という段階のご相談も歓迎です。
              まずは気軽にお話しましょう。土日・祝日関係なく、2日以内にご返信します。
            </p>

            <div className="space-y-4 mb-5 md:mb-10">
              <div className="flex items-center gap-4 text-sm">
                <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="font-mono text-sm text-muted-foreground mb-0.5">Email</div>
                  <span>hello@tanaka-design.jp</span>
                </div>
              </div>
            </div>

            <div className="border border-border p-6 space-y-3">
              {[
                { label: "対応エリア", value: <>全国対応可能<br className="md:hidden" />（オンライン打ち合わせ）</> },
                { label: "ご連絡", value: <>毎日受け付けています<br className="md:hidden" />（2日以内に返信）</> },
                { label: "制作作業", value: "主に土日" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-sm tracking-wider text-accent">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {sent ? (
              <div className="border border-accent/30 p-6 md:p-12 text-center">
                <div
                  className="font-display text-3xl md:text-5xl mb-3 md:mb-5"
                  style={{ color: "#18A87A" }}
                >
                  ✓
                </div>
                <h3 className="font-display text-base md:text-2xl font-light mb-2 md:mb-3">送信完了しました</h3>
                <p className="text-muted-foreground text-xs md:text-sm">2日以内にご返信します。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                {[
                  { key: "name", label: "お名前", type: "text", placeholder: "田中 花子" },
                  { key: "email", label: "メールアドレス", type: "email", placeholder: "hello@example.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 tracking-[0.2em] uppercase">
                      {field.label}
                      <span className="ml-2 text-xs font-sans normal-case tracking-normal bg-red-100 text-red-600 px-1.5 py-0.5">必須</span>
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 md:px-4 md:py-3 text-xs md:text-base placeholder:text-muted-foreground focus:border-accent/50 outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 tracking-[0.2em] uppercase">
                    ご希望のサービス
                    <span className="ml-2 text-xs font-sans normal-case tracking-normal bg-red-100 text-red-600 px-1.5 py-0.5">必須</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={`w-full bg-background border border-border px-3 py-2 md:px-4 md:py-3 pr-10 text-xs md:text-base focus:border-accent/50 outline-none transition-colors duration-200 appearance-none cursor-pointer ${form.service ? "text-foreground" : "text-muted-foreground"}`}
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="web">ホームページを新しく作りたい</option>
                      <option value="renewal">今あるサイトをリニューアルしたい</option>
                      <option value="maintenance">更新・管理をお任せしたい</option>
                      <option value="other">まずは相談してみたい</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 tracking-[0.2em] uppercase">
                    お問い合わせ内容
                  </label>
                  <textarea
                    rows={4}
                    placeholder="ご要望やご質問をお書きください"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 md:px-4 md:py-3 text-xs md:text-base placeholder:text-muted-foreground focus:border-accent/50 outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground py-2.5 md:py-4 text-sm font-medium tracking-[0.2em] hover:bg-accent/85 transition-colors duration-200 cursor-pointer"
                >
                  送信する
                </button>
                <p className="text-center font-mono text-xs md:text-sm text-muted-foreground">
                  ※ご連絡いただいた情報は、お問い合わせ対応にのみ使用します。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <nav className="flex gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 Okada Toshihiro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
