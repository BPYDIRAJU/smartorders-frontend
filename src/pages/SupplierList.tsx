// src/pages/SupplierList.tsx
// src/pages/SupplierList.tsx
import { useParams, useNavigate } from "react-router-dom";

type Supplier = {
  name: string;
  folderKey: string;
  phone?: string;
  website?: string;
  location?: string;
};

const suppliersData: Record<string, Supplier[]> = {
  wood: [
    { name: "RESHAWood – Faith Lumber Pvt. Ltd.", folderKey: "reshawood", phone: "+91 63527 64483", website: "https://reshawood.com/", location: "Gandhidham, Gujarat & Mundka, New Delhi" },
    { name: "Jagdev Saw Mills", folderKey: "jagdev", location: "Sirsa, Haryana" },
    { name: "Typical Teak", folderKey: "typicalteak", location: "Calicut, Kerala" },
    { name: "Ashok Industries", folderKey: "ashok", location: "Bokaro Steel City, Jharkhand & Kolkata" },
    { name: "Balaji Timber Depot", folderKey: "balaji", location: "Bengaluru" },
  ],
  iron: [
    { name: "Jindal Steel & Power Ltd.", folderKey: "jindal", website: "https://dir.indiamart.com/hyderabad/iron-tmt-bar.html", location: "Faridabad" },
    { name: "JSW Steel Ltd.", folderKey: "jswsteel", website: "https://dir.indiamart.com/hyderabad/iron-tmt-bar.html", location: "Mumbai" },
    { name: "Ms Agarwal Foundries Pvt. Ltd.", folderKey: "agarwal", location: "Ranigunj, Secunderabad" },
    { name: "Sri Padmavathi Steel Traders", folderKey: "padmavathi", location: "Kukatpally, Hyderabad" },
    { name: "Krishna Enterprises", folderKey: "krishna", location: "Bala Nagar, Hyderabad" },
  ],
  cement: [
    { name: "UltraTech Cement Ltd.", folderKey: "ultratechcement", website: "https://www.ultratechcement.com/", location: "Mumbai" },
    { name: "Ambuja Cements Ltd.", folderKey: "ambuja", website: "https://www.ambujacement.com/", location: "Mumbai" },
    { name: "ACC Ltd.", folderKey: "acc", website: "https://www.acclimited.com/", location: "Thane" },
    { name: "Shree Cement Ltd.", folderKey: "shreecement", website: "https://www.shreecement.com/", location: "Rajasthan" },
    { name: "Dalmia Bharat Ltd.", folderKey: "dalmia", website: "https://www.dalmiacement.com/", location: "Tamil Nadu" },
  ],
  sand: [
    { name: "Thriveni Earthmovers Pvt. Ltd.", folderKey: "thriveni", website: "https://www.expertmarketresearch.com/blogs/top-sand-companies-in-india", location: "Tamil Nadu" },
    { name: "Robo Silicon Pvt. Ltd.", folderKey: "robosand", website: "https://www.robo.co.in/", location: "Hyderabad" },
    { name: "Tavara Mines & Minerals", folderKey: "tavara", website: "https://www.expertmarketresearch.com/blogs/top-sand-companies-in-india", location: "Bangalore" },
    { name: "Ambuja Cements Ltd.", folderKey: "ambujasand", website: "https://www.ambujacement.com/", location: "Mumbai" },
    { name: "POABS Group", folderKey: "poabs", website: "https://www.expertmarketresearch.com/blogs/top-sand-companies-in-india", location: "Kerala" },
  ],
  bricks: [
    { name: "Pioneer Bricks Pvt. Ltd.", folderKey: "pioneer", phone: "+91 98109 81285", website: "https://list.ly/list/2vXI-best-bricks-company-in-india", location: "Gurgaon, Haryana" },
    { name: "Jindal Mechno Bricks Pvt. Ltd.", folderKey: "jindalbricks", website: "https://fliarbi.com/market.ai/india/list/bricks/", location: "Pan India" },
    { name: "Brickwell", folderKey: "brickwell", website: "https://ensun.io/search/brick/india", location: "Hyderabad" },
    { name: "Harden Bricks Pvt. Ltd.", folderKey: "harden", phone: "+91 80171 15070", location: "Howrah, West Bengal" },
    { name: "Greenway Building Materials India Pvt. Ltd.", folderKey: "greenway", location: "Paritala Village, Andhra Pradesh" },
  ],
};

const supplierBorderMap: Record<string, string> = {
  reshawood: "border-green-500",
  jagdev: "border-teal-500",
  typicalteak: "border-yellow-500",
  ashok: "border-indigo-500",
  balaji: "border-red-500",
};

const SupplierList = () => {
  const { category } = useParams(); // ✅ from URL
  const navigate = useNavigate();

  const material = category?.toLowerCase() || "wood"; // fallback default
  const suppliers = suppliersData[material] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        🏢 Suppliers for {material.toUpperCase()}
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier, idx) => {
          const borderColor = supplierBorderMap[supplier.folderKey] || "border-blue-500";

          return (
            <div
              key={idx}
              onClick={() => navigate(`/subtypes/${material}/${supplier.folderKey}`)}
              className={`cursor-pointer bg-white rounded-2xl border-l-4 ${borderColor} border border-gray-300 p-6 sm:p-8 shadow-md hover:shadow-2xl hover:bg-blue-100 hover:border-black hover:scale-105 transition-all duration-300 ease-in-out min-h-[220px] flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-600`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/subtypes/${material}/${supplier.folderKey}`);
              }}
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">{supplier.name}</h2>
                {supplier.phone && <p className="text-sm text-gray-700">📞 {supplier.phone}</p>}
                {supplier.location && <p className="text-sm text-gray-700">📍 {supplier.location}</p>}
                {supplier.website && (
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-purple-600 hover:underline inline-block mt-2"
                  >
                    🔗 Website
                  </a>
                )}
              </div>
              <p className="text-xs text-gray-600 italic mt-4">
                👆 Click to view {material} types
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupplierList;
