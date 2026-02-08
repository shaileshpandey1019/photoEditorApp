/**
 * Sticker System - Photo Collage Maker
 * 200 stickers across 5 categories with pro/free classification
 */

export type StickerCategory = 'emoji' | 'love' | 'travel' | 'birthday' | 'wedding';

export interface Sticker {
  id: string;
  name: string;
  category: StickerCategory;
  assetPath: string;
  isPremium: boolean;
  tags?: string[];
}

// ============================================
// EMOJI STICKERS (40 stickers: 8 free, 32 pro)
// ============================================
export const emojiStickers: Sticker[] = [
  // Free emojis (8)
  { id: 'emoji-001', name: 'Smile', category: 'emoji', assetPath: 'assets/stickers/emoji/smile.png', isPremium: false, tags: ['happy', 'face'] },
  { id: 'emoji-002', name: 'Heart Eyes', category: 'emoji', assetPath: 'assets/stickers/emoji/heart-eyes.png', isPremium: false, tags: ['love', 'face'] },
  { id: 'emoji-003', name: 'Fire', category: 'emoji', assetPath: 'assets/stickers/emoji/fire.png', isPremium: false, tags: ['hot', 'cool'] },
  { id: 'emoji-004', name: 'Star', category: 'emoji', assetPath: 'assets/stickers/emoji/star.png', isPremium: false, tags: ['sparkle', 'shine'] },
  { id: 'emoji-005', name: 'Thumbs Up', category: 'emoji', assetPath: 'assets/stickers/emoji/thumbs-up.png', isPremium: false, tags: ['like', 'approve'] },
  { id: 'emoji-006', name: 'Peace', category: 'emoji', assetPath: 'assets/stickers/emoji/peace.png', isPremium: false, tags: ['chill', 'victory'] },
  { id: 'emoji-007', name: 'Laughing', category: 'emoji', assetPath: 'assets/stickers/emoji/laughing.png', isPremium: false, tags: ['funny', 'lol'] },
  { id: 'emoji-008', name: 'Wink', category: 'emoji', assetPath: 'assets/stickers/emoji/wink.png', isPremium: false, tags: ['flirty', 'playful'] },
  
  // Premium emojis (32)
  { id: 'emoji-009', name: 'Rainbow', category: 'emoji', assetPath: 'assets/stickers/emoji/rainbow.png', isPremium: true, tags: ['color', 'pride'] },
  { id: 'emoji-010', name: 'Sparkles', category: 'emoji', assetPath: 'assets/stickers/emoji/sparkles.png', isPremium: true, tags: ['magic', 'shine'] },
  { id: 'emoji-011', name: 'Glowing Star', category: 'emoji', assetPath: 'assets/stickers/emoji/glowing-star.png', isPremium: true, tags: ['bright', 'star'] },
  { id: 'emoji-012', name: 'Rocket', category: 'emoji', assetPath: 'assets/stickers/emoji/rocket.png', isPremium: true, tags: ['space', 'launch'] },
  { id: 'emoji-013', name: 'Party Popper', category: 'emoji', assetPath: 'assets/stickers/emoji/party-popper.png', isPremium: true, tags: ['celebration', 'fun'] },
  { id: 'emoji-014', name: 'Confetti', category: 'emoji', assetPath: 'assets/stickers/emoji/confetti.png', isPremium: true, tags: ['celebration', 'party'] },
  { id: 'emoji-015', name: 'Tada', category: 'emoji', assetPath: 'assets/stickers/emoji/tada.png', isPremium: true, tags: ['celebration', 'excitement'] },
  { id: 'emoji-016', name: 'Clapping', category: 'emoji', assetPath: 'assets/stickers/emoji/clapping.png', isPremium: true, tags: ['applause', 'praise'] },
  { id: 'emoji-017', name: 'Raised Hands', category: 'emoji', assetPath: 'assets/stickers/emoji/raised-hands.png', isPremium: true, tags: ['celebration', 'praise'] },
  { id: 'emoji-018', name: 'Sunglasses', category: 'emoji', assetPath: 'assets/stickers/emoji/sunglasses.png', isPremium: true, tags: ['cool', 'summer'] },
  { id: 'emoji-019', name: 'Crown', category: 'emoji', assetPath: 'assets/stickers/emoji/crown.png', isPremium: true, tags: ['royal', 'king'] },
  { id: 'emoji-020', name: 'Gem', category: 'emoji', assetPath: 'assets/stickers/emoji/gem.png', isPremium: true, tags: ['precious', 'sparkle'] },
  { id: 'emoji-021', name: 'Money Bag', category: 'emoji', assetPath: 'assets/stickers/emoji/money-bag.png', isPremium: true, tags: ['rich', 'wealth'] },
  { id: 'emoji-022', name: 'Dollar', category: 'emoji', assetPath: 'assets/stickers/emoji/dollar.png', isPremium: true, tags: ['money', 'cash'] },
  { id: 'emoji-023', name: '100', category: 'emoji', assetPath: 'assets/stickers/emoji/100.png', isPremium: true, tags: ['perfect', 'score'] },
  { id: 'emoji-024', name: 'Trophy', category: 'emoji', assetPath: 'assets/stickers/emoji/trophy.png', isPremium: true, tags: ['winner', 'award'] },
  { id: 'emoji-025', name: 'Medal', category: 'emoji', assetPath: 'assets/stickers/emoji/medal.png', isPremium: true, tags: ['award', 'achievement'] },
  { id: 'emoji-026', name: 'First Place', category: 'emoji', assetPath: 'assets/stickers/emoji/first-place.png', isPremium: true, tags: ['winner', 'gold'] },
  { id: 'emoji-027', name: 'Muscle', category: 'emoji', assetPath: 'assets/stickers/emoji/muscle.png', isPremium: true, tags: ['strong', 'fitness'] },
  { id: 'emoji-028', name: 'Flexed Biceps', category: 'emoji', assetPath: 'assets/stickers/emoji/flexed-biceps.png', isPremium: true, tags: ['strong', 'gym'] },
  { id: 'emoji-029', name: 'Brain', category: 'emoji', assetPath: 'assets/stickers/emoji/brain.png', isPremium: true, tags: ['smart', 'genius'] },
  { id: 'emoji-030', name: 'Light Bulb', category: 'emoji', assetPath: 'assets/stickers/emoji/light-bulb.png', isPremium: true, tags: ['idea', 'bright'] },
  { id: 'emoji-031', name: 'Eyes', category: 'emoji', assetPath: 'assets/stickers/emoji/eyes.png', isPremium: true, tags: ['looking', 'watch'] },
  { id: 'emoji-032', name: 'Ghost', category: 'emoji', assetPath: 'assets/stickers/emoji/ghost.png', isPremium: true, tags: ['halloween', 'spooky'] },
  { id: 'emoji-033', name: 'Alien', category: 'emoji', assetPath: 'assets/stickers/emoji/alien.png', isPremium: true, tags: ['space', 'ufo'] },
  { id: 'emoji-034', name: 'Robot', category: 'emoji', assetPath: 'assets/stickers/emoji/robot.png', isPremium: true, tags: ['tech', 'ai'] },
  { id: 'emoji-035', name: 'Pirate', category: 'emoji', assetPath: 'assets/stickers/emoji/pirate.png', isPremium: true, tags: ['adventure', 'ship'] },
  { id: 'emoji-036', name: 'Ninja', category: 'emoji', assetPath: 'assets/stickers/emoji/ninja.png', isPremium: true, tags: ['stealth', 'warrior'] },
  { id: 'emoji-037', name: 'Superhero', category: 'emoji', assetPath: 'assets/stickers/emoji/superhero.png', isPremium: true, tags: ['hero', 'power'] },
  { id: 'emoji-038', name: 'Zombie', category: 'emoji', assetPath: 'assets/stickers/emoji/zombie.png', isPremium: true, tags: ['undead', 'scary'] },
  { id: 'emoji-039', name: 'Dragon', category: 'emoji', assetPath: 'assets/stickers/emoji/dragon.png', isPremium: true, tags: ['mythical', 'fire'] },
  { id: 'emoji-040', name: 'Unicorn', category: 'emoji', assetPath: 'assets/stickers/emoji/unicorn.png', isPremium: true, tags: ['magical', 'fantasy'] },
];

