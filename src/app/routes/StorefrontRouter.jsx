import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StorefrontLayout } from '../../shared/layouts';
import { HomePage, ErrorPage } from '../../pages';

const StorefrontRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<StorefrontLayout />}>
                <Route index element={<HomePage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default StorefrontRouter;
