# Performance Optimization — Code Splitting

Conteúdo referencial de code splitting para performance-optimization-chat.

## Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Client-side only
})
```

## Pattern 2: Virtual Scrolling

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

function MessageList({ messages }: { messages: Message[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  })

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      {virtualizer.getVirtualItems().map((virtualItem) => (
        <Message key={virtualItem.key} message={messages[virtualItem.index]} />
      ))}
    </div>
  )
}
```
