---
description: Read this before implementing or modifying UI components in the project.
---

# shadcn/ui Component Guide

This project uses **shadcn/ui exclusively** for all UI elements. NO CUSTOM COMPONENTS should be created.

## Core Rule

**All UI components must come from shadcn/ui. Do not build custom component alternatives.**

## When You Need a Component

1. **Check shadcn/ui first**: Browse the [shadcn/ui component library](https://ui.shadcn.com) for what you need
2. **Install if missing**: Run `npx shadcn-ui@latest add [component-name]`
3. **Import and use**: Components are in `@/components/ui/`
4. **Customize with props**: Use shadcn/ui's theming, variant props, and CSS classes

## Common Components

| Use Case | shadcn/ui Component |
|----------|-------------------|
| Buttons | `Button` |
| Forms | `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` |
| Dialogs | `Dialog`, `AlertDialog` |
| Dropdowns | `DropdownMenu` |
| Navigation | `Sheet`, `Sidebar`, `NavigationMenu` |
| Data Display | `Table`, `Card`, `Badge`, `Avatar` |
| Feedback | `Toast`, `Alert`, `Progress` |
| Layout | `Tabs`, `Accordion`, `Collapsible` |

## Styling

- **Tailwind Classes**: Use Tailwind CSS classes directly on components
- **CSS Modules**: Avoid; use Tailwind instead
- **Custom CSS**: Keep styling within Tailwind/component props; don't create separate `.css` files for components
- **Color Palette**: Follow the project's Tailwind theme defined in `tailwind.config.ts`

## Example Pattern

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" className="mb-4" />
        <Button variant="default">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|---------|
| Use shadcn/ui components | Create custom styled components |
| Compose shadcn components together | Build alternative button/input components |
| Use Tailwind for spacing and styling | Write custom CSS modules |
| Extend components via props | Fork or heavily modify shadcn code |
| Check existing installations first | Install duplicate component packages |

## Adding a New Component

If shadcn/ui doesn't have what you need, ask in code review before building custom UI. Often a combination of existing components will work.

If you must create a custom component (rare), document why shadcn/ui wasn't sufficient in a code comment.

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Installed Components](../components/ui/)
