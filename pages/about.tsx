import { AdminLayout } from '@/components/layouts';
import React from 'react';

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
    return (
        <div>
            <ul className="post-list">About</ul>
        </div>
    );
}

AboutPage.Layout = AdminLayout;
