import { equipmentList, requestList } from "../data/mockData";

const USERS_KEY = "elpUsers";
const CURRENT_USER_KEY = "elpUser";
const EQUIPMENT_KEY = "elpEquipment";
const REQUESTS_KEY = "elpRequests";

const defaultUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@school.com",
    password: "admin123",
    role: "ADMIN"
  },
  {
    id: 2,
    name: "Student User",
    email: "student@school.com",
    password: "student123",
    role: "STUDENT"
  },
  {
    id: 3,
    name: "Staff User",
    email: "staff@school.com",
    password: "staff123",
    role: "STAFF"
  }
];

export function initializeStorage() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(EQUIPMENT_KEY)) {
    localStorage.setItem(EQUIPMENT_KEY, JSON.stringify(equipmentList));
  }

  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requestList));
  }
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(userData) {
  const users = getUsers();

  const exists = users.some(
    (user) => user.email.toLowerCase() === userData.email.toLowerCase()
  );

  if (exists) {
    throw new Error("Email already registered.");
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
}

export function loginUser(email, password, role) {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password &&
      item.role === role
  );

  if (!user) {
    throw new Error("Invalid email, password, or role.");
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return safeUser;
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getEquipment() {
  return JSON.parse(localStorage.getItem(EQUIPMENT_KEY) || "[]");
}

export function saveEquipment(items) {
  localStorage.setItem(EQUIPMENT_KEY, JSON.stringify(items));
}

export function addEquipment(item) {
  const items = getEquipment();

  const newItem = {
    id: Date.now(),
    name: item.name,
    category: item.category,
    condition: item.condition,
    quantity: Number(item.quantity),
    available: Number(item.available),
    image:
      item.image ||
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=900&auto=format&fit=crop"
  };

  items.push(newItem);
  saveEquipment(items);

  return newItem;
}

export function deleteEquipment(id) {
  const items = getEquipment().filter((item) => item.id !== id);
  saveEquipment(items);
}

export function getRequests() {
  return JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]");
}

export function saveRequests(requests) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function createBorrowRequest(equipmentId) {
  const user = getCurrentUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const items = getEquipment();
  const equipment = items.find((item) => item.id === equipmentId);

  if (!equipment) {
    throw new Error("Equipment not found.");
  }

  if (equipment.available <= 0) {
    throw new Error("Equipment is not available.");
  }

  const existingPending = getRequests().find(
    (request) =>
      request.equipmentId === equipmentId &&
      request.userId === user.id &&
      request.status === "Pending"
  );

  if (existingPending) {
    throw new Error("You already have a pending request for this item.");
  }

  const requests = getRequests();

  const newRequest = {
    id: Date.now(),
    equipmentId: equipment.id,
    equipmentName: equipment.name,
    userId: user.id,
    requestedBy: user.name,
    role: user.role,
    date: new Date().toISOString().slice(0, 10),
    status: "Pending"
  };

  requests.unshift(newRequest);
  saveRequests(requests);

  return newRequest;
}

export function updateRequestStatus(requestId, status) {
  const requests = getRequests();
  const items = getEquipment();

  const updatedRequests = requests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    return {
      ...request,
      status
    };
  });

  const request = requests.find((item) => item.id === requestId);

  if (request && status === "Approved") {
    const updatedItems = items.map((item) => {
      if (item.id === request.equipmentId && item.available > 0) {
        return {
          ...item,
          available: item.available - 1
        };
      }

      return item;
    });

    saveEquipment(updatedItems);
  }

  if (request && status === "Returned") {
    const updatedItems = items.map((item) => {
      if (item.id === request.equipmentId && item.available < item.quantity) {
        return {
          ...item,
          available: item.available + 1
        };
      }

      return item;
    });

    saveEquipment(updatedItems);
  }

  saveRequests(updatedRequests);
}