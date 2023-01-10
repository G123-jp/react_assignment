import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderStep1 } from '../components/step1';
import { create } from 'react-test-renderer';

test('renders first page', () => {
    const step1Components = create(<OrderStep1 animateName="" />).toJSON();
    expect(step1Components).toMatchSnapshot();
});
