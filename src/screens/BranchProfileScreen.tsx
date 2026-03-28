import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  MapPin,
  Clock,
  Info,
  CheckCircle2,
  User as UserIcon,
} from "lucide-react";
import { api, MOCK_USER } from "../services/api";
import { Branch, Service, Staff } from "../types";
import { motion, AnimatePresence } from "motion/react";

export const BranchProfileScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [branch, setBranch] = useState<Branch | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [step, setStep] = useState(1); // 1: Service, 2: Staff, 3: Confirm

  useEffect(() => {
    if (id) {
      api.getBranch(id).then(({ services = [], staffs = [], ...branch }) => {
        setBranch(branch);
        setServices(services);
        setStaffs(staffs);
      });
    }
  }, [id]);

  const handleBooking = async () => {
    if (branch && selectedService && selectedStaff) {
      const user: any = localStorage.getItem("user");
      const { prepayId, signType, sign, orderInfo, appointmentId } =
        await api.createBooking({
          customerId: user?.id,
          branchId: branch.id,
          serviceId: selectedService.id,
          staffId: selectedStaff.id,
          date: new Date().toISOString().split("T")[0],
          time: "14:30",
          amount: selectedService.price + 200,
        });

      window.ma?.callNativeAPI?.(
        "startPay",
        {
          prepayId,
          orderInfo,
          sign,
          signType,
          useMiniResultFlag: true, // Unified Payment Success Page
        },
        (res: any) => {
          console.log("finish pay", res);
          navigate(`/queue/${appointmentId}`);
        },
      );
    }
  };

  if (!branch) return null;

  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Hero */}
        <div className="relative h-64">
          <img
            src={
              branch.image ??
              "https://unsplash.com/photos/a-woman-getting-her-hair-done-in-a-salon-lK8oXGycy88"
            }
            alt={branch.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-5 p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 cursor-pointer active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h1 className="text-2xl font-bold mb-1">{branch.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{branch.rating}</span>
                <span className="opacity-70">(120 reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>15 min wait</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs / Steps */}
        <div className="flex border-b border-gray-100 px-5 sticky top-0 bg-white z-20">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                step === s
                  ? "text-kbz-primary border-b-2 border-kbz-primary"
                  : "text-gray-400"
              }`}
            >
              {s === 1 ? "Service" : s === 2 ? "Staff" : "Confirm"}
            </div>
          ))}
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="font-bold text-gray-900 mb-2">Select Service</h3>
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      setStep(2);
                    }}
                    className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
                      selectedService?.id === s.id
                        ? "border-kbz-primary bg-blue-50"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">{s.name}</h4>
                      <p className="text-xs text-gray-500">
                        {s.duration} mins • {s.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-kbz-primary">
                        {s.price.toLocaleString()} Ks
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">Select Staff</h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-kbz-primary font-bold cursor-pointer"
                  >
                    Back
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {staffs.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedStaff(st);
                        setStep(3);
                      }}
                      className={`flex flex-col items-center p-4 rounded-3xl border transition-all cursor-pointer active:scale-95 ${
                        selectedStaff?.id === st.id
                          ? "border-kbz-primary bg-blue-50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-white shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <h4 className="font-bold text-sm text-gray-900">
                        {st.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 mb-2">
                        {st.role}
                      </p>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                        <Star
                          size={10}
                          className="text-yellow-500 fill-yellow-500"
                        />
                        <span className="text-[10px] font-bold text-yellow-700">
                          {st.rating}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">Booking Summary</h3>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-kbz-primary font-bold cursor-pointer"
                  >
                    Back
                  </button>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 space-y-4 border border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-kbz-primary">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                        Service
                      </p>
                      <p className="font-bold text-gray-900">
                        {selectedService?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                      <UserIcon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                        Staff
                      </p>
                      <p className="font-bold text-gray-900">
                        {selectedStaff?.name}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="font-bold">
                        {selectedService?.price.toLocaleString()} Ks
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Booking Fee (MDR)</span>
                      <span className="font-bold">200 Ks</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Total to Pay Now</span>
                      <span className="text-kbz-primary">200 Ks</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 italic">
                      Remaining balance to be paid at the branch.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 border border-blue-100">
                  <Info size={20} className="text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Smart Q ensures you don't wait. We'll notify you 15 mins
                    before your turn. No-shows within 10 mins of call will
                    forfeit the booking fee.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Button */}
      {step === 3 && (
        <div className="absolute bottom-8 left-0 right-0 px-5 z-30">
          <button
            onClick={handleBooking}
            className="w-full bg-kbz-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
          >
            Pay 200 Ks & Get Token
          </button>
        </div>
      )}
    </div>
  );
};
