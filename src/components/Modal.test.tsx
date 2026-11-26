import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('is a labelled dialog, focuses its first control and closes on Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal labelledBy="t" onClose={onClose}>
        <h2 id="t">Title</h2>
        <button>First</button>
      </Modal>,
    );
    expect(screen.getByRole('dialog', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
