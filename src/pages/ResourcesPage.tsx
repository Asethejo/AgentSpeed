import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resourceService } from '../services/resourceService';
import { Resource, ResourceCategory } from '../types';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ResourceDetailsModal } from '../components/resources/ResourceDetailsModal';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  SlidersHorizontal,
  Database,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Datasets',
  'APIs',
  'Research reports',
  'Industry insights',
  'Technical documentation',
];

export const ResourcesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useApp();

  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<string>('suitability');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        setLoading(true);
        const data = await resourceService.getResources({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          search: searchQuery || undefined,
          sort: sortBy,
        });
        setResources(data);
      } catch (err) {
        console.error('Failed to load catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalog();
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Discover Digital Resources
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Demo Catalog
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Verified enterprise datasets, real-time developer APIs, and industry market reports.
          </p>
        </div>

        <div className="text-xs text-[#78827B] font-medium bg-[#F7F8F6] px-3.5 py-2 rounded-xl border border-[#E6EAE5]">
          <span>{resources.length} vetted assets available</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78827B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, tags, provider (e.g. VenturePulse, API, Funding)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] placeholder-[#78827B] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#78827B]" />
          <span className="text-xs text-[#78827B]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
          >
            <option value="suitability">Highest Suitability</option>
            <option value="quality">Quality Score</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#244B3A] text-white shadow-xs'
                : 'bg-white text-[#78827B] hover:text-[#202923] border border-[#E6EAE5] hover:bg-[#F7F8F6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((res) => (
          <ResourceCard
            key={res.id}
            resource={res}
            onViewDetails={(r) => setSelectedResource(r)}
          />
        ))}
      </div>

      {/* Details Modal */}
      <ResourceDetailsModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
};
