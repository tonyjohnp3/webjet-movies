import React from 'react';
// import { render } from '@testing-library/react';
import App from './App';
import { shallow, render } from 'enzyme';
import AppHeader from '../../Components/AppHeader/AppHeader';
import MovieList from '../../Components/MovieDetails/MovieDetails';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('<App/>', () => {
  it('renders appheader', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppHeader).length).toBe(1);
    // expect(wrapper.find(MovieList).length).toBe(1);
  })
});
