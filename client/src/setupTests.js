/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockDate from 'mockdate';

configure({ adapter: new Adapter() });
// hard code dates (snapshots...)
MockDate.set('1/1/2000');
