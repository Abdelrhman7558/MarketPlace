'use client';

import * as React from 'react';
import Link from 'next/link';

interface CardTileProps {
    title: string;
    items?: {
        image: string;
        label: string;
        link: string;
    }[];
    singleItem?: {
        image: string;
        link: string;
    };
    footerLink: string;
    footerText: string;
}

export default function AmazonCardTile({ title, items, singleItem, footerLink, footerText }: CardTileProps) {
    return (
        <div className="bg-white dark:bg-[#1A1F26] p-4 flex flex-col gap-3 layered-3d-shadow h-full group border border-black/5 dark:border-white/5 rounded-sm">
            <h3 className="text-lg font-extrabold text-[#111] dark:text-white leading-tight tracking-tight">
                {title}
            </h3>

            {singleItem ? (
                <Link href={singleItem.link} className="flex-1 relative overflow-hidden rounded-[2px]">
                    <img
                        src={singleItem.image}
                        alt={title}
                        className="w-full h-full object-cover aspect-square transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
            ) : (
                <div className="grid grid-cols-2 gap-2 flex-1">
                    {items?.map((item, i) => (
                        <Link key={i} href={item.link} className="flex flex-col gap-1 group/item">
                            <div className="relative overflow-hidden aspect-square rounded-[2px] bg-gray-50 dark:bg-gray-900">
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover/item:scale-105"
                                />
                            </div>
                            <span className="text-[10px] md:text-[11px] text-[#111] dark:text-white/70 font-bold leading-tight line-clamp-1">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            )}

            <Link href={footerLink} className="text-[13px] font-bold text-primary hover:text-primary/80 hover:underline transition-all mt-auto pt-2 inline-flex items-center gap-1">
                {footerText}
            </Link>
        </div>
    );
}
