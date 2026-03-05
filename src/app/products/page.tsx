'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

// Extended product data with 160+ products for pagination testing
const allProductsData: Product[] = [
    // Subscriptions (25 products)
    { id: 'PRD-1024', name: 'CMS Starter Plan', sku: 'CMS-ST-01', category: 'Subscriptions', price: 19.00, stock: 243, status: 'active', trend: '+12%' },
    { id: 'PRD-1008', name: 'CMS Pro Plan', sku: 'CMS-PR-01', category: 'Subscriptions', price: 49.00, stock: 88, status: 'active', trend: '+7%' },
    { id: 'PRD-1035', name: 'CMS Enterprise Plan', sku: 'CMS-EN-01', category: 'Subscriptions', price: 99.00, stock: 45, status: 'active', trend: '+15%' },
    { id: 'PRD-1040', name: 'CMS Team Plan', sku: 'CMS-TM-01', category: 'Subscriptions', price: 29.00, stock: 156, status: 'active', trend: '+9%' },
    { id: 'PRD-1045', name: 'CMS Business Plan', sku: 'CMS-BU-01', category: 'Subscriptions', price: 79.00, stock: 67, status: 'active', trend: '+5%' },
    { id: 'PRD-1050', name: 'CMS Agency Plan', sku: 'CMS-AG-01', category: 'Subscriptions', price: 149.00, stock: 32, status: 'active', trend: '+18%' },
    { id: 'PRD-1055', name: 'CMS Ultimate Plan', sku: 'CMS-UL-01', category: 'Subscriptions', price: 199.00, stock: 18, status: 'active', trend: '+22%' },
    { id: 'PRD-1060', name: 'CMS Basic Plan', sku: 'CMS-BA-01', category: 'Subscriptions', price: 9.00, stock: 312, status: 'active', trend: '+3%' },
    { id: 'PRD-1065', name: 'CMS Premium Plan', sku: 'CMS-PM-01', category: 'Subscriptions', price: 59.00, stock: 94, status: 'active', trend: '+11%' },
    { id: 'PRD-1070', name: 'CMS Deluxe Plan', sku: 'CMS-DX-01', category: 'Subscriptions', price: 89.00, stock: 56, status: 'active', trend: '+8%' },
    { id: 'PRD-1075', name: 'CMS Plus Plan', sku: 'CMS-PL-01', category: 'Subscriptions', price: 39.00, stock: 128, status: 'active', trend: '+6%' },
    { id: 'PRD-1080', name: 'CMS Growth Plan', sku: 'CMS-GR-01', category: 'Subscriptions', price: 69.00, stock: 78, status: 'active', trend: '+10%' },
    { id: 'PRD-1085', name: 'CMS Scale Plan', sku: 'CMS-SC-01', category: 'Subscriptions', price: 119.00, stock: 42, status: 'active', trend: '+14%' },
    { id: 'PRD-1090', name: 'CMS Launch Plan', sku: 'CMS-LA-01', category: 'Subscriptions', price: 14.00, stock: 267, status: 'active', trend: '+4%' },
    { id: 'PRD-1095', name: 'CMS Spark Plan', sku: 'CMS-SP-01', category: 'Subscriptions', price: 24.00, stock: 189, status: 'active', trend: '+7%' },
    { id: 'PRD-1100', name: 'CMS Flex Plan', sku: 'CMS-FX-01', category: 'Subscriptions', price: 34.00, stock: 145, status: 'active', trend: '+5%' },
    { id: 'PRD-1105', name: 'CMS Prime Plan', sku: 'CMS-PR-02', category: 'Subscriptions', price: 44.00, stock: 167, status: 'active', trend: '+8%' },
    { id: 'PRD-1110', name: 'CMS Elite Plan', sku: 'CMS-EL-01', category: 'Subscriptions', price: 159.00, stock: 28, status: 'active', trend: '+20%' },
    { id: 'PRD-1115', name: 'CMS Starter Pro', sku: 'CMS-ST-02', category: 'Subscriptions', price: 27.00, stock: 198, status: 'active', trend: '+6%' },
    { id: 'PRD-1120', name: 'CMS Enterprise Plus', sku: 'CMS-EN-02', category: 'Subscriptions', price: 129.00, stock: 35, status: 'active', trend: '+16%' },
    { id: 'PRD-1125', name: 'CMS Team Pro', sku: 'CMS-TM-02', category: 'Subscriptions', price: 37.00, stock: 134, status: 'active', trend: '+9%' },
    { id: 'PRD-1130', name: 'CMS Business Pro', sku: 'CMS-BU-02', category: 'Subscriptions', price: 97.00, stock: 52, status: 'active', trend: '+11%' },
    { id: 'PRD-1135', name: 'CMS Agency Pro', sku: 'CMS-AG-02', category: 'Subscriptions', price: 179.00, stock: 24, status: 'active', trend: '+19%' },
    { id: 'PRD-1140', name: 'CMS Ultimate Pro', sku: 'CMS-UL-02', category: 'Subscriptions', price: 249.00, stock: 12, status: 'active', trend: '+25%' },
    { id: 'PRD-1145', name: 'CMS Value Plan', sku: 'CMS-VL-01', category: 'Subscriptions', price: 19.99, stock: 234, status: 'active', trend: '+4%' },

    // Addons (25 products)
    { id: 'PRD-0992', name: 'SEO Toolkit Addon', sku: 'ADD-SEO-01', category: 'Addons', price: 9.00, stock: 510, status: 'active', trend: '+23%' },
    { id: 'PRD-0975', name: 'Analytics Upgrade', sku: 'ADD-ANALYTICS', category: 'Addons', price: 15.00, stock: 132, status: 'draft', trend: '-' },
    { id: 'PRD-2101', name: 'Email Marketing Addon', sku: 'ADD-EMAIL-01', category: 'Addons', price: 12.00, stock: 234, status: 'active', trend: '+16%' },
    { id: 'PRD-2102', name: 'Social Media Integration', sku: 'ADD-SOCIAL-01', category: 'Addons', price: 8.00, stock: 445, status: 'active', trend: '+19%' },
    { id: 'PRD-2103', name: 'E-commerce Module', sku: 'ADD-ECOMM-01', category: 'Addons', price: 25.00, stock: 89, status: 'active', trend: '+21%' },
    { id: 'PRD-2104', name: 'Blog Extension', sku: 'ADD-BLOG-01', category: 'Addons', price: 7.00, stock: 567, status: 'active', trend: '+11%' },
    { id: 'PRD-2105', name: 'Forum Plugin', sku: 'ADD-FORUM-01', category: 'Addons', price: 11.00, stock: 198, status: 'active', trend: '+8%' },
    { id: 'PRD-2106', name: 'Gallery Pro', sku: 'ADD-GALLERY-01', category: 'Addons', price: 14.00, stock: 276, status: 'active', trend: '+13%' },
    { id: 'PRD-2107', name: 'Video Hosting', sku: 'ADD-VIDEO-01', category: 'Addons', price: 19.00, stock: 145, status: 'active', trend: '+17%' },
    { id: 'PRD-2108', name: 'Multi-language Support', sku: 'ADD-LANG-01', category: 'Addons', price: 22.00, stock: 112, status: 'active', trend: '+9%' },
    { id: 'PRD-2109', name: 'Custom Domain SSL', sku: 'ADD-SSL-01', category: 'Addons', price: 5.00, stock: 678, status: 'active', trend: '+6%' },
    { id: 'PRD-2110', name: 'API Access', sku: 'ADD-API-01', category: 'Addons', price: 18.00, stock: 167, status: 'active', trend: '+12%' },
    { id: 'PRD-2111', name: 'White Label License', sku: 'ADD-WHITE-01', category: 'Addons', price: 49.00, stock: 54, status: 'active', trend: '+25%' },
    { id: 'PRD-2112', name: 'Priority Support', sku: 'ADD-SUPPORT-01', category: 'Addons', price: 29.00, stock: 98, status: 'active', trend: '+14%' },
    { id: 'PRD-2113', name: 'Advanced Reporting', sku: 'ADD-REPORT-01', category: 'Addons', price: 16.00, stock: 201, status: 'active', trend: '+10%' },
    { id: 'PRD-2114', name: 'Custom Theme Pack', sku: 'ADD-THEME-01', category: 'Addons', price: 23.00, stock: 187, status: 'active', trend: '+15%' },
    { id: 'PRD-2115', name: 'Backup Manager', sku: 'ADD-BACKUP-01', category: 'Addons', price: 13.00, stock: 298, status: 'active', trend: '+9%' },
    { id: 'PRD-2116', name: 'Cache Optimizer', sku: 'ADD-CACHE-01', category: 'Addons', price: 8.00, stock: 456, status: 'active', trend: '+12%' },
    { id: 'PRD-2117', name: 'CDN Integration', sku: 'ADD-CDN-01', category: 'Addons', price: 17.00, stock: 189, status: 'active', trend: '+11%' },
    { id: 'PRD-2118', name: 'Push Notifications', sku: 'ADD-PUSH-01', category: 'Addons', price: 11.00, stock: 234, status: 'active', trend: '+8%' },
    { id: 'PRD-2119', name: 'Live Chat Support', sku: 'ADD-CHAT-01', category: 'Addons', price: 21.00, stock: 156, status: 'active', trend: '+14%' },
    { id: 'PRD-2120', name: 'Newsletter Builder', sku: 'ADD-NEWS-01', category: 'Addons', price: 15.00, stock: 212, status: 'active', trend: '+10%' },
    { id: 'PRD-2121', name: 'Event Calendar', sku: 'ADD-EVENT-01', category: 'Addons', price: 12.00, stock: 278, status: 'active', trend: '+7%' },
    { id: 'PRD-2122', name: 'Survey Builder', sku: 'ADD-SURVEY-01', category: 'Addons', price: 14.00, stock: 198, status: 'active', trend: '+9%' },
    { id: 'PRD-2123', name: 'Membership Portal', sku: 'ADD-MEMBER-01', category: 'Addons', price: 27.00, stock: 89, status: 'active', trend: '+18%' },

    // Electronics (25 products)
    { id: 'PRD-2001', name: 'Smartphone Pro Max', sku: 'ELEC-001', category: 'Electronics', price: 299.00, stock: 50, status: 'active', trend: '+5%' },
    { id: 'PRD-2002', name: 'Wireless Earbuds', sku: 'ELEC-002', category: 'Electronics', price: 79.00, stock: 234, status: 'active', trend: '+12%' },
    { id: 'PRD-2003', name: 'Smart Watch Series 8', sku: 'ELEC-003', category: 'Electronics', price: 199.00, stock: 87, status: 'active', trend: '+8%' },
    { id: 'PRD-2004', name: 'Bluetooth Speaker', sku: 'ELEC-004', category: 'Electronics', price: 49.00, stock: 312, status: 'active', trend: '+15%' },
    { id: 'PRD-2005', name: 'Portable Charger 20000mAh', sku: 'ELEC-005', category: 'Electronics', price: 35.00, stock: 445, status: 'active', trend: '+9%' },
    { id: 'PRD-2006', name: 'USB-C Hub 7-in-1', sku: 'ELEC-006', category: 'Electronics', price: 29.00, stock: 267, status: 'active', trend: '+11%' },
    { id: 'PRD-2007', name: 'Mechanical Keyboard', sku: 'ELEC-007', category: 'Electronics', price: 89.00, stock: 123, status: 'active', trend: '+7%' },
    { id: 'PRD-2008', name: 'Gaming Mouse RGB', sku: 'ELEC-008', category: 'Electronics', price: 45.00, stock: 198, status: 'active', trend: '+13%' },
    { id: 'PRD-2009', name: 'Webcam HD 1080p', sku: 'ELEC-009', category: 'Electronics', price: 55.00, stock: 156, status: 'active', trend: '+6%' },
    { id: 'PRD-2010', name: 'Monitor Stand Adjustable', sku: 'ELEC-010', category: 'Electronics', price: 39.00, stock: 234, status: 'active', trend: '+4%' },
    { id: 'PRD-2011', name: 'Laptop Sleeve 15 inch', sku: 'ELEC-011', category: 'Electronics', price: 25.00, stock: 389, status: 'active', trend: '+8%' },
    { id: 'PRD-2012', name: 'Wireless Charging Pad', sku: 'ELEC-012', category: 'Electronics', price: 19.00, stock: 456, status: 'active', trend: '+10%' },
    { id: 'PRD-2013', name: 'Smart Home Hub', sku: 'ELEC-013', category: 'Electronics', price: 129.00, stock: 78, status: 'active', trend: '+16%' },
    { id: 'PRD-2014', name: 'Fitness Tracker Band', sku: 'ELEC-014', category: 'Electronics', price: 69.00, stock: 145, status: 'active', trend: '+12%' },
    { id: 'PRD-2015', name: 'Action Camera 4K', sku: 'ELEC-015', category: 'Electronics', price: 179.00, stock: 92, status: 'active', trend: '+9%' },
    { id: 'PRD-2016', name: 'Tablet 10 inch', sku: 'ELEC-016', category: 'Electronics', price: 249.00, stock: 67, status: 'active', trend: '+7%' },
    { id: 'PRD-2017', name: 'Noise Cancelling Headphones', sku: 'ELEC-017', category: 'Electronics', price: 159.00, stock: 89, status: 'active', trend: '+14%' },
    { id: 'PRD-2018', name: 'Smart Doorbell Camera', sku: 'ELEC-018', category: 'Electronics', price: 99.00, stock: 123, status: 'active', trend: '+11%' },
    { id: 'PRD-2019', name: 'Wireless Router WiFi 6', sku: 'ELEC-019', category: 'Electronics', price: 119.00, stock: 78, status: 'active', trend: '+9%' },
    { id: 'PRD-2020', name: 'Portable SSD 1TB', sku: 'ELEC-020', category: 'Electronics', price: 89.00, stock: 167, status: 'active', trend: '+13%' },
    { id: 'PRD-2021', name: 'USB Flash Drive 128GB', sku: 'ELEC-021', category: 'Electronics', price: 15.00, stock: 456, status: 'active', trend: '+5%' },
    { id: 'PRD-2022', name: 'Smart Light Bulbs Pack', sku: 'ELEC-022', category: 'Electronics', price: 24.00, stock: 289, status: 'active', trend: '+8%' },
    { id: 'PRD-2023', name: 'Power Strip Surge Protector', sku: 'ELEC-023', category: 'Electronics', price: 18.00, stock: 345, status: 'active', trend: '+6%' },
    { id: 'PRD-2024', name: 'Drone Mini Camera', sku: 'ELEC-024', category: 'Electronics', price: 199.00, stock: 45, status: 'active', trend: '+15%' },
    { id: 'PRD-2025', name: 'Smart Thermostat', sku: 'ELEC-025', category: 'Electronics', price: 139.00, stock: 92, status: 'active', trend: '+12%' },

    // Clothing (25 products)
    { id: 'PRD-3001', name: 'Premium Cotton T-Shirt', sku: 'CLOT-101', category: 'Clothing', price: 19.99, stock: 120, status: 'active', trend: '+2%' },
    { id: 'PRD-3002', name: 'Slim Fit Jeans', sku: 'CLOT-102', category: 'Clothing', price: 49.99, stock: 87, status: 'active', trend: '+5%' },
    { id: 'PRD-3003', name: 'Wool Blend Sweater', sku: 'CLOT-103', category: 'Clothing', price: 59.99, stock: 65, status: 'active', trend: '+8%' },
    { id: 'PRD-3004', name: 'Casual Hoodie', sku: 'CLOT-104', category: 'Clothing', price: 39.99, stock: 134, status: 'active', trend: '+3%' },
    { id: 'PRD-3005', name: 'Summer Dress', sku: 'CLOT-105', category: 'Clothing', price: 44.99, stock: 98, status: 'active', trend: '+7%' },
    { id: 'PRD-3006', name: 'Leather Belt', sku: 'CLOT-106', category: 'Clothing', price: 24.99, stock: 176, status: 'active', trend: '+4%' },
    { id: 'PRD-3007', name: 'Sports Socks Pack', sku: 'CLOT-107', category: 'Clothing', price: 14.99, stock: 234, status: 'active', trend: '+1%' },
    { id: 'PRD-3008', name: 'Baseball Cap', sku: 'CLOT-108', category: 'Clothing', price: 17.99, stock: 189, status: 'active', trend: '+6%' },
    { id: 'PRD-3009', name: 'Denim Jacket', sku: 'CLOT-109', category: 'Clothing', price: 69.99, stock: 56, status: 'active', trend: '+9%' },
    { id: 'PRD-3010', name: 'Running Shorts', sku: 'CLOT-110', category: 'Clothing', price: 29.99, stock: 145, status: 'active', trend: '+4%' },
    { id: 'PRD-3011', name: 'Winter Jacket', sku: 'CLOT-111', category: 'Clothing', price: 89.99, stock: 43, status: 'active', trend: '+11%' },
    { id: 'PRD-3012', name: 'Silk Scarf', sku: 'CLOT-112', category: 'Clothing', price: 34.99, stock: 98, status: 'active', trend: '+7%' },
    { id: 'PRD-3013', name: 'Leather Gloves', sku: 'CLOT-113', category: 'Clothing', price: 27.99, stock: 112, status: 'active', trend: '+5%' },
    { id: 'PRD-3014', name: 'Yoga Pants', sku: 'CLOT-114', category: 'Clothing', price: 37.99, stock: 167, status: 'active', trend: '+8%' },
    { id: 'PRD-3015', name: 'Polo Shirt', sku: 'CLOT-115', category: 'Clothing', price: 32.99, stock: 134, status: 'active', trend: '+3%' },
    { id: 'PRD-3016', name: 'Linen Blazer', sku: 'CLOT-116', category: 'Clothing', price: 79.99, stock: 45, status: 'active', trend: '+10%' },
    { id: 'PRD-3017', name: 'Athletic Leggings', sku: 'CLOT-117', category: 'Clothing', price: 34.99, stock: 178, status: 'active', trend: '+6%' },
    { id: 'PRD-3018', name: 'Wool Scarf', sku: 'CLOT-118', category: 'Clothing', price: 29.99, stock: 145, status: 'active', trend: '+4%' },
    { id: 'PRD-3019', name: 'Canvas Backpack', sku: 'CLOT-119', category: 'Clothing', price: 44.99, stock: 98, status: 'active', trend: '+8%' },
    { id: 'PRD-3020', name: 'Leather Wallet', sku: 'CLOT-120', category: 'Clothing', price: 39.99, stock: 123, status: 'active', trend: '+5%' },
    { id: 'PRD-3021', name: 'Suede Loafers', sku: 'CLOT-121', category: 'Clothing', price: 54.99, stock: 67, status: 'active', trend: '+9%' },
    { id: 'PRD-3022', name: 'Cashmere Sweater', sku: 'CLOT-122', category: 'Clothing', price: 119.99, stock: 34, status: 'active', trend: '+12%' },
    { id: 'PRD-3023', name: 'Cotton Pajama Set', sku: 'CLOT-123', category: 'Clothing', price: 39.99, stock: 156, status: 'active', trend: '+3%' },
    { id: 'PRD-3024', name: 'Rain Jacket', sku: 'CLOT-124', category: 'Clothing', price: 59.99, stock: 89, status: 'active', trend: '+7%' },
    { id: 'PRD-3025', name: 'High Heels Sandals', sku: 'CLOT-125', category: 'Clothing', price: 49.99, stock: 78, status: 'active', trend: '+6%' },

    // Books (25 products)
    { id: 'PRD-4001', name: 'JavaScript: The Complete Guide', sku: 'BOOK-001', category: 'Books', price: 39.99, stock: 156, status: 'active', trend: '+8%' },
    { id: 'PRD-4002', name: 'React.js Essentials', sku: 'BOOK-002', category: 'Books', price: 34.99, stock: 123, status: 'active', trend: '+12%' },
    { id: 'PRD-4003', name: 'Node.js Backend Development', sku: 'BOOK-003', category: 'Books', price: 42.99, stock: 98, status: 'active', trend: '+15%' },
    { id: 'PRD-4004', name: 'TypeScript Mastery', sku: 'BOOK-004', category: 'Books', price: 37.99, stock: 145, status: 'active', trend: '+9%' },
    { id: 'PRD-4005', name: 'Next.js Full Stack Guide', sku: 'BOOK-005', category: 'Books', price: 44.99, stock: 87, status: 'active', trend: '+18%' },
    { id: 'PRD-4006', name: 'CSS3 Modern Design', sku: 'BOOK-006', category: 'Books', price: 29.99, stock: 178, status: 'active', trend: '+6%' },
    { id: 'PRD-4007', name: 'Python for Data Science', sku: 'BOOK-007', category: 'Books', price: 49.99, stock: 112, status: 'active', trend: '+14%' },
    { id: 'PRD-4008', name: 'AWS Cloud Architecture', sku: 'BOOK-008', category: 'Books', price: 54.99, stock: 76, status: 'active', trend: '+11%' },
    { id: 'PRD-4009', name: 'Docker & Kubernetes Guide', sku: 'BOOK-009', category: 'Books', price: 47.99, stock: 89, status: 'active', trend: '+13%' },
    { id: 'PRD-4010', name: 'GraphQL API Design', sku: 'BOOK-010', category: 'Books', price: 32.99, stock: 134, status: 'active', trend: '+7%' },
    { id: 'PRD-4011', name: 'Web Security Handbook', sku: 'BOOK-011', category: 'Books', price: 38.99, stock: 98, status: 'active', trend: '+10%' },
    { id: 'PRD-4012', name: 'Mobile App Development', sku: 'BOOK-012', category: 'Books', price: 36.99, stock: 145, status: 'active', trend: '+8%' },
    { id: 'PRD-4013', name: 'UI/UX Design Principles', sku: 'BOOK-013', category: 'Books', price: 33.99, stock: 167, status: 'active', trend: '+5%' },
    { id: 'PRD-4014', name: 'Agile Project Management', sku: 'BOOK-014', category: 'Books', price: 28.99, stock: 198, status: 'active', trend: '+4%' },
    { id: 'PRD-4015', name: 'System Design Interview', sku: 'BOOK-015', category: 'Books', price: 41.99, stock: 112, status: 'active', trend: '+16%' },
    { id: 'PRD-4016', name: 'Vue.js Complete Guide', sku: 'BOOK-016', category: 'Books', price: 35.99, stock: 134, status: 'active', trend: '+9%' },
    { id: 'PRD-4017', name: 'Angular Development', sku: 'BOOK-017', category: 'Books', price: 38.99, stock: 98, status: 'active', trend: '+11%' },
    { id: 'PRD-4018', name: 'Svelte Framework', sku: 'BOOK-018', category: 'Books', price: 31.99, stock: 145, status: 'active', trend: '+7%' },
    { id: 'PRD-4019', name: 'Machine Learning Basics', sku: 'BOOK-019', category: 'Books', price: 46.99, stock: 89, status: 'active', trend: '+14%' },
    { id: 'PRD-4020', name: 'Deep Learning Advanced', sku: 'BOOK-020', category: 'Books', price: 52.99, stock: 67, status: 'active', trend: '+17%' },
    { id: 'PRD-4021', name: 'DevOps Handbook', sku: 'BOOK-021', category: 'Books', price: 40.99, stock: 123, status: 'active', trend: '+10%' },
    { id: 'PRD-4022', name: 'Blockchain Development', sku: 'BOOK-022', category: 'Books', price: 43.99, stock: 78, status: 'active', trend: '+13%' },
    { id: 'PRD-4023', name: 'Flutter Mobile Apps', sku: 'BOOK-023', category: 'Books', price: 37.99, stock: 112, status: 'active', trend: '+8%' },
    { id: 'PRD-4024', name: 'React Native Guide', sku: 'BOOK-024', category: 'Books', price: 39.99, stock: 145, status: 'active', trend: '+12%' },
    { id: 'PRD-4025', name: 'Clean Code Principles', sku: 'BOOK-025', category: 'Books', price: 34.99, stock: 189, status: 'active', trend: '+6%' },

    // Home & Garden (20 products)
    { id: 'PRD-5001', name: 'Indoor Plant Pot Set', sku: 'HOME-001', category: 'Home & Garden', price: 24.99, stock: 234, status: 'active', trend: '+8%' },
    { id: 'PRD-5002', name: 'Garden Tool Kit', sku: 'HOME-002', category: 'Home & Garden', price: 39.99, stock: 156, status: 'active', trend: '+5%' },
    { id: 'PRD-5003', name: 'LED Desk Lamp', sku: 'HOME-003', category: 'Home & Garden', price: 29.99, stock: 198, status: 'active', trend: '+11%' },
    { id: 'PRD-5004', name: 'Throw Pillows Set', sku: 'HOME-004', category: 'Home & Garden', price: 34.99, stock: 167, status: 'active', trend: '+6%' },
    { id: 'PRD-5005', name: 'Wall Clock Modern', sku: 'HOME-005', category: 'Home & Garden', price: 19.99, stock: 289, status: 'active', trend: '+4%' },
    { id: 'PRD-5006', name: 'Bamboo Cutting Board', sku: 'HOME-006', category: 'Home & Garden', price: 15.99, stock: 345, status: 'active', trend: '+7%' },
    { id: 'PRD-5007', name: 'Scented Candle Pack', sku: 'HOME-007', category: 'Home & Garden', price: 12.99, stock: 456, status: 'active', trend: '+3%' },
    { id: 'PRD-5008', name: 'Storage Basket Set', sku: 'HOME-008', category: 'Home & Garden', price: 27.99, stock: 178, status: 'active', trend: '+9%' },
    { id: 'PRD-5009', name: 'Garden Hose 50ft', sku: 'HOME-009', category: 'Home & Garden', price: 32.99, stock: 123, status: 'active', trend: '+6%' },
    { id: 'PRD-5010', name: 'Outdoor Chair Cushion', sku: 'HOME-010', category: 'Home & Garden', price: 22.99, stock: 145, status: 'active', trend: '+5%' },
    { id: 'PRD-5011', name: 'Table Vase Set', sku: 'HOME-011', category: 'Home & Garden', price: 18.99, stock: 234, status: 'active', trend: '+4%' },
    { id: 'PRD-5012', name: 'Picture Frame Collection', sku: 'HOME-012', category: 'Home & Garden', price: 25.99, stock: 167, status: 'active', trend: '+8%' },
    { id: 'PRD-5013', name: 'Bathroom Mat Set', sku: 'HOME-013', category: 'Home & Garden', price: 21.99, stock: 289, status: 'active', trend: '+3%' },
    { id: 'PRD-5014', name: 'Kitchen Organizer', sku: 'HOME-014', category: 'Home & Garden', price: 16.99, stock: 312, status: 'active', trend: '+7%' },
    { id: 'PRD-5015', name: 'Plant Stand Wood', sku: 'HOME-015', category: 'Home & Garden', price: 44.99, stock: 98, status: 'active', trend: '+10%' },
    { id: 'PRD-5016', name: 'Outdoor String Lights', sku: 'HOME-016', category: 'Home & Garden', price: 19.99, stock: 267, status: 'active', trend: '+9%' },
    { id: 'PRD-5017', name: 'Throw Blanket Soft', sku: 'HOME-017', category: 'Home & Garden', price: 29.99, stock: 189, status: 'active', trend: '+5%' },
    { id: 'PRD-5018', name: 'Herb Garden Kit', sku: 'HOME-018', category: 'Home & Garden', price: 14.99, stock: 345, status: 'active', trend: '+11%' },
    { id: 'PRD-5019', name: 'Wall Shelf Set', sku: 'HOME-019', category: 'Home & Garden', price: 26.99, stock: 156, status: 'active', trend: '+6%' },
    { id: 'PRD-5020', name: 'Door Mat Welcome', sku: 'HOME-020', category: 'Home & Garden', price: 17.99, stock: 234, status: 'active', trend: '+4%' },

    // Sports (20 products)
    { id: 'PRD-6001', name: 'Yoga Mat Premium', sku: 'SPRT-001', category: 'Sports', price: 29.99, stock: 234, status: 'active', trend: '+9%' },
    { id: 'PRD-6002', name: 'Dumbbell Set 20lb', sku: 'SPRT-002', category: 'Sports', price: 79.99, stock: 123, status: 'active', trend: '+12%' },
    { id: 'PRD-6003', name: 'Resistance Bands Kit', sku: 'SPRT-003', category: 'Sports', price: 19.99, stock: 289, status: 'active', trend: '+7%' },
    { id: 'PRD-6004', name: 'Running Shoes Pro', sku: 'SPRT-004', category: 'Sports', price: 119.99, stock: 87, status: 'active', trend: '+15%' },
    { id: 'PRD-6005', name: 'Tennis Racket Carbon', sku: 'SPRT-005', category: 'Sports', price: 89.99, stock: 67, status: 'active', trend: '+8%' },
    { id: 'PRD-6006', name: 'Basketball Indoor', sku: 'SPRT-006', category: 'Sports', price: 24.99, stock: 178, status: 'active', trend: '+5%' },
    { id: 'PRD-6007', name: 'Cycling Helmet', sku: 'SPRT-007', category: 'Sports', price: 44.99, stock: 145, status: 'active', trend: '+11%' },
    { id: 'PRD-6008', name: 'Swimming Goggles Pro', sku: 'SPRT-008', category: 'Sports', price: 14.99, stock: 267, status: 'active', trend: '+4%' },
    { id: 'PRD-6009', name: 'Fitness Tracker Watch', sku: 'SPRT-009', category: 'Sports', price: 69.99, stock: 98, status: 'active', trend: '+14%' },
    { id: 'PRD-6010', name: 'Foam Roller Set', sku: 'SPRT-010', category: 'Sports', price: 22.99, stock: 189, status: 'active', trend: '+6%' },
    { id: 'PRD-6011', name: 'Gym Bag Duffle', sku: 'SPRT-011', category: 'Sports', price: 34.99, stock: 156, status: 'active', trend: '+8%' },
    { id: 'PRD-6012', name: 'Jump Rope Speed', sku: 'SPRT-012', category: 'Sports', price: 9.99, stock: 345, status: 'active', trend: '+3%' },
    { id: 'PRD-6013', name: 'Boxing Gloves Leather', sku: 'SPRT-013', category: 'Sports', price: 49.99, stock: 112, status: 'active', trend: '+10%' },
    { id: 'PRD-6014', name: 'Golf Club Set', sku: 'SPRT-014', category: 'Sports', price: 299.99, stock: 34, status: 'active', trend: '+18%' },
    { id: 'PRD-6015', name: 'Soccer Ball Match', sku: 'SPRT-015', category: 'Sports', price: 27.99, stock: 167, status: 'active', trend: '+7%' },
    { id: 'PRD-6016', name: 'Baseball Bat Aluminum', sku: 'SPRT-016', category: 'Sports', price: 39.99, stock: 134, status: 'active', trend: '+5%' },
    { id: 'PRD-6017', name: 'Hiking Backpack 40L', sku: 'SPRT-017', category: 'Sports', price: 64.99, stock: 89, status: 'active', trend: '+12%' },
    { id: 'PRD-6018', name: 'Tennis Balls 3-Pack', sku: 'SPRT-018', category: 'Sports', price: 8.99, stock: 456, status: 'active', trend: '+2%' },
    { id: 'PRD-6019', name: 'Badminton Racket Set', sku: 'SPRT-019', category: 'Sports', price: 29.99, stock: 198, status: 'active', trend: '+6%' },
    { id: 'PRD-6020', name: 'Water Bottle Steel', sku: 'SPRT-020', category: 'Sports', price: 16.99, stock: 312, status: 'active', trend: '+9%' },
];

