<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Simulated weather API call (replace with actual API implementation)
$weather = [
    'temp' => rand(10, 35),
    'condition' => ['Sunny', 'Rainy', 'Cloudy'][rand(0, 2)]
];

// Base packing list
$packingList = [
    'Passport',
    'Phone Charger',
    'Toothbrush',
    'Underwear',
    'Socks'
];

// Weather-based items
if ($weather['temp'] < 15) {
    array_push($packingList, 'Jacket', 'Scarf');
} else {
    array_push($packingList, 'Sunscreen', 'Hat');
}

if ($weather['condition'] === 'Rainy') {
    array_push($packingList, 'Umbrella', 'Waterproof Shoes');
}

// Gender-specific items
if ($data['gender'] === 'female') {
    array_push($packingList, 'Hair Dryer', 'Makeup Kit');
} elseif ($data['gender'] === 'male') {
    array_push($packingList, 'Razor', 'Shaving Cream');
}

// Duration-based items
$days = (strtotime($data['endDate']) - strtotime($data['startDate'])) / (60 * 60 * 24);
if ($days > 7) {
    array_push($packingList, 'Laundry Bag', 'Travel Detergent');
}

echo json_encode($packingList);
?>