import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'

export default function NotFound() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile text-center py-section-padding space-y-8">
      <span className="font-display-lg text-display-lg text-primary block">404</span>
      <h1 className="font-headline-lg text-headline-lg text-primary">This page wandered off the path.</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
        We couldn't find the page you were looking for. Let's guide you back to the sanctuary.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  )
}