// Category icons mapping
const categoryIcons: Record<string, string> = {
    'All': '🏷️',
    'Subscriptions': '📦',
    'Addons': '🧩',
    'Electronics': '📱',
    'Clothing': '👕',
    'Books': '📚',
    'Home & Garden': '🏡',
    'Sports': '⚽',
};

// Products per page for infinite scroll
const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);

    const categories = ['All', ...new Set(allProductsData.map((p) => p.category))];

    // Filter products based on search and category
    const filteredProducts = allProductsData.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Load more products
    const loadMoreProducts = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);

        // Simulate network delay for realistic pagination
        setTimeout(() => {
            const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
            const endIndex = startIndex + PRODUCTS_PER_PAGE;
            const newProducts = filteredProducts.slice(startIndex, endIndex);

            if (newProducts.length > 0) {
                setDisplayedProducts(prev => {
                    const existingIds = new Set(prev.map(p => p.id));
                    const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
                    return [...prev, ...uniqueNewProducts];
                });
                setPage(prev => prev + 1);
            }

            if (endIndex >= filteredProducts.length) {
                setHasMore(false);
            }

            setLoading(false);
        }, 500);
    }, [filteredProducts, page, loading, hasMore]);

    // Reset and load initial products when filters change
    useEffect(() => {
        setDisplayedProducts([]);
        setPage(1);
        setHasMore(true);
        setIsInitialLoad(true);

        // Initial load
        const initialProducts = filteredProducts.slice(0, PRODUCTS_PER_PAGE);
        setDisplayedProducts(initialProducts);

        if (filteredProducts.length > PRODUCTS_PER_PAGE) {
            setPage(2);
        } else {
            setHasMore(false);
        }

        setIsInitialLoad(false);
    }, [searchTerm, categoryFilter]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && !isInitialLoad) {
                    loadMoreProducts();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [loadMoreProducts, hasMore, loading, isInitialLoad]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div className="relative">
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-secondary to-gray-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent mb-2">
                                Our Products
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Browse our collection of {filteredProducts.length} premium products
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-secondary">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary shadow-sm hover:shadow-md transition-all duration-200"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setCategoryFilter(category)}
                                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${categoryFilter === category
                                    ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-md'
                                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <span className="text-lg">{categoryIcons[category] || '📦'}</span>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Info */}
                {searchTerm && (
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            No products match your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('All');
                            }}
                            className="text-secondary hover:text-secondary/80 font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayedProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Loading / Load More Indicator */}
                        <div ref={loaderRef} className="mt-8 text-center">
                            {loading && (
                                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Loading more products...</span>
                                </div>
                            )}
                            {!hasMore && displayedProducts.length > 0 && (
                                <p className="text-gray-500 dark:text-gray-400">
                                    You've reached the end! Showing all {filteredProducts.length} products.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

