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
            <Head title=" Add Income Statement" />
            <div className="w-8/12 p-4">
                <form action="" className="space-y-4">
                    <div className="gap-1.5">
                        <Label htmlFor="income source">Income Source</Label>
                        <Input placeholder="Income Source"></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="income amount">Income amount</Label>
                        <Input placeholder="Income Amount - R 00,00"></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="income description">Income Description</Label>
                        <Textarea placeholder="Income Description"></Textarea>
                    </div>
                    <Button type="submit">Add Income</Button>
                </form>
            </div>
        </AppLayout>
    );
}
