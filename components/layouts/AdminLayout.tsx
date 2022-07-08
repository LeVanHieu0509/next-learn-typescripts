import { LayoutProps } from '@/models';
import * as React from 'react';

export interface IAdminLayoutProps {}

export function AdminLayout({ children }: LayoutProps) {
    return (
        <div>
            <div>Admin layout</div>
            {children}
        </div>
    );
}
