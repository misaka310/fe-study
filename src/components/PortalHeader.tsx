type PortalArea = 'materials' | 'practice' | 'weakness' | 'exams' | 'dashboard';

const links: Array<{ area: PortalArea; label: string; href: string }> = [
  { area: 'materials', label: '教材', href: '?view=materials' },
  { area: 'practice', label: '問題演習', href: '?view=practice&mode=all' },
  { area: 'weakness', label: '弱点補強', href: '?view=practice&mode=weakness' },
  { area: 'exams', label: '模試', href: '?view=exams' },
  { area: 'dashboard', label: '学習記録', href: '?view=dashboard' },
];

export function PortalHeader({ active }: { active?: PortalArea }) {
  return (
    <>
      <header className="portal-header">
        <div>
          <p className="eyebrow">Fundamental Information Technology Engineer</p>
          <h1><a href="?">基本情報技術者 合格ナビ</a></h1>
          <p>基礎整理から問題演習、弱点補強、模試、最終確認まで順番に進められます。</p>
        </div>
        <div className="exam-card" aria-label="試験構成">
          <span>問題バンク</span>
          <strong>217問</strong>
          <b>科目A・B模試に対応</b>
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
