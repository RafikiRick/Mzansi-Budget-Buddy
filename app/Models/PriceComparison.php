<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PriceComparison extends Model
{
    use HasFactory;
    protected $fillable = [
        'product',
        'store',
        'category',
        'price',
        'is_best_deal',
        'user_id'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
