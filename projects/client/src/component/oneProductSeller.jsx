import React from 'react';

function ProductDetailsSeller({ product }) {
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`bg-white w-full h-auto flex flex-col text-jetblack p-10 sm:w-full flex-1`}>
            <div className={`w-full ${product.isActive ? "" : "opacity-40"}`}>
                <img
                    className="w-60 h-60 justify-center mx-auto m-2 object-cover"
                    src={product.imgProduct ? `http://localhost:8000${product.imgProduct}` : undefined}
                    alt={product.name || "/"}
                />
            </div>
            <div className="flex flex-col text-center gap-4 mt-4">
                <div className="flex-1 font-lora text-2xl">
                    {product.name}
                </div>
                <div className="font-josefin text-lg">
                    {product.description}
                </div>
                <div className={`font-josefin text-lg font-bold`}>
                    {product.isActive ? "Active" : "Inactive"}
                </div>
                <div className="font-josefin text-lg">
                <span className="font-bold">Category:</span>{product.category ? product.category.name : ""}
                </div>
                <div className="font-josefin text-lg">
                    Sold by: {product.seller ? product.seller.store : ""}
                </div>
                <div className="font-lora mx-auto mt-6 h-full grow-0 w-64">
                    <table className="mx-auto">
                        <tbody>
                            <tr>
                                <td className="border-r-2 border-gray-200 px-4  text-lg">{product.price}</td>
                                <td className="px-4 text-lg">{product.stock}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsSeller;
