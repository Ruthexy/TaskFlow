import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import { profileSchema, type ProfileFormData } from '../schemas/settings.schema'
import { useAuthStore } from '@/stores/authStore'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RoleBadge } from '@/components/shared/StatusBadge'

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
]

export function ProfileSettings() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      timezone: user?.timezone ?? 'America/New_York',
    },
  })

  const timezone = watch('timezone')

  const onSubmit = (data: ProfileFormData) => {
    if (user) {
      setUser({ ...user, name: data.name, email: data.email, timezone: data.timezone })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Avatar section */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            {user && <Avatar name={user.name} size="xl" />}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{user?.name}</h3>
                {user && <RoleBadge role={user.role} />}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Camera className="h-3.5 w-3.5" />
                  Upload photo
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Timezone</Label>
              <Select
                options={TIMEZONES}
                value={timezone}
                onChange={(v) => setValue('timezone', v)}
                className="max-w-xs"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={!isDirty}>
                Save changes
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
