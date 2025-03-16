import { Heart } from 'lucide-react';

const PlaceInfoPage = () => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold">London, United Kingdom</h1>
          <h1>Climate Type: Temperate</h1>
          <h1>Best Visiting Season: Spring</h1>
          <h1>Recommended for: History Buffs, Families, Solo Travelers</h1>
          <h1>Activity Types: Museums, Theaters, Shopping</h1>
          <h1>
            Nearby Attractions: Big Ben, Buckingham Palace, British Museum
          </h1>
          <h1>Budget Level: High</h1>
          <h1>Avg Cost of Stay: 180$</h1>
          <h1>Local Transports: Tube, Bus, Taxi, Bicycle</h1>
          <h1>Nearest Airport: 32 km (Heathrow, Gatwick, Luton)</h1>
          <h1>
            Visa Requirements: Visa-Free for many countries, Tourist Visa
            required for some
          </h1>
          <h1>Crime Index: Medium</h1>
          <h1>
            Safety Warnings: Pickpocketing in crowded areas, Air pollution
          </h1>
          <h1>Language Spoken: English</h1>
          <h1>
            Cultural considerations: Tipping common in restaurants, Queue
            etiquette important
          </h1>
          <h1>
            Events/Festivals: Notting Hill Carnival, Wimbledon, New Year&apos;s
            Eve Fireworks
          </h1>
        </div>
        <div className="w-1/2">
          <img
            src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <button className='border-2'>
        <Heart /> Add to Wishlist
      </button>
    </div>
  );
};

export default PlaceInfoPage;