// ============================================
// LOVE STICKERS (40 stickers: 8 free, 32 pro)
// ============================================
export const loveStickers: Sticker[] = [
  // Free love stickers (8)
  { id: 'love-001', name: 'Red Heart', category: 'love', assetPath: 'assets/stickers/love/red-heart.png', isPremium: false, tags: ['love', 'romance'] },
  { id: 'love-002', name: 'Pink Heart', category: 'love', assetPath: 'assets/stickers/love/pink-heart.png', isPremium: false, tags: ['love', 'cute'] },
  { id: 'love-003', name: 'Broken Heart', category: 'love', assetPath: 'assets/stickers/love/broken-heart.png', isPremium: false, tags: ['sad', 'breakup'] },
  { id: 'love-004', name: 'Heart Arrow', category: 'love', assetPath: 'assets/stickers/love/heart-arrow.png', isPremium: false, tags: ['cupid', 'romance'] },
  { id: 'love-005', name: 'Kiss Mark', category: 'love', assetPath: 'assets/stickers/love/kiss-mark.png', isPremium: false, tags: ['kiss', 'love'] },
  { id: 'love-006', name: 'Love Letter', category: 'love', assetPath: 'assets/stickers/love/love-letter.png', isPremium: false, tags: ['valentine', 'romance'] },
  { id: 'love-007', name: 'Rose', category: 'love', assetPath: 'assets/stickers/love/rose.png', isPremium: false, tags: ['flower', 'romance'] },
  { id: 'love-008', name: 'Cupid', category: 'love', assetPath: 'assets/stickers/love/cupid.png', isPremium: false, tags: ['love', 'angel'] },
  
  // Premium love stickers (32)
  { id: 'love-009', name: 'Sparkling Heart', category: 'love', assetPath: 'assets/stickers/love/sparkling-heart.png', isPremium: true, tags: ['love', 'sparkle'] },
  { id: 'love-010', name: 'Growing Heart', category: 'love', assetPath: 'assets/stickers/love/growing-heart.png', isPremium: true, tags: ['love', 'growth'] },
  { id: 'love-011', name: 'Beating Heart', category: 'love', assetPath: 'assets/stickers/love/beating-heart.png', isPremium: true, tags: ['love', 'pulse'] },
  { id: 'love-012', name: 'Revolving Hearts', category: 'love', assetPath: 'assets/stickers/love/revolving-hearts.png', isPremium: true, tags: ['love', 'romance'] },
  { id: 'love-013', name: 'Heart Decoration', category: 'love', assetPath: 'assets/stickers/love/heart-decoration.png', isPremium: true, tags: ['love', 'decoration'] },
  { id: 'love-014', name: 'Heart with Ribbon', category: 'love', assetPath: 'assets/stickers/love/heart-ribbon.png', isPremium: true, tags: ['gift', 'love'] },
  { id: 'love-015', name: 'Love You Gesture', category: 'love', assetPath: 'assets/stickers/love/love-you.png', isPremium: true, tags: ['love', 'hand'] },
  { id: 'love-016', name: 'Face Blowing Kiss', category: 'love', assetPath: 'assets/stickers/love/face-blowing-kiss.png', isPremium: true, tags: ['kiss', 'romance'] },
  { id: 'love-017', name: 'Kissing Face', category: 'love', assetPath: 'assets/stickers/love/kissing-face.png', isPremium: true, tags: ['kiss', 'couple'] },
  { id: 'love-018', name: 'Couple Kiss', category: 'love', assetPath: 'assets/stickers/love/couple-kiss.png', isPremium: true, tags: ['couple', 'romance'] },
  { id: 'love-019', name: 'Couple with Heart', category: 'love', assetPath: 'assets/stickers/love/couple-heart.png', isPremium: true, tags: ['couple', 'love'] },
  { id: 'love-020', name: 'Wedding', category: 'love', assetPath: 'assets/stickers/love/wedding.png', isPremium: true, tags: ['marriage', 'couple'] },
  { id: 'love-021', name: 'Ring', category: 'love', assetPath: 'assets/stickers/love/ring.png', isPremium: true, tags: ['engagement', 'jewelry'] },
  { id: 'love-022', name: 'Double Heart', category: 'love', assetPath: 'assets/stickers/love/double-heart.png', isPremium: true, tags: ['love', 'heart'] },
  { id: 'love-023', name: 'Two Hearts', category: 'love', assetPath: 'assets/stickers/love/two-hearts.png', isPremium: true, tags: ['love', 'couple'] },
  { id: 'love-024', name: 'Heart on Fire', category: 'love', assetPath: 'assets/stickers/love/heart-fire.png', isPremium: true, tags: ['passion', 'love'] },
  { id: 'love-025', name: 'Mending Heart', category: 'love', assetPath: 'assets/stickers/love/mending-heart.png', isPremium: true, tags: ['healing', 'love'] },
  { id: 'love-026', name: 'Heart with Arrow', category: 'love', assetPath: 'assets/stickers/love/heart-with-arrow.png', isPremium: true, tags: ['cupid', 'love'] },
  { id: 'love-027', name: 'Box of Chocolate', category: 'love', assetPath: 'assets/stickers/love/chocolate.png', isPremium: true, tags: ['gift', 'sweet'] },
  { id: 'love-028', name: 'Love Hotel', category: 'love', assetPath: 'assets/stickers/love/love-hotel.png', isPremium: true, tags: ['romance', 'hotel'] },
  { id: 'love-029', name: 'Honeymoon', category: 'love', assetPath: 'assets/stickers/love/honeymoon.png', isPremium: true, tags: ['vacation', 'couple'] },
  { id: 'love-030', name: 'Rose Bouquet', category: 'love', assetPath: 'assets/stickers/love/rose-bouquet.png', isPremium: true, tags: ['flowers', 'gift'] },
  { id: 'love-031', name: 'Wilted Flower', category: 'love', assetPath: 'assets/stickers/love/wilted-flower.png', isPremium: true, tags: ['sad', 'flower'] },
  { id: 'love-032', name: 'Cherry Blossom', category: 'love', assetPath: 'assets/stickers/love/cherry-blossom.png', isPremium: true, tags: ['flower', 'spring'] },
  { id: 'love-033', name: 'Hibiscus', category: 'love', assetPath: 'assets/stickers/love/hibiscus.png', isPremium: true, tags: ['flower', 'tropical'] },
  { id: 'love-034', name: 'Lotus', category: 'love', assetPath: 'assets/stickers/love/lotus.png', isPremium: true, tags: ['flower', 'peace'] },
  { id: 'love-035', name: 'Tulip', category: 'love', assetPath: 'assets/stickers/love/tulip.png', isPremium: true, tags: ['flower', 'spring'] },
  { id: 'love-036', name: 'Sunflower', category: 'love', assetPath: 'assets/stickers/love/sunflower.png', isPremium: true, tags: ['flower', 'summer'] },
  { id: 'love-037', name: 'Daisy', category: 'love', assetPath: 'assets/stickers/love/daisy.png', isPremium: true, tags: ['flower', 'cute'] },
  { id: 'love-038', name: 'Butterfly', category: 'love', assetPath: 'assets/stickers/love/butterfly.png', isPremium: true, tags: ['insect', 'beauty'] },
  { id: 'love-039', name: 'Love Birds', category: 'love', assetPath: 'assets/stickers/love/love-birds.png', isPremium: true, tags: ['birds', 'couple'] },
  { id: 'love-040', name: 'Swan', category: 'love', assetPath: 'assets/stickers/love/swan.png', isPremium: true, tags: ['bird', 'romance'] },
];

