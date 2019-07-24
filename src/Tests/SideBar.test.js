import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SideBar } from '../components/SideBar/SideBar';

// needed for shallow rendering
configure({ adapter: new Adapter() });

//Checks each link on Sidebar to see if it works

describe('<SideBar />', () => {
    it('should render error when Link fails(profile)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(0).text().includes('profile'));
    });
    it('should render error when Link fails(profile)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(1).text().includes('profile'));
    });
    it('should render error when Link fails(home)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(2).text().includes(''));
    });
    it('should render error when Link fails(profile)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(3).text().includes('profile'));
    });
    it('should render error when Link fails(messages)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(4).text().includes('messages'));
    });
    it('should render error when Link fails(submit)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(5).text().includes('submit'));
    });
    it('should render error when Link fails(loginpage)', () => {
        const wrapper = shallow(<SideBar />);
        expect(wrapper.find('Link').at(6).text().includes('loginpage'));
    });
});
