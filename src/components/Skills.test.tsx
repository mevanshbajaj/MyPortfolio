import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import { skillCategories } from '../data/skills';

describe('Skills', () => {
  it('renders every category with its skills and no proficiency ratings', () => {
    render(<Skills />);
    for (const category of skillCategories) {
      expect(screen.getByRole('heading', { name: category.title })).toBeInTheDocument();
    }
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