// ============================================
// TRAVEL STICKERS (40 stickers: 8 free, 32 pro)
// ============================================
export const travelStickers: Sticker[] = [
  // Free travel stickers (8)
  { id: 'travel-001', name: 'Airplane', category: 'travel', assetPath: 'assets/stickers/travel/airplane.png', isPremium: false, tags: ['flight', 'travel'] },
  { id: 'travel-002', name: 'Car', category: 'travel', assetPath: 'assets/stickers/travel/car.png', isPremium: false, tags: ['vehicle', 'drive'] },
  { id: 'travel-003', name: 'Ship', category: 'travel', assetPath: 'assets/stickers/travel/ship.png', isPremium: false, tags: ['boat', 'cruise'] },
  { id: 'travel-004', name: 'Train', category: 'travel', assetPath: 'assets/stickers/travel/train.png', isPremium: false, tags: ['rail', 'transit'] },
  { id: 'travel-005', name: 'Map', category: 'travel', assetPath: 'assets/stickers/travel/map.png', isPremium: false, tags: ['navigation', 'location'] },
  { id: 'travel-006', name: 'Globe', category: 'travel', assetPath: 'assets/stickers/travel/globe.png', isPremium: false, tags: ['world', 'earth'] },
  { id: 'travel-007', name: 'Compass', category: 'travel', assetPath: 'assets/stickers/travel/compass.png', isPremium: false, tags: ['navigation', 'direction'] },
  { id: 'travel-008', name: 'Camera', category: 'travel', assetPath: 'assets/stickers/travel/camera.png', isPremium: false, tags: ['photo', 'travel'] },
  
  // Premium travel stickers (32)
  { id: 'travel-009', name: 'Passport', category: 'travel', assetPath: 'assets/stickers/travel/passport.png', isPremium: true, tags: ['document', 'travel'] },
  { id: 'travel-010', name: 'Suitcase', category: 'travel', assetPath: 'assets/stickers/travel/suitcase.png', isPremium: true, tags: ['luggage', 'travel'] },
  { id: 'travel-011', name: 'Backpack', category: 'travel', assetPath: 'assets/stickers/travel/backpack.png', isPremium: true, tags: ['hiking', 'travel'] },
  { id: 'travel-012', name: 'Ticket', category: 'travel', assetPath: 'assets/stickers/travel/ticket.png', isPremium: true, tags: ['travel', 'event'] },
  { id: 'travel-013', name: 'Hotel', category: 'travel', assetPath: 'assets/stickers/travel/hotel.png', isPremium: true, tags: ['accommodation', 'stay'] },
  { id: 'travel-014', name: 'Beach Umbrella', category: 'travel', assetPath: 'assets/stickers/travel/beach-umbrella.png', isPremium: true, tags: ['beach', 'summer'] },
  { id: 'travel-015', name: 'Sun', category: 'travel', assetPath: 'assets/stickers/travel/sun.png', isPremium: true, tags: ['weather', 'summer'] },
  { id: 'travel-016', name: 'Palm Tree', category: 'travel', assetPath: 'assets/stickers/travel/palm-tree.png', isPremium: true, tags: ['beach', 'tropical'] },
  { id: 'travel-017', name: 'Mountain', category: 'travel', assetPath: 'assets/stickers/travel/mountain.png', isPremium: true, tags: ['hiking', 'nature'] },
  { id: 'travel-018', name: 'Campfire', category: 'travel', assetPath: 'assets/stickers/travel/campfire.png', isPremium: true, tags: ['camping', 'outdoor'] },
  { id: 'travel-019', name: 'Tent', category: 'travel', assetPath: 'assets/stickers/travel/tent.png', isPremium: true, tags: ['camping', 'outdoor'] },
  { id: 'travel-020', name: 'Surfboard', category: 'travel', assetPath: 'assets/stickers/travel/surfboard.png', isPremium: true, tags: ['beach', 'sport'] },
  { id: 'travel-021', name: 'Snorkel', category: 'travel', assetPath: 'assets/stickers/travel/snorkel.png', isPremium: true, tags: ['diving', 'water'] },
  { id: 'travel-022', name: 'Parachute', category: 'travel', assetPath: 'assets/stickers/travel/parachute.png', isPremium: true, tags: ['adventure', 'sport'] },
  { id: 'travel-023', name: 'Hot Air Balloon', category: 'travel', assetPath: 'assets/stickers/travel/hot-air-balloon.png', isPremium: true, tags: ['adventure', 'flight'] },
  { id: 'travel-024', name: 'Helicopter', category: 'travel', assetPath: 'assets/stickers/travel/helicopter.png', isPremium: true, tags: ['flight', 'travel'] },
  { id: 'travel-025', name: 'Bus', category: 'travel', assetPath: 'assets/stickers/travel/bus.png', isPremium: true, tags: ['transit', 'public'] },
  { id: 'travel-026', name: 'Taxi', category: 'travel', assetPath: 'assets/stickers/travel/taxi.png', isPremium: true, tags: ['transport', 'city'] },
  { id: 'travel-027', name: 'Bicycle', category: 'travel', assetPath: 'assets/stickers/travel/bicycle.png', isPremium: true, tags: ['sport', 'transport'] },
  { id: 'travel-028', name: 'Motorcycle', category: 'travel', assetPath: 'assets/stickers/travel/motorcycle.png', isPremium: true, tags: ['vehicle', 'sport'] },
  { id: 'travel-029', name: 'Scooter', category: 'travel', assetPath: 'assets/stickers/travel/scooter.png', isPremium: true, tags: ['vehicle', 'fun'] },
  { id: 'travel-030', name: 'Skateboard', category: 'travel', assetPath: 'assets/stickers/travel/skateboard.png', isPremium: true, tags: ['sport', 'urban'] },
  { id: 'travel-031', name: 'Roller Skate', category: 'travel', assetPath: 'assets/stickers/travel/roller-skate.png', isPremium: true, tags: ['sport', 'fun'] },
  { id: 'travel-032', name: 'Sailboat', category: 'travel', assetPath: 'assets/stickers/travel/sailboat.png', isPremium: true, tags: ['boat', 'ocean'] },
  { id: 'travel-033', name: 'Speedboat', category: 'travel', assetPath: 'assets/stickers/travel/speedboat.png', isPremium: true, tags: ['boat', 'fast'] },
  { id: 'travel-034', name: 'Anchor', category: 'travel', assetPath: 'assets/stickers/travel/anchor.png', isPremium: true, tags: ['ship', 'ocean'] },
  { id: 'travel-035', name: 'Lighthouse', category: 'travel', assetPath: 'assets/stickers/travel/lighthouse.png', isPremium: true, tags: ['coast', 'beacon'] },
  { id: 'travel-036', name: 'Ferris Wheel', category: 'travel', assetPath: 'assets/stickers/travel/ferris-wheel.png', isPremium: true, tags: ['amusement', 'fun'] },
  { id: 'travel-037', name: 'Roller Coaster', category: 'travel', assetPath: 'assets/stickers/travel/roller-coaster.png', isPremium: true, tags: ['amusement', 'thrill'] },
  { id: 'travel-038', name: 'Circus Tent', category: 'travel', assetPath: 'assets/stickers/travel/circus-tent.png', isPremium: true, tags: ['entertainment', 'fun'] },
  { id: 'travel-039', name: 'Museum', category: 'travel', assetPath: 'assets/stickers/travel/museum.png', isPremium: true, tags: ['culture', 'art'] },
  { id: 'travel-040', name: 'Pyramid', category: 'travel', assetPath: 'assets/stickers/travel/pyramid.png', isPremium: true, tags: ['landmark', 'egypt'] },
];

