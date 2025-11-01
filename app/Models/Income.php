<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Income extends Model
{
    protected $fillable = ['amount', 'title', 'source', 'date', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
