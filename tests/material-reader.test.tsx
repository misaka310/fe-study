import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MaterialReader } from '../src/components/MaterialReader';

describe('教材リーダー', () => {
  it('指定章を開き、前後章と関連問題へ移動できる', () => {
    render(<MaterialReader questionCount={265} initialMaterialId="05-algorithms" />);

    expect(screen.getByRole('heading', { name: '05 データ構造とアルゴリズム' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '前の章' })).toHaveAttribute('href', '?view=materials&material=04-software');
    expect(screen.getByRole('link', { name: '次の章' })).toHaveAttribute('href', '?view=materials&material=06-database');
    expect(screen.getByRole('link', { name: 'この章の問題を解く' })).toHaveAttribute('href', '?view=practice&material=05-algorithms');
  });

  it('検索語に一致する章だけを一覧へ残す', () => {
    render(<MaterialReader questionCount={265} initialMaterialId="01-roadmap" />);

    fireEvent.change(screen.getByRole('searchbox', { name: '教材を検索' }), { target: { value: 'SQL' } });

    expect(screen.getByRole('link', { name: '06 データベース' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '03 コンピュータ構成要素' })).not.toBeInTheDocument();
  });

  it('本文の用語と判断軸を学習者がその場で確認できる', () => {
    render(<MaterialReader questionCount={265} initialMaterialId="07-network" />);

    expect(screen.getByRole('button', { name: 'TTL 用語解説' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '判断軸' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '混同注意' })).toBeInTheDocument();
  });
});