// ============================================
// BIRTHDAY STICKERS (40 stickers: 8 free, 32 pro)
// ============================================
export const birthdayStickers: Sticker[] = [
  // Free birthday stickers (8)
  { id: 'birthday-001', name: 'Birthday Cake', category: 'birthday', assetPath: 'assets/stickers/birthday/cake.png', isPremium: false, tags: ['party', 'celebration'] },
  { id: 'birthday-002', name: 'Cupcake', category: 'birthday', assetPath: 'assets/stickers/birthday/cupcake.png', isPremium: false, tags: ['sweet', 'treat'] },
  { id: 'birthday-003', name: 'Balloon', category: 'birthday', assetPath: 'assets/stickers/birthday/balloon.png', isPremium: false, tags: ['party', 'decoration'] },
  { id: 'birthday-004', name: 'Gift', category: 'birthday', assetPath: 'assets/stickers/birthday/gift.png', isPremium: false, tags: ['present', 'surprise'] },
  { id: 'birthday-005', name: 'Party Hat', category: 'birthday', assetPath: 'assets/stickers/birthday/party-hat.png', isPremium: false, tags: ['party', 'celebration'] },
  { id: 'birthday-006', name: 'Candle', category: 'birthday', assetPath: 'assets/stickers/birthday/candle.png', isPremium: false, tags: ['cake', 'wish'] },
  { id: 'birthday-007', name: 'Confetti Ball', category: 'birthday', assetPath: 'assets/stickers/birthday/confetti-ball.png', isPremium: false, tags: ['party', 'fun'] },
  { id: 'birthday-008', name: 'Popper', category: 'birthday', assetPath: 'assets/stickers/birthday/popper.png', isPremium: false, tags: ['celebration', 'noise'] },
  
  // Premium birthday stickers (32)
  { id: 'birthday-009', name: 'Tiered Cake', category: 'birthday', assetPath: 'assets/stickers/birthday/tiered-cake.png', isPremium: true, tags: ['cake', 'celebration'] },
  { id: 'birthday-010', name: 'Wedding Cake', category: 'birthday', assetPath: 'assets/stickers/birthday/wedding-cake.png', isPremium: true, tags: ['cake', 'wedding'] },
  { id: 'birthday-011', name: 'Donut', category: 'birthday', assetPath: 'assets/stickers/birthday/donut.png', isPremium: true, tags: ['sweet', 'treat'] },
  { id: 'birthday-012', name: 'Cookie', category: 'birthday', assetPath: 'assets/stickers/birthday/cookie.png', isPremium: true, tags: ['sweet', 'treat'] },
  { id: 'birthday-013', name: 'Ice Cream', category: 'birthday', assetPath: 'assets/stickers/birthday/ice-cream.png', isPremium: true, tags: ['sweet', 'summer'] },
  { id: 'birthday-014', name: 'Cotton Candy', category: 'birthday', assetPath: 'assets/stickers/birthday/cotton-candy.png', isPremium: true, tags: ['sweet', 'carnival'] },
  { id: 'birthday-015', name: 'Lollipop', category: 'birthday', assetPath: 'assets/stickers/birthday/lollipop.png', isPremium: true, tags: ['sweet', 'candy'] },
  { id: 'birthday-016', name: 'Candy Cane', category: 'birthday', assetPath: 'assets/stickers/birthday/candy-cane.png', isPremium: true, tags: ['christmas', 'sweet'] },
  { id: 'birthday-017', name: 'Wrapped Gift', category: 'birthday', assetPath: 'assets/stickers/birthday/wrapped-gift.png', isPremium: true, tags: ['present', 'surprise'] },
  { id: 'birthday-018', name: 'Gift Box', category: 'birthday', assetPath: 'assets/stickers/birthday/gift-box.png', isPremium: true, tags: ['present', 'box'] },
  { id: 'birthday-019', name: 'Ribbon', category: 'birthday', assetPath: 'assets/stickers/birthday/ribbon.png', isPremium: true, tags: ['decoration', 'gift'] },
  { id: 'birthday-020', name: 'Bow', category: 'birthday', assetPath: 'assets/stickers/birthday/bow.png', isPremium: true, tags: ['decoration', 'gift'] },
  { id: 'birthday-021', name: 'Bunting', category: 'birthday', assetPath: 'assets/stickers/birthday/bunting.png', isPremium: true, tags: ['decoration', 'party'] },
  { id: 'birthday-022', name: 'Banner', category: 'birthday', assetPath: 'assets/stickers/birthday/banner.png', isPremium: true, tags: ['decoration', 'celebration'] },
  { id: 'birthday-023', name: 'Streamers', category: 'birthday', assetPath: 'assets/stickers/birthday/streamers.png', isPremium: true, tags: ['decoration', 'party'] },
  { id: 'birthday-024', name: 'Noisemaker', category: 'birthday', assetPath: 'assets/stickers/birthday/noisemaker.png', isPremium: true, tags: ['party', 'noise'] },
  { id: 'birthday-025', name: 'Horn', category: 'birthday', assetPath: 'assets/stickers/birthday/horn.png', isPremium: true, tags: ['party', 'noise'] },
  { id: 'birthday-026', name: 'Whistle', category: 'birthday', assetPath: 'assets/stickers/birthday/whistle.png', isPremium: true, tags: ['party', 'noise'] },
  { id: 'birthday-027', name: 'Serpentine', category: 'birthday', assetPath: 'assets/stickers/birthday/serpentine.png', isPremium: true, tags: ['party', 'decoration'] },
  { id: 'birthday-028', name: 'Face with Party Horn', category: 'birthday', assetPath: 'assets/stickers/birthday/party-horn.png', isPremium: true, tags: ['celebration', 'fun'] },
  { id: 'birthday-029', name: 'Party Face', category: 'birthday', assetPath: 'assets/stickers/birthday/party-face.png', isPremium: true, tags: ['celebration', 'fun'] },
  { id: 'birthday-030', name: 'Champagne', category: 'birthday', assetPath: 'assets/stickers/birthday/champagne.png', isPremium: true, tags: ['toast', 'celebration'] },
  { id: 'birthday-031', name: 'Wine Glass', category: 'birthday', assetPath: 'assets/stickers/birthday/wine-glass.png', isPremium: true, tags: ['drink', 'celebration'] },
  { id: 'birthday-032', name: 'Cocktail', category: 'birthday', assetPath: 'assets/stickers/birthday/cocktail.png', isPremium: true, tags: ['drink', 'party'] },
  { id: 'birthday-033', name: 'Beer', category: 'birthday', assetPath: 'assets/stickers/birthday/beer.png', isPremium: true, tags: ['drink', 'party'] },
  { id: 'birthday-034', name: 'Birthday Card', category: 'birthday', assetPath: 'assets/stickers/birthday/birthday-card.png', isPremium: true, tags: ['greeting', 'celebration'] },
  { id: 'birthday-035', name: 'Envelope', category: 'birthday', assetPath: 'assets/stickers/birthday/envelope.png', isPremium: true, tags: ['mail', 'greeting'] },
  { id: 'birthday-036', name: 'Age Number', category: 'birthday', assetPath: 'assets/stickers/birthday/age-number.png', isPremium: true, tags: ['age', 'number'] },
  { id: 'birthday-037', name: 'One', category: 'birthday', assetPath: 'assets/stickers/birthday/one.png', isPremium: true, tags: ['age', 'first'] },
  { id: 'birthday-038', name: 'Two', category: 'birthday', assetPath: 'assets/stickers/birthday/two.png', isPremium: true, tags: ['age', 'second'] },
  { id: 'birthday-039', name: 'Three', category: 'birthday', assetPath: 'assets/stickers/birthday/three.png', isPremium: true, tags: ['age', 'third'] },
  { id: 'birthday-040', name: 'Four', category: 'birthday', assetPath: 'assets/stickers/birthday/four.png', isPremium: true, tags: ['age', 'fourth'] },
];

