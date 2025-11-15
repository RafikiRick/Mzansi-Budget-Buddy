<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info('AdminMiddleware triggered for user: ' . auth()->user()->email);
        \Log::info('User is_admin: ' . auth()->user()->is_admin);
        if(!auth()->check() || !auth()->user()->is_admin){
            \Log::info('AdminMiddleware: Access denied');
                abort(403, 'Unauthorized access.');
            }
        \Log::info('AdminMiddleware: Access granted');
        return $next($request);
    }
}
