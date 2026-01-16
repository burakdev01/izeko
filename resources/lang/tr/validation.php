<?php

return [
    'required' => ':attribute alanı zorunludur.',
    'string' => ':attribute alanı metin olmalıdır.',
    'max' => [
        'string' => ':attribute en fazla :max karakter olmalıdır.',
        'numeric' => ':attribute en fazla :max olmalıdır.',
        'file' => ':attribute en fazla :max kilobayt olmalıdır.',
        'array' => ':attribute en fazla :max öğe içerebilir.',
    ],
    'min' => [
        'string' => ':attribute en az :min karakter olmalıdır.',
        'numeric' => ':attribute en az :min olmalıdır.',
        'file' => ':attribute en az :min kilobayt olmalıdır.',
        'array' => ':attribute en az :min öğe içermelidir.',
    ],
    'url' => ':attribute geçerli bir URL olmalıdır.',
    'image' => ':attribute bir görsel olmalıdır.',
    'date' => ':attribute geçerli bir tarih olmalıdır.',
    'integer' => ':attribute bir tam sayı olmalıdır.',
    'boolean' => ':attribute alanı doğru/yanlış olmalıdır.',
    'required_without' => ':attribute alanı :values yoksa zorunludur.',
    'required_without_all' => ':attribute alanı :values yoksa zorunludur.',

    'attributes' => [
        'title' => 'Başlık',
        'subtitle' => 'Alt başlık',
        'excerpt' => 'Özet',
        'content' => 'İçerik',
        'image' => 'Görsel',
        'image_file' => 'Görsel',
        'thumbnail' => 'Kapak görseli',
        'thumbnail_file' => 'Kapak görseli',
        'video_url' => 'Video URL',
        'link' => 'Bağlantı',
        'seo_title' => 'SEO başlığı',
        'seo_description' => 'SEO açıklaması',
        'seo_url' => 'SEO URL',
        'active' => 'Durum',
    ],
];
