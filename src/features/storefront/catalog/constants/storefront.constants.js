export const STOREFRONT_GREETING_TIMES = {
  MORNING: { start: 5, end: 11 },
  NOON: { start: 11, end: 14 },
  AFTERNOON: { start: 14, end: 18 },
  EVENING: { start: 18, end: 24 },
};

export const getGreetingByHour = (hour) => {
  if (
    hour >= STOREFRONT_GREETING_TIMES.MORNING.start &&
    hour < STOREFRONT_GREETING_TIMES.NOON.start
  ) {
    return {
      icon: "☀️",
      message: "Chào buổi sáng",
    };
  }
  if (
    hour >= STOREFRONT_GREETING_TIMES.NOON.start &&
    hour < STOREFRONT_GREETING_TIMES.AFTERNOON.start
  ) {
    return {
      icon: "🍲",
      message: "Chào buổi trưa",
    };
  }
  if (
    hour >= STOREFRONT_GREETING_TIMES.AFTERNOON.start &&
    hour < STOREFRONT_GREETING_TIMES.EVENING.start
  ) {
    return {
      icon: "☕",
      message: "Chào buổi chiều",
    };
  }
  return {
    icon: "🌙",
    message: "Chào buổi tối",
  };
};

export const STOREFRONT_ACTION_BUTTONS = [
  {
    id: "call-payment",
    label: "Gọi thanh toán",
    icon: "💳",
    color: "from-green-400 to-green-600",
  },
  {
    id: "call-staff",
    label: "Gọi nhân viên",
    icon: "👤",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "send-request",
    label: "Gửi tin nhắn yêu cầu",
    icon: "💬",
    color: "from-purple-400 to-purple-600",
  },
];

export const STOREFRONT_BANNERS = [
  {
    id: 1,
    title: "Khuyến mãi tháng này",
    description: "Giảm 20% cho hóa đơn trên 500k",
  },
  {
    id: 2,
    title: "Món đặc biệt hôm nay",
    description: "Không thể bỏ qua các tinh hoa ẩm thực",
  },
  {
    id: 3,
    title: "Combo gia đình",
    description: "Tiết kiệm tới 30% khi mua combo",
  },
];
