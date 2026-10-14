import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { glossary } from '../src/content/glossary';
import { RichText } from '../src/components/RichText';

describe('用語チップ', () => {
  it('TTLを正式名称と試験ポイント付きの解説へ展開する', () => {
    expect(glossary.TTL.expansion).toBe('Time To Live');
    render(<RichText text="DNSの[[TTL]]を確認する。" />);

    fireEvent.click(screen.getByRole('button', { name: 'TTL 用語解説' }));

    expect(screen.getByRole('dialog', { name: 'TTL 用語解説' })).toHaveTextContent('Time To Live');
    expect(screen.getByRole('dialog')).toHaveTextContent('キャッシュの有効期間');
    expect(screen.getByRole('dialog')).toHaveTextContent('名前解決の変更がいつ反映されるか');
  });

  it('未登録マーカーは通常の文字として表示する', () => {
    render(<RichText text="[[未登録語]]はそのまま表示する。" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('[[未登録語]]はそのまま表示する。')).toBeInTheDocument();
  });

  it('Escapeで閉じて用語ボタンへフォーカスを戻す', () => {
    render(<RichText text="[[DNS]]を調べる。" />);
    const button = screen.getByRole('button', { name: 'DNS 用語解説' });
    fireEvent.click(button);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });
});
