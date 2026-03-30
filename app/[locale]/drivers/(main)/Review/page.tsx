"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useRideReviews } from "@/hooks/useRideHooks";
import { ReviewCardProps, FilterState, type Review } from "@/types";

interface FilterOption {
  label: string;
  value: string;
}

interface StarRatingProps {
  rating: number;
}

interface AvatarProps {}

const filterOptions: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "5", value: "5" },
  { label: "4", value: "4" },
  { label: "3", value: "3" },
];

function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          fill={star <= Math.round(rating) ? "#F5A623" : "none"}
          stroke={star <= Math.round(rating) ? "#F5A623" : "#D1D5DB"}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function Avatar({}: AvatarProps) {
  return (
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" fill="#9DADC8" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#9DADC8" />
      </svg>
    </div>
  );
}

export default function Review() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { data: reviewsData, isLoading, error } = useRideReviews();

  // Transform API data to match our interface
  const reviews: Review[] = reviewsData?.map((review: Review) => ({
    ...review,
    rider: {
      id: review.rider?.id || 0,
      name: review.rider?.name || "Rider's name",
      phonenumber: review.rider?.phonenumber || "",
    },
    ride: {
      id: review.ride?.id || 0,
      pickup_address: review.ride?.pickup_address || "",
      dropoff_address: review.ride?.dropoff_address,
      total_price: review.ride?.total_price,
      created_at: review.ride?.created_at || "",
    },
  })) || [];

  const filtered: Review[] =
    activeFilter === "all"
      ? reviews
      : reviews.filter(
          (r) => Math.round(r.rating) === parseInt(activeFilter)
        );

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-[100px]">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[120px] bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-[100px]">
          <div className="text-center">
            <h2 className="text-red-600 mb-4">Failed to load reviews</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container mx-auto py-[100px]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            Review history
          </h2>

          <button className="flex items-center gap-1.5 bg-[#F5F5F7] rounded-full px-3 py-2 text-sm sm:text-base">
            This week
          </button>
        </div>

        {/* Stats + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
          
          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            
            {/* Card 1 - Average Rating */}
            <div className="flex items-center gap-2 bg-[#F5F7FA] p-3 rounded-xl w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-[#E8ECF3] flex items-center justify-center">
                <Star size={14} fill="#010C4A" />
              </div>
              <div>
                <p className="text-xs text-[#8B8EA4]">Average ratings</p>
                <span className="text-lg font-bold">
                  {reviews.length > 0 
                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                    : "0.0"
                  }/5
                </span>
              </div>
            </div>

            {/* Card 2 - Total Reviews */}
            <div className="flex items-center gap-2 bg-[#F5F7FA] p-3 rounded-xl w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-[#E8ECF3] flex items-center justify-center">
                <Star size={14} fill="#010C4A" />
              </div>
              <div>
                <p className="text-xs text-[#8B8EA4]">Total reviews</p>
                <span className="text-lg font-bold">{reviews.length}</span>
              </div>
            </div>

          </div>

          {/* Filters */}
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-[10px] uppercase mb-2 text-gray-500">
              Sort by
            </span>

            <div className="flex flex-wrap gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`flex items-center gap-1 rounded-full text-xs sm:text-sm px-3 py-1.5
                  ${
                    activeFilter === opt.value
                      ? "bg-[#010C4A] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {opt.value !== "all" && <Star size={10} />}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="text-sm sm:text-base font-semibold mb-4">
          Reviews ({filtered.length})
        </p>

        {/* Reviews */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
            <p className="text-gray-600">Your ride reviews will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((review) => (
              <div
                key={review.id}
                className="bg-[#F5F5F7] p-4 sm:p-6 rounded-xl"
              >
                
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  
                  {/* Left */}
                  <div className="flex gap-3">
                    <Avatar />

                    <div>
                      <p className="text-sm font-semibold">
                        {review.rider?.name || "Rider's name"}
                      </p>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  {/* Earnings (moves on mobile) */}
                  <span className="text-sm font-bold sm:self-start">
                    {review.ride?.total_price ? `+CF ${review.ride.total_price}` : "+CF 1084"}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#555A7B] mt-3 leading-relaxed">
                  {review.comment || "Great ride experience!"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}