'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A simple pie chart';

const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'var(--chart-1)',
    },
    safari: {
        label: 'Safari',
        color: 'var(--chart-2)',
    },
    firefox: {
        label: 'Firefox',
        color: 'var(--chart-3)',
    },
    edge: {
        label: 'Edge',
        color: 'var(--chart-4)',
    },
    other: {
        label: 'Other',
        color: 'var(--chart-5)',
    },
} satisfies ChartConfig;

interface ChartPieSimpleProps {
    data: Array<{
        name: string;
        value: number;
        color?: string;
        }>;
}

export function ChartPieSimple({ data }: ChartPieSimpleProps) {
    // Transform your data to the format the chart expects
    const chartData = data.map((item, index) => ({
        browser: item.name,
        visitors: item.value,
        fill: item.color || `var(--chart-${(index % 5) + 1})`
    }));

    // Create dynamic chart config based on your data
    const chartConfig = {
        visitors: {
            label: 'Amount',
        },
        ...data.reduce((acc, item, index) => ({
            ...acc,
            [item.name.toLowerCase().replace(/\s+/g, '_')]: {
                label: item.name,
                color: `var(--chart-${(index % 5) + 1})`,
            }
        }), {})
    } satisfies ChartConfig;

    return (
        <div className="flex h-full w-full flex-col p-4">
            <div className="mb-2 text-center">
                <h3 className="text-lg font-semibold">Income Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                    Current Month
                </p>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square h-80 w-80"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                        />
                    </PieChart>
                </ChartContainer>
            </div>
        </div>
    );
}
