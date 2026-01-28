# Averdi Next.js Services Integration

This package contains updated service pages and components for your Next.js project.

## File Structure

```
nextjs-services/
├── Services.tsx                          # Updated services section (now with 4 services)
├── types/
│   └── service.ts                        # TypeScript types for service configuration
├── components/
│   └── templates/
│       └── ServicePageLayout.tsx         # Reusable service page layout component
└── app/
    └── tjenester/
        ├── regnskap/
        │   └── page.tsx                  # Regnskap service page
        ├── lonn/
        │   └── page.tsx                  # Lønn service page
        ├── fakturering/
        │   └── page.tsx                  # Fakturering service page (NEW)
        └── raadgiving/
            └── page.tsx                  # Rådgivning service page
```

## Integration Steps

### 1. Copy the types
Copy `types/service.ts` to your project's `@/types/` directory.

### 2. Copy the ServicePageLayout component
Copy `components/templates/ServicePageLayout.tsx` to `@/components/templates/`.

### 3. Copy the service pages
Copy the contents of `app/tjenester/` to your `app/tjenester/` directory.

### 4. Update the Services section
Replace your existing `Services.tsx` with the new one that includes all 4 services.

### 5. Add the fakturering image
You'll need to add a `fakturering.avif` image to your `@/assets/` directory.
The Services.tsx expects this import:
```tsx
import imgFakturering from '@/assets/fakturering.avif';
```

## Routes Created

After integration, your app will have these routes:

- `/tjenester/regnskap` - Accounting services
- `/tjenester/lonn` - Payroll services  
- `/tjenester/fakturering` - Invoicing services (NEW)
- `/tjenester/raadgiving` - Advisory services

## Dependencies

The ServicePageLayout component uses:
- `next/image` for optimized images
- `next/link` for navigation
- `lucide-react` for icons (ChevronDown, Mail, Phone, ArrowRight)

Make sure these are installed in your project.

## Customization

### Theme Colors
The ServicePageLayout supports 4 color themes: `orange`, `blue`, `green`, `slate`.
You can change the theme in each page's config by modifying:
```tsx
hero: {
  theme: 'orange', // Change to 'blue', 'green', or 'slate'
}
```

### Expert Information
Update the expert section in each page with real team member data and photos.

### Images
Replace the Unsplash placeholder images with your own branded images.
