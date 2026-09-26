type PortalArea = 'materials' | 'practice';

const links: Array<{ area: PortalArea; label: string; href: string }> = [
  { area: 'materials', label: '教材', href: '?view=materials' },
  { area: 'practice', label: '問題演習', href: '?view=practice&mode=all' },
];

export function PortalHeader({ active }: { active?: PortalArea; questionCount: number }) {
  return (
    <>
      <header className="portal-header">
        <div>
          <p className="eyebrow">Fundamental Information Technology Engineer</p>
          <h1><a href="?">基本情報技術者 合格ナビ</a></h1>
          <p>教材で理解し、問題演習で定着させます。</p>
        </div>
      </header>
      <nav className="purpose-nav" aria-label="主な機能">
        {links.map((link) => (
          <a className={`purpose-button${active === link.area ? ' is-active' : ''}`} href={link.href} key={link.area} aria-current={active === link.area ? 'page' : undefined}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
