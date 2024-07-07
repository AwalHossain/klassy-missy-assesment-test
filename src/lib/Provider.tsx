'use client';


import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { ChildrenProps } from './types';



const Providers = ({ children }: ChildrenProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers