import { Link } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        This page doesn&apos;t exist.
      </p>
      <Link to="/">
        <Button className="gap-2">
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  )
}