// ============================================
// WEDDING STICKERS (40 stickers: 8 free, 32 pro)
// ============================================
export const weddingStickers: Sticker[] = [
  // Free wedding stickers (8)
  { id: 'wedding-001', name: 'Wedding Rings', category: 'wedding', assetPath: 'assets/stickers/wedding/rings.png', isPremium: false, tags: ['marriage', 'couple'] },
  { id: 'wedding-002', name: 'Dove', category: 'wedding', assetPath: 'assets/stickers/wedding/dove.png', isPremium: false, tags: ['peace', 'love'] },
  { id: 'wedding-003', name: 'Champagne', category: 'wedding', assetPath: 'assets/stickers/wedding/champagne.png', isPremium: false, tags: ['toast', 'celebration'] },
  { id: 'wedding-004', name: 'Bouquet', category: 'wedding', assetPath: 'assets/stickers/wedding/bouquet.png', isPremium: false, tags: ['flowers', 'bride'] },
  { id: 'wedding-005', name: 'Bride', category: 'wedding', assetPath: 'assets/stickers/wedding/bride.png', isPremium: false, tags: ['woman', 'wedding'] },
  { id: 'wedding-006', name: 'Groom', category: 'wedding', assetPath: 'assets/stickers/wedding/groom.png', isPremium: false, tags: ['man', 'wedding'] },
  { id: 'wedding-007', name: 'Church', category: 'wedding', assetPath: 'assets/stickers/wedding/church.png', isPremium: false, tags: ['venue', 'ceremony'] },
  { id: 'wedding-008', name: 'Heart', category: 'wedding', assetPath: 'assets/stickers/wedding/heart.png', isPremium: false, tags: ['love', 'romance'] },
  
  // Premium wedding stickers (32)
  { id: 'wedding-009', name: 'Wedding Dress', category: 'wedding', assetPath: 'assets/stickers/wedding/dress.png', isPremium: true, tags: ['bride', 'fashion'] },
  { id: 'wedding-010', name: 'Tuxedo', category: 'wedding', assetPath: 'assets/stickers/wedding/tuxedo.png', isPremium: true, tags: ['groom', 'fashion'] },
  { id: 'wedding-011', name: 'Veil', category: 'wedding', assetPath: 'assets/stickers/wedding/veil.png', isPremium: true, tags: ['bride', 'accessory'] },
  { id: 'wedding-012', name: 'Top Hat', category: 'wedding', assetPath: 'assets/stickers/wedding/top-hat.png', isPremium: true, tags: ['groom', 'formal'] },
  { id: 'wedding-013', name: 'Bowtie', category: 'wedding', assetPath: 'assets/stickers/wedding/bowtie.png', isPremium: true, tags: ['formal', 'accessory'] },
  { id: 'wedding-014', name: 'Boutonniere', category: 'wedding', assetPath: 'assets/stickers/wedding/boutonniere.png', isPremium: true, tags: ['flower', 'groom'] },
  { id: 'wedding-015', name: 'Corsage', category: 'wedding', assetPath: 'assets/stickers/wedding/corsage.png', isPremium: true, tags: ['flower', 'bride'] },
  { id: 'wedding-016', name: 'Garter', category: 'wedding', assetPath: 'assets/stickers/wedding/garter.png', isPremium: true, tags: ['tradition', 'bride'] },
  { id: 'wedding-017', name: 'Wedding Cake', category: 'wedding', assetPath: 'assets/stickers/wedding/wedding-cake.png', isPremium: true, tags: ['cake', 'celebration'] },
  { id: 'wedding-018', name: 'Champagne Tower', category: 'wedding', assetPath: 'assets/stickers/wedding/champagne-tower.png', isPremium: true, tags: ['toast', 'celebration'] },
  { id: 'wedding-019', name: 'Toast', category: 'wedding', assetPath: 'assets/stickers/wedding/toast.png', isPremium: true, tags: ['celebration', 'drink'] },
  { id: 'wedding-020', name: 'Wedding Invitation', category: 'wedding', assetPath: 'assets/stickers/wedding/invitation.png', isPremium: true, tags: ['paper', 'formal'] },
  { id: 'wedding-021', name: 'Save the Date', category: 'wedding', assetPath: 'assets/stickers/wedding/save-the-date.png', isPremium: true, tags: ['announcement', 'wedding'] },
  { id: 'wedding-022', name: 'Place Card', category: 'wedding', assetPath: 'assets/stickers/wedding/place-card.png', isPremium: true, tags: ['table', 'seating'] },
  { id: 'wedding-023', name: 'Menu', category: 'wedding', assetPath: 'assets/stickers/wedding/menu.png', isPremium: true, tags: ['food', 'dining'] },
  { id: 'wedding-024', name: 'Wedding Car', category: 'wedding', assetPath: 'assets/stickers/wedding/wedding-car.png', isPremium: true, tags: ['transport', 'luxury'] },
  { id: 'wedding-025', name: 'Horse Carriage', category: 'wedding', assetPath: 'assets/stickers/wedding/carriage.png', isPremium: true, tags: ['transport', 'romantic'] },
  { id: 'wedding-026', name: 'Limo', category: 'wedding', assetPath: 'assets/stickers/wedding/limo.png', isPremium: true, tags: ['transport', 'luxury'] },
  { id: 'wedding-027', name: 'Wedding Bell', category: 'wedding', assetPath: 'assets/stickers/wedding/bell.png', isPremium: true, tags: ['ceremony', 'sound'] },
  { id: 'wedding-028', name: 'Aisle Runner', category: 'wedding', assetPath: 'assets/stickers/wedding/aisle-runner.png', isPremium: true, tags: ['ceremony', 'venue'] },
  { id: 'wedding-029', name: 'Altar', category: 'wedding', assetPath: 'assets/stickers/wedding/altar.png', isPremium: true, tags: ['ceremony', 'religious'] },
  { id: 'wedding-030', name: 'Arch', category: 'wedding', assetPath: 'assets/stickers/wedding/arch.png', isPremium: true, tags: ['decoration', 'ceremony'] },
  { id: 'wedding-031', name: 'Pew Bow', category: 'wedding', assetPath: 'assets/stickers/wedding/pew-bow.png', isPremium: true, tags: ['decoration', 'church'] },
  { id: 'wedding-032', name: 'Chair Cover', category: 'wedding', assetPath: 'assets/stickers/wedding/chair-cover.png', isPremium: true, tags: ['decoration', 'furniture'] },
  { id: 'wedding-033', name: 'Tablecloth', category: 'wedding', assetPath: 'assets/stickers/wedding/tablecloth.png', isPremium: true, tags: ['decoration', 'table'] },
  { id: 'wedding-034', name: 'Napkin', category: 'wedding', assetPath: 'assets/stickers/wedding/napkin.png', isPremium: true, tags: ['table', 'dining'] },
  { id: 'wedding-035', name: 'Silverware', category: 'wedding', assetPath: 'assets/stickers/wedding/silverware.png', isPremium: true, tags: ['table', 'dining'] },
  { id: 'wedding-036', name: 'Wine Glass', category: 'wedding', assetPath: 'assets/stickers/wedding/wine-glass.png', isPremium: true, tags: ['drink', 'dining'] },
  { id: 'wedding-037', name: 'Champagne Glass', category: 'wedding', assetPath: 'assets/stickers/wedding/champagne-glass.png', isPremium: true, tags: ['toast', 'celebration'] },
  { id: 'wedding-038', name: 'Wedding Song', category: 'wedding', assetPath: 'assets/stickers/wedding/wedding-song.png', isPremium: true, tags: ['music', 'dance'] },
  { id: 'wedding-039', name: 'First Dance', category: 'wedding', assetPath: 'assets/stickers/wedding/first-dance.png', isPremium: true, tags: ['dance', 'couple'] },
  { id: 'wedding-040', name: 'Just Married', category: 'wedding', assetPath: 'assets/stickers/wedding/just-married.png', isPremium: true, tags: ['newlyweds', 'celebration'] },
];

