import React, { useState } from 'react';
import { Search, Plus, Star, Clock, List, TrendingUp } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState('trending');

  // Sample data - in a real app this would come from your backend
  const trendingShows = [
    { id: 1, title: 'The Last Detective', rating: 4.8, image: '/api/placeholder/200/300', type: 'TV Series' },
    { id: 2, title: 'Space Warriors', rating: 4.6, image: '/api/placeholder/200/300', type: 'Movie' },
    { id: 3, title: 'City Lights', rating: 4.9, image: '/api/placeholder/200/300', type: 'Movie' },
    { id: 4, title: 'The Dark Path', rating: 4.7, image: '/api/placeholder/200/300', type: 'TV Series' }
  ];

  const categories = [
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'watchlist', name: 'My Watchlist', icon: List },
    { id: 'upcoming', name: 'Coming Soon', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">MyWatchlist</h1>
            
            {/* Search Bar */}
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus className="h-5 w-5" />
              Add to Watchlist
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <category.icon className="h-5 w-5" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Featured Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src="/api/placeholder/600/400"
                alt="Featured show"
                className="rounded-lg object-cover w-full h-64"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">The Last Kingdom</h2>
                <p className="text-gray-600 mb-4">
                  Follow Uhtred of Bebbanburg's quest for revenge and redemption in this epic historical drama
                  based on Bernard Cornwell's novels.
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    <Plus className="h-5 w-5" />
                    Add to Watchlist
                  </button>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Shows Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingShows.map(show => (
              <Card key={show.id} className="overflow-hidden">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{show.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{show.type}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{show.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;