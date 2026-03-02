import React from 'react';
import { Outlet } from 'react-router-dom';

export const StorefrontLayout = () => {
    return (
        <div className="storefront-layout min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">QRDine - Khách hàng</h1>
                </div>
            </header>
            <main className="flex-1 w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* 
                  Outlet renders the nested child routes
                */}
                <Outlet />
            </main>
        </div>
    );
};
