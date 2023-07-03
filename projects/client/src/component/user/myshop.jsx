import React from "react";
import { useState } from "react";
import { BsBoxFill } from "react-icons/bs"
import { ImBoxAdd } from "react-icons/im"
import { FaCashRegister, FaListAlt } from "react-icons/fa"
import ShopProduct from "./shopProduct";
import ShopNew from "./shopNew";
import ShopIncome from "./shopIncome";
import ShopCategory from "./shopCategory";

export default function MyShop() {
    const [activeTab, setActiveTab] = useState('product');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="mx-5">
            <div className="my-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                    className="flex flex-wrap -mb-px text-sm font-josefin text-center"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                >
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block px-4 py-2 border-b-2 h-9 ${activeTab === 'product' ? 'border-jetblack' : 'border-transparent'
                                }`}
                            id="product-tab"
                            data-tabs-target="#product"
                            type="button"
                            role="tab"
                            aria-controls="product"
                            aria-selected={activeTab === 'product' ? 'true' : 'false'}
                            onClick={() => handleTabClick('product')}
                        >
                            <span className="hidden sm:inline-block">
                                My Product
                            </span>
                            <span className="text-darkgreen sm:hidden">
                                <BsBoxFill size={15} />
                            </span>
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block px-4 py-2 border-b-2 h-9 ${activeTab === 'new' ? 'border-jetblack' : 'border-transparent'
                                }`}
                            id="new-tab"
                            data-tabs-target="#new"
                            type="button"
                            role="tab"
                            aria-controls="new"
                            aria-selected={activeTab === 'new' ? 'true' : 'false'}
                            onClick={() => handleTabClick('new')}
                        >
                            <span className="hidden sm:inline-block">
                                Create Product
                            </span>
                            <span className="text-darkgreen sm:hidden">
                                <ImBoxAdd size={15} />
                            </span>
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block px-4 py-2 border-b-2 h-9 ${activeTab === 'income' ? 'border-jetblack' : 'border-transparent'
                                }`}
                            id="income-tab"
                            data-tabs-target="#income"
                            type="button"
                            role="tab"
                            aria-controls="income"
                            aria-selected={activeTab === 'income' ? 'true' : 'false'}
                            onClick={() => handleTabClick('income')}
                        >
                            <span className="hidden sm:inline-block">
                                My Income
                            </span>
                            <span className="text-darkgreen sm:hidden">
                                <FaCashRegister size={15} />
                            </span>
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block px-4 py-2 border-b-2 h-9 ${activeTab === 'category' ? 'border-jetblack' : 'border-transparent'
                                }`}
                            id="category-tab"
                            data-tabs-target="#category"
                            type="button"
                            role="tab"
                            aria-controls="category"
                            aria-selected={activeTab === 'category' ? 'true' : 'false'}
                            onClick={() => handleTabClick('category')}
                        >
                            <span className="hidden sm:inline-block">
                                My Category
                            </span>
                            <span className="text-darkgreen sm:hidden">
                                <FaListAlt size={15} />
                            </span>
                        </button>
                    </li>
                </ul>
                <div id="myTabContent">
                    <div
                        className={`m-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'product' ? 'block' : 'hidden'
                            }`}
                        id="product"
                        role="tabpanel"
                        aria-labelledby="product-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <ShopProduct />
                        </p>
                    </div>
                    <div
                        className={`m-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'new' ? 'block' : 'hidden'
                            }`}
                        id="new"
                        role="tabpanel"
                        aria-labelledby="new-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <ShopNew />
                        </p>
                    </div>
                    <div
                        className={`m-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'income' ? 'block' : 'hidden'
                            }`}
                        id="income"
                        role="tabpanel"
                        aria-labelledby="income-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <ShopIncome />
                        </p>
                    </div>
                    <div
                        className={`m-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'category' ? 'block' : 'hidden'
                            }`}
                        id="category"
                        role="tabpanel"
                        aria-labelledby="category-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <ShopCategory />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}