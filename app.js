/**
 * ศูนย์สุขภาพมหาวิทยาลัยเชียงใหม่ “ไผ่ล้อม”
 * ระบบติดตามงานและดูแลพื้นที่
 * Institutional & Professional Task Tracking System with Authentication & RBAC
 */

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'phailom_users_v2',
  SESSION: 'phailom_session_v2',
  AREAS: 'phailom_areas_v2',
  TASKS: 'phailom_tasks_v2',
  BINS: 'phailom_bins_v2',
  HISTORY: 'phailom_history_v2',
  SETTINGS: 'phailom_settings_v2',
  LAST_DOER: 'phailom_last_doer'
};

// Default Initial Accounts (No public registration, provisioned by admin)
const DEFAULT_USERS = [
  {
    id: 'user_admin_phailom',
    username: 'admin',
    display_name: 'ผู้ดูแลระบบ (Admin)',
    role: 'admin',
    active: true,
    password_hash: 'admin1234', // Prototype storage; replace with server-side bcrypt / Supabase Auth for production
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z'
  },
  {
    id: 'user_staff_somsri',
    username: 'staff',
    display_name: 'สมศรี มีสุข (ผู้ปฏิบัติงาน)',
    role: 'staff',
    active: true,
    password_hash: 'staff1234',
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z'
  }
  {
    id: 'user_staff_somsri',
    username: 'kaung',
    display_name: 'กองแลง (ผู้ปฏิบัติงาน)',
    role: 'staff',
    active: true,
    password_hash: 'kaung1234',
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z'
  }
];

// Thai Months
const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

// Master Areas Catalog
const DEFAULT_AREAS = [
  { id: 'area_exam_1', name: 'ห้องตรวจ 1', category: 'ห้องตรวจ' },
  { id: 'area_exam_2', name: 'ห้องตรวจ 2', category: 'ห้องตรวจ' },
  { id: 'area_exam_3', name: 'ห้องตรวจ 3', category: 'ห้องตรวจ' },
  { id: 'area_exam_4', name: 'ห้องตรวจ 4', category: 'ห้องตรวจ' },
  { id: 'area_exam_5', name: 'ห้องตรวจ 5', category: 'ห้องตรวจ' },
  { id: 'area_exam_6', name: 'ห้องตรวจ 6', category: 'ห้องตรวจ' },
  { id: 'area_exam_7', name: 'ห้องตรวจ 7', category: 'ห้องตรวจ' },
  { id: 'area_isolate_1', name: 'ห้องแยก 1', category: 'ห้องอื่น' },
  { id: 'area_hall', name: 'ห้องโถง', category: 'ห้องอื่น' },
  { id: 'area_pharmacy', name: 'ห้องยา', category: 'ห้องอื่น' },
  { id: 'area_wound', name: 'ห้องทำแผล', category: 'ห้องอื่น' },
  { id: 'area_blood', name: 'ห้องเจาะเลือด', category: 'ห้องอื่น' },
  { id: 'area_door_1', name: 'ประตู 1', category: 'จุดอื่น' },
  { id: 'area_door_2', name: 'ประตู 2', category: 'จุดอื่น' },
  { id: 'area_door_3', name: 'ประตู 3', category: 'จุดอื่น' },
  { id: 'area_door_4', name: 'ประตู 4', category: 'จุดอื่น' },
  { id: 'area_spot_1', name: 'จุดที่ 1', category: 'จุดอื่น' },
  { id: 'area_spot_5', name: 'จุดที่ 5', category: 'จุดอื่น' },
  { id: 'area_central', name: 'จุดรวม', category: 'จุดอื่น' }
];

