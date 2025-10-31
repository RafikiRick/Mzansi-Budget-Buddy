
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Price Comparison',
        href: '/price_comparisons',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />
            <div className="m-4">
                Hello Price Comparison!

                {/*
                    Thinking of this being like a user can see the prices of items the typically buy.
                    So for example what would the following users typically buy per month - per common store.
                    Common Store Examples [
                        Dischem, Clicks, Woolworth, Food Lovers, Pick N Pay,
                        Checkers, Spar, Sasol, Shell, Engen, Incredible Connections,
                        Virgin Active, Planet Fitness, Vibe,
                        Kuai, Pauls Ice Cream, Hagen Daaz, Cartier "Other Fancy Stores"
                        ]
                    This could probably be broken down to 5 - 7 options per category.
                    Say the Store Categories could be for example [
                        Clothing, Food, Petrol, Medicine, School, Self-Care (Hygene Gym), Entertainment
                        ] Can get this answer from AI
                    Answer - ????
                    The user would then have these be easily selectable expenses, and thus they would form price comparisons

                    For the sake of Dummy Data for Presentation ( 5 Typical Users, then 5 users per user category)

                    Suggestions:
                        - Page Shows users commons stores and specials at each and comparisons between items.
                          The same item they buy at each store.
                        - Iteration, factor in petrol as travel based on distances between stores at say 3 shopping centers in a 10Km radius (Data Science)

                */}
            </div>
        </AppLayout>
    );
}
