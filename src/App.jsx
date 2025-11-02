import { useState, useEffect, useRef } from 'react';

export default function FlipBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const pages = [
    {
      id: 1,
      title: "Chapter 1: The Beginning",
      content: "This is the first page of our story. Scroll down to flip to the next page. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      mediaType: "image",
    },
    {
      id: 2,
      title: "Chapter 2: The Journey",
      content: "Our adventure continues with stunning visuals and compelling narrative. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      mediaType: "image",
    },
    {
      id: 3,
      title: "Chapter 3: Discovery",
      content: "New revelations await as we delve deeper into the mystery. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      mediaType: "image",
    },
    {
      id: 4,
      title: "Chapter 4: The Climax",
      content: "The tension builds as we approach the pivotal moment. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      mediaType: "image",
    },
    {
      id: 5,
      title: "Chapter 5: Resolution",
      content: "All threads come together in this final chapter. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      mediaType: "image",
    },
    {
      id: 6,
      title: "Epilogue",
      content: "The end of our journey, but the beginning of a new adventure. Thank you for reading this story with us.",
      mediaType: "image",
    }
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current || isFlipping) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0 && currentPage < Math.floor(pages.length / 2)) {
        isScrolling.current = true;
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setIsFlipping(false);
          isScrolling.current = false;
        }, 1000);
      } else if (e.deltaY < 0 && currentPage > 0) {
        isScrolling.current = true;
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage(prev => prev - 1);
          setIsFlipping(false);
          isScrolling.current = false;
        }, 1000);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling.current || isFlipping) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;
      
      // Check if it's a vertical swipe (more vertical than horizontal)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentPage < Math.floor(pages.length / 2)) {
          // Swipe up - next page
          isScrolling.current = true;
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentPage(prev => prev + 1);
            setIsFlipping(false);
            isScrolling.current = false;
          }, 1000);
        } else if (deltaY < 0 && currentPage > 0) {
          // Swipe down - previous page
          isScrolling.current = true;
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentPage(prev => prev - 1);
            setIsFlipping(false);
            isScrolling.current = false;
          }, 1000);
        }
      }
      // Check if it's a horizontal swipe
      else if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentPage < Math.floor(pages.length / 2)) {
          // Swipe left - next page
          isScrolling.current = true;
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentPage(prev => prev + 1);
            setIsFlipping(false);
            isScrolling.current = false;
          }, 1000);
        } else if (deltaX < 0 && currentPage > 0) {
          // Swipe right - previous page
          isScrolling.current = true;
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentPage(prev => prev - 1);
            setIsFlipping(false);
            isScrolling.current = false;
          }, 1000);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentPage, pages.length, isFlipping]);

  const renderPage = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= pages.length || !pages[pageIndex]) return null;
    
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full h-full flex flex-col">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-3 sm:mb-4 md:mb-6 text-gray-900 border-b-2 border-gray-300 pb-2 sm:pb-3">
          {pages[pageIndex].title}
        </h2>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 mb-3 sm:mb-4 md:mb-6 rounded border-2 border-dashed border-gray-300">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 block">📷</span>
            <span className="text-xs sm:text-sm text-gray-500">Image Placeholder</span>
            {/* To add real images, replace the above with:
            <img src="/path/to/image.jpg" alt="Description" className="w-full h-full object-cover rounded" />
            */}
            {/* To add videos (when needed), use:
            <video className="w-full h-full object-cover rounded" controls>
              <source src="/path/to/video.mp4" type="video/mp4" />
            </video>
            */}
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed sm:leading-loose text-justify font-serif">
          {pages[pageIndex].content}
        </p>
        <div className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm text-gray-400 text-center font-serif">
          — {pageIndex + 1} —
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="h-screen w-full bg-gradient-to-b from-slate-700 via-slate-600 to-slate-800 overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8" style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\'%3E%3Cpath d=\'M28 2 L30 4 L6 28 L2 30 L4 26 Z\' fill=\'%234A5568\' stroke=\'%232D3748\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M28 2 L30 4 L29 5 L27 3 Z\' fill=\'%23718096\'/%3E%3Cpath d=\'M5 27 L2 30 L4 26 Z\' fill=\'%231A202C\'/%3E%3Cpath d=\'M6 28 L4 26 L28 2 L30 4 Z\' fill=\'none\' stroke=\'%232D3748\' stroke-width=\'0.3\'/%3E%3C/svg%3E") 2 30, auto' }}>
      {/* Book */}
      <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl" style={{ perspective: '2000px' }}>
        <div className="relative flex justify-center" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Book Spine Shadow */}
          <div className="absolute left-1/2 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-r from-black/40 via-black/20 to-transparent transform -translate-x-1/2 z-10" />
          
          {/* Left Page - Static */}
          <div 
            className="relative bg-gradient-to-br from-amber-50 to-amber-100 shadow-2xl"
            style={{
              width: 'min(45vw, 450px)',
              height: 'min(60vw, 600px)',
              maxWidth: '450px',
              maxHeight: '600px',
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
              boxShadow: '-5px 5px 20px rgba(0,0,0,0.3), inset 3px 0 10px rgba(0,0,0,0.1)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
            {currentPage > 0 && renderPage(currentPage * 2 - 2)}
            {currentPage === 0 && (
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-2 sm:mb-4">The Book</h1>
                  <p className="text-sm sm:text-base text-gray-600 italic">Scroll to begin</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Page Stack */}
          <div 
            className="relative" 
            style={{ 
              width: 'min(45vw, 450px)',
              height: 'min(60vw, 600px)',
              maxWidth: '450px',
              maxHeight: '600px',
            }}
          >
            
            {/* Flipping Page */}
            <div
              key={currentPage}
              className="absolute left-0 top-0 bg-gradient-to-br from-amber-50 to-amber-100"
              style={{
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transition: 'transform 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                transform: isFlipping ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                boxShadow: '5px 5px 20px rgba(0,0,0,0.3)',
                zIndex: 20,
              }}
            >
              {/* Front of flipping page */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                {renderPage(currentPage * 2 - 1)}
              </div>
              
              {/* Back of flipping page */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                {renderPage(currentPage * 2)}
              </div>
            </div>

            {/* Static Right Page (underneath) */}
            <div
              className="absolute left-0 top-0 bg-gradient-to-br from-amber-50 to-amber-100 shadow-2xl"
              style={{
                width: '100%',
                height: '100%',
                boxShadow: '5px 5px 20px rgba(0,0,0,0.3), inset -3px 0 10px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
              {renderPage(currentPage * 2 + 1)}
            </div>

          </div>
        </div>

        {/* Book Bottom Edge */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 sm:h-3 bg-gradient-to-b from-transparent to-black/30 translate-y-full"
          style={{ width: 'min(90vw, 900px)' }}
        />
      </div>

      {/* Instructions */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm text-gray-700 shadow-lg">
        <span className="font-medium hidden sm:inline">Scroll</span>
        <span className="font-medium sm:hidden">Swipe</span> to turn pages
      </div>

      {/* Page Counter */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm text-gray-700 shadow-lg">
        Spread {currentPage + 1} of {Math.ceil(pages.length / 2)}
      </div>
    </div>
  );
}