const MenuSkeletonLoader = () => {
  return (
    <div className="space-y-6 pb-24">
      {[1, 2, 3].map((section) => (
        <div key={section} className="px-4">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuSkeletonLoader;
