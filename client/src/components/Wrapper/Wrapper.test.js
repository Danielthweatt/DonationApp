import React from 'react'
import Wrapper from './Wrapper'
import {shallow, mount} from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<Wrapper children="hi"/>)
})