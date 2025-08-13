// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Orders from "../pages/Orders";
import AddOrder from "../pages/AddOrder";
import SupplierList from "../pages/SupplierList";
import SubtypeGallery from "../pages/SubtypeGallery";
import Callback from "../pages/Callback";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      

      {/* Private Routes */}
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-order/:material/:supplierName"
        element={
          <PrivateRoute>
            <AddOrder />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers/:category"
        element={
          <PrivateRoute>
            <SupplierList />
          </PrivateRoute>
        }
      />
      <Route
        path="/subtypes/:type/:supplier"
        element={
          <PrivateRoute>
            <SubtypeGallery />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;



