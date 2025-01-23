import React, { useState } from "react";
import { PlaylistCard } from "./PlaylistCard"; // Adjust path as needed
import { TacticsPlaylist } from "../types/database";

interface Props {
  playlists: TacticsPlaylist[];
  itemsPerPage: number;
}

const PaginatedPlaylists: React.FC<Props> = ({ playlists, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(playlists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlaylists = playlists.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-green-200 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-primary-500 text-white"
                : "bg-green-200 hover:bg-green-300"
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-green-200 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedPlaylists;
