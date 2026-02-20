import React from 'react';
import LiveRanking from './LiveRanking';
import AnalyticsPanel from './AnalyticsPanel';

const RankingSection = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-6 py-24">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
                <LiveRanking />
                <AnalyticsPanel />
            </div>
        </section>
    );
};

export default RankingSection;
