import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income',
        href: '/income',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title=" Add Savings Goal" />
            <div className="w-8/12 p-4">
                <form action="" className="space-y-4">
                    <div className="gap-1.5">
                        <Label htmlFor="savings goal">Savings Goal Title</Label>
                        <Input placeholder="Savings Goal Title"></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="savings goal amount">Savings Goal Amount</Label>
                        <Input placeholder="Savings Goal Amount - R 00,00"></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="savings goal description">Savings Goal Description</Label>
                        <Textarea placeholder="Savings Goal Description"></Textarea>
                    </div>
                    <Button type="submit">Add Income</Button>
                </form>
            </div>
        </AppLayout>
    );
}
