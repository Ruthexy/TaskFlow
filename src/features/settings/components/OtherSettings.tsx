import { useWorkspaceStore } from '@/stores/workspaceStore'
import { useUIStore } from '@/stores/uiStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { Theme } from '@/types'

// ─── Workspace Settings ──────────────────────────────────────────────────────
export function WorkspaceSettings() {
  const workspace = useWorkspaceStore((s) => s.workspace)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Manage your workspace settings and details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Workspace name</Label>
            <Input defaultValue={workspace?.name} className="max-w-sm" />
          </div>
          <div className="space-y-1.5">
            <Label>Slug</Label>
            <div className="flex items-center gap-0 max-w-sm">
              <span className="rounded-l-md border border-r-0 bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                taskflow.io/
              </span>
              <Input defaultValue={workspace?.slug} className="rounded-l-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Plan</Label>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-100 text-violet-700 px-3 py-1 text-sm font-medium capitalize">
                {workspace?.plan}
              </span>
              <Button variant="outline" size="sm">Upgrade</Button>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button>Save changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for this workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm">Delete workspace</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Notification Settings ───────────────────────────────────────────────────
interface ToggleRowProps {
  label: string
  description: string
  defaultChecked?: boolean
}

function ToggleRow({ label, description, defaultChecked = true }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-10 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
      </label>
    </div>
  )
}

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent>
        <ToggleRow label="Task assignments" description="When someone assigns a task to you" />
        <ToggleRow label="Mentions" description="When someone mentions you in a comment" />
        <ToggleRow label="Task completions" description="When a task you're watching is completed" />
        <ToggleRow label="Comments" description="When someone comments on your tasks" defaultChecked={false} />
        <ToggleRow label="Project updates" description="When a project you're part of is updated" defaultChecked={false} />
        <ToggleRow label="Team invitations" description="When someone joins your workspace" />
        <div className="pt-4">
          <Button>Save preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Appearance Settings ─────────────────────────────────────────────────────
const THEMES: { value: Theme; label: string; description: string }[] = [
  { value: 'light', label: 'Light', description: 'Clean white interface' },
  { value: 'dark', label: 'Dark', description: 'Easy on the eyes at night' },
  { value: 'system', label: 'System', description: 'Follows your OS setting' },
]

export function AppearanceSettings() {
  const { theme, setTheme } = useUIStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the look and feel of your workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <Label className="mb-3 block">Theme</Label>
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                'flex flex-col items-start rounded-xl border p-4 text-left transition-all',
                theme === t.value
                  ? 'border-primary bg-primary/5 ring-2 ring-primary'
                  : 'hover:border-primary/30 hover:bg-accent'
              )}
            >
              <div className={cn(
                'mb-3 h-8 w-full rounded-md border',
                t.value === 'dark' ? 'bg-slate-800' : t.value === 'light' ? 'bg-white' : 'bg-gradient-to-r from-white to-slate-800'
              )} />
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Billing Settings ────────────────────────────────────────────────────────
const MOCK_INVOICES = [
  { date: 'Jun 1, 2026', amount: '$29.00', status: 'Paid' },
  { date: 'May 1, 2026', amount: '$29.00', status: 'Paid' },
  { date: 'Apr 1, 2026', amount: '$29.00', status: 'Paid' },
]

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div>
              <p className="font-semibold">Pro Plan</p>
              <p className="text-sm text-muted-foreground">$29/month · Billed monthly</p>
              <p className="text-xs text-muted-foreground mt-1">Next billing date: July 1, 2026</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Change plan</Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-8 w-12 rounded border bg-muted flex items-center justify-center text-xs font-bold">VISA</div>
              <div>
                <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/28</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {MOCK_INVOICES.map((inv) => (
              <div key={inv.date} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{inv.date}</p>
                  <p className="text-xs text-muted-foreground">{inv.amount}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-600 font-medium">{inv.status}</span>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
