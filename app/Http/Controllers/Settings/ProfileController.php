<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'flash' => [ // Add this
                'success' => $request->session()->get('success')
            ]
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $originalName = $user->name;
        $originalEmail = $user->email;

        // Fill the model
        $user->fill($request->validated());

        $hasChanges = false;

        // Check what actually changed
        if ($user->isDirty('name')) {
            $user->notifications()
                ->where('type', 'Name Change')
                ->where('status', 'pending')
                ->delete();

            $user->notifications()->create([
                'type' => 'Name Change',
                'status' => 'pending',
                'data' => json_encode([
                    'old_name' => $originalName,
                    'new_name' => $request->name
                ])
            ]);
            // Revert the change
            $user->name = $originalName;
            $hasChanges = true;
        }

        if ($user->isDirty('email')) {
            $user->notifications()
                ->where('type', 'Email Change')
                ->where('status', 'pending')
                ->delete();


            $user->notifications()->create([
                'type' => 'Email Change',
                'status' => 'pending',
                'data' => json_encode([
                    'old_email' => $originalEmail,
                    'new_email' => $request->email
                ])
            ]);
            // Revert the change
            $user->email = $originalEmail;
            $hasChanges = true;
        }

        if ($hasChanges) {
            // Don't save - changes were reverted
            return to_route('profile.edit')->with('success', 'Changes submitted for admin approval');
        }

        // Only save if no changes needed approval (normal non-name/email changes)
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
