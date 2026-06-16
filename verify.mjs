import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = '/tmp/taskflow-screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(e.message));

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`  📸 ${name}`);
}

async function check(label, fn) {
  try { await fn(); console.log(`  ✅ ${label}`); }
  catch (e) { console.log(`  ❌ ${label}: ${e.message.split('\n')[0]}`); }
}

// ─── 1. Login ───────────────────────────────────────────────────────────────
console.log('\n🔐 Auth');
await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });
await check('Login page renders', () => page.waitForSelector('text=Welcome back', { timeout: 6000 }));
await check('Email field visible', () => page.waitForSelector('input[type="email"]', { timeout: 3000 }));
await shot('01-login');

// Sign in
await page.fill('input[type="email"]', 'alex@taskflow.io');
await page.fill('input[type="password"]', 'password123');
await page.click('button[type="submit"]');
await page.waitForURL('http://localhost:5173/', { timeout: 8000 }).catch(() => page.waitForTimeout(2000));
await page.waitForTimeout(1000);

// ─── 2. Dashboard ───────────────────────────────────────────────────────────
console.log('\n📊 Dashboard');
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await check('Dashboard greeting', () => page.waitForSelector('text=Alex', { timeout: 5000 }));
await check('Active Projects card', () => page.waitForSelector('text=Active Projects', { timeout: 3000 }));
await check('Total Tasks card', () => page.waitForSelector('text=Total Tasks', { timeout: 3000 }));
await check('Productivity chart', () => page.waitForSelector('text=Team Productivity', { timeout: 3000 }));
await check('Completion rate', () => page.waitForSelector('text=Completion Rate', { timeout: 3000 }));
await check('Activity feed', () => page.waitForSelector('text=Recent Activity', { timeout: 3000 }));
await check('Quick Actions', () => page.waitForSelector('text=Quick Actions', { timeout: 3000 }));
await check('Upcoming Deadlines', () => page.waitForSelector('text=Upcoming Deadlines', { timeout: 3000 }));
await check('Sidebar visible', () => page.waitForSelector('text=TaskFlow', { timeout: 3000 }));
await shot('02-dashboard');

// ─── 3. Projects ────────────────────────────────────────────────────────────
console.log('\n📁 Projects');
await page.click('text=Projects');
await page.waitForTimeout(800);
await check('Projects heading', () => page.waitForSelector('h1:has-text("Projects")', { timeout: 4000 }));
await check('Atlas Mobile App', () => page.waitForSelector('text=Atlas Mobile App', { timeout: 3000 }));
await check('Design System 3.0', () => page.waitForSelector('text=Design System 3.0', { timeout: 3000 }));
await check('Status filter bar', () => page.waitForSelector('text=Planning', { timeout: 3000 }));
await shot('03-projects');

// ─── 4. Kanban Board ────────────────────────────────────────────────────────
console.log('\n🗂️  Board');
await page.click('text=Boards');
await page.waitForTimeout(1000);
await check('Board heading', () => page.waitForSelector('text=Kanban Board', { timeout: 4000 }));
await check('Backlog column', () => page.waitForSelector('text=Backlog', { timeout: 3000 }));
await check('In Progress column', () => page.waitForSelector('text=In Progress', { timeout: 3000 }));
await check('Task cards', () => page.waitForSelector('text=QA pass on iOS build', { timeout: 3000 }));
await check('Priority badges', () => page.waitForSelector('text=Urgent', { timeout: 3000 }));
await shot('04-board');

// ─── 5. Calendar ────────────────────────────────────────────────────────────
console.log('\n📅 Calendar');
await page.click('text=Calendar');
await page.waitForTimeout(800);
await check('Calendar heading', () => page.waitForSelector('h1:has-text("Calendar")', { timeout: 4000 }));
await check('Month grid days', () => page.waitForSelector('text=Mon', { timeout: 3000 }));
await check('View toggle', () => page.waitForSelector('button:has-text("Week")', { timeout: 3000 }));
await check('Today button', () => page.waitForSelector('button:has-text("Today")', { timeout: 3000 }));
await shot('05-calendar');

