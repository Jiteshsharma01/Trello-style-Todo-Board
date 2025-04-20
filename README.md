# 📝 Todo Board Application

A Trello-style task board built with React, TypeScript, Redux, and the DummyJSON API. Tasks can be dragged between status lanes, edited, deleted, and dynamically managed.

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js (v16 or above)
- npm or yarn

### 🔧 Installation

```bash
git clone https://github.com/Jiteshsharma01/Trello-style-Todo-Board.git
cd trello-todo-board
npm install
```

### ▶️ Running Locally
```
npm run dev
```

## Table of Contents
- [Architecture & Patterns](#architecture--patterns)
- [Key Design Decisions](#key-design-decisions)
- [Optimizations](#optimizations)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)

## Architecture & Patterns

### Component-Based Architecture
| Component         | Responsibility                         |
|-------------------|----------------------------------------|
| Board             | Parent component managing global state |
| Lane              | Status column with todos               |
| TodoCard          | Individual todo item                   |
| DropArea          | Drag-and-drop targets                  |
| AddStatusModal    | Status creation interface              |


### State Management
- Redux used for global state (todos, statuses)
- Local component state for UI-specific behaviors (modals, drag state)
- Thunks for async operations with DummyJSON API

### Drag-and-Drop Implementation
Our Todo Board implements a custom drag-and-drop system using native web APIs with React enhancements for optimal performance and user experience.
- HTML5 Drag-and-Drop API with React event handlers
- Visual feedback during drag operations
- Position-aware drop targets between todos

## Key Design Decisions

### Optimistic Updates:
- UI updates immediately while API calls happen in background
- Provides responsive feel despite API limitations

### Status Management:
- Core statuses ("Pending", "In Progress", "Completed") are protected
- Custom statuses can be added/removed

### Position Handling:
- Client-side reordering when API lacks support
- Smart position calculation during drops

## Optimizations

### Virtualization:
- Lanes use overflow containers for long todo lists
- (Future) Could implement proper virtualization for very long lists

### Batch Updates:
- Single dispatch for both status change and reordering
- Minimizes store updates

## Limitations

### API Constraints:
- DummyJSON doesn't support custom status field
- Persistence limited to completed state and todo text

### Position Persistence:
- Reordering is client-side only
- Positions reset on refresh due to API limitations

### Mobile Experience:
- Drag-and-drop optimized for desktop
- No touch gesture alternatives implemented

## Future Enhancements

### Backend Integration:
- Proper status field support
- Position persistence in database

### Enhanced DnD:
- Smooth animations during reordering
- Cross-device support (touch gestures)

### Collaboration Features:
- Real-time updates via WebSockets
- User assignment to todos

### Advanced UI:
- Customizable lane colors
- Due dates and priority indicators

### Performance:
- Proper list virtualization for large boards
- Optimistic updates with rollback on failure


This design balances functionality with the constraints of the DummyJSON API while providing a foundation for future expansion.
