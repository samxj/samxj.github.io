/* @ds-bundle: {"format":4,"namespace":"SamFieldDesignSystem_0559a7","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ExperienceRow","sourcePath":"components/core/ExperienceRow.jsx"},{"name":"Footer","sourcePath":"components/core/Footer.jsx"},{"name":"Nav","sourcePath":"components/core/Nav.jsx"},{"name":"ProjectCard","sourcePath":"components/core/ProjectCard.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"About","sourcePath":"ui_kits/portfolio/About.jsx"},{"name":"Contact","sourcePath":"ui_kits/portfolio/Contact.jsx"},{"name":"Home","sourcePath":"ui_kits/portfolio/Home.jsx"},{"name":"Resume","sourcePath":"ui_kits/portfolio/Resume.jsx"},{"name":"Work","sourcePath":"ui_kits/portfolio/Work.jsx"}],"sourceHashes":{"components/core/Button.jsx":"58a42ef6bd8c","components/core/ExperienceRow.jsx":"d800baf5e6e3","components/core/Footer.jsx":"11794419512a","components/core/Nav.jsx":"b2ac703cd300","components/core/ProjectCard.jsx":"efddac6aaf1b","components/core/SectionHeading.jsx":"1d871926d13c","components/core/Tag.jsx":"ddd8a0910ab8","ui_kits/portfolio/About.jsx":"77173064bd59","ui_kits/portfolio/Contact.jsx":"018fd39a4316","ui_kits/portfolio/Home.jsx":"c64d124b744f","ui_kits/portfolio/Resume.jsx":"9ce87a202ff4","ui_kits/portfolio/Work.jsx":"28146f30cc87"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SamFieldDesignSystem_0559a7 = window.SamFieldDesignSystem_0559a7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
/**
 * Primary interactive control. One bold accent (flame), used sparingly —
 * most of the page is text/underline links; Button marks the one or two
 * actions that matter per screen (Get in touch, View project, Download CV).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  icon,
  disabled = false,
  onClick,
  style
}) {
  const Tag = href ? 'a' : as;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-normal)',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: '0.8125rem'
    },
    md: {
      padding: '13px 22px',
      fontSize: '0.9375rem'
    },
    lg: {
      padding: '18px 30px',
      fontSize: '1.0625rem'
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      borderColor: 'var(--accent)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'transparent',
      padding: sizes[size].padding.split(' ')[0] + ' 4px'
    }
  };
  const hoverStyle = {
    primary: {
      background: 'var(--accent-hover)',
      borderColor: 'var(--accent-hover)'
    },
    secondary: {
      background: 'var(--bg-surface-raised)',
      borderColor: 'var(--text-primary)'
    },
    ghost: {
      color: 'var(--accent)'
    }
  };
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...(hover && !disabled ? hoverStyle[variant] : {}),
      ...style
    }
  }, children, icon === 'arrow' && /*#__PURE__*/React.createElement("span", {
    style: {
      transform: hover ? 'translateX(3px)' : 'translateX(0)',
      transition: 'transform var(--duration-fast) var(--ease-standard)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/ExperienceRow.jsx
try { (() => {
function ExperienceRow({
  title,
  org,
  period,
  description
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: 'var(--space-6)',
      padding: 'var(--space-5) 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-mono)',
      color: 'var(--text-muted)'
    }
  }, period), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-display-3)',
      fontSize: '1.4rem',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, title), org && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--accent)'
    }
  }, org), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '60ch'
    }
  }, description)));
}
Object.assign(__ds_scope, { ExperienceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ExperienceRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Footer.jsx
try { (() => {
function Footer({
  email = 'hello@samfield.co',
  socials = []
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: 'var(--space-8) var(--gutter)',
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      font: 'var(--text-display-2)',
      fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
      color: 'var(--text-primary)',
      textDecoration: 'none',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, email), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.label,
    href: s.href,
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, s.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--text-mono)',
      color: 'var(--text-muted)',
      fontSize: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Sam Field"), /*#__PURE__*/React.createElement("span", null, "Engineering \xD7 creativity")));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Footer.jsx", error: String((e && e.message) || e) }); }

// components/core/Nav.jsx
try { (() => {
function Nav({
  active = 'home',
  links = [{
    label: 'Home',
    href: '#home'
  }, {
    label: 'About',
    href: '#about'
  }, {
    label: 'Work',
    href: '#work'
  }, {
    label: 'Resume',
    href: '#resume'
  }],
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px var(--gutter)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'rgba(10,10,10,0.7)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('home');
    },
    style: {
      font: 'var(--text-display-3)',
      fontSize: '1.25rem',
      color: 'var(--text-primary)',
      textDecoration: 'none',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Sam Field"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, links.map(l => {
    const key = l.href.replace('#', '');
    const isActive = key === active;
    return /*#__PURE__*/React.createElement("a", {
      key: l.href,
      href: l.href,
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(key);
      },
      style: {
        font: 'var(--text-label)',
        textDecoration: 'none',
        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
        borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
        paddingBottom: '4px',
        transition: 'color var(--duration-fast) var(--ease-standard)'
      }
    }, l.label);
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "primary",
    href: "#contact",
    onClick: () => onNavigate && onNavigate('contact')
  }, "Contact")));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Nav.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  index,
  align = 'left'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      alignItems: align === 'center' ? 'center' : 'flex-start'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, index && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, index), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-display-2)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, title));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  variant = 'default'
}) {
  const variants = {
    default: {
      color: 'var(--text-secondary)',
      borderColor: 'var(--border-strong)',
      background: 'transparent'
    },
    accent: {
      color: 'var(--accent)',
      borderColor: 'var(--accent)',
      background: 'transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      lineHeight: 1,
      padding: '7px 12px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid',
      ...variants[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/ProjectCard.jsx
try { (() => {
function ProjectCard({
  title,
  year,
  role,
  tags = [],
  image,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      cursor: onClick ? 'pointer' : 'default',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 3',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: image ? `center/cover no-repeat url(${image})` : 'linear-gradient(160deg, #1D1B17, #0A0A0A)',
      border: '1px solid var(--border-hairline)',
      position: 'relative'
    }
  }, !image && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      font: 'var(--text-mono)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, "IMAGE"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(0deg, rgba(0,0,0,0.35), transparent 40%)',
      opacity: hover ? 1 : 0,
      transition: 'opacity var(--duration-base) var(--ease-cinematic)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-display-3)',
      color: 'var(--text-primary)',
      margin: 0,
      transition: 'color var(--duration-fast) var(--ease-standard)',
      ...(hover ? {
        color: 'var(--accent)'
      } : {})
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-mono)',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, year)), role && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, role), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-2)'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
const groups = [{
  title: 'Photography & videography',
  tags: ['Premiere Pro', 'Photoshop', 'Lightroom', 'After Effects', 'Solo production']
}, {
  title: 'Engineering',
  tags: ['CAD', 'Autopilot systems', 'Mechanism design', 'Project management']
}, {
  title: 'Linguistics',
  tags: ['C1 Italian', 'B2 French', 'Latin', 'Classical Greek', 'Constructed language']
}, {
  title: 'Music',
  tags: ['Grade-8 drums', 'Grade-4 piano', 'Band performance', 'Music theory']
}, {
  title: 'Writing',
  tags: ['Short fiction', 'National shortlist', 'School publication']
}];
function About({}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-9) var(--gutter)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    index: "01",
    eyebrow: "About",
    title: "Two sides, one habit of mind."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'var(--text-secondary)',
      maxWidth: '68ch',
      margin: 0
    }
  }, "I split my time between technical work \u2014 code, mechanisms, physics \u2014 and creative work \u2014 film, photography, writing. I don't really see them as separate: both start with a plan, both live or die on the details, and both need someone willing to sit with a problem until it's actually solved. Whichever one I'm doing, I try to bring the other one with me."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'var(--space-7)'
    }
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-display-3)',
      fontSize: '1.25rem',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, g.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, g.tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))))));
}
Object.assign(__ds_scope, { About });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Contact.jsx
try { (() => {
function Contact() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-9) var(--gutter)',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-7)',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    index: "04",
    eyebrow: "Contact",
    title: "Let's make something."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'var(--text-secondary)',
      maxWidth: '56ch',
      margin: 0
    }
  }, "Whatever it is \u2014 a film, a build, a project that needs both \u2014 I'd like to hear about it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    icon: "arrow",
    onClick: () => setSent(true),
    href: sent ? undefined : 'mailto:hello@samfield.co'
  }, sent ? 'Opened your mail app' : 'Email me'), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "lg"
  }, "Instagram"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "lg"
  }, "Vimeo")));
}
Object.assign(__ds_scope, { Contact });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Home.jsx
try { (() => {
function Home({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: '86vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 'var(--space-6)',
      padding: 'var(--space-9) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: 'var(--accent)'
    }
  }, "Engineering \xD7 photography \xD7 story"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--text-display-1)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-primary)',
      margin: 0,
      maxWidth: '18ch'
    }
  }, "Real tech, raw creativity."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'var(--text-secondary)',
      maxWidth: '52ch',
      margin: 0
    }
  }, "I'm Sam Field \u2014 I build things (code, machines, film) and I tell stories with them. Camera in one hand, CAD file in the other."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    icon: "arrow",
    onClick: () => onNavigate('work')
  }, "See my work"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNavigate('contact')
  }, "Get in touch"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--gutter) var(--space-9)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-6)'
    }
  }, [['Film & photo', 'Shot planning to grade, solo — Premiere, Photoshop, Lightroom, After Effects'], ['Engineering', 'STEM-fair winner: an AI-guided seed-dropping RC plane, built from scratch'], ['Languages', 'C1 Italian, B2 French, grade 9 Latin & Classical Greek GCSE'], ['Music & writing', 'Grade-8 drums, grade-4 piano, nationally shortlisted short fiction']].map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-display-3)',
      fontSize: '1.15rem',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, d)))));
}
Object.assign(__ds_scope, { Home });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Resume.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const rows = [{
  period: '2026',
  title: 'Runner',
  org: 'RED-d Awareness Film Shoot',
  description: 'On-set support for a professional production.'
}, {
  period: '2025 — present',
  title: 'Promotional Films',
  org: "St John's Hampton Wick Church",
  description: 'Shot planning through edit and delivery, solo.'
}, {
  period: '2025',
  title: 'Marketing Photography',
  org: 'Imm-Aroy, Chinatown London',
  description: 'Stills for a restaurant\'s menu and social presence.'
}, {
  period: '2023 — 24',
  title: 'Christian Youth Journals',
  org: 'Independent',
  description: 'Designed and sold a run of youth journals.'
}, {
  period: '2023',
  title: 'Promotional Film',
  org: 'Red Robin Art Studio, London',
  description: ''
}, {
  period: '2022',
  title: 'Promotional Film',
  org: 'Chanctonbury Church',
  description: ''
}];
function Resume() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-9) var(--gutter)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    index: "03",
    eyebrow: "Resume",
    title: "Experience"
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary"
  }, "Download CV (PDF)")), /*#__PURE__*/React.createElement("div", null, rows.map((r, i) => /*#__PURE__*/React.createElement(__ds_scope.ExperienceRow, _extends({
    key: i
  }, r)))));
}
Object.assign(__ds_scope, { Resume });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Resume.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Work.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const projects = [{
  title: "St John's Hampton Wick",
  year: '2025 —',
  role: 'Director, camera, edit',
  tags: ['Promo Film', 'Premiere Pro']
}, {
  title: 'AI Seed-Dropping Plane',
  year: '2024',
  role: 'Dispenser design + autopilot code',
  tags: ['STEM Fair Winner', 'CAD']
}, {
  title: 'Imm-Aroy Restaurant',
  year: '2025',
  role: 'Marketing photography',
  tags: ['Photoshop', 'Lightroom']
}, {
  title: 'Christian Youth Journals',
  year: '2023–24',
  role: 'Design & sale',
  tags: ['Print Design']
}, {
  title: 'Red Robin Art Studio',
  year: '2023',
  role: 'Promotional film',
  tags: ['Videography']
}, {
  title: 'Chanctonbury Church',
  year: '2022',
  role: 'Promotional film',
  tags: ['Videography', 'Early Work']
}];
function Work({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-9) var(--gutter)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    index: "02",
    eyebrow: "Selected Work",
    title: "Things I've made"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)'
    }
  }, projects.map(p => /*#__PURE__*/React.createElement(__ds_scope.ProjectCard, _extends({
    key: p.title
  }, p, {
    onClick: () => onOpen && onOpen(p)
  })))));
}
Object.assign(__ds_scope, { Work });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Work.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ExperienceRow = __ds_scope.ExperienceRow;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.About = __ds_scope.About;

__ds_ns.Contact = __ds_scope.Contact;

__ds_ns.Home = __ds_scope.Home;

__ds_ns.Resume = __ds_scope.Resume;

__ds_ns.Work = __ds_scope.Work;

})();
