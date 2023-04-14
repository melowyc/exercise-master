import { render, screen } from '@testing-library/react';
import IndexHeader from '../IndexHeader';

describe('test of excercis exist', () => {
test('renders learn react link', () => {
render(<IndexHeader />);
const compElement = screen.getByText(/Exercise Master/i);
});
});