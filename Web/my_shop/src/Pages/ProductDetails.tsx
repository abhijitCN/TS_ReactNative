import React from 'react';

export default function ProductDetails() {
    return (
        <div>
            <div className="flex">
                <div>image</div>
                <div>
                    <div>price</div>
                    <h1>short dec</h1>
                    <p>long dec</p>
                    <h1>Select Color</h1>
                    <div className="flex">
                        <div>red</div>
                        <div>green</div>
                    </div>
                    <p>long dec</p>
                </div>
            </div>
            <div className="flex">
                <div>image scroll</div>
                <div>select specification</div>
            </div>
            <div className="flex">
                <div>
                    <div>base 1</div>
                    <div>bass 2</div>
                </div>
                <div>add to cart</div>
                <div>add to favorite</div>
            </div>
        </div>
    );
}