// ============================================
// ALL STICKERS COMBINED
// ============================================
export const allStickers: Sticker[] = [
  ...emojiStickers,
  ...loveStickers,
  ...travelStickers,
  ...birthdayStickers,
  ...weddingStickers,
];

// ============================================
// STICKER CATEGORIES
// ============================================
export const stickerCategories: { id: StickerCategory; name: string; icon: string; count: number }[] = [
  { id: 'emoji', name: 'Emoji', icon: '😊', count: emojiStickers.length },
  { id: 'love', name: 'Love', icon: '❤️', count: loveStickers.length },
  { id: 'travel', name: 'Travel', icon: '✈️', count: travelStickers.length },
  { id: 'birthday', name: 'Birthday', icon: '🎂', count: birthdayStickers.length },
  { id: 'wedding', name: 'Wedding', icon: '💍', count: weddingStickers.length },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get stickers by category
 */
export function getStickersByCategory(category: StickerCategory): Sticker[] {
  return allStickers.filter(s => s.category === category);
}

/**
 * Get premium stickers
 */
export function getPremiumStickers(): Sticker[] {
  return allStickers.filter(s => s.isPremium);
}

/**
 * Get free stickers
 */
export function getFreeStickers(): Sticker[] {
  return allStickers.filter(s => !s.isPremium);
}

/**
 * Search stickers by tags
 */
export function searchStickers(query: string): Sticker[] {
  const lowerQuery = query.toLowerCase();
  return allStickers.filter(sticker => 
    sticker.name.toLowerCase().includes(lowerQuery) ||
    sticker.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get stickers by multiple criteria
 */
export function filterStickers(options: {
  category?: StickerCategory;
  isPremium?: boolean;
  search?: string;
}): Sticker[] {
  let results = allStickers;
  
  if (options.category) {
    results = results.filter(s => s.category === options.category);
  }
  
  if (options.isPremium !== undefined) {
    results = results.filter(s => s.isPremium === options.isPremium);
  }
  
  if (options.search) {
    const lowerQuery = options.search.toLowerCase();
    results = results.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  return results;
}

/**
 * Get sticker by ID
 */
export function getStickerById(id: string): Sticker | undefined {
  return allStickers.find(s => s.id === id);
}

/**
 * Get featured stickers (for home screen, popular stickers)
 */
export function getFeaturedStickers(): Sticker[] {
  return [
    emojiStickers[0],   // Smile
    emojiStickers[4],   // Thumbs Up
    loveStickers[0],    // Red Heart
    travelStickers[0],  // Airplane
    birthdayStickers[0], // Birthday Cake
    weddingStickers[0],  // Wedding Rings
  ];
}

export default allStickers;