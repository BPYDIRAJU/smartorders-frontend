// src/pages/SubtypeGallery.tsx
import { useParams, useNavigate } from "react-router-dom";

// Define subtypes per material
const subtypeMap: Record<string, string[]> = {
  wood: ["rosewood", "sandalwood", "silverwood"],
  bricks: ["redbrick", "flyashbrick", "blacksoilbrick"],
  cement: ["opc", "ppc", "whitecement"],
  sand: ["smoothsand", "hardsand", "gravel"],
  iron: ["iron8", "iron10", "iron12", "iron16"],
};

// Labels for display
const subtypeLabels: Record<string, string> = {
  rosewood: "Rose Wood",
  sandalwood: "Sandal Wood",
  silverwood: "Silver Wood",
  redbrick: "Red Brick",
  flyashbrick: "Fly Ash Brick",
  blacksoilbrick: "Black Soil Brick",
  opc: "OPC Cement",
  ppc: "PPC Cement",
  whitecement: "White Cement",
  smoothsand: "Smooth Sand",
  hardsand: "Hard Sand",
  gravel: "Gravel",
  iron8: "8mm TMT Bar",
  iron10: "10mm TMT Bar",
  iron12: "12mm TMT Bar",
  iron16: "16mm TMT Bar",
};

// Border color styling
const subtypeBorderMap: Record<string, string> = {
  rosewood: "border-red-400",
  sandalwood: "border-yellow-400",
  silverwood: "border-slate-400",
  redbrick: "border-red-500",
  flyashbrick: "border-gray-400",
  blacksoilbrick: "border-amber-600",
  opc: "border-green-400",
  ppc: "border-blue-400",
  whitecement: "border-indigo-400",
  smoothsand: "border-orange-300",
  hardsand: "border-yellow-600",
  gravel: "border-gray-500",
  iron8: "border-blue-700",
  iron10: "border-indigo-500",
  iron12: "border-purple-500",
  iron16: "border-pink-500",
};

const SubtypeGallery = () => {
  const { type:material = "", supplier = "" } = useParams();
  const navigate = useNavigate();

  const subtypes = subtypeMap[material] || [];
  const hasSubtypes = subtypes.length > 0;

  const posterPath = `/assets/${material}/${supplier}/poster.png`;

  return (
    <div className="p-6 bg-gradient-to-b from-white to-slate-100 min-h-screen">
      {/* Header section */}
      <div className="text-center mb-10">
        <img
          src={posterPath}
          alt="Poster"
          className="mx-auto rounded-xl shadow-lg max-w-xs sm:max-w-md md:max-w-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/fallback/poster-not-found.png";
          }}
        />
        <h1 className="text-3xl font-extrabold text-blue-800 mt-4">
          🧱 Types from {supplier.toUpperCase()}
        </h1>
      </div>

      {/* Subtypes Grid */}
      {hasSubtypes ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {subtypes.map((subtype) => {
            const imagePath = `/assets/${material}/${supplier}/subtypes/${subtype}.png`;
            const borderColor = subtypeBorderMap[subtype] || "border-blue-300";
            const label = subtypeLabels[subtype] || subtype;

            return (
              <div
                key={`${material}-${supplier}-${subtype}`}
                onClick={() =>
                  navigate(`/add-order/${material}/${supplier}?subtype=${subtype}`)
                }
                className={`bg-white rounded-xl shadow-md p-4 text-center cursor-pointer border-2 ${borderColor} hover:shadow-xl hover:scale-105 transition duration-300`}
              >
                <img
                  src={imagePath}
                  alt={label}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback/no-image.png";
                  }}
                  className="mx-auto mb-2 h-24 w-24 sm:h-28 sm:w-28 object-contain"
                />
                <div className="font-semibold text-gray-800 text-sm">{label}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-600 text-lg font-medium">
          ⚠️ No subtypes found for <b>{material.toUpperCase()}</b>. Coming soon!
        </div>
      )}
    </div>
  );
};

export default SubtypeGallery;