// ─── 6. Team ────────────────────────────────────────────────────────────────
console.log('\n👥 Team');
await page.click('text=Team');
await page.waitForTimeout(800);
await check('Team heading', () => page.waitForSelector('h1:has-text("Team")', { timeout: 4000 }));
await check('Sophia Chen', () => page.waitForSelector('text=Sophia Chen', { timeout: 3000 }));
await check('Marcus Lee', () => page.waitForSelector('text=Marcus Lee', { timeout: 3000 }));
await check('Workload bars', () => page.waitForSelector('text=Workload', { timeout: 3000 }));
await check('Role badges', () => page.waitForSelector('text=Admin', { timeout: 3000 }));
await shot('06-team');

// ─── 7. Notifications ───────────────────────────────────────────────────────
console.log('\n🔔 Notifications');
await page.click('a[href="/notifications"]');
await page.waitForTimeout(800);
await check('Notifications heading', () => page.waitForSelector('h1:has-text("Notifications")', { timeout: 4000 }));
await check('Filter tabs', () => page.waitForSelector('text=Unread', { timeout: 3000 }));
await check('Mark all read', () => page.waitForSelector('text=Mark all read', { timeout: 3000 }));
await check('Notification items', () => page.waitForSelector('text=Sophia Chen', { timeout: 3000 }));
await shot('07-notifications');

// ─── 8. Reports ─────────────────────────────────────────────────────────────
console.log('\n📈 Reports');
await page.click('text=Reports');
await page.waitForTimeout(800);
await check('Reports heading', () => page.waitForSelector('h1:has-text("Reports")', { timeout: 4000 }));
await check('Velocity KPI', () => page.waitForSelector('text=Velocity', { timeout: 3000 }));
await check('On-time Delivery', () => page.waitForSelector('text=On-time Delivery', { timeout: 3000 }));
await check('Productivity Trend chart', () => page.waitForSelector('text=Productivity Trend', { timeout: 3000 }));
await check('Project Mix chart', () => page.waitForSelector('text=Project Mix', { timeout: 3000 }));
await check('Date range filter', () => page.waitForSelector('text=30d', { timeout: 3000 }));
await shot('08-reports');

// ─── 9. Settings ────────────────────────────────────────────────────────────
console.log('\n⚙️  Settings');
await page.click('text=Settings');
await page.waitForTimeout(800);
await check('Profile tab', () => page.waitForSelector('text=Full name', { timeout: 4000 }));
await check('Timezone field', () => page.waitForSelector('text=Timezone', { timeout: 3000 }));
await check('Settings sidebar nav', () => page.waitForSelector('text=Workspace', { timeout: 3000 }));
await shot('09-settings-profile');

await page.click('text=Appearance').catch(() => {});
await page.waitForTimeout(500);
await shot('10-settings-appearance');

// ─── 10. Command Palette ────────────────────────────────────────────────────
console.log('\n⌘  Command Palette');
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.keyboard.press('Meta+k');
await page.waitForTimeout(600);
await check('Command palette opens', () => page.waitForSelector('text=Quick navigation', { timeout: 3000 }));
await shot('11-command-palette');
const searchInput = page.locator('input[placeholder*="Search"], input[placeholder*="search"]').first();
await searchInput.fill('atlas').catch(() => {});
await page.waitForTimeout(400);
await check('Search results appear', () => page.waitForSelector('text=Projects', { timeout: 3000 }));
await shot('12-command-palette-search');
await page.keyboard.press('Escape');

// ─── 11. Project detail ─────────────────────────────────────────────────────
console.log('\n📂 Project Detail');
await page.goto('http://localhost:5173/projects', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const openBtn = page.locator('text=Open').first();
if (await openBtn.isVisible().catch(() => false)) {
  await openBtn.click();
  await page.waitForTimeout(1000);
  await check('Project detail board tab', () => page.waitForSelector('text=Board', { timeout: 4000 }));
  await shot('13-project-detail');
}

// ─── Summary ────────────────────────────────────────────────────────────────
console.log('\n─────────────────────────────────');
console.log('🐛 Console errors:', errors.length === 0 ? 'None 🎉' : errors.length);
errors.slice(0, 5).forEach(e => console.log('  ⚠️ ', e.substring(0, 140)));
console.log(`📁 Screenshots saved to ${OUT}`);
await browser.close();
