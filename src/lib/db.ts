import fs from "fs";
import path from "path";
import { STARTER_CATEGORIES, STARTER_PRODUCTS, StarterProduct } from "./starter-catalog";
import { EGYPT_GOVERNORATES } from "./egypt-locations";
import { EGYPT_PAYMENT_METHODS } from "./payments";
import { THEME_PRESETS, RoohThemeTokens } from "./theme";

// State persistence file
const DATA_FILE = path.join(process.cwd(), "rooh_state.json");

export interface StoredOrder {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  governorate: string;
  district?: string;
  city: string;
  address: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  codFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  orderStatus: "NEW" | "PENDING_CONFIRMATION" | "CONFIRMED" | "PREPARING" | "READY_FOR_DISPATCH" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED" | "RETURNED";
  paymentReceiptUrl?: string;
  notes?: string;
  items: {
    productId: string;
    productNameAr: string;
    productNameEn: string;
    quantity: number;
    unitPrice: number;
    purchaseCost: number;
    totalPrice: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface StoredApproval {
  id: string;
  requestType: "REFUND" | "EXPENSE" | "PRICE_CHANGE" | "SALARY_CHANGE" | "STOCK_ADJUSTMENT" | "DELETE_RECORD" | "CRITICAL_SETTINGS";
  targetEntity: string;
  targetEntityId?: string;
  previousValue?: string;
  proposedValue?: string;
  financialImpact?: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  requestedByName: string;
  approvedByName?: string;
  reviewNotes?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface StoredMessage {
  id: string;
  conversationId: string;
  senderType: "CUSTOMER" | "AGENT" | "OWNER" | "SYSTEM";
  senderName: string;
  messageText: string;
  messageType: "TEXT" | "AUDIO" | "IMAGE" | "ATTACHMENT";
  mediaUrl?: string;
  durationSeconds?: number;
  isRead: boolean;
  createdAt: string;
}

export interface StoredConversation {
  id: string;
  customerName: string;
  customerPhone?: string;
  type: "CUSTOMER_SUPPORT" | "INTERNAL_TEAM";
  status: "OPEN" | "ASSIGNED" | "RESOLVED" | "CLOSED";
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredAuditLog {
  id: string;
  userEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details: string;
  createdAt: string;
}

export interface StoredEmployee {
  id: string;
  name: string;
  title: string;
  phone: string;
  branchName: string;
  salaryType: "MONTHLY" | "DAILY" | "HOURLY";
  baseSalary: number;
  commissionRate: number;
  status: "ACTIVE" | "ON_LEAVE" | "TERMINATED";
  createdAt: string;
}

export interface StoredExpense {
  id: string;
  title: string;
  category: "RENT" | "UTILITIES" | "MARKETING" | "SALARY" | "SHIPPING" | "PACKAGING" | "MAINTENANCE" | "OTHER";
  amount: number;
  branchName: string;
  date: string;
  description: string;
}

export interface AppState {
  products: (StarterProduct & { stock: number; status: "DRAFT" | "PUBLISHED" | "ARCHIVED" })[];
  categories: typeof STARTER_CATEGORIES;
  orders: StoredOrder[];
  approvals: StoredApproval[];
  conversations: StoredConversation[];
  messages: StoredMessage[];
  auditLogs: StoredAuditLog[];
  employees: StoredEmployee[];
  expenses: StoredExpense[];
  activeThemeName: string;
  activeThemeTokens: RoohThemeTokens;
  shippingZones: typeof EGYPT_GOVERNORATES;
  paymentMethods: typeof EGYPT_PAYMENT_METHODS;
  aiSettings: {
    ownerAssistantEnabled: boolean;
    customerSupportEnabled: boolean;
    customerWelcomeAr: string;
    customerWelcomeEn: string;
  };
}

function getInitialState(): AppState {
  return {
    products: STARTER_PRODUCTS.map((p) => ({
      ...p,
      stock: 45,
      status: "PUBLISHED" as const,
    })),
    categories: STARTER_CATEGORIES,
    orders: [], // Clean business start: 0 orders, 0 sales, 0 revenue
    approvals: [],
    conversations: [
      {
        id: "conv-welcome",
        customerName: "عميل تجريبي",
        customerPhone: "01000000000",
        type: "CUSTOMER_SUPPORT",
        status: "OPEN",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-welcome",
        senderType: "SYSTEM",
        senderName: "رُوح بوت",
        messageText: "أهلاً بك في رُوح للعناية والجمال. كيف يمكننا مساعدتك اليوم؟",
        messageType: "TEXT",
        isRead: true,
        createdAt: new Date().toISOString(),
      },
    ],
    auditLogs: [
      {
        id: "log-init",
        userEmail: "abdo_admin",
        action: "INITIALIZATION",
        entity: "SYSTEM",
        details: "تهيئة النظام النظيف لعلامة رُوح بنجاح",
        createdAt: new Date().toISOString(),
      },
    ],
    employees: [
      {
        id: "emp-1",
        name: "عبد الرحمن المدير",
        title: "مالك ومدير تنفيذي",
        phone: "01012345678",
        branchName: "الفرع الرئيسي - الإسكندرية",
        salaryType: "MONTHLY",
        baseSalary: 15000,
        commissionRate: 5,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
      {
        id: "emp-2",
        name: "مروة حسن",
        title: "أخصائية خدمة عملاء وتجميل",
        phone: "01123456789",
        branchName: "فرع القاهرة - التجمع",
        salaryType: "MONTHLY",
        baseSalary: 6500,
        commissionRate: 2,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
    ],
    expenses: [],
    activeThemeName: "luxury_olive",
    activeThemeTokens: THEME_PRESETS.luxury_olive.tokens,
    shippingZones: EGYPT_GOVERNORATES,
    paymentMethods: EGYPT_PAYMENT_METHODS,
    aiSettings: {
      ownerAssistantEnabled: true,
      customerSupportEnabled: true,
      customerWelcomeAr: "مرحباً بك في رُوح! أنا مستشارك الذكي للعناية والجمال، كيف أساعدك اليوم في اختيار المنتج الأنسب لبشرتك؟",
      customerWelcomeEn: "Welcome to ROOH! I am your smart beauty advisor. How may I assist you today in finding the ideal product for your skin?",
    },
  };
}

export function loadState(): AppState {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading state file, using initial state:", err);
  }

  const initial = getInitialState();
  saveState(initial);
  return initial;
}

export function saveState(state: AppState): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing state file:", err);
  }
}

// Helper query operations
export const roohDb = {
  getState: () => loadState(),
  
  // Products
  getProducts: () => loadState().products,
  getProductBySlug: (slug: string) => loadState().products.find((p) => p.slug === slug),
  saveProduct: (product: StarterProduct & { stock: number; status: "DRAFT" | "PUBLISHED" | "ARCHIVED" }) => {
    const state = loadState();
    const index = state.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      state.products[index] = product;
    } else {
      state.products.push(product);
    }
    saveState(state);
    return product;
  },
  deleteProduct: (id: string) => {
    const state = loadState();
    state.products = state.products.filter((p) => p.id !== id);
    saveState(state);
  },

  // Orders
  getOrders: () => loadState().orders,
  createOrder: (orderData: Omit<StoredOrder, "id" | "orderNumber" | "invoiceNumber" | "createdAt" | "updatedAt">) => {
    const state = loadState();
    const orderIndex = state.orders.length + 1;
    const orderNumber = `ROOH-EG-${new Date().getFullYear()}-${String(orderIndex).padStart(4, "0")}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(orderIndex).padStart(4, "0")}`;
    
    const newOrder: StoredOrder = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber,
      invoiceNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Deduct stock
    for (const item of newOrder.items) {
      const prod = state.products.find((p) => p.id === item.productId);
      if (prod && prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
      }
    }

    state.orders.unshift(newOrder);

    // Audit log
    state.auditLogs.unshift({
      id: `log_${Date.now()}`,
      userEmail: newOrder.customerEmail || newOrder.customerPhone,
      action: "CREATE_ORDER",
      entity: "ORDER",
      entityId: newOrder.orderNumber,
      details: `طلب جديد بقيمة ${newOrder.totalAmount} ج.م للدفع بواسطة ${newOrder.paymentMethod}`,
      createdAt: new Date().toISOString(),
    });

    saveState(state);
    return newOrder;
  },
  updateOrderStatus: (orderId: string, status: StoredOrder["orderStatus"], paymentStatus?: StoredOrder["paymentStatus"]) => {
    const state = loadState();
    const order = state.orders.find((o) => o.id === orderId);
    if (order) {
      order.orderStatus = status;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      order.updatedAt = new Date().toISOString();
      saveState(state);
    }
    return order;
  },

  // Financial Stats (Calculated on real DB data)
  getFinancialSummary: () => {
    const state = loadState();
    const orders = state.orders;
    const totalOrdersCount = orders.length;
    const deliveredOrders = orders.filter((o) => o.orderStatus === "DELIVERED" || o.paymentStatus === "PAID");

    const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalCogs = deliveredOrders.reduce((sum, o) => {
      const itemCost = o.items.reduce((s, it) => s + (it.purchaseCost * it.quantity), 0);
      return sum + itemCost;
    }, 0);
    const totalExpenses = state.expenses.reduce((sum, e) => sum + e.amount, 0);
    const grossProfit = totalRevenue - totalCogs;
    const netProfit = grossProfit - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return {
      totalOrdersCount,
      totalRevenue,
      totalCogs,
      totalExpenses,
      grossProfit,
      netProfit,
      profitMargin: Number(profitMargin.toFixed(1)),
      pendingOrdersCount: orders.filter((o) => o.orderStatus === "NEW" || o.orderStatus === "PENDING_CONFIRMATION").length,
    };
  },

  // Approvals
  getApprovals: () => loadState().approvals,
  createApproval: (approval: Omit<StoredApproval, "id" | "createdAt" | "status">) => {
    const state = loadState();
    const newApproval: StoredApproval = {
      ...approval,
      id: `appr_${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    state.approvals.unshift(newApproval);
    saveState(state);
    return newApproval;
  },
  resolveApproval: (id: string, status: "APPROVED" | "REJECTED", notes?: string, approvedBy = "abdo_admin") => {
    const state = loadState();
    const appr = state.approvals.find((a) => a.id === id);
    if (appr) {
      appr.status = status;
      appr.reviewNotes = notes;
      appr.approvedByName = approvedBy;
      appr.reviewedAt = new Date().toISOString();
      saveState(state);
    }
    return appr;
  },

  // Theme & Design Studio
  getThemeTokens: () => loadState().activeThemeTokens,
  getActiveThemeName: () => loadState().activeThemeName,
  updateThemeTokens: (tokens: RoohThemeTokens, themeName?: string) => {
    const state = loadState();
    state.activeThemeTokens = tokens;
    if (themeName) state.activeThemeName = themeName;
    saveState(state);
    return state.activeThemeTokens;
  },

  // Messages
  getMessages: (conversationId: string) => {
    return loadState().messages.filter((m) => m.conversationId === conversationId);
  },
  addMessage: (message: Omit<StoredMessage, "id" | "createdAt" | "isRead">) => {
    const state = loadState();
    const newMsg: StoredMessage = {
      ...message,
      id: `msg_${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    state.messages.push(newMsg);
    saveState(state);
    return newMsg;
  },
};

