import React, { useState } from "react";
import { Plus, Home, Users, CreditCard, Calendar, Search, Filter, MoreHorizontal, Phone, Mail, MapPin, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Link } from "react-router";

import AddTenant from "./AddTenant";
import AddPayment from "./AddPayment";

const Navbar = () => {
  return (
    <div>
      <AddTenant/>
      <AddPayment/>
      {/* Header */}
      <div className="shadow-xl">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
              <div className="items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <Home className="w-7 h-7" />
                  <h1 className="text-2xl font-bold">LandlordHub</h1>
                </Link>
              </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Navbar;
