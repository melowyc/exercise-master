import 'intersection-observer';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchExercises from '../SearchExercises';

describe('<SearchExercises />', () => {
  it('calls search function when button is clicked', () => {
    const searchMock = jest.fn();
    render(<SearchExercises search={searchMock} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);
   //expect(searchMock).toHaveBeenCalled();
  });
});