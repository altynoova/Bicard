'use client'
import * as React from 'react';
import { Pagination as _Pagination } from '@mui/material';
import useBlogStore from '@/store/useBlogStore';

interface Pagination {
    pagenumber: number;
    totalpages: number
}

export default function Pagination({ pagenumber, totalpages }: Pagination) {
    const setPage = useBlogStore(state => state.SetPageNumber)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <_Pagination count={totalpages} page={pagenumber} onChange={handleChange} />
    );
}