// Master Trash Bins Database
const DEFAULT_BINS = [
  { areaId: 'area_hall', areaName: 'ห้องโถง', black: 4, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_exam_1', areaName: 'ห้องตรวจ 1', black: 1, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_exam_2', areaName: 'ห้องตรวจ 2', black: 1, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_exam_3', areaName: 'ห้องตรวจ 3', black: 1, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_exam_4', areaName: 'ห้องตรวจ 4', black: 1, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_exam_5', areaName: 'ห้องตรวจ 5', black: 1, red: 1, green: 1, yellow: 0 },
  { areaId: 'area_exam_6', areaName: 'ห้องตรวจ 6', black: 1, red: 1, green: 1, yellow: 0 },
  { areaId: 'area_exam_7', areaName: 'ห้องตรวจ 7', black: 3, red: 2, green: 0, yellow: 0 },
  { areaId: 'area_isolate_1', areaName: 'ห้องแยก 1', black: 1, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_spot_5', areaName: 'จุดที่ 5', black: 2, red: 0, green: 0, yellow: 0 },
  { areaId: 'area_spot_1', areaName: 'จุดที่ 1', black: 3, red: 0, green: 1, yellow: 0 },
  { areaId: 'area_blood', areaName: 'ห้องเจาะเลือด', black: 2, red: 1, green: 0, yellow: 0 },
  { areaId: 'area_wound', areaName: 'ห้องทำแผล', black: 4, red: 5, green: 1, yellow: 1 }
];

// Helper: Get Today's Date in ISO format (YYYY-MM-DD)
function getTodayISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper: Add Days to ISO date string
function addDays(isoDate, days) {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + parseInt(days, 10));
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper: Format Thai Date
function formatThaiDate(isoDate, short = true) {
  if (!isoDate) return '-';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const year = parseInt(parts[0], 10) + 543;
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const monthStr = short ? THAI_MONTHS_SHORT[monthIndex] : THAI_MONTHS[monthIndex];
  return `${day} ${monthStr} ${year}`;
}

function formatThaiMonthYear(yearMonthStr) {
  if (!yearMonthStr) return '-';
  const [yearStr, monthStr] = yearMonthStr.split('-');
  const yearBE = parseInt(yearStr, 10) + 543;
  const monthIndex = parseInt(monthStr, 10) - 1;
  return `${THAI_MONTHS[monthIndex]} ${yearBE}`;
}

// Default Tasks Generator
function generateDefaultTasks() {
  const today = getTodayISO();
  const tasks = [];
  const nowISO = new Date().toISOString();

  const createTaskItem = (id, title, areaId, areaName, frequency, frequencyDays, category, description) => ({
    id,
    title,
    area: areaName,
    areaId,
    areaName,
    recurrence: frequency,
    frequency,
    frequencyDays,
    last_completed_at: null,
    lastCompletedDate: null,
    next_due_at: today,
    nextDueDate: today,
    status: 'pending',
    assigned_user: '',
    notes: '',
    category,
    description,
    created_at: nowISO,
    updated_at: nowISO
  });

  // 1. กวาดหยากไย่ (8 ห้อง)
  const spiderAreas = [
    { id: 'area_exam_1', name: 'ห้องตรวจ 1' },
    { id: 'area_exam_2', name: 'ห้องตรวจ 2' },
    { id: 'area_exam_3', name: 'ห้องตรวจ 3' },
    { id: 'area_exam_4', name: 'ห้องตรวจ 4' },
    { id: 'area_exam_5', name: 'ห้องตรวจ 5' },
    { id: 'area_exam_6', name: 'ห้องตรวจ 6' },
    { id: 'area_exam_7', name: 'ห้องตรวจ 7' },
    { id: 'area_hall', name: 'ห้องโถง' }
  ];
  spiderAreas.forEach(a => {
    tasks.push(createTaskItem(`task_spider_${a.id}`, 'กวาดหยากไย่', a.id, a.name, 'biweekly', 14, 'หยากไย่และเพดาน', 'กวาดหยากไย่ตามมุมห้อง เพดาน และหลังตู้'));
  });

  // 2. กวาดใต้โซฟา (ห้องโถง)
  tasks.push(createTaskItem('task_sofa_hall', 'กวาดใต้โซฟา', 'area_hall', 'ห้องโถง', 'biweekly', 14, 'เฟอร์นิเจอร์', 'กวาดและดูดฝุ่นใต้โซฟารับรองในห้องโถง'));

  // 3. ล้าง/ทำความสะอาดถังขยะ (ห้องทำแผล 11 ใบ)
  tasks.push(createTaskItem('task_bins_wound', 'ล้าง/ทำความสะอาดถังขยะ (11 ใบ)', 'area_wound', 'ห้องทำแผล', 'biweekly', 14, 'ถังขยะ', 'ถังขยะ 11 ใบ: ดำ 4, แดง 5, เขียว 1, เหลือง 1 (ฆ่าเชื้อและเช็ดแห้ง)'));

  // 4. ล้าง/ทำความสะอาดถังขยะ (ห้องเจาะเลือด 3 ใบ)
  tasks.push(createTaskItem('task_bins_blood', 'ล้าง/ทำความสะอาดถังขยะ (3 ใบ)', 'area_blood', 'ห้องเจาะเลือด', 'biweekly', 14, 'ถังขยะ', 'ถังขยะ 3 ใบ: ดำ 2, แดง 1 (ฆ่าเชื้อและเช็ดแห้ง)'));

  // 5. ล้างน้ำพรมเช็ดเท้า (ประตู 1-4)
  const doors = [
    { id: 'area_door_1', name: 'ประตู 1' },
    { id: 'area_door_2', name: 'ประตู 2' },
    { id: 'area_door_3', name: 'ประตู 3' },
    { id: 'area_door_4', name: 'ประตู 4' }
  ];
  doors.forEach(d => {
    tasks.push(createTaskItem(`task_carpet_${d.id}`, 'ล้างน้ำพรมเช็ดเท้า (1 ผืน)', d.id, d.name, 'biweekly', 14, 'พรมเช็ดเท้า', 'ล้างฉีดน้ำทำความสะอาดพรมเช็ดเท้า ผึ่งแดดให้แห้งสนิท'));
  });

  // 6. ล้างถังผ้า (3 ถัง)
  tasks.push(createTaskItem('task_cloth_bins', 'ล้างถังผ้า (3 ถัง)', 'area_central', 'จุดรวม', 'biweekly', 14, 'ถังผ้า', 'ล้างทำความสะอาดถังผ้าเปื้อนและถังผ้าส่งซักรวม 3 ถัง'));

  // 7. ล้างถังขยะจุดรวม
  tasks.push(createTaskItem('task_central_bins', 'ล้างถังขยะจุดรวม', 'area_central', 'จุดรวม', 'biweekly', 14, 'ถังขยะ', 'ล้างฉีดน้ำยาฆ่าเชื้อถังขยะพักรวม ณ จุดรวม'));

  // 8. เช็ดถังดับเพลิง (สัปดาห์ละ 1 ครั้ง)
  tasks.push(createTaskItem('task_extinguishers', 'เช็ดถังดับเพลิงและตรวจสอบความพร้อม', 'area_hall', 'ห้องโถง', 'weekly', 7, 'ความปลอดภัย', 'เช็ดทำความสะอาดถังดับเพลิงและตรวจเกจวัดแรงดัน'));

  // 9. เช็ดบนตู้ (เดือนละ 1 ครั้ง)
  const closetAreas = [
    { id: 'area_pharmacy', name: 'ห้องยา' },
    { id: 'area_exam_1', name: 'ห้องตรวจ 1' },
    { id: 'area_exam_2', name: 'ห้องตรวจ 2' },
    { id: 'area_exam_3', name: 'ห้องตรวจ 3' },
    { id: 'area_exam_4', name: 'ห้องตรวจ 4' },
    { id: 'area_exam_5', name: 'ห้องตรวจ 5' },
    { id: 'area_exam_6', name: 'ห้องตรวจ 6' },
    { id: 'area_exam_7', name: 'ห้องตรวจ 7' },
    { id: 'area_isolate_1', name: 'ห้องแยก 1' }
  ];
  closetAreas.forEach(a => {
    tasks.push(createTaskItem(`task_closet_${a.id}`, 'เช็ดบนตู้', a.id, a.name, 'monthly', 30, 'เช็ดหลังตู้', 'เช็ดทำความสะอาดฝุ่นด้านบนตู้เก็บยาและตู้เวชระเบียน'));
  });

  tasks.push(createTaskItem('task_monthly_all_bins', 'ล้างถังขยะประจำเดือนรอบใหญ่', 'area_central', 'จุดรวม', 'monthly', 30, 'ถังขยะ', 'ทำความสะอาดถังขยะรอบใหญ่ทุกจุดในศูนย์สุขภาพไผ่ล้อม'));

  // 10. งานประจำวัน
  tasks.push(createTaskItem('task_daily_trash', 'เก็บขยะและเปลี่ยนถุงขยะทุกห้อง', 'area_hall', 'ห้องโถง', 'daily', 1, 'งานประจำวัน', 'เก็บรวบรวมขยะมูลฝอยและขยะติดเชื้อ เปลี่ยนถุงใหม่ตามสี'));
  tasks.push(createTaskItem('task_daily_mop', 'กวาดและถูพื้นห้องโถงและทางเดิน', 'area_hall', 'ห้องโถง', 'daily', 1, 'งานประจำวัน', 'ถูพื้นด้วยน้ำยาฆ่าเชื้อมาตรฐานโรงพยาบาล'));

  return tasks;
}

// Generate Sample Initial History
function generateSampleHistory() {
  return [
    {
      id: 'hist_sample_1',
      taskId: 'task_spider_area_exam_1',
      title: 'กวาดหยากไย่',
      areaName: 'ห้องตรวจ 1',
      status: 'completed',
      completedDate: addDays(getTodayISO(), -14),
      completedTime: '09:15',
      doer: 'สมศรี มีสุข',
      notes: 'กวาดเรียบร้อยทุกมุม',
      frequency: 'biweekly'
    },
    {
      id: 'hist_sample_2',
      taskId: 'task_bins_wound',
      title: 'ล้าง/ทำความสะอาดถังขยะ (11 ใบ)',
      areaName: 'ห้องทำแผล',
      status: 'completed',
      completedDate: addDays(getTodayISO(), -14),
      completedTime: '14:30',
      doer: 'สมศรี มีสุข',
      notes: 'ฆ่าเชื้อและเช็ดแห้งสะอาดทั้ง 11 ใบ',
      frequency: 'biweekly'
    }
  ];
}

/**
 * Controller Class: PhailomTaskApp
 */
class PhailomTaskApp {
  constructor() {
    this.currentUser = null;
    this.users = [];
    this.areas = [];
    this.tasks = [];
    this.bins = [];
    this.history = [];

    this.currentTab = 'dashboard';
    this.filterFreq = 'all';
    this.filterStatus = 'all';
    this.filterArea = 'all';

    const now = new Date();
    this.calYear = now.getFullYear();
    this.calMonth = now.getMonth();
    this.selectedCalDate = getTodayISO();

    this.init();
  }

  init() {
    this.loadData();
    this.setupEvents();
    this.checkAuth();
  }

  loadData() {
    // 1. Users
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    this.users = storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;
    if (!storedUsers) this.saveUsers();

    // 2. Areas
    const storedAreas = localStorage.getItem(STORAGE_KEYS.AREAS);
    this.areas = storedAreas ? JSON.parse(storedAreas) : DEFAULT_AREAS;
    if (!storedAreas) this.saveAreas();

    // 3. Bins
    const storedBins = localStorage.getItem(STORAGE_KEYS.BINS);
    this.bins = storedBins ? JSON.parse(storedBins) : DEFAULT_BINS;
    if (!storedBins) this.saveBins();

    // 4. Tasks
    const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : generateDefaultTasks();
    this.tasks.forEach(t => {
      if (!t.area) t.area = t.areaName;
      if (!t.recurrence) t.recurrence = t.frequency;
      if (!t.last_completed_at) t.last_completed_at = t.lastCompletedDate;
      if (!t.next_due_at) t.next_due_at = t.nextDueDate;
      if (!t.created_at) t.created_at = new Date().toISOString();
      if (!t.updated_at) t.updated_at = new Date().toISOString();
    });
    if (!storedTasks) this.saveTasks();

    // 5. History (Preserved across months)
    const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    this.history = storedHistory ? JSON.parse(storedHistory) : generateSampleHistory();
    if (!storedHistory) this.saveHistory();
  }

  saveUsers() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
  }

  saveAreas() {
    localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(this.areas));
  }

  saveBins() {
    localStorage.setItem(STORAGE_KEYS.BINS, JSON.stringify(this.bins));
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
  }

  saveHistory() {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(this.history));
  }

  setupEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        this.switchTab(tabBtn.dataset.tab);
      });
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
          modal.classList.add('hidden');
        });
      }
    });

    const reportMonthInput = document.getElementById('reportMonthSelect');
    if (reportMonthInput) {
      reportMonthInput.value = getTodayISO().substring(0, 7);
    }
  }

  // ================= AUTHENTICATION & RBAC =================
  checkAuth() {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!sessionStr) {
      this.showLoginView();
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      const user = this.users.find(u => u.id === session.userId && u.active !== false);

      if (user) {
        this.currentUser = user;
        this.showAppView();
      } else {
        // User suspended or deleted
        this.handleLogout();
      }
    } catch (err) {
      this.handleLogout();
    }
  }

  showLoginView() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('mainAppScreen').classList.add('hidden');

    // Clear password field for security
    const pwInput = document.getElementById('loginPassword');
    if (pwInput) pwInput.value = '';
    const errAlert = document.getElementById('loginErrorAlert');
    if (errAlert) errAlert.classList.add('hidden');
  }

  showAppView() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainAppScreen').classList.remove('hidden');

    this.updateUserHeader();
    this.applyRolePermissions();
    this.updateCurrentDateDisplay();
    this.populateAreaDropdowns();
    this.renderAll();
  }

  handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const errorAlert = document.getElementById('loginErrorAlert');
    const errorMsg = document.getElementById('loginErrorMessage');

    const username = (usernameInput.value || '').trim();
    const password = (passwordInput.value || '').trim();

    // Security check: Generic error message to prevent enumeration
    const user = this.users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user || user.password_hash !== password) {
      errorAlert.classList.remove('hidden');
      errorMsg.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      passwordInput.value = '';
      passwordInput.focus();
      return;
    }

    if (user.active === false) {
      errorAlert.classList.remove('hidden');
      errorMsg.textContent = 'บัญชีผู้ใช้นี้ถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ';
      return;
    }

    // Success
    errorAlert.classList.add('hidden');
    this.currentUser = user;

    const sessionData = {
      userId: user.id,
      username: user.username,
      role: user.role,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));

    this.showAppView();
    this.showToast(`ยินดีต้อนรับ ${user.display_name}`);
  }

  confirmLogout() {
    document.getElementById('logoutModal').classList.remove('hidden');
  }

  handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    this.currentUser = null;
    this.closeModal('logoutModal');

    // Prevent navigation back into protected dashboard via back button
    window.history.replaceState(null, '', window.location.pathname);
    this.showLoginView();
    this.showToast('ออกจากระบบเรียบร้อยแล้ว');
  }

  togglePasswordVisibility(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';

    const eyeShow = btnEl.querySelector('.eye-show');
    const eyeHide = btnEl.querySelector('.eye-hide');
    if (eyeShow && eyeHide) {
      eyeShow.classList.toggle('hidden', isPw);
      eyeHide.classList.toggle('hidden', !isPw);
    }
  }

  updateUserHeader() {
    if (!this.currentUser) return;
    const nameEl = document.getElementById('headerUserName');
    const roleEl = document.getElementById('headerUserRole');

    if (nameEl) nameEl.textContent = this.currentUser.display_name;
    if (roleEl) {
      const isAdm = this.currentUser.role === 'admin';
      roleEl.textContent = isAdm ? 'ผู้ดูแลระบบ' : 'ผู้ปฏิบัติงาน';
      roleEl.className = `user-role-badge ${isAdm ? 'role-admin' : 'role-staff'}`;
    }
  }

  applyRolePermissions() {
    const isAdmin = this.currentUser && this.currentUser.role === 'admin';

    // Show/hide all admin-only elements
    document.querySelectorAll('.admin-only').forEach(el => {
      if (isAdmin) {
        el.classList.remove('hidden-by-role');
      } else {
        el.classList.add('hidden-by-role');
      }
    });

    // If staff is currently on an admin-only tab, switch back to manageBins
    if (!isAdmin) {
      const activeAdminTab = document.querySelector('.sub-nav-btn.admin-only.active');
      if (activeAdminTab) {
        const defaultSubBtn = document.querySelector('.sub-nav-btn[data-subtab="manageBins"]');
        if (defaultSubBtn) defaultSubBtn.click();
      }
    }
  }

  updateCurrentDateDisplay() {
    const today = getTodayISO();
    const formatted = formatThaiDate(today, false);
    const dateEl = document.getElementById('currentDateDisplay');
    const dashDateEl = document.getElementById('dashTodayDate');
    if (dateEl) dateEl.textContent = `วันที่: ${formatted}`;
    if (dashDateEl) dashDateEl.textContent = `ข้อมูล ณ วันที่ ${formatted}`;
  }

  switchTab(tabId) {
    // Route Protection
    if (!this.currentUser) {
      this.showLoginView();
      return;
    }

    this.currentTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderAll();
  }

  switchSubTab(subTabId, btnEl) {
    // Role check for admin-only subtabs
    if ((subTabId === 'manageUsers' || subTabId === 'systemConfig') && this.currentUser.role !== 'admin') {
      alert('ขออภัย สิทธิ์การเข้าถึงนี้สำหรับผู้ดูแลระบบ (Admin) เท่านั้น');
      return;
    }

    const parent = btnEl.closest('.tab-pane');
    parent.querySelectorAll('.sub-nav-btn').forEach(t => t.classList.remove('active'));
    parent.querySelectorAll('.subtab-pane').forEach(p => p.classList.remove('active'));
    btnEl.classList.add('active');
    const targetPane = document.getElementById(`subtab-${subTabId}`);
    if (targetPane) targetPane.classList.add('active');

    if (subTabId === 'monthlyReport') this.renderMonthlyReport();
    if (subTabId === 'historyLog') this.renderHistory();
    if (subTabId === 'manageBins') this.renderBinsManagement();
    if (subTabId === 'manageTasks') this.renderManageTasks();
    if (subTabId === 'manageAreas') this.renderManageAreas();
    if (subTabId === 'manageUsers') this.renderUserManagement();
  }

  populateAreaDropdowns() {
    const filterSelect = document.getElementById('areaFilterSelect');
    const taskAreaSelect = document.getElementById('taskAreaId');
    const binAreaSelect = document.getElementById('binAreaSelect');

    const areaOptions = this.areas.map(a => `<option value="${a.id}">${a.name} (${a.category})</option>`).join('');

    if (filterSelect) {
      filterSelect.innerHTML = `<option value="all">ทั้งหมด (ทุกพื้นที่)</option>` + areaOptions;
    }
    if (taskAreaSelect) {
      taskAreaSelect.innerHTML = areaOptions;
    }
    if (binAreaSelect) {
      binAreaSelect.innerHTML = areaOptions;
    }
  }

  renderAll() {
    this.updateTaskOverdueStatus();
    this.renderDashboard();
    this.renderTasks();
    this.renderCalendar();
    this.renderMonthlyReport();
    this.renderHistory();
    this.renderBinsManagement();
    this.renderManageTasks();
    this.renderManageAreas();
    if (this.currentUser && this.currentUser.role === 'admin') {
      this.renderUserManagement();
    }
    this.updatePendingBadge();
  }

  updateTaskOverdueStatus() {
    const today = getTodayISO();
    this.tasks.forEach(task => {
      const dueDate = task.next_due_at || task.nextDueDate;
      if (task.status !== 'completed') {
        task.isOverdue = dueDate < today;
      } else {
        task.isOverdue = false;
      }
    });
  }

  updatePendingBadge() {
    const today = getTodayISO();
    const count = this.tasks.filter(t => {
      const dueDate = t.next_due_at || t.nextDueDate;
      return (dueDate <= today || t.isOverdue) && t.status !== 'completed';
    }).length;

    const badge = document.getElementById('pendingBadge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  // ================= DASHBOARD =================
  renderDashboard() {
    const today = getTodayISO();

    const todayTasks = this.tasks.filter(t => (t.next_due_at || t.nextDueDate) <= today);
    const totalToday = todayTasks.length;

    const doneTodayCount = this.history.filter(h => h.completedDate === today && h.status === 'completed').length;
    const inProgressCount = todayTasks.filter(t => t.status === 'in_progress').length;
    const pendingCount = todayTasks.filter(t => t.status === 'pending' && !t.isOverdue).length;
    const problemCount = todayTasks.filter(t => t.status === 'problem').length;
    const overdueCount = todayTasks.filter(t => t.isOverdue && t.status !== 'completed').length;

    document.getElementById('todayTotal').textContent = totalToday;
    document.getElementById('todayDone').textContent = doneTodayCount;
    document.getElementById('todayDoing').textContent = inProgressCount;
    document.getElementById('todayPending').textContent = pendingCount;
    document.getElementById('todayProblem').textContent = problemCount;
    document.getElementById('todayOverdue').textContent = overdueCount;

    const donePct = totalToday > 0 ? Math.round((doneTodayCount / totalToday) * 100) : 0;
    document.getElementById('todayDonePct').textContent = `${donePct}% สำเร็จ`;

    const banner = document.getElementById('overdueAlertBanner');
    const bannerCount = document.getElementById('overdueBannerCount');
    if (overdueCount > 0) {
      banner.classList.remove('hidden');
      bannerCount.textContent = `จำนวน ${overdueCount} รายการ`;
    } else {
      banner.classList.add('hidden');
    }

    // Weekly
    const weekStart = addDays(today, -6);
    const weekHistory = this.history.filter(h => h.completedDate >= weekStart && h.completedDate <= today && h.status === 'completed');
    const weekDoneCount = weekHistory.length;
    const weekTotalCount = this.tasks.length;
    const weekPct = weekTotalCount > 0 ? Math.round((weekDoneCount / weekTotalCount) * 100) : 0;

    document.getElementById('weekPct').textContent = `${weekPct}%`;
    document.getElementById('weekProgressFill').style.width = `${Math.min(100, weekPct)}%`;
    document.getElementById('weekFraction').textContent = `${weekDoneCount}/${weekTotalCount} งาน`;
    document.getElementById('weekDone').textContent = weekDoneCount;
    document.getElementById('weekOverdue').textContent = overdueCount;
    document.getElementById('weekTotal').textContent = weekTotalCount;

    // Monthly
    const currentMonthPrefix = today.substring(0, 7);
    document.getElementById('monthNameDisplay').textContent = formatThaiMonthYear(currentMonthPrefix);

    const monthHistory = this.history.filter(h => h.completedDate.startsWith(currentMonthPrefix) && h.status === 'completed');
    const monthDoneCount = monthHistory.length;
    const monthProblemCount = this.tasks.filter(t => t.status === 'problem').length;
    const monthTotalCount = this.tasks.length;
    const monthPct = monthTotalCount > 0 ? Math.round((monthDoneCount / monthTotalCount) * 100) : 0;

    document.getElementById('monthPct').textContent = `${monthPct}%`;
    document.getElementById('monthProgressFill').style.width = `${Math.min(100, monthPct)}%`;
    document.getElementById('monthFraction').textContent = `${monthDoneCount}/${monthTotalCount} งาน`;
    document.getElementById('monthDone').textContent = monthDoneCount;
    document.getElementById('monthOverdue').textContent = overdueCount;
    document.getElementById('monthProblem').textContent = monthProblemCount;
    document.getElementById('monthTotal').textContent = monthTotalCount;

    this.renderUrgentTasks();
  }

  renderUrgentTasks() {
    const container = document.getElementById('urgentTaskList');
    const today = getTodayISO();

    const urgentTasks = this.tasks.filter(t => {
      const dueDate = t.next_due_at || t.nextDueDate;
      return (t.isOverdue || dueDate <= today) && t.status !== 'completed';
    });

    if (urgentTasks.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted); background: #ffffff; border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <p style="font-weight: 500; color: var(--status-done);">ไม่มีงานค้างหรือภาระงานที่ต้องดำเนินการเร่งด่วนในขณะนี้</p>
          <p style="font-size: 0.8rem; margin-top: 4px;">งานที่ครบกำหนดของวันนี้ดำเนินการเรียบร้อยแล้ว</p>
        </div>
      `;
      return;
    }

    container.innerHTML = urgentTasks.slice(0, 5).map(task => this.createTaskCardHtml(task)).join('');
  }

  // ================= TASK CARD COMPONENT =================
  createTaskCardHtml(task) {
    const dueDate = task.next_due_at || task.nextDueDate;
    const isOverdue = task.isOverdue;

    const recurrenceMap = {
      daily: 'งานประจำวัน',
      weekly: 'ทุก 1 สัปดาห์',
      biweekly: 'ทุก 2 สัปดาห์',
      monthly: 'งานประจำเดือน',
      custom: `${task.frequencyDays} วัน`
    };
    const recurrenceText = recurrenceMap[task.recurrence || task.frequency] || `${task.frequencyDays} วัน`;

    let statusClass = 'status-pending';
    let statusText = 'ยังไม่ทำ';
    let cardModifier = '';

    if (isOverdue) {
      statusClass = 'status-overdue';
      statusText = `ค้าง (เลยกำหนด ${this.getOverdueDays(dueDate)} วัน)`;
      cardModifier = 'is-overdue';
    } else if (task.status === 'completed') {
      statusClass = 'status-completed';
      statusText = 'เสร็จแล้ว';
      cardModifier = 'is-done';
    } else if (task.status === 'in_progress') {
      statusClass = 'status-in_progress';
      statusText = 'กำลังทำ';
      cardModifier = 'is-in-progress';
    } else if (task.status === 'problem') {
      statusClass = 'status-problem';
      statusText = 'มีปัญหา';
      cardModifier = 'is-problem';
    }

    const dueDateText = formatThaiDate(dueDate, true);

    return `
      <div class="task-card ${cardModifier}" id="task-card-${task.id}">
        <div class="task-card-main">
          <div class="task-headline">
            <h3 class="task-title">${task.title}</h3>
            <div class="task-area">${task.area || task.areaName}</div>
            <div class="task-meta-line">
              <span>${recurrenceText}</span>
              <span class="meta-separator">·</span>
              <span>ครบกำหนด ${dueDateText}</span>
            </div>
          </div>
          <div>
            <span class="status-badge ${statusClass}">
              <span class="status-dot"></span>
              สถานะ: ${statusText}
            </span>
          </div>
        </div>

        ${task.description ? `<div class="task-note-box">${task.description}</div>` : ''}

        <div class="task-actions-row">
          <button class="btn-complete-main" onclick="app.openCompleteModal('${task.id}')">
            ทำเสร็จแล้ว
          </button>
          ${task.status !== 'in_progress' ? `
            <button class="btn-secondary-action" onclick="app.setTaskStatus('${task.id}', 'in_progress')">
              กำลังทำ
            </button>
          ` : `
            <button class="btn-secondary-action" onclick="app.setTaskStatus('${task.id}', 'pending')">
              พักไว้
            </button>
          `}
          <button class="btn-issue-action" onclick="app.openProblemModal('${task.id}')">
            แจ้งปัญหา
          </button>
        </div>
      </div>
    `;
  }

  getOverdueDays(dueDate) {
    const today = new Date(getTodayISO());
    const due = new Date(dueDate);
    const diffTime = today - due;
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  setTaskStatus(taskId, newStatus) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.status = newStatus;
    task.updated_at = new Date().toISOString();
    this.saveTasks();

    const labelMap = { in_progress: 'กำลังทำ', pending: 'ยังไม่ทำ' };
    this.showToast(`ปรับปรุงสถานะเป็น "${labelMap[newStatus] || newStatus}"`);
    this.renderAll();
  }

  // ================= FILTERS =================
  setFreqFilter(freq, btnEl) {
    this.filterFreq = freq;
    document.querySelectorAll('#freqChips .pill').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
    this.renderTasks();
  }

  setStatusFilter(status, btnEl) {
    this.filterStatus = status;
    document.querySelectorAll('#statusChips .pill').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
    this.renderTasks();
  }

  resetFilters() {
    this.filterFreq = 'all';
    this.filterStatus = 'all';
    this.filterArea = 'all';

    const searchInput = document.getElementById('taskSearchInput');
    if (searchInput) searchInput.value = '';

    const areaSelect = document.getElementById('areaFilterSelect');
    if (areaSelect) areaSelect.value = 'all';

    document.querySelectorAll('#freqChips .pill').forEach(c => {
      c.classList.toggle('active', c.dataset.freq === 'all');
    });
    document.querySelectorAll('#statusChips .pill').forEach(c => {
      c.classList.toggle('active', c.dataset.status === 'all');
    });

    this.renderTasks();
  }

  quickFilterTasks(status) {
    this.switchTab('tasks');
    this.filterStatus = status;
    document.querySelectorAll('#statusChips .pill').forEach(c => {
      c.classList.toggle('active', c.dataset.status === status);
    });
    this.renderTasks();
  }

  filterTasksByStatus(status) {
    this.switchTab('tasks');
    this.filterStatus = status;
    document.querySelectorAll('#statusChips .pill').forEach(c => {
      c.classList.toggle('active', c.dataset.status === status);
    });
    this.renderTasks();
  }

  renderTasks() {
    const container = document.getElementById('mainTaskList');
    const searchInput = document.getElementById('taskSearchInput');
    const areaSelect = document.getElementById('areaFilterSelect');

    const search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedArea = areaSelect ? areaSelect.value : 'all';

    let filtered = this.tasks.filter(task => {
      if (this.filterFreq !== 'all' && (task.recurrence || task.frequency) !== this.filterFreq) return false;
      if (selectedArea !== 'all' && task.areaId !== selectedArea) return false;

      if (this.filterStatus === 'overdue') {
        if (!task.isOverdue) return false;
      } else if (this.filterStatus !== 'all') {
        if (task.status !== this.filterStatus) return false;
      }

      if (search) {
        const matchTitle = task.title.toLowerCase().includes(search);
        const matchArea = (task.area || task.areaName).toLowerCase().includes(search);
        const matchDesc = (task.description || '').toLowerCase().includes(search);
        if (!matchTitle && !matchArea && !matchDesc) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      if (a.isOverdue && !b.isOverdue) return -1;
      if (!a.isOverdue && b.isOverdue) return 1;
      const dueA = a.next_due_at || a.nextDueDate;
      const dueB = b.next_due_at || b.nextDueDate;
      if (dueA !== dueB) return dueA.localeCompare(dueB);
      return a.title.localeCompare(b.title);
    });

    const countEl = document.getElementById('filteredCount');
    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 36px 16px; color: var(--text-muted); background: #ffffff; border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <p style="font-weight: 500;">ไม่พบรายการงานที่ตรงกับเงื่อนไขการค้นหา</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 10px;" onclick="app.resetFilters()">ล้างตัวกรองทั้งหมด</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(task => this.createTaskCardHtml(task)).join('');
  }

  // ================= TASK COMPLETION & RECORDING =================
  openCompleteModal(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('completeTaskId').value = task.id;
    document.getElementById('completeTaskDetails').textContent = `${task.title} — ${task.area || task.areaName} (${task.frequencyDays} วัน)`;

    const today = getTodayISO();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    document.getElementById('completeDate').value = today;
    document.getElementById('completeTime').value = timeStr;

    // Default to currently logged-in user name
    const defaultDoer = this.currentUser ? this.currentUser.display_name : (localStorage.getItem(STORAGE_KEYS.LAST_DOER) || '');
    document.getElementById('completeDoer').value = defaultDoer;
    document.getElementById('completeNotes').value = '';

    document.getElementById('completeModal').classList.remove('hidden');
  }

  handleCompleteSubmit(event) {
    event.preventDefault();
    const taskId = document.getElementById('completeTaskId').value;
    const completedDate = document.getElementById('completeDate').value;
    const completedTime = document.getElementById('completeTime').value;
    const doer = document.getElementById('completeDoer').value.trim();
    const notes = document.getElementById('completeNotes').value.trim();

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (doer) localStorage.setItem(STORAGE_KEYS.LAST_DOER, doer);

    // 1. Permanent history entry
    const historyEntry = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      taskId: task.id,
      title: task.title,
      areaName: task.area || task.areaName,
      status: 'completed',
      completedDate: completedDate,
      completedTime: completedTime,
      doer: doer,
      notes: notes,
      frequency: task.recurrence || task.frequency
    };
    this.history.unshift(historyEntry);
    this.saveHistory();

    // 2. Next due calculation: Actual Completion Date + Frequency Days
    task.last_completed_at = completedDate;
    task.lastCompletedDate = completedDate;
    task.next_due_at = addDays(completedDate, task.frequencyDays);
    task.nextDueDate = task.next_due_at;
    task.status = 'pending';
    task.isOverdue = false;
    task.assigned_user = doer;
    task.updated_at = new Date().toISOString();
    this.saveTasks();

    this.closeModal('completeModal');
    this.showToast(`บันทึกเสร็จสิ้นเรียบร้อย กำหนดรอบถัดไป: ${formatThaiDate(task.next_due_at, true)}`);
    this.renderAll();
  }

  openProblemModal(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('problemTaskId').value = task.id;
    document.getElementById('problemTaskDetails').textContent = `${task.title} — ${task.area || task.areaName}`;

    const defaultReporter = this.currentUser ? this.currentUser.display_name : (localStorage.getItem(STORAGE_KEYS.LAST_DOER) || '');
    document.getElementById('problemReporter').value = defaultReporter;
    document.getElementById('problemNotes').value = '';

    document.getElementById('problemModal').classList.remove('hidden');
  }

  handleProblemSubmit(event) {
    event.preventDefault();
    const taskId = document.getElementById('problemTaskId').value;
    const notes = document.getElementById('problemNotes').value.trim();
    const reporter = document.getElementById('problemReporter').value.trim();

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.status = 'problem';
    task.notes = notes;
    task.updated_at = new Date().toISOString();
    this.saveTasks();

    const today = getTodayISO();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    this.history.unshift({
      id: `hist_${Date.now()}`,
      taskId: task.id,
      title: task.title,
      areaName: task.area || task.areaName,
      status: 'problem',
      completedDate: today,
      completedTime: timeStr,
      doer: reporter,
      notes: notes,
      frequency: task.recurrence || task.frequency
    });
    this.saveHistory();

    this.closeModal('problemModal');
    this.showToast(`บันทึกรายงานปัญหาสำหรับ "${task.title}" เรียบร้อยแล้ว`);
    this.renderAll();
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('hidden');
  }

  showToast(message) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  // ================= CALENDAR =================
  renderCalendar() {
    const titleEl = document.getElementById('calendarTitle');
    const daysContainer = document.getElementById('calendarDays');
    if (!titleEl || !daysContainer) return;

    const thaiYear = this.calYear + 543;
    titleEl.textContent = `${THAI_MONTHS[this.calMonth]} ${thaiYear}`;

    const firstDay = new Date(this.calYear, this.calMonth, 1).getDay();
    const totalDaysInMonth = new Date(this.calYear, this.calMonth + 1, 0).getDate();
    const totalDaysInPrevMonth = new Date(this.calYear, this.calMonth, 0).getDate();

    const today = getTodayISO();
    let html = '';

    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDayNum = totalDaysInPrevMonth - i;
      html += `<div class="cal-cell other-month"><span class="cal-cell-num">${prevDayNum}</span></div>`;
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayStr = String(day).padStart(2, '0');
      const monthStr = String(this.calMonth + 1).padStart(2, '0');
      const isoDate = `${this.calYear}-${monthStr}-${dayStr}`;

      const isToday = isoDate === today;
      const isSelected = isoDate === this.selectedCalDate;

      const dueTasks = this.tasks.filter(t => (t.next_due_at || t.nextDueDate) === isoDate);
      const doneTasks = this.history.filter(h => h.completedDate === isoDate && h.status === 'completed');

      let dotsHtml = '';
      if (dueTasks.some(t => t.isOverdue)) {
        dotsHtml += '<span class="cal-dot dot-overdue" title="มีงานค้าง"></span>';
      }
      if (dueTasks.some(t => !t.isOverdue && t.status !== 'completed')) {
        dotsHtml += '<span class="cal-dot dot-pending" title="มีงานครบกำหนด"></span>';
      }
      if (doneTasks.length > 0) {
        dotsHtml += '<span class="cal-dot dot-done" title="มีงานเสร็จสิ้น"></span>';
      }

      html += `
        <div class="cal-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}" 
             onclick="app.selectCalendarDate('${isoDate}')">
          <span class="cal-cell-num">${day}</span>
          <div class="cal-dots-line">${dotsHtml}</div>
        </div>
      `;
    }

    const totalCells = firstDay + totalDaysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let j = 1; j <= remaining; j++) {
      html += `<div class="cal-cell other-month"><span class="cal-cell-num">${j}</span></div>`;
    }

    daysContainer.innerHTML = html;
    this.renderCalendarSelectedTasks();
  }

  selectCalendarDate(isoDate) {
    this.selectedCalDate = isoDate;
    this.renderCalendar();
  }

  prevMonth() {
    this.calMonth--;
    if (this.calMonth < 0) {
      this.calMonth = 11;
      this.calYear--;
    }
    this.renderCalendar();
  }

  nextMonth() {
    this.calMonth++;
    if (this.calMonth > 11) {
      this.calMonth = 0;
      this.calYear++;
    }
    this.renderCalendar();
  }

  goToToday() {
    const now = new Date();
    this.calYear = now.getFullYear();
    this.calMonth = now.getMonth();
    this.selectedCalDate = getTodayISO();
    this.renderCalendar();
  }

  renderCalendarSelectedTasks() {
    const listContainer = document.getElementById('calTaskList');
    const dateText = document.getElementById('calSelectedDateText');
    const countSubtitle = document.getElementById('calDateTaskCount');
    if (!listContainer) return;

    dateText.textContent = formatThaiDate(this.selectedCalDate, false);

    const dueTasks = this.tasks.filter(t => (t.next_due_at || t.nextDueDate) === this.selectedCalDate);
    const completedTasks = this.history.filter(h => h.completedDate === this.selectedCalDate);

    countSubtitle.textContent = `ครบกำหนด ${dueTasks.length} รายการ · ปฏิบัติงานแล้ว ${completedTasks.length} รายการ`;

    if (dueTasks.length === 0 && completedTasks.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted); background: #ffffff; border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <p>ไม่มีรายการงานที่ครบกำหนดหรือบันทึกประวัติในวันที่เลือก</p>
        </div>
      `;
      return;
    }

    let html = '';

    if (dueTasks.length > 0) {
      html += `
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 8px;">
          รายการงานที่ครบกำหนด:
        </div>
      `;
      html += dueTasks.map(t => {
        let statusText = 'ยังไม่ทำ';
        let statusClass = 'status-pending';
        if (t.isOverdue) { statusText = 'ค้าง'; statusClass = 'status-overdue'; }
        else if (t.status === 'completed') { statusText = 'เสร็จแล้ว'; statusClass = 'status-completed'; }
        else if (t.status === 'in_progress') { statusText = 'กำลังทำ'; statusClass = 'status-in_progress'; }
        else if (t.status === 'problem') { statusText = 'มีปัญหา'; statusClass = 'status-problem'; }

        return `
          <div class="task-card" style="padding: 12px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${t.title} — ${t.area || t.areaName}</strong>
              <span class="status-badge ${statusClass}">
                <span class="status-dot"></span>
                สถานะ: ${statusText}
              </span>
            </div>
          </div>
        `;
      }).join('');
    }

    if (completedTasks.length > 0) {
      html += `
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin: 16px 0 8px;">
          ประวัติการปฏิบัติงานในวันนี้:
        </div>
      `;
      html += completedTasks.map(h => `
        <div class="task-card is-done" style="padding: 10px 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong>${h.title} — ${h.areaName}</strong>
            <span class="status-badge status-completed">
              <span class="status-dot"></span>
              สถานะ: เสร็จแล้ว
            </span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
            เวลา: ${h.completedTime} น. | ผู้ปฏิบัติงาน: ${h.doer || '-'} | หมายเหตุ: ${h.notes || '-'}
          </div>
        </div>
      `).join('');
    }

    listContainer.innerHTML = html;
  }

  // ================= MONTHLY REPORT & HISTORY =================
  renderMonthlyReport() {
    const reportContainer = document.getElementById('monthlyReportContent');
    const monthSelect = document.getElementById('reportMonthSelect');
    if (!reportContainer || !monthSelect) return;

    const selectedMonth = monthSelect.value || getTodayISO().substring(0, 7);
    const monthThaiTitle = formatThaiMonthYear(selectedMonth);

    const monthLogs = this.history.filter(h => h.completedDate.startsWith(selectedMonth));
    const completedCount = monthLogs.filter(h => h.status === 'completed').length;
    const problemLogs = monthLogs.filter(h => h.status === 'problem');

    const overdueCount = this.tasks.filter(t => t.isOverdue).length;
    const totalMasterTasks = this.tasks.length;
    const successRate = totalMasterTasks > 0 ? Math.round((completedCount / totalMasterTasks) * 100) : 0;
    const incompleteTasks = this.tasks.filter(t => t.status !== 'completed');

    reportContainer.innerHTML = `
      <div class="doc-header">
        <div>
          <h2>ศูนย์สุขภาพมหาวิทยาลัยเชียงใหม่ “ไผ่ล้อม”</h2>
          <p>รายงานสรุปการปฏิบัติงานและการดูแลพื้นที่ ประจำเดือน <strong>${monthThaiTitle}</strong></p>
        </div>
        <div style="text-align: right;">
          <small class="text-muted">วันที่ออกรายงาน: ${formatThaiDate(getTodayISO(), false)}</small>
        </div>
      </div>

      <div class="doc-grid-stats">
        <div class="doc-stat-box">
          <div class="val">${totalMasterTasks}</div>
          <div class="lbl">รายการงานในระบบ</div>
        </div>
        <div class="doc-stat-box success">
          <div class="val">${completedCount}</div>
          <div class="lbl">งานที่ทำเสร็จแล้ว (ครั้ง)</div>
        </div>
        <div class="doc-stat-box danger">
          <div class="val">${overdueCount}</div>
          <div class="lbl">งานที่ค้างในปัจจุบัน</div>
        </div>
        <div class="doc-stat-box warning">
          <div class="val">${successRate}%</div>
          <div class="lbl">อัตราความสำเร็จ</div>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 8px; color: var(--text-main);">
          รายการงานที่ยังไม่แล้วเสร็จ / งานค้าง (${incompleteTasks.length} รายการ)
        </h4>
        ${incompleteTasks.length === 0 ? `
          <p style="font-size: 0.85rem; color: var(--status-done);">ไม่มีงานค้างในเดือนนี้</p>
        ` : `
          <div class="table-container">
            <table class="report-table">
              <thead>
                <tr>
                  <th>ชื่องาน</th>
                  <th>พื้นที่</th>
                  <th>ความถี่</th>
                  <th>ครบกำหนด</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                ${incompleteTasks.map(t => {
                  const dueDate = t.next_due_at || t.nextDueDate;
                  return `
                    <tr>
                      <td><strong>${t.title}</strong></td>
                      <td>${t.area || t.areaName}</td>
                      <td>${t.recurrence || t.frequency}</td>
                      <td>${formatThaiDate(dueDate, true)}</td>
                      <td>
                        ${t.isOverdue 
                          ? '<span class="status-badge status-overdue"><span class="status-dot"></span>ค้าง</span>' 
                          : '<span class="status-badge status-pending"><span class="status-dot"></span>รอดำเนินการ</span>'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      ${problemLogs.length > 0 ? `
        <div style="margin-top: 24px;">
          <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 8px; color: var(--status-problem);">
            บันทึกปัญหาและอุปสรรค (${problemLogs.length} รายการ)
          </h4>
          <div class="table-container">
            <table class="report-table">
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>งาน</th>
                  <th>พื้นที่</th>
                  <th>ผู้รายงาน</th>
                  <th>รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                ${problemLogs.map(p => `
                  <tr>
                    <td>${formatThaiDate(p.completedDate, true)} ${p.completedTime}</td>
                    <td>${p.title}</td>
                    <td>${p.areaName}</td>
                    <td>${p.doer || '-'}</td>
                    <td>${p.notes}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--text-muted);">
        <div>ศูนย์สุขภาพมหาวิทยาลัยเชียงใหม่ “ไผ่ล้อม”</div>
        <div>ผู้ตรวจรายงาน: ...................................................</div>
      </div>
    `;
  }

  renderHistory() {
    const tbody = document.getElementById('historyTableBody');
    const searchInput = document.getElementById('historySearch');
    if (!tbody) return;

    const search = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = this.history.filter(h => {
      if (!search) return true;
      return (
        h.title.toLowerCase().includes(search) ||
        h.areaName.toLowerCase().includes(search) ||
        (h.doer || '').toLowerCase().includes(search) ||
        (h.notes || '').toLowerCase().includes(search)
      );
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">
            ไม่พบประวัติการทำงาน
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(h => {
      const isDone = h.status === 'completed';
      return `
        <tr>
          <td>${formatThaiDate(h.completedDate, true)}</td>
          <td>${h.completedTime || '-'}</td>
          <td><strong>${h.title}</strong></td>
          <td>${h.areaName}</td>
          <td>${h.doer || '-'}</td>
          <td>
            <span class="status-badge ${isDone ? 'status-completed' : 'status-problem'}">
              <span class="status-dot"></span>
              ${isDone ? 'เสร็จแล้ว' : 'มีปัญหา'}
            </span>
          </td>
          <td>${h.notes || '-'}</td>
        </tr>
      `;
    }).join('');
  }

  exportHistoryCSV() {
    if (this.history.length === 0) {
      alert('ไม่มีข้อมูลประวัติสำหรับการส่งออก');
      return;
    }

    const headers = ['วันที่', 'เวลา', 'งาน', 'พื้นที่', 'ผู้ปฏิบัติงาน', 'สถานะ', 'หมายเหตุ'];
    const rows = this.history.map(h => [
      `"${h.completedDate}"`,
      `"${h.completedTime || ''}"`,
      `"${h.title.replace(/"/g, '""')}"`,
      `"${h.areaName}"`,
      `"${(h.doer || '').replace(/"/g, '""')}"`,
      `"${h.status === 'completed' ? 'เสร็จแล้ว' : 'มีปัญหา'}"`,
      `"${(h.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `รายงานประวัติการปฏิบัติงาน_ศูนย์สุขภาพไผ่ล้อม_${getTodayISO()}.csv`;
    link.click();
  }

  // ================= TRASH BINS =================
  renderBinsManagement() {
    const summaryContainer = document.getElementById('binStatsSummary');
    const tbody = document.getElementById('binTableBody');
    if (!tbody || !summaryContainer) return;

    let totalBlack = 0;
    let totalRed = 0;
    let totalGreen = 0;
    let totalYellow = 0;

    this.bins.forEach(b => {
      totalBlack += Number(b.black) || 0;
      totalRed += Number(b.red) || 0;
      totalGreen += Number(b.green) || 0;
      totalYellow += Number(b.yellow) || 0;
    });
    const grandTotal = totalBlack + totalRed + totalGreen + totalYellow;

    summaryContainer.innerHTML = `
      <div class="bin-card b-black">
        <span class="b-count">${totalBlack}</span>
        <span class="b-label">ถังดำ (ทั่วไป)</span>
      </div>
      <div class="bin-card b-red">
        <span class="b-count">${totalRed}</span>
        <span class="b-label">ถังแดง (ติดเชื้อ)</span>
      </div>
      <div class="bin-card b-green">
        <span class="b-count">${totalGreen}</span>
        <span class="b-label">ถังเขียว (เปียก)</span>
      </div>
      <div class="bin-card b-yellow">
        <span class="b-count">${totalYellow}</span>
        <span class="b-label">ถังเหลือง (รีไซเคิล)</span>
      </div>
      <div class="bin-card b-total">
        <span class="b-count">${grandTotal}</span>
        <span class="b-label">รวมทั้งศูนย์ (ใบ)</span>
      </div>
    `;

    const isAdmin = this.currentUser && this.currentUser.role === 'admin';

    tbody.innerHTML = this.bins.map(b => {
      const areaTotal = (Number(b.black) || 0) + (Number(b.red) || 0) + (Number(b.green) || 0) + (Number(b.yellow) || 0);
      return `
        <tr>
          <td><strong>${b.areaName}</strong></td>
          <td class="text-center">${b.black || 0}</td>
          <td class="text-center" style="color: var(--status-overdue); font-weight: 600;">${b.red || 0}</td>
          <td class="text-center" style="color: var(--status-done); font-weight: 600;">${b.green || 0}</td>
          <td class="text-center" style="color: #ca8a04; font-weight: 600;">${b.yellow || 0}</td>
          <td class="text-center" style="font-weight: 700;">${areaTotal}</td>
          <td class="text-right">
            ${isAdmin ? `<button class="btn btn-secondary btn-sm" onclick="app.openEditBinModal('${b.areaId}')">แก้ไข</button>` : `<span class="text-muted" style="font-size:0.75rem;">ดูอย่างเดียว</span>`}
          </td>
        </tr>
      `;
    }).join('');
  }

  openEditBinModal(areaId) {
    if (this.currentUser.role !== 'admin') return;

    const areaSelect = document.getElementById('binAreaSelect');
    const blackInput = document.getElementById('binBlack');
    const redInput = document.getElementById('binRed');
    const greenInput = document.getElementById('binGreen');
    const yellowInput = document.getElementById('binYellow');

    if (areaId) {
      const binItem = this.bins.find(b => b.areaId === areaId);
      if (binItem) {
        areaSelect.value = binItem.areaId;
        areaSelect.disabled = true;
        blackInput.value = binItem.black || 0;
        redInput.value = binItem.red || 0;
        greenInput.value = binItem.green || 0;
        yellowInput.value = binItem.yellow || 0;
      }
    } else {
      areaSelect.disabled = false;
      areaSelect.selectedIndex = 0;
      blackInput.value = 0;
      redInput.value = 0;
      greenInput.value = 0;
      yellowInput.value = 0;
    }

    document.getElementById('binModal').classList.remove('hidden');
  }

  handleBinSubmit(event) {
    event.preventDefault();
    if (this.currentUser.role !== 'admin') return;

    const areaSelect = document.getElementById('binAreaSelect');
    const areaId = areaSelect.value;
    const areaName = areaSelect.options[areaSelect.selectedIndex].text.split(' (')[0];

    const black = parseInt(document.getElementById('binBlack').value, 10) || 0;
    const red = parseInt(document.getElementById('binRed').value, 10) || 0;
    const green = parseInt(document.getElementById('binGreen').value, 10) || 0;
    const yellow = parseInt(document.getElementById('binYellow').value, 10) || 0;

    const existingIndex = this.bins.findIndex(b => b.areaId === areaId);
    if (existingIndex >= 0) {
      this.bins[existingIndex] = { areaId, areaName, black, red, green, yellow };
    } else {
      this.bins.push({ areaId, areaName, black, red, green, yellow });
    }

    this.saveBins();
    this.closeModal('binModal');
    this.showToast(`บันทึกข้อมูลถังขยะพื้นที่ "${areaName}" เรียบร้อยแล้ว`);
    this.renderBinsManagement();
  }

  // ================= MANAGE TASKS =================
  renderManageTasks() {
    const tbody = document.getElementById('manageTaskTableBody');
    if (!tbody) return;

    const isAdmin = this.currentUser && this.currentUser.role === 'admin';

    tbody.innerHTML = this.tasks.map(task => {
      const lastDone = (task.last_completed_at || task.lastCompletedDate) 
        ? formatThaiDate(task.last_completed_at || task.lastCompletedDate, true) 
        : '-';
      const nextDue = formatThaiDate(task.next_due_at || task.nextDueDate, true);

      return `
        <tr>
          <td>
            <strong>${task.title}</strong>
            ${task.category ? `<br><small class="text-muted">หมวด: ${task.category}</small>` : ''}
          </td>
          <td>${task.area || task.areaName}</td>
          <td>${task.recurrence || task.frequency} (${task.frequencyDays} วัน)</td>
          <td>${lastDone}</td>
          <td><strong>${nextDue}</strong></td>
          <td class="text-right" style="white-space: nowrap;">
            ${isAdmin ? `
              <button class="btn btn-secondary btn-sm" onclick="app.openTaskModal('${task.id}')">แก้ไข</button>
              <button class="btn btn-danger btn-sm" onclick="app.deleteTask('${task.id}')">ลบ</button>
            ` : `
              <span class="text-muted" style="font-size:0.75rem;">ดูอย่างเดียว</span>
            `}
          </td>
        </tr>
      `;
    }).join('');
  }

  openTaskModal(taskId) {
    if (this.currentUser.role !== 'admin') return;

    const titleEl = document.getElementById('taskModalTitle');
    const formId = document.getElementById('taskFormId');
    const titleInput = document.getElementById('taskTitle');
    const areaSelect = document.getElementById('taskAreaId');
    const freqSelect = document.getElementById('taskFrequency');
    const customDaysGroup = document.getElementById('customDaysGroup');
    const customDaysInput = document.getElementById('taskCustomDays');
    const startDateInput = document.getElementById('taskStartDate');
    const categoryInput = document.getElementById('taskCategory');
    const descInput = document.getElementById('taskDescription');

    if (taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      if (!task) return;
      titleEl.textContent = 'แก้ไขข้อมูลงาน';
      formId.value = task.id;
      titleInput.value = task.title;
      areaSelect.value = task.areaId;
      freqSelect.value = task.recurrence || task.frequency;
      if (freqSelect.value === 'custom') {
        customDaysGroup.style.display = 'block';
        customDaysInput.value = task.frequencyDays;
      } else {
        customDaysGroup.style.display = 'none';
      }
      startDateInput.value = task.next_due_at || task.nextDueDate;
      categoryInput.value = task.category || '';
      descInput.value = task.description || '';
    } else {
      titleEl.textContent = 'เพิ่มงานใหม่';
      formId.value = '';
      titleInput.value = '';
      areaSelect.selectedIndex = 0;
      freqSelect.value = 'biweekly';
      customDaysGroup.style.display = 'none';
      startDateInput.value = getTodayISO();
      categoryInput.value = '';
      descInput.value = '';
    }

    document.getElementById('taskModal').classList.remove('hidden');
  }

  handleFreqSelectChange(selectEl) {
    const customGroup = document.getElementById('customDaysGroup');
    customGroup.style.display = selectEl.value === 'custom' ? 'block' : 'none';
  }

  handleTaskSubmit(event) {
    event.preventDefault();
    if (this.currentUser.role !== 'admin') return;

    const taskId = document.getElementById('taskFormId').value;
    const title = document.getElementById('taskTitle').value.trim();
    const areaSelect = document.getElementById('taskAreaId');
    const areaId = areaSelect.value;
    const areaName = areaSelect.options[areaSelect.selectedIndex].text.split(' (')[0];
    const freq = document.getElementById('taskFrequency').value;
    const startDate = document.getElementById('taskStartDate').value;
    const category = document.getElementById('taskCategory').value.trim();
    const description = document.getElementById('taskDescription').value.trim();

    let frequencyDays = 14;
    if (freq === 'daily') frequencyDays = 1;
    else if (freq === 'weekly') frequencyDays = 7;
    else if (freq === 'biweekly') frequencyDays = 14;
    else if (freq === 'monthly') frequencyDays = 30;
    else if (freq === 'custom') {
      frequencyDays = parseInt(document.getElementById('taskCustomDays').value, 10) || 14;
    }

    const nowISO = new Date().toISOString();

    if (taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.title = title;
        task.area = areaName;
        task.areaId = areaId;
        task.areaName = areaName;
        task.recurrence = freq;
        task.frequency = freq;
        task.frequencyDays = frequencyDays;
        task.next_due_at = startDate;
        task.nextDueDate = startDate;
        task.category = category;
        task.description = description;
        task.updated_at = nowISO;
      }
      this.showToast(`แก้ไขข้อมูลงาน "${title}" เรียบร้อยแล้ว`);
    } else {
      const duplicate = this.tasks.find(t => t.title.toLowerCase() === title.toLowerCase() && t.areaId === areaId);
      if (duplicate) {
        alert(`มีงาน "${title}" ประจำพื้นที่ "${areaName}" อยู่แล้วในระบบ`);
        return;
      }

      const newTask = {
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        title,
        area: areaName,
        areaId,
        areaName,
        recurrence: freq,
        frequency: freq,
        frequencyDays,
        last_completed_at: null,
        lastCompletedDate: null,
        next_due_at: startDate,
        nextDueDate: startDate,
        status: 'pending',
        assigned_user: '',
        notes: '',
        category,
        description,
        created_at: nowISO,
        updated_at: nowISO
      };
      this.tasks.push(newTask);
      this.showToast(`เพิ่มงานใหม่ "${title}" เรียบร้อยแล้ว`);
    }

    this.saveTasks();
    this.closeModal('taskModal');
    this.renderAll();
  }

  deleteTask(taskId) {
    if (this.currentUser.role !== 'admin') return;

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;
    if (!confirm(`ยืนยันการลบงาน "${task.title}" (${task.area || task.areaName}) หรือไม่?`)) return;

    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveTasks();
    this.showToast(`ลบงาน "${task.title}" แล้ว`);
    this.renderAll();
  }

  // ================= MANAGE AREAS =================
  renderManageAreas() {
    const container = document.getElementById('areaCardsGrid');
    if (!container) return;

    const isAdmin = this.currentUser && this.currentUser.role === 'admin';

    container.innerHTML = this.areas.map(area => `
      <div class="area-box">
        <div>
          <h4>${area.name}</h4>
          <span>หมวด: ${area.category}</span>
        </div>
        ${isAdmin ? `
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-secondary btn-sm" onclick="app.openAreaModal('${area.id}')">แก้ไข</button>
            <button class="btn btn-danger btn-sm" onclick="app.deleteArea('${area.id}')">ลบ</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  openAreaModal(areaId) {
    if (this.currentUser.role !== 'admin') return;

    const formId = document.getElementById('areaFormId');
    const nameInput = document.getElementById('areaName');
    const catSelect = document.getElementById('areaCategory');
    const title = document.getElementById('areaModalTitle');

    if (areaId) {
      const area = this.areas.find(a => a.id === areaId);
      if (!area) return;
      title.textContent = 'แก้ไขข้อมูลพื้นที่';
      formId.value = area.id;
      nameInput.value = area.name;
      catSelect.value = area.category;
    } else {
      title.textContent = 'เพิ่มพื้นที่ใหม่';
      formId.value = '';
      nameInput.value = '';
      catSelect.value = 'ห้องตรวจ';
    }

    document.getElementById('areaModal').classList.remove('hidden');
  }

  handleAreaSubmit(event) {
    event.preventDefault();
    if (this.currentUser.role !== 'admin') return;

    const areaId = document.getElementById('areaFormId').value;
    const name = document.getElementById('areaName').value.trim();
    const category = document.getElementById('areaCategory').value;

    if (areaId) {
      const area = this.areas.find(a => a.id === areaId);
      if (area) {
        area.name = name;
        area.category = category;
      }
      this.showToast(`แก้ไขพื้นที่ "${name}" สำเร็จ`);
    } else {
      if (this.areas.some(a => a.name.toLowerCase() === name.toLowerCase())) {
        alert(`มีพื้นที่ "${name}" อยู่แล้ว`);
        return;
      }
      this.areas.push({
        id: `area_${Date.now()}`,
        name,
        category
      });
      this.showToast(`เพิ่มพื้นที่ "${name}" สำเร็จ`);
    }

    this.saveAreas();
    this.populateAreaDropdowns();
    this.closeModal('areaModal');
    this.renderAll();
  }

  deleteArea(areaId) {
    if (this.currentUser.role !== 'admin') return;

    const area = this.areas.find(a => a.id === areaId);
    if (!area) return;
    if (!confirm(`ยืนยันการลบพื้นที่ "${area.name}" หรือไม่?`)) return;

    this.areas = this.areas.filter(a => a.id !== areaId);
    this.saveAreas();
    this.populateAreaDropdowns();
    this.showToast(`ลบพื้นที่ "${area.name}" แล้ว`);
    this.renderAll();
  }

  // ================= USER MANAGEMENT (ADMIN ONLY) =================
  renderUserManagement() {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;

    if (this.currentUser.role !== 'admin') {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:16px;">เฉพาะผู้ดูแลระบบเท่านั้น</td></tr>';
      return;
    }

    tbody.innerHTML = this.users.map(u => {
      const isCurrentSelf = this.currentUser.id === u.id;
      const roleLabel = u.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ปฏิบัติงาน';
      const roleBadgeClass = u.role === 'admin' ? 'role-admin' : 'role-staff';
      const statusPill = u.active !== false
        ? '<span class="user-status-pill active">เปิดใช้งาน</span>'
        : '<span class="user-status-pill suspended">ระงับการใช้</span>';

      const createdDateText = u.created_at ? formatThaiDate(u.created_at.substring(0, 10), true) : '-';

      return `
        <tr>
          <td><strong>${u.username}</strong> ${isCurrentSelf ? '<span class="text-muted">(คุณ)</span>' : ''}</td>
          <td>${u.display_name}</td>
          <td><span class="user-role-badge ${roleBadgeClass}">${roleLabel}</span></td>
          <td>${statusPill}</td>
          <td>${createdDateText}</td>
          <td class="text-right" style="white-space: nowrap;">
            <button class="btn btn-secondary btn-sm" onclick="app.openUserModal('${u.id}')">แก้ไข</button>
            <button class="btn btn-secondary btn-sm" onclick="app.openPasswordModal('${u.id}')">เปลี่ยนรหัสผ่าน</button>
            ${!isCurrentSelf ? `
              <button class="btn ${u.active !== false ? 'btn-danger-outline' : 'btn-secondary'} btn-sm" onclick="app.toggleUserActive('${u.id}')">
                ${u.active !== false ? 'ระงับ' : 'เปิดใช้งาน'}
              </button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');
  }

  openUserModal(userId) {
    if (this.currentUser.role !== 'admin') return;

    const titleEl = document.getElementById('userModalTitle');
    const formId = document.getElementById('userFormId');
    const usernameInput = document.getElementById('userFormUsername');
    const displayNameInput = document.getElementById('userFormDisplayName');
    const roleSelect = document.getElementById('userFormRole');
    const activeSelect = document.getElementById('userFormActive');
    const pwGroup = document.getElementById('userFormPasswordGroup');
    const pwInput = document.getElementById('userFormPassword');

    if (userId) {
      const user = this.users.find(u => u.id === userId);
      if (!user) return;
      titleEl.textContent = 'แก้ไขข้อมูลผู้ใช้';
      formId.value = user.id;
      usernameInput.value = user.username;
      usernameInput.disabled = true; // username shouldn't be mutated
      displayNameInput.value = user.display_name;
      roleSelect.value = user.role;
      activeSelect.value = user.active !== false ? 'true' : 'false';

      // Hide password input when editing user info (use separate reset modal)
      pwGroup.style.display = 'none';
      pwInput.removeAttribute('required');
    } else {
      titleEl.textContent = 'เพิ่มผู้ใช้งานใหม่';
      formId.value = '';
      usernameInput.value = '';
      usernameInput.disabled = false;
      displayNameInput.value = '';
      roleSelect.value = 'staff';
      activeSelect.value = 'true';

      pwGroup.style.display = 'block';
      pwInput.setAttribute('required', 'required');
      pwInput.value = '';
    }

    document.getElementById('userModal').classList.remove('hidden');
  }

  handleUserSubmit(event) {
    event.preventDefault();
    if (this.currentUser.role !== 'admin') return;

    const userId = document.getElementById('userFormId').value;
    const username = document.getElementById('userFormUsername').value.trim();
    const displayName = document.getElementById('userFormDisplayName').value.trim();
    const role = document.getElementById('userFormRole').value;
    const active = document.getElementById('userFormActive').value === 'true';
    const pwInput = document.getElementById('userFormPassword');

    const nowISO = new Date().toISOString();

    if (userId) {
      // Edit existing user
      const user = this.users.find(u => u.id === userId);
      if (user) {
        user.display_name = displayName;
        user.role = role;
        user.active = active;
        user.updated_at = nowISO;
      }
      this.showToast(`แก้ไขข้อมูลผู้ใช้ "${displayName}" เรียบร้อยแล้ว`);
    } else {
      // Check duplicate username
      if (this.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert(`ชื่อผู้ใช้ "${username}" มีอยู่ในระบบแล้ว กรุณาใช้ชื่ออื่น`);
        return;
      }

      const initialPw = pwInput ? pwInput.value.trim() : '1234';
      if (!initialPw || initialPw.length < 4) {
        alert('รหัสผ่านเริ่มต้นต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
        return;
      }

      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        username,
        display_name: displayName,
        role,
        active,
        password_hash: initialPw,
        created_at: nowISO,
        updated_at: nowISO
      };
      this.users.push(newUser);
      this.showToast(`เพิ่มผู้ใช้ "${displayName}" (${username}) เรียบร้อยแล้ว`);
    }

    this.saveUsers();
    this.closeModal('userModal');
    this.renderUserManagement();
    this.updateUserHeader();
  }

  openPasswordModal(userId) {
    if (this.currentUser.role !== 'admin') return;

    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    document.getElementById('pwTargetUserId').value = user.id;
    document.getElementById('pwTargetUserDetails').textContent = `${user.display_name} (${user.username})`;
    document.getElementById('newPasswordInput').value = '';

    document.getElementById('passwordModal').classList.remove('hidden');
  }

  handlePasswordSubmit(event) {
    event.preventDefault();
    if (this.currentUser.role !== 'admin') return;

    const targetUserId = document.getElementById('pwTargetUserId').value;
    const newPassword = document.getElementById('newPasswordInput').value.trim();

    if (!newPassword || newPassword.length < 4) {
      alert('รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
      return;
    }

    const user = this.users.find(u => u.id === targetUserId);
    if (!user) return;

    user.password_hash = newPassword;
    user.updated_at = new Date().toISOString();
    this.saveUsers();

    this.closeModal('passwordModal');
    this.showToast(`อัปเดตรหัสผ่านสำหรับ "${user.username}" สำเร็จ`);
  }

  toggleUserActive(userId) {
    if (this.currentUser.role !== 'admin') return;

    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    if (user.id === this.currentUser.id) {
      alert('ไม่อนุญาตให้ระงับบัญชีของตนเอง');
      return;
    }

    const nextState = !(user.active !== false);
    const actionLabel = nextState ? 'เปิดใช้งาน' : 'ระงับการใช้งาน';

    if (!confirm(`ต้องการ${actionLabel}บัญชีผู้ใช้ "${user.username}" หรือไม่?`)) return;

    user.active = nextState;
    user.updated_at = new Date().toISOString();
    this.saveUsers();

    this.showToast(`${actionLabel}บัญชี "${user.username}" เรียบร้อย`);
    this.renderUserManagement();
  }

  // ================= BACKUP & RESTORE & RESET =================
  exportFullBackup() {
    if (this.currentUser.role !== 'admin') return;

    const data = {
      system: 'CMU_Phailom_Health_Center_Task_System',
      version: '2.5',
      exportDate: new Date().toISOString(),
      exportedBy: this.currentUser.username,
      users: this.users,
      areas: this.areas,
      bins: this.bins,
      tasks: this.tasks,
      history: this.history
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `สำรองข้อมูล_ศูนย์สุขภาพไผ่ล้อม_${getTodayISO()}.json`;
    link.click();
  }

  importBackup(event) {
    if (this.currentUser.role !== 'admin') return;

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.areas && data.tasks && data.bins) {
          if (data.users && Array.isArray(data.users)) this.users = data.users;
          this.areas = data.areas;
          this.bins = data.bins;
          this.tasks = data.tasks;
          this.history = data.history || [];

          this.saveUsers();
          this.saveAreas();
          this.saveBins();
          this.saveTasks();
          this.saveHistory();

          alert('นำเข้าข้อมูลจากไฟล์สำรองสำเร็จเรียบร้อย');
          this.populateAreaDropdowns();
          this.renderAll();
        } else {
          alert('รูปแบบไฟล์ JSON ไม่ถูกต้อง');
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการอ่านไฟล์: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  resetToDefault() {
    if (this.currentUser.role !== 'admin') return;

    if (!confirm('คำเตือน: คุณต้องการรีเซ็ตข้อมูลระบบกลับสู่ค่าเริ่มต้นของศูนย์สุขภาพไผ่ล้อมหรือไม่?')) {
      return;
    }

    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.AREAS);
    localStorage.removeItem(STORAGE_KEYS.BINS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);

    this.loadData();
    this.populateAreaDropdowns();
    this.renderAll();
    this.showToast('รีเซ็ตข้อมูลสู่ค่าเริ่มต้นเรียบร้อยแล้ว');
  }
}

// Global Application Instance
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new PhailomTaskApp();
});
