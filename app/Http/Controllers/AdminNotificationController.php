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

        // Decode JSON data
        $data = json_decode($notification->data, true);


        // Apply the change based on type
        switch($notification->type) {
            case 'Name Change':
                $notification->user->update(['name' => $data['new_name']]);
                break;
            case 'Email Change':
                $notification->user->update([
                    'email' => $data['new_email'],
                    'email_verified_at' => null
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
