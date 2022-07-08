import { LayoutProps } from '@/models';
import React from 'react';

export function MainLayout({ children }: LayoutProps) {
    return (
        <div>
            Main Layout sidebar
            <div>{children}</div>
        </div>
    );
}
