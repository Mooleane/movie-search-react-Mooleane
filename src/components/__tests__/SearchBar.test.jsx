import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} onClear={() => {}} />);
    expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument();
  });

  it('calls onChange when form is submitted', async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar value="" onChange={mockOnChange} onClear={() => {}} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Star Wars');
    await user.keyboard('{Enter}');
    
    expect(mockOnChange).toHaveBeenCalledWith('Star Wars');
  });

  it('calls onClear when clear button is clicked', async () => {
    const mockOnClear = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar value="test" onChange={() => {}} onClear={mockOnClear} />);
    
    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);
    
    expect(mockOnClear).toHaveBeenCalled();
  });
});