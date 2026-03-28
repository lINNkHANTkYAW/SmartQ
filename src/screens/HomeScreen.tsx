import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  ChevronRight,
  Bell,
  Wallet,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import { api, MOCK_BRANCHES, MOCK_USER } from "../services/api";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import { BottomNav } from "../components/BottomNav";

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    window.ma?.getAuthCode({
      scopes: ["USER_NICKNAME", "PLAINTEXT_MOBILE_PHONE"],
      success: async ({ authCode }) => {
        const user = await api.autologin(authCode);
        setUser(user);
        localStorage.setItem("user", user);
        const branches = await api.getBranches();
        setBranches(branches);
        setLoading(false);
      },
      faild: (err) => {
        console.log("err", err);
        setLoading(false);
      },
    });
  }, []);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Header */}
        <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {t("welcomeBack")}
              </p>
              <h1 className="text-xl font-bold text-gray-900">
                {user.name ?? "Anonymous"}
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/notifications")}
                className="p-2 bg-gray-50 rounded-full relative cursor-pointer active:scale-90 transition-transform"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Link
                to="/loyalty"
                className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 active:scale-95 transition-transform"
              >
                <Wallet size={16} className="text-kbz-primary" />
                <span className="text-sm font-bold text-kbz-secondary">
                  {user.loyaltyPoints ?? 0}
                </span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              onFocus={() => alert("Search functionality coming soon!")}
              className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-kbz-primary transition-all cursor-pointer"
            />
          </div>
        </header>

        {/* Quick Stats / Active Token */}
        <section className="px-5 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-kbz-primary to-kbz-secondary rounded-3xl p-5 text-white shadow-lg shadow-blue-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">
                  {t("activeQueue")}
                </p>
                <h2 className="text-2xl font-bold">{t("noActiveToken")}</h2>
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-blue-50 text-sm mb-4">
              Book a service to get your smart queue token.
            </p>
            <button
              onClick={() => {
                const firstBranch = branches[0];
                if (firstBranch) navigate(`/branch/${firstBranch.id}`);
              }}
              className="w-full bg-white text-kbz-primary font-bold py-2.5 rounded-xl text-sm active:scale-95 transition-transform cursor-pointer"
            >
              {t("bookNow")}
            </button>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="px-5 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">{t("categories")}</h3>
            <button
              onClick={() => navigate("/categories")}
              className="text-xs font-bold text-kbz-primary uppercase tracking-wider cursor-pointer"
            >
              {t("seeAll")}
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {["Hair", "Nails", "Massage", "Facial", "Spa"].map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center active:scale-90 transition-transform">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg"></div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {t(cat.toLowerCase())}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Nearby Branches */}
        <section className="px-5 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">{t("nearbyForYou")}</h3>
            <button
              onClick={() => navigate("/map")}
              className="text-xs font-bold text-kbz-primary uppercase tracking-wider cursor-pointer"
            >
              {t("viewMap")}
            </button>
          </div>
          <div className="space-y-4">
            {branches.map((branch) => (
              <Link
                to={`/branch/${branch.id}`}
                key={branch.id}
                className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div className="relative h-40">
                  <img
                    src={
                      branch.image ?? "https://picsum.photos/seed/glow/100/100"
                    }
                    alt={branch.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="text-[10px] font-bold">
                      {branch.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-kbz-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    OPEN
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900">{branch.name}</h4>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                      {branch.distance ?? ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 mb-3">
                    <MapPin size={12} />
                    <span className="text-xs truncate">{branch.address}</span>
                  </div>
                  <div className="flex gap-2">
                    {(branch.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Nav Mock */}
      <BottomNav />
    </div>
  );
};
