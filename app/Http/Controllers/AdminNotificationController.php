<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminNotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with('user')
            ->latest()
            ->get();

        return Inertia::render('admin/user-management/index', compact('notifications'));
    }

    public function approve($id)
    {
        $notification = Notification::with('user')->findOrFail($id);

        // Apply the change based on type
        switch($notification->type) {
            case 'Name Change':
                $notification->user->update(['name' => $notification->data['new_name']]);
                break;
            case 'Email Change':
                $notification->user->update([
                    'email' => $notification->data['new_email'],
                    'email_verified_at' => null // Require re-verification
                ]);
                break;
        }

        $notification->update(['status' => 'approved']);

        return back()->with('success', 'Change approved');
    }

    public function deny($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['status' => 'denied']);

        return back()->with('success', 'Change denied');
    }
}
