import React from 'react';
import { Card,Empty } from 'antd';

function ComingSoon() {
    return (
        <div className="p-30">
            <Card className="">
                <div className="coming-soon">
                    <Empty />
                    <h2 className="mt-20">Coming Soon :///</h2>
                </div>
            </Card>
        </div>
    );
}

export default ComingSoon;