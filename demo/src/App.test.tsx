import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App with MSW', () => {
    it('renders users from mock API', async () => {
        render(<App />);

        // Wait for users to load
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeTruthy();
        });

        expect(screen.getByText('Jane Smith')).toBeTruthy();
        expect(screen.getByText('Bob Johnson')).toBeTruthy();
    });

    it('shows user details when clicked', async () => {
        const user = userEvent.setup();
        render(<App />);

        // Wait for users to load
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeTruthy();
        });

        // Click on a user button
        const johnButton = screen.getByRole('button', { name: /John Doe/i });
        await user.click(johnButton);

        // Check details appear
        await waitFor(() => {
            expect(screen.getByText(/user1@example.com/i)).toBeTruthy();
        });
    });

    it('handles 404 errors correctly', async () => {
        const user = userEvent.setup();
        render(<App />);

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeTruthy();
        });

        // Click button that fetches invalid user
        const button = screen.getByRole('button', { name: /Fetch Invalid User/i });
        await user.click(button);

        // Check error message appears
        await waitFor(() => {
            expect(screen.getByText(/User 999 not found/i)).toBeTruthy();
        });
    });
});