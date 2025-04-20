import React from 'react';

const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-dark mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
        <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
          <span>{item.category}</span>
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
        {item.location && (
          <div className="text-sm text-primary mt-2">
            📍 {item.location}
          </div>
        )}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="mt-3 rounded-lg w-full object-cover max-h-40"
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
