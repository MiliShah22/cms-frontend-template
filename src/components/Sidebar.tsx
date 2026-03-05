'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full">
            <div className="p-4 font-semibold text-lg text-primary">CMS Template</div>
            <nav className="flex flex-col space-y-2 p-4">
                <Link href="/dashboard" className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Dashboard
                </Link>
                <Link href="/projects" className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Projects
                </Link>
                <Link href="/invoices" className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Invoices
                </Link>
                <Link href="/settings" className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Settings
                </Link>
            </nav>
        </aside>
    );
}
