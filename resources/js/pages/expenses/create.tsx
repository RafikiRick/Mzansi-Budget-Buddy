import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expense',
        href: '/expense',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title=" Add Expense Statement" />
            <div className="w-8/12 p-4">
                <form action="" className="space-y-4">
                    <div className="gap-1.5">
                        <Label htmlFor="expense source">Expense Source</Label>
                        <Input placeholder="expense Source"></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="expense amount">Expense amount</Label>
                        <Input placeholder="Expense Amount - R 00,00"></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="expense descriptionDescription">Expense Description</Label>
                        <Textarea placeholder="expense Description"></Textarea>
                    </div>
                    <Button type="submit">Add expense</Button>
                </form>
            </div>
        </AppLayout>
    );
}
