import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import AppHeader from './AppHeader';
import { Typography } from '@material-ui/core';

describe('<AppHeader />', () => {
    it('renders 1 appbar', () => {
        const wrapper = shallow(<AppHeader/>);
        expect(wrapper.find(AppBar).length).toBe(1);
    });
    
    it('renders appbar with title', () => {
        const wrapper = shallow(<AppHeader title="Movie"/>);
        expect(wrapper.find(Typography).text()).toEqual('Movie');
    });
